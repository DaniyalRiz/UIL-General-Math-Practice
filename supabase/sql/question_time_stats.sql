-- Per-question median solve time, for the "You: 41s · median: 24s" line shown
-- under a solved problem.
--
-- Median is taken over each student's FIRST attempt at that question, one data
-- point per person. Using every attempt would let one student grinding the same
-- problem ten times drag the median down toward their practiced times, making
-- the comparison flattering and meaningless.
--
-- security definer because RLS on `attempts` restricts each user to their own
-- rows; the whole point here is an aggregate across everyone. Only an aggregate
-- ever leaves the function: no user ids, no individual times.
--
-- MIN_SAMPLE guards the obvious privacy edge: with one or two attempts on
-- record, a "median" is just somebody's individual time. Below the threshold the
-- function reports null and the UI shows nothing.
--
-- Safe to re-run.

create or replace function public.get_question_time_stats(p_question_id bigint)
returns table(median_ms integer, sample_size integer)
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  MIN_SAMPLE constant integer := 5;
begin
  return query
  with first_attempts as (
    select distinct on (a.user_id)
           a.user_id, a.time_taken_ms
    from public.attempts a
    where a.question_id = p_question_id
      and a.time_taken_ms > 0
    order by a.user_id, a.created_at asc
  ),
  agg as (
    select
      percentile_cont(0.5) within group (order by time_taken_ms)::integer as med,
      count(*)::integer as n
    from first_attempts
  )
  select case when agg.n >= MIN_SAMPLE then agg.med end,
         agg.n
  from agg;
end;
$$;

revoke all on function public.get_question_time_stats(bigint) from public;
grant execute on function public.get_question_time_stats(bigint) to anon, authenticated;
