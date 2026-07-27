-- Make the "Sharp Eye" achievement permanent once earned.
--
-- Before this, get_mastery_stats derived the achievement live:
--   exists(select 1 from bug_reports where user_id = me and status = 'resolved')
-- which meant deleting a resolved report silently revoked the achievement from
-- the user who filed it, retroactively and with no trace. Admins therefore could
-- never clear finished reports out of the list without taking something away.
--
-- Now the grant is stamped onto user_stats the moment a report is marked
-- resolved, and nothing that happens to the bug_reports row afterwards -- status
-- change, delete -- can take it back. The only thing that clears it is deleting
-- the user account itself (user_stats.user_id cascades from auth.users).
--
-- Safe to re-run.

-- ── 1. Where the grant lives ────────────────────────────────────────────────
alter table public.user_stats
  add column if not exists has_resolved_bug_report boolean not null default false;

-- ── 2. Backfill everyone who already earned it ──────────────────────────────
insert into public.user_stats (user_id, has_resolved_bug_report)
select distinct br.user_id, true
from public.bug_reports br
where br.status = 'resolved'
  and br.user_id is not null
on conflict (user_id) do update
  set has_resolved_bug_report = true;

-- ── 3. Stamp the grant when a report is resolved ────────────────────────────
-- security definer: the admin resolving the report is writing a *different*
-- user's user_stats row, which RLS would otherwise block.
create or replace function public.grant_sharp_eye()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if new.status = 'resolved' and new.user_id is not null then
    insert into public.user_stats (user_id, has_resolved_bug_report)
    values (new.user_id, true)
    on conflict (user_id) do update
      set has_resolved_bug_report = true;
  end if;
  return new;
end;
$$;

drop trigger if exists bug_reports_grant_sharp_eye on public.bug_reports;
create trigger bug_reports_grant_sharp_eye
  after insert or update of status on public.bug_reports
  for each row execute function public.grant_sharp_eye();

-- ── 4. Read the stamp instead of re-deriving it ─────────────────────────────
-- Identical to the previous definition except for the final column. The live
-- exists() is kept as a fallback OR: if the trigger is ever dropped or a report
-- is resolved by some path that bypasses it, the achievement still shows. It
-- can only ever turn the answer true, so it cannot re-introduce revocation.
create or replace function public.get_mastery_stats()
returns table(total_mastered integer, mastered_by_topic jsonb, used_recommended_practice boolean, has_resolved_bug_report boolean)
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_user_id uuid := auth.uid();
begin
  if v_user_id is null then
    raise exception 'You must be signed in.';
  end if;

  return query
  select
    (select count(*)::integer
     from public.user_question_mastery
     where user_id = v_user_id),

    (select coalesce(jsonb_object_agg(q.topic, cnt), '{}')
     from (
       select q2.topic, count(*)::integer as cnt
       from public.user_question_mastery uqm
       join public.questions q2 on q2.id = uqm.question_id
       where uqm.user_id = v_user_id
       group by q2.topic
     ) q),

    (select coalesce(us.used_recommended_practice, false)
     from public.user_stats us
     where us.user_id = v_user_id),

    coalesce(
      (select us.has_resolved_bug_report
       from public.user_stats us
       where us.user_id = v_user_id),
      false
    )
    or
    exists(
      select 1 from public.bug_reports br
      where br.user_id = v_user_id
        and br.status = 'resolved'
    );
end;
$$;
