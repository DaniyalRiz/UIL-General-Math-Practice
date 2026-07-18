function ReportIssueModal({ q, authUser, onClose }) {
  const ISSUE_TYPES = ['Wrong answer','Wrong explanation','Typo','Image missing','Formatting issue','Other'];
  const [issueType, setIssueType] = useState('Wrong answer');
  const [details, setDetails] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const submitReport = async () => {
    if (!authUser) {
      setMessage('Please sign in to report an issue.');
      return;
    }
    setSaving(true);
    setMessage('');
    const { error } = await _supabase.from('question_reports').insert({
      user_id: authUser.id,
      question_id: q.id,
      issue_type: issueType,
      details: details.trim() || null,
    });
    setSaving(false);
    if (error) {
      setMessage(error.message || 'Could not submit report.');
      return;
    }
    setMessage('Report submitted. Thanks for helping improve the question bank.');
    setDetails('');
    setTimeout(onClose, 900);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-5"
        onClick={e => e.stopPropagation()}>
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <h2 className="font-display text-xl font-black text-slate-900 dark:text-white">Report Question Issue</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{q.title || 'Question #' + q.id}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl">×</button>
        </div>

        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Issue type</label>
        <select value={issueType} onChange={e=>setIssueType(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500">
          {ISSUE_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
        </select>

        <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Details</label>
        <textarea value={details} onChange={e=>setDetails(e.target.value)}
          placeholder="Briefly explain the issue. Example: answer key says C but calculation gives B."
          rows={4}
          className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-600 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>

        {message && <p className={`mt-3 text-sm ${message.startsWith('Report submitted') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{message}</p>}

        <div className="mt-5 flex justify-end gap-2">
          <button onClick={onClose}
            className="px-4 py-2 rounded-lg text-sm font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            Cancel
          </button>
          <button onClick={submitReport} disabled={saving || !authUser}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${authUser && !saving ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
            {!authUser ? 'Sign in required' : saving ? 'Submitting…' : 'Submit Report'}
          </button>
        </div>
      </div>
    </div>
  );
}


function CommunitySolutions({ q, authUser, answered }) {
  const [open, setOpen] = useState(false);
  const [solutions, setSolutions] = useState([]);
  const [votes, setVotes] = useState([]);
  const [sortBy, setSortBy] = useState('Most Upvotes');
  const [text, setText] = useState('');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-open after any submitted answer, correct or wrong.
  useEffect(() => {
    if (answered) setOpen(true);
  }, [answered]);

  const loadSolutions = async () => {
    if (!q?.id) return;
    setLoading(true);

    // Use the base table first. This is more reliable than relying only on the view.
    const { data, error } = await _supabase
      .from('community_solutions')
      .select('id,user_id,question_id,solution_text,display_name,created_at,hidden')
      .eq('question_id', q.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.warn('community_solutions load error:', error.message);
      setSolutions([]);
      setLoading(false);
      return;
    }

    const visibleRows = (data || []).filter(s => !s.hidden);
    const ids = visibleRows.map(s => s.id);

    let voteCounts = {};
    if (ids.length) {
      const { data: voteRows } = await _supabase
        .from('community_solution_votes')
        .select('solution_id')
        .in('solution_id', ids);

      (voteRows || []).forEach(v => {
        voteCounts[v.solution_id] = (voteCounts[v.solution_id] || 0) + 1;
      });
    }

    if (authUser && ids.length) {
      const { data: myVotes } = await _supabase
        .from('community_solution_votes')
        .select('solution_id')
        .eq('user_id', authUser.id)
        .in('solution_id', ids);
      setVotes((myVotes || []).map(v => v.solution_id));
    } else {
      setVotes([]);
    }

    setSolutions(visibleRows.map(s => ({ ...s, upvotes: voteCounts[s.id] || 0 })));
    setLoading(false);
  };

  useEffect(() => {
    if (open) loadSolutions();
  }, [open, q.id, authUser?.id]);

  const sorted = [...solutions].sort((a,b) => {
    if (sortBy === 'Most Recent') return new Date(b.created_at) - new Date(a.created_at);
    if (sortBy === 'Oldest First') return new Date(a.created_at) - new Date(b.created_at);
    return (b.upvotes || 0) - (a.upvotes || 0) || new Date(b.created_at) - new Date(a.created_at);
  });

  const saveSolution = async () => {
    if (!authUser) {
      setMessage('Please sign in to post a solution.');
      return;
    }
    if (!text.trim()) return;

    setSaving(true);
    setMessage('');

    const newSolution = {
      user_id: authUser.id,
      question_id: q.id,
      solution_text: text.trim(),
      display_name: authUser.user_metadata?.display_name || authUser.email?.split('@')[0] || 'User',
    };

    const { data, error } = await _supabase
      .from('community_solutions')
      .insert(newSolution)
      .select()
      .single();

    setSaving(false);

    if (error) {
      setMessage(error.message || 'Could not post solution.');
      return;
    }

    setText('');
    setMessage('Solution posted.');
    setSolutions(prev => [{
      ...(data || newSolution),
      id: data?.id || `local-${Date.now()}`,
      created_at: data?.created_at || new Date().toISOString(),
      upvotes: 0,
    }, ...prev]);
  };

  const toggleVote = async (solutionId) => {
    if (!authUser || String(solutionId).startsWith('local-')) return;
    const already = votes.includes(solutionId);

    if (already) {
      await _supabase.from('community_solution_votes')
        .delete()
        .eq('user_id', authUser.id)
        .eq('solution_id', solutionId);
    } else {
      await _supabase.from('community_solution_votes').insert({
        user_id: authUser.id,
        solution_id: solutionId,
      });
    }
    await loadSolutions();
  };

  return (
    <div className="mx-4 sm:mx-6 mb-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-visible">
      <button onClick={()=>setOpen(o=>!o)}
        className="w-full px-4 py-3 flex items-start justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
        <div className="text-left min-w-0">
          <p className="text-sm font-bold text-slate-800 dark:text-slate-100">Community Solutions</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">View, post, and discuss solution methods. LaTeX works with \\( ... \\) and \\[ ... \\].</p>
        </div>
        <span className="shrink-0 text-sm font-semibold text-blue-600 dark:text-blue-400">{open ? 'Hide' : 'Show'}</span>
      </button>

      {open ? (
        <div className="border-t border-slate-200 dark:border-slate-800 p-4 space-y-4 bg-white dark:bg-slate-900 rounded-b-2xl">
          {authUser ? (
            <div className="pt-1">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Add your solution or comment</p>
              <textarea value={text} onChange={e=>setText(e.target.value)}
                placeholder="Type your method, shortcut, or question. Use \\(x^2\\), \\frac{a}{b}, \\sqrt{x}, etc. for math."
                rows={4}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-600 resize-y min-h-[110px] focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"></textarea>
              <div className="mt-2 flex flex-col sm:flex-row sm:items-center gap-2">
                <p className="text-xs text-slate-400 dark:text-slate-500 flex-1">Tip: write math as <code>\\(x^2+1\\)</code>.</p>
                <button onClick={saveSolution} disabled={saving || !text.trim()}
                  className={`w-full sm:w-auto px-4 py-2.5 rounded-lg text-sm font-semibold ${text.trim() && !saving ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'}`}>
                  {saving ? 'Posting…' : 'Post Solution'}
                </button>
              </div>
              {message && <p className={`mt-2 text-xs ${message.includes('posted') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{message}</p>}
            </div>
          ) : (
            <p className="text-sm text-slate-500 dark:text-slate-400 pt-1">
              <a href="./index.html" className="text-blue-600 dark:text-blue-400 hover:underline">Sign in</a> to post a community solution.
            </p>
          )}

          <div className={authUser ? "border-t border-slate-200 dark:border-slate-800 pt-4" : ""}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                {loading ? 'Loading solutions…' : `${solutions.length} solution${solutions.length!==1?'s':''}`}
              </p>
              <select value={sortBy} onChange={e=>setSortBy(e.target.value)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                <option>Most Upvotes</option>
                <option>Most Recent</option>
                <option>Oldest First</option>
              </select>
            </div>

            <div className="space-y-3">
              {loading ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 py-4 text-center">Loading community solutions…</p>
              ) : sorted.length === 0 ? (
                <div className="py-8 text-center">
                  <div className="w-10 h-10 mx-auto mb-3 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                  </div>
                  <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-0.5">No solutions yet</p>
                  {authUser && <p className="text-xs text-slate-400 dark:text-slate-500">Be the first to add one above.</p>}
                </div>
              ) : sorted.map(s => (
                <div key={s.id} className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-3">
                  <div className="flex items-start gap-3">
                    <button onClick={()=>authUser && toggleVote(s.id)}
                      title={!authUser ? "Sign in to vote" : undefined}
                      className={`shrink-0 px-2 py-1 rounded-lg text-xs font-bold border transition-colors ${!authUser ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400 dark:text-slate-600 cursor-default' : votes.includes(s.id) ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:border-blue-400'}`}>
                      ▲ {s.upvotes || 0}
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">
                        {s.display_name || 'User'} · {new Date(s.created_at).toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})}
                      </p>
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                        <MathText text={s.solution_text} />
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
