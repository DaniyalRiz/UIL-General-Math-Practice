-- Median solve time for the "You: 41s · median: 24s" line under a solved problem.
--
-- Median is taken over each student's FIRST attempt, one data point per person.
-- Using every attempt would let one student grinding the same problem ten times
-- drag the median toward their practiced times.
--
-- WHY THE FALLBACK: with a per-question threshold of 5 students, only 16 of 1000
-- questions qualified, so the line was invisible 98% of the time. The threshold
-- is now 3 (47 questions), and anything below that falls back to the median for
-- that difficulty, which has hundreds of data points and always exists. `scope`
-- tells the UI which one it got so the label can say so honestly, rather than
-- passing a difficulty median off as a per-problem one.
--
-- security definer because RLS on `attempts` restricts each user to their own
-- rows, and the whole point is an aggregate across everyone. Only aggregates
-- leave the function: no user ids, no individual times.
--
-- Safe to re-run.

create or replace function public.get_question_time_stats(p_question_id bigint)
returns table(median_ms integer, sample_size integer, scope text)
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  MIN_QUESTION constant integer := 3;  -- below this a "median" is barely a median
  MIN_BUCKET   constant integer := 5;
  v_difficulty text;
  v_med integer;
  v_n   integer;
begin
  -- Per question first: the most specific and most useful comparison.
  select (percentile_cont(0.5) within group (order by fa.time_taken_ms))::integer,
         count(*)::integer
    into v_med, v_n
  from (
    select distinct on (a.user_id) a.user_id, a.time_taken_ms
    from public.attempts a
    where a.question_id = p_question_id and a.time_taken_ms > 0
    order by a.user_id, a.created_at asc
  ) fa;

  if v_n >= MIN_QUESTION then
    return query select v_med, v_n, 'question'::text;
    return;
  end if;

  -- Otherwise the same figure for every question of this difficulty.
  select q.difficulty into v_difficulty from public.questions q where q.id = p_question_id;
  if v_difficulty is null then
    return query select null::integer, coalesce(v_n, 0), 'none'::text;
    return;
  end if;

  select (percentile_cont(0.5) within group (order by fa.time_taken_ms))::integer,
         count(*)::integer
    into v_med, v_n
  from (
    select distinct on (a.user_id, a.question_id) a.user_id, a.time_taken_ms
    from public.attempts a
    join public.questions q on q.id = a.question_id
    where q.difficulty = v_difficulty and a.time_taken_ms > 0
    order by a.user_id, a.question_id, a.created_at asc
  ) fa;

  if v_n >= MIN_BUCKET then
    return query select v_med, v_n, ('difficulty:' || v_difficulty)::text;
  else
    return query select null::integer, coalesce(v_n, 0), 'none'::text;
  end if;
end;
$$;

revoke all on function public.get_question_time_stats(bigint) from public;
grant execute on function public.get_question_time_stats(bigint) to anon, authenticated;
