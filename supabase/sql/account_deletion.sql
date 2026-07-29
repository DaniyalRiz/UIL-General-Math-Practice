-- Self-service account deletion.
--
-- Users can now delete their own account from Settings instead of emailing an
-- admin. Deleting the auth.users row cascades to everything they own:
--   attempts, notes, question_sessions, user_question_mastery, user_stats,
--   community_solutions, community_solution_votes
-- and, in auth, their identities/sessions/tokens.
--
-- Two foreign keys were ON DELETE NO ACTION, which would have made the delete
-- fail outright with a foreign-key violation rather than doing anything useful:
--   bug_reports.user_id     -- any user who ever filed a bug report
--   import_batches.created_by -- an admin who ever ran a PDF import
-- Both become SET NULL: the row survives (an unfixed bug should not vanish from
-- the admin queue because the reporter left) but no longer names a person.
-- question_reports.user_id was already SET NULL.
--
-- Safe to re-run.

-- ── 1. Stop the two NO ACTION keys from blocking deletion ───────────────────
alter table public.bug_reports
  drop constraint if exists bug_reports_user_id_fkey;
alter table public.bug_reports
  add constraint bug_reports_user_id_fkey
  foreign key (user_id) references auth.users(id) on delete set null;

alter table public.import_batches
  drop constraint if exists import_batches_created_by_fkey;
alter table public.import_batches
  add constraint import_batches_created_by_fkey
  foreign key (created_by) references auth.users(id) on delete set null;

-- ── 2. The deletion itself ──────────────────────────────────────────────────
-- security definer because deleting from auth.users is not something the
-- `authenticated` role may do directly. auth.uid() is taken from the caller's
-- JWT and is the only id the function will ever touch, so a signed-in user can
-- delete themselves and nobody else -- there is deliberately no parameter.
create or replace function public.delete_my_account()
returns void
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

  -- Uploaded avatar lives at avatars/<user_id>/avatar.jpg and is not reachable
  -- by any foreign key, so it would otherwise be orphaned in the bucket.
  delete from storage.objects
  where bucket_id = 'avatars'
    and (storage.foldername(name))[1] = v_user_id::text;

  -- Everything else follows from the cascades above.
  delete from auth.users where id = v_user_id;
end;
$$;

revoke all on function public.delete_my_account() from public, anon;
grant execute on function public.delete_my_account() to authenticated;
