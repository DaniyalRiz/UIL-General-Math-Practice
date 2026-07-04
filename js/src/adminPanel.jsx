function AdminUserActivity({ authUser }) {
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [reports, setReports] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([
      _supabase.rpc('admin_attempts_with_users'),
      _supabase.from('community_solutions_with_votes').select('*').order('created_at', { ascending: false }).limit(1000),
      _supabase.from('question_reports').select('*').order('created_at', { ascending: false }).limit(1000),
      _supabase.from('public_questions').select('id,title,topic,difficulty,source').limit(5000),
    ]).then(([a, s, r, q]) => {
      if (a.error || s.error || r.error || q.error) {
        setError(a.error?.message || s.error?.message || r.error?.message || q.error?.message);
      }
      setAttempts(a.data || []);
      setSolutions(s.data || []);
      setReports(r.data || []);
      setQuestions(q.data || []);
      setLoading(false);
    });
  }, [isAdmin]);

  if (!isAdmin) return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 text-center">
      <p className="font-bold text-slate-800 dark:text-slate-100">Admin only</p>
    </div>
  );

  if (loading) return (
    <div className="flex items-center justify-center py-24">
      <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (error) return (
    <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-500/10 p-6 text-rose-700 dark:text-rose-300">
      Error loading admin activity: {error}
      <p className="text-sm mt-2">Make sure you ran <code>admin_activity_rpc.sql</code> in Supabase.</p>
    </div>
  );

  const now = new Date();
  const sevenDaysAgo = new Date(now); sevenDaysAgo.setDate(now.getDate() - 7);

  const qMap = {};
  questions.forEach(q => qMap[q.id] = q);

  const displayUser = (u) => u.display_name || u.user_email || u.user_id;

  const users = {};
  attempts.forEach(a => {
    const id = a.user_id || 'unknown';
    if (!users[id]) users[id] = {
      user_id:id,
      user_email:a.user_email || '',
      display_name:a.display_name || '',
      attempts:0,
      correct:0,
      totalMs:0,
      lastActive:null,
      rows: [],
    };
    users[id].attempts++;
    if (a.is_correct) users[id].correct++;
    users[id].totalMs += a.time_taken_ms || 0;
    users[id].rows.push(a);
    const d = new Date(a.created_at);
    if (!users[id].lastActive || d > users[id].lastActive) users[id].lastActive = d;
  });

  const userRows = Object.values(users)
    .map(u => ({ ...u, accuracy: u.attempts ? Math.round(100*u.correct/u.attempts) : 0, avgMs: u.attempts ? Math.round(u.totalMs/u.attempts) : 0 }))
    .sort((a,b) => b.attempts - a.attempts);

  const active7 = userRows.filter(u => u.lastActive && u.lastActive >= sevenDaysAgo).length;

  attempts.forEach(a => {
    const id = a.question_id;
    if (!qMap[id]) qMap[id] = { id, title:a.question_title || 'Question #' + id, topic:a.topic, difficulty:a.difficulty };
    if (!qMap[id].stats) qMap[id].stats = { attempts:0, wrong:0, correct:0, totalMs:0, rows:[] };
    qMap[id].stats.attempts++;
    if (!a.is_correct) qMap[id].stats.wrong++;
    if (a.is_correct) qMap[id].stats.correct++;
    qMap[id].stats.totalMs += a.time_taken_ms || 0;
    qMap[id].stats.rows.push(a);
  });

  const questionStats = Object.values(qMap)
    .filter(q => q.stats && q.stats.attempts > 0)
    .map(q => ({
      ...q,
      attempts: q.stats.attempts,
      wrong: q.stats.wrong,
      correct: q.stats.correct,
      missRate: Math.round(100*q.stats.wrong/q.stats.attempts),
      accuracy: Math.round(100*q.stats.correct/q.stats.attempts),
      avgMs: Math.round(q.stats.totalMs/q.stats.attempts),
      rows: q.stats.rows,
    }));

  const mostAttempted = [...questionStats].sort((a,b)=>b.attempts-a.attempts).slice(0,10);
  const mostMissed = [...questionStats].filter(q=>q.attempts>=2).sort((a,b)=>b.missRate-a.missRate || b.wrong-a.wrong).slice(0,10);
  const slowest = [...questionStats].filter(q=>q.attempts>=2).sort((a,b)=>b.avgMs-a.avgMs).slice(0,10);
  const recentAttempts = attempts.slice(0,25);

  const updateReportStatus = async (reportId, status) => {
    const { error } = await _supabase
      .from('question_reports')
      .update({ status })
      .eq('id', reportId);
    if (error) {
      alert(error.message || 'Could not update report.');
      return;
    }
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
  };

  const deleteReport = async (reportId) => {
    if (!confirm('Delete this report?')) return;
    const { error } = await _supabase.from('question_reports').delete().eq('id', reportId);
    if (error) {
      alert(error.message || 'Could not delete report.');
      return;
    }
    setReports(prev => prev.filter(r => r.id !== reportId));
  };

  const Card = ({label,value,sub}) => (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 shadow-sm">
      <p className="text-2xl font-black text-slate-900 dark:text-white">{value}</p>
      <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">{label}</p>
      {sub && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{sub}</p>}
    </div>
  );

  const QuestionLink = ({ q, children }) => (
    <button onClick={()=>setSelectedQuestion(q)}
      className="text-left font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors truncate">
      {children || q.title || 'Question #' + q.id}
    </button>
  );

  const UserLink = ({ u }) => (
    <button onClick={()=>setSelectedUser(u)}
      className="text-left font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors truncate">
      {displayUser(u)}
    </button>
  );

  const MiniTable = ({title, rows, type}) => (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
      <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-bold text-slate-800 dark:text-slate-100">{title}</h3>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {rows.length === 0 ? <p className="p-4 text-sm text-slate-400">No data yet.</p> : rows.map((row, i) => (
          <div key={row.id || row.user_id || i} className="px-4 py-3">
            <p className="text-sm truncate">
              {type === 'user' ? <UserLink u={row} /> : <QuestionLink q={row} />}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {type === 'user'
                ? `${row.attempts} attempts · ${row.accuracy}% accuracy · avg ${fmtTime(row.avgMs)} · last ${row.lastActive ? row.lastActive.toLocaleDateString() : '—'}`
                : `${row.attempts} attempts · ${row.missRate ?? 0}% missed · avg ${fmtTime(row.avgMs || 0)} · ${row.topic || ''}`}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const UserModal = ({ u, onClose }) => {
    const [deleting, setDeleting] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [rangeStart, setRangeStart] = useState('');
    const [rangeEnd, setRangeEnd] = useState('');

    const topicMap = {};
    const colMap = {};
    u.rows.forEach(r => {
      if (!topicMap[r.topic]) topicMap[r.topic] = { attempts:0, correct:0 };
      topicMap[r.topic].attempts++;
      if (r.is_correct) topicMap[r.topic].correct++;
      const col = getColumnCategory(r);
      if (col) {
        if (!colMap[col]) colMap[col] = { attempts:0, correct:0 };
        colMap[col].attempts++;
        if (r.is_correct) colMap[col].correct++;
      }
    });
    const topicRows = Object.entries(topicMap).map(([topic,v]) => ({ topic, ...v, accuracy: Math.round(100*v.correct/v.attempts) })).sort((a,b)=>a.accuracy-b.accuracy);
    const colRows = ['Column 1','Column 2','Column 3'].map(c => {
      const v = colMap[c] || { attempts:0, correct:0 };
      return { column:c, ...v, accuracy:v.attempts ? Math.round(100*v.correct/v.attempts) : 0 };
    });

    const deleteAttempts = async () => {
      const ok = confirm(`Delete ALL attempts for ${displayUser(u)}? This cannot be undone.`);
      if (!ok) return;
      setDeleting(true);
      setDeleteMessage('');
      const { data, error } = await _supabase.rpc('admin_delete_user_attempts', { p_user_id: u.user_id });
      setDeleting(false);
      if (error) {
        setDeleteMessage(error.message || 'Could not delete attempts.');
        return;
      }
      setDeleteMessage(`Deleted ${data} attempts. Refreshing…`);
      setTimeout(()=>window.location.reload(), 800);
    };

    const deleteAllSiteData = async () => {
      const ok = confirm(`Delete ALL site data for ${displayUser(u)}? This includes attempts, notes, reports, votes, and community solutions. This cannot be undone.`);
      if (!ok) return;
      setDeleting(true);
      setDeleteMessage('');
      const { data, error } = await _supabase.rpc('admin_delete_user_site_data', { p_user_id: u.user_id });
      setDeleting(false);
      if (error) {
        setDeleteMessage(error.message || 'Could not delete user data.');
        return;
      }
      setDeleteMessage(`Deleted user site data: ${JSON.stringify(data)}. Refreshing…`);
      setTimeout(()=>window.location.reload(), 1000);
    };

    const deleteRange = async () => {
      if (!rangeStart || !rangeEnd) {
        setDeleteMessage('Choose both start and end times.');
        return;
      }
      const ok = confirm(`Delete attempts by ${displayUser(u)} from ${rangeStart} to ${rangeEnd}?`);
      if (!ok) return;
      setDeleting(true);
      setDeleteMessage('');
      const { data, error } = await _supabase.rpc('admin_delete_user_attempts_between', {
        p_user_id: u.user_id,
        p_start: new Date(rangeStart).toISOString(),
        p_end: new Date(rangeEnd).toISOString(),
      });
      setDeleting(false);
      if (error) {
        setDeleteMessage(error.message || 'Could not delete attempts in range.');
        return;
      }
      setDeleteMessage(`Deleted ${data} attempts in that time range. Refreshing…`);
      setTimeout(()=>window.location.reload(), 900);
    };

    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
        <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl" onClick={e=>e.stopPropagation()}>
          <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-black text-slate-900 dark:text-white">{displayUser(u)}</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">{u.user_email || u.user_id}</p>
            </div>
            <button onClick={onClose} className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl">×</button>
          </div>
          <div className="p-5 space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Card label="Attempts" value={u.attempts} />
              <Card label="Accuracy" value={u.accuracy + '%'} />
              <Card label="Avg Time" value={fmtTime(u.avgMs)} />
              <Card label="Last Active" value={u.lastActive ? u.lastActive.toLocaleDateString() : '—'} />
            </div>

            <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-500/10 p-4">
              <h3 className="font-bold text-rose-800 dark:text-rose-300 mb-2">Admin Data Management</h3>
              <p className="text-xs text-rose-700 dark:text-rose-300 mb-3">
                Use this to clean spam data. It does not delete the user's Supabase Auth account; it deletes stored site activity.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <button onClick={deleteAttempts} disabled={deleting}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50">
                  Delete All Attempts
                </button>
                <button onClick={deleteAllSiteData} disabled={deleting}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-red-700 hover:bg-red-800 text-white disabled:opacity-50">
                  Delete All User Site Data
                </button>
              </div>
              <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-end">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 mb-1">Start</label>
                  <input type="datetime-local" value={rangeStart} onChange={e=>setRangeStart(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900 text-xs" />
                </div>
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 mb-1">End</label>
                  <input type="datetime-local" value={rangeEnd} onChange={e=>setRangeEnd(e.target.value)}
                    className="w-full px-2 py-2 rounded-lg border border-rose-200 dark:border-rose-800 bg-white dark:bg-slate-900 text-xs" />
                </div>
                <button onClick={deleteRange} disabled={deleting}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white disabled:opacity-50">
                  Delete Range
                </button>
              </div>
              {deleteMessage && <p className="text-xs text-rose-700 dark:text-rose-300 mt-3">{deleteMessage}</p>}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                <h3 className="font-bold mb-3">Column Performance</h3>
                {colRows.map(c => <p key={c.column} className="text-sm text-slate-600 dark:text-slate-300 mb-1">{c.column}: {c.correct}/{c.attempts} · {c.accuracy}%</p>)}
              </div>
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4">
                <h3 className="font-bold mb-3">Weakest Topics</h3>
                {topicRows.slice(0,5).map(t => <p key={t.topic} className="text-sm text-slate-600 dark:text-slate-300 mb-1">{t.topic}: {t.correct}/{t.attempts} · {t.accuracy}%</p>)}
              </div>
            </div>
            <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
              <h3 className="font-bold p-4 border-b border-slate-200 dark:border-slate-800">Recent Activity</h3>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {u.rows.slice(0,25).map(r => (
                  <div key={r.id} className="px-4 py-3">
                    <QuestionLink q={qMap[r.question_id] || {id:r.question_id,title:r.question_title}} />
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{r.is_correct ? 'Correct' : 'Wrong'} · {fmtTime(r.time_taken_ms || 0)} · {new Date(r.created_at).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const QuestionModal = ({ q, onClose }) => (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="relative z-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-black text-slate-900 dark:text-white">{q.title || 'Question #' + q.id}</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">{q.topic} · {q.difficulty}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-xl">×</button>
        </div>
        <div className="p-5 space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Card label="Attempts" value={q.attempts} />
            <Card label="Accuracy" value={q.accuracy + '%'} />
            <Card label="Miss Rate" value={q.missRate + '%'} />
            <Card label="Avg Time" value={fmtTime(q.avgMs)} />
          </div>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
            <h3 className="font-bold p-4 border-b border-slate-200 dark:border-slate-800">Recent Attempts</h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {(q.rows || []).slice(0,30).map(r => (
                <div key={r.id} className="px-4 py-3">
                  <UserLink u={users[r.user_id] || {user_id:r.user_id, user_email:r.user_email, display_name:r.display_name}} />
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{r.is_correct ? 'Correct' : 'Wrong'} · {fmtTime(r.time_taken_ms || 0)} · {new Date(r.created_at).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <Card label="Total Users" value={userRows.length} />
        <Card label="Active 7 Days" value={active7} />
        <Card label="Total Attempts" value={attempts.length} />
        <Card label="Community Solutions" value={solutions.length} />
        <Card label="Question Reports" value={reports.length} sub={`${reports.filter(r=>r.status==='open').length} open`} />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <MiniTable title="Users by Practice Volume" rows={userRows.slice(0,15)} type="user" />
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Recent Attempts</h3>
          </div>
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentAttempts.length === 0 ? <p className="p-4 text-sm text-slate-400">No attempts yet.</p> : recentAttempts.map(a => (
              <div key={a.id} className="px-4 py-3">
                <p className="text-sm truncate"><QuestionLink q={qMap[a.question_id] || {id:a.question_id,title:a.question_title}} /></p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  <UserLink u={users[a.user_id] || {user_id:a.user_id, user_email:a.user_email, display_name:a.display_name}} /> · {a.is_correct ? 'Correct' : 'Wrong'} · {fmtTime(a.time_taken_ms || 0)} · {new Date(a.created_at).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <MiniTable title="Most Attempted Questions" rows={mostAttempted} />
        <MiniTable title="Most Missed Questions" rows={mostMissed} />
        <MiniTable title="Slowest Questions" rows={slowest} />
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-800 dark:text-slate-100">Question Issue Reports</h3>
            <p className="text-xs text-slate-400 dark:text-slate-500">{reports.length} total · {reports.filter(r=>r.status==='open').length} open</p>
          </div>
        </div>
        {reports.length === 0 ? (
          <p className="p-6 text-sm text-slate-400">No issue reports yet.</p>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {reports.slice(0,50).map(r => {
              const q = qMap[r.question_id] || { id:r.question_id, title:'Question #' + r.question_id };
              return (
                <div key={r.id} className="px-4 py-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <button onClick={()=>setSelectedQuestion(q)}
                        className="text-left text-sm font-semibold text-slate-800 dark:text-slate-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                        {q.title || 'Question #' + r.question_id}
                      </button>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {r.issue_type} · {r.status} · {new Date(r.created_at).toLocaleString()}
                      </p>
                      {r.details && <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 whitespace-pre-wrap">{r.details}</p>}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <select value={r.status || 'open'} onChange={e=>updateReportStatus(r.id, e.target.value)}
                        className="px-2 py-1.5 rounded-lg text-xs font-semibold border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                        <option value="open">open</option>
                        <option value="reviewing">reviewing</option>
                        <option value="resolved">resolved</option>
                        <option value="dismissed">dismissed</option>
                      </select>
                      <button onClick={()=>deleteReport(r.id)}
                        className="px-2 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-500/10">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedUser && <UserModal u={selectedUser} onClose={()=>setSelectedUser(null)} />}
      {selectedQuestion && <QuestionModal q={selectedQuestion} onClose={()=>setSelectedQuestion(null)} />}
    </div>
  );
}

function AdminReports({ authUser }) {
  const [reports, setReports] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([
      _supabase.from('question_reports').select('*').order('created_at', { ascending: false }).limit(500),
      _supabase.from('public_questions').select('id,title,topic,difficulty').limit(5000),
    ]).then(([r, q]) => {
      if (r.error || q.error) { setError(r.error?.message || q.error?.message); }
      setReports(r.data || []);
      setQuestions(q.data || []);
      setLoading(false);
    });
  }, [isAdmin]);

  const updateStatus = async (reportId, status) => {
    const { error } = await _supabase.from('question_reports').update({ status }).eq('id', reportId);
    if (error) { alert(error.message); return; }
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
  };

  const deleteReport = async (reportId) => {
    if (!confirm('Delete this report?')) return;
    const { error } = await _supabase.from('question_reports').delete().eq('id', reportId);
    if (error) { alert(error.message); return; }
    setReports(prev => prev.filter(r => r.id !== reportId));
  };

  if (!isAdmin) return null;
  if (loading) return <div className="flex items-center justify-center py-24"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  if (error) return <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-500/10 p-6 text-rose-700 dark:text-rose-300">Error: {error}</div>;

  const qMap = {};
  questions.forEach(q => qMap[q.id] = q);
  const openCount = reports.filter(r => r.status === 'open').length;

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
        <div>
          <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Question Issue Reports</h2>
          <p className="text-xs text-slate-400 dark:text-slate-500">{reports.length} total · <span className="text-rose-600 dark:text-rose-400 font-semibold">{openCount} open</span></p>
        </div>
        {openCount > 0 && (
          <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold">{openCount} need review</span>
        )}
      </div>
      {reports.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-semibold text-slate-700 dark:text-slate-300">No issue reports</p>
          <p className="text-sm text-slate-400 mt-1">Reports submitted by users will appear here.</p>
        </div>
      ) : (
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {reports.map(r => {
            const q = qMap[r.question_id] || { id: r.question_id, title: 'Question #' + r.question_id };
            const statusColor = r.status === 'open' ? 'text-rose-600 dark:text-rose-400' : r.status === 'resolved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400';
            return (
              <div key={r.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className={`text-xs font-bold uppercase tracking-wider ${statusColor}`}>{r.status || 'open'}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">·</span>
                      <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{r.issue_type}</span>
                      <span className="text-xs text-slate-400 dark:text-slate-500">{new Date(r.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">{q.title || 'Question #' + r.question_id}</p>
                    {q.topic && <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{q.topic} · {q.difficulty}</p>}
                    {r.details && (
                      <div className="mt-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{r.details}</p>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <select value={r.status || 'open'} onChange={e=>updateStatus(r.id, e.target.value)}
                      className="px-2 py-1.5 rounded-lg text-xs font-semibold border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
                      <option value="open">open</option>
                      <option value="reviewing">reviewing</option>
                      <option value="resolved">resolved</option>
                      <option value="dismissed">dismissed</option>
                    </select>
                    <button onClick={()=>deleteReport(r.id)}
                      className="px-2 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-500/10">
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AdminBugReports({ authUser }) {
  const [reports, setReports] = useState([]);
  const [questionReports, setQuestionReports] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');

  useEffect(() => {
    if (!isAdmin) return;
    setLoading(true);
    Promise.all([
      _supabase.from('bug_reports').select('*').order('created_at', { ascending: false }).limit(500),
      _supabase.from('question_reports').select('*').order('created_at', { ascending: false }).limit(500),
      _supabase.from('public_questions').select('id,title,topic,difficulty').limit(5000),
    ]).then(([b, r, q]) => {
      if (b.error || r.error || q.error) setError(b.error?.message || r.error?.message || q.error?.message);
      setReports(b.data || []);
      setQuestionReports(r.data || []);
      setQuestions(q.data || []);
      setLoading(false);
    });
  }, [isAdmin]);

  const updateBugStatus = async (reportId, status) => {
    const { error } = await _supabase.from('bug_reports').update({ status }).eq('id', reportId);
    if (error) { alert(error.message); return; }
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
  };

  const deleteBugReport = async (reportId) => {
    if (!confirm('Delete this report?')) return;
    const { error } = await _supabase.from('bug_reports').delete().eq('id', reportId);
    if (error) { alert(error.message); return; }
    setReports(prev => prev.filter(r => r.id !== reportId));
  };

  const updateQuestionReportStatus = async (reportId, status) => {
    const { error } = await _supabase.from('question_reports').update({ status }).eq('id', reportId);
    if (error) { alert(error.message); return; }
    setQuestionReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
  };

  const deleteQuestionReport = async (reportId) => {
    if (!confirm('Delete this report?')) return;
    const { error } = await _supabase.from('question_reports').delete().eq('id', reportId);
    if (error) { alert(error.message); return; }
    setQuestionReports(prev => prev.filter(r => r.id !== reportId));
  };

  if (!isAdmin) return null;
  if (loading) return <div className="flex items-center justify-center py-24"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  if (error) return <div className="rounded-2xl border border-rose-200 dark:border-rose-800 bg-rose-50 dark:bg-rose-500/10 p-6 text-rose-700 dark:text-rose-300">Error: {error}</div>;

  const openCount = reports.filter(r => r.status === 'open').length;
  const qrOpenCount = questionReports.filter(r => r.status === 'open').length;
  const qMap = {};
  questions.forEach(q => qMap[q.id] = q);

  const StatusSelect = ({ value, onChange }) => (
    <select value={value || 'open'} onChange={onChange}
      className="px-2 py-1.5 rounded-lg text-xs font-semibold border bg-white border-slate-200 text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200">
      <option value="open">open</option>
      <option value="reviewing">reviewing</option>
      <option value="resolved">resolved</option>
      <option value="dismissed">dismissed</option>
    </select>
  );

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Bug Reports</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">{reports.length} total · <span className="text-rose-600 dark:text-rose-400 font-semibold">{openCount} open</span></p>
          </div>
          {openCount > 0 && (
            <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold">{openCount} need review</span>
          )}
        </div>
        {reports.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-semibold text-slate-700 dark:text-slate-300">No bug reports</p>
            <p className="text-sm text-slate-400 mt-1">Reports submitted from the profile menu will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {reports.map(r => {
              const statusColor = r.status === 'open' ? 'text-rose-600 dark:text-rose-400' : r.status === 'resolved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400';
              return (
                <div key={r.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider ${statusColor}`}>{r.status || 'open'}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{new Date(r.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">{r.subject}</p>
                      <div className="mt-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{r.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusSelect value={r.status} onChange={e=>updateBugStatus(r.id, e.target.value)} />
                      <button onClick={()=>deleteBugReport(r.id)}
                        className="px-2 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-500/10">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
        <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3">
          <div>
            <h2 className="font-bold text-lg text-slate-800 dark:text-slate-100">Question Issue Reports</h2>
            <p className="text-xs text-slate-400 dark:text-slate-500">{questionReports.length} total · <span className="text-rose-600 dark:text-rose-400 font-semibold">{qrOpenCount} open</span></p>
          </div>
          {qrOpenCount > 0 && (
            <span className="px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/20 text-rose-700 dark:text-rose-300 text-xs font-bold">{qrOpenCount} need review</span>
          )}
        </div>
        {questionReports.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-semibold text-slate-700 dark:text-slate-300">No issue reports</p>
            <p className="text-sm text-slate-400 mt-1">Reports submitted by users will appear here.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {questionReports.map(r => {
              const q = qMap[r.question_id] || { id: r.question_id, title: 'Question #' + r.question_id };
              const statusColor = r.status === 'open' ? 'text-rose-600 dark:text-rose-400' : r.status === 'resolved' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400';
              return (
                <div key={r.id} className="px-5 py-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className={`text-xs font-bold uppercase tracking-wider ${statusColor}`}>{r.status || 'open'}</span>
                        <span className="text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{r.issue_type}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{new Date(r.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-1">{q.title || 'Question #' + r.question_id}</p>
                      {q.topic && <p className="text-xs text-slate-400 dark:text-slate-500 mb-2">{q.topic} · {q.difficulty}</p>}
                      {r.details && (
                        <div className="mt-2 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                          <p className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{r.details}</p>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <StatusSelect value={r.status} onChange={e=>updateQuestionReportStatus(r.id, e.target.value)} />
                      <button onClick={()=>deleteQuestionReport(r.id)}
                        className="px-2 py-1.5 rounded-lg text-xs font-semibold border border-rose-200 text-rose-600 hover:bg-rose-50 dark:border-rose-800 dark:text-rose-300 dark:hover:bg-rose-500/10">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// Downscale an image to a sane max dimension before upload. Question diagrams only ever
// display at a few hundred px wide in the UI, so admin-uploaded screenshots/photos (which
// can easily be several thousand px and multiple MB) get shrunk client-side, never upscaled.
// GIFs are passed through untouched — canvas would flatten an animated GIF to one frame.
async function resizeImageForUpload(file, { maxDim = MAX_IMAGE_DIMENSION, jpegQuality = 0.85 } = {}) {
  if (file.type === 'image/gif') return file;

  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch (e) {
    return file; // unreadable as an image — let the normal upload/validation handle it
  }

  const scale = Math.min(1, maxDim / Math.max(bitmap.width, bitmap.height));
  const width = Math.round(bitmap.width * scale);
  const height = Math.round(bitmap.height * scale);

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  canvas.getContext('2d').drawImage(bitmap, 0, 0, width, height);

  // PNG stays PNG (crisp lines + transparency for diagrams); everything else re-encodes
  // as JPEG at a controlled quality to keep file size down.
  const outputType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
  const blob = await new Promise(resolve =>
    canvas.toBlob(resolve, outputType, outputType === 'image/jpeg' ? jpegQuality : undefined)
  );
  if (!blob) return file;

  const ext = outputType === 'image/png' ? 'png' : 'jpg';
  const newName = file.name.replace(/\.[^.]+$/, '') + `-resized.${ext}`;
  return new File([blob], newName, { type: outputType });
}

// Uploads via a raw fetch with a freshly-read access token instead of going through
// _supabase.storage -- the SDK's storage sub-client is created lazily on first access and
// can bake in whatever Authorization header existed at that moment (e.g. anon-only, if
// anything touches .storage before the session finishes loading from localStorage on page
// load), and never re-reads the session again afterward. Reading the token directly here
// every call sidesteps that entirely instead of trusting the cached client.
async function uploadWithSessionRetry(bucket, path, file, options) {
  const { data: { session } } = await _supabase.auth.getSession();
  if (!session) return { error: { message: 'Not signed in.' } };
  const headers = {
    apikey: SUPABASE_ANON_KEY,
    Authorization: `Bearer ${session.access_token}`,
    'Content-Type': options?.contentType || file.type || 'application/octet-stream',
  };
  if (options?.upsert) headers['x-upsert'] = 'true';
  const res = await fetch(`${SUPABASE_URL}/storage/v1/object/${bucket}/${path}`, {
    method: 'POST',
    headers,
    body: file,
  });
  if (res.ok) return { error: null };
  const body = await res.json().catch(() => ({}));
  return { error: { message: body.message || body.error || `Upload failed (${res.status})` } };
}

// Avatars are always a small square photo, never need transparency or crisp vector lines,
// so unlike resizeImageForUpload above this always crops to a centered square and re-encodes
// as JPEG -- gives a small, predictable file size regardless of the source image's shape.
async function cropAndResizeAvatar(file, maxDim = MAX_AVATAR_DIMENSION) {
  let bitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch (e) {
    return file; // unreadable as an image — let the normal upload/validation handle it
  }

  const side = Math.min(bitmap.width, bitmap.height);
  const sx = (bitmap.width - side) / 2;
  const sy = (bitmap.height - side) / 2;
  const outSide = Math.min(side, maxDim);

  const canvas = document.createElement('canvas');
  canvas.width = outSide;
  canvas.height = outSide;
  canvas.getContext('2d').drawImage(bitmap, sx, sy, side, side, 0, 0, outSide, outSide);

  const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.85));
  if (!blob) return file;
  return new File([blob], 'avatar.jpg', { type: 'image/jpeg' });
}

// supabase-js's FunctionsHttpError.message is always the hardcoded string
// "Edge Function returned a non-2xx status code" -- it never contains the
// function's actual error text, regardless of what the function returned.
// The real body lives on error.context (the raw Response), which has to be
// read and parsed separately to get anything useful to show or branch on.
async function edgeFunctionErrorMessage(error) {
  if (error?.context && typeof error.context.json === 'function') {
    try {
      const body = await error.context.clone().json();
      if (body?.error) return body.error;
    } catch (e) {}
  }
  return error?.message || String(error);
}

// ── Review Imports: load a locally-extracted draft JSON (questions pulled from a
// PDF by Claude in a separate session), preview each with real LaTeX, edit/approve/
// reject per question, then publish only the approved ones in one batched write.
// Nothing here ever touches Supabase until "Publish Approved" is clicked.
function ReviewImportsPanel({ authUser, onBatchReviewed }) {
  const [draftRows, setDraftRows] = useState([]);
  const [parseError, setParseError] = useState('');
  const [imageMap, setImageMap] = useState({}); // filename -> { file, url }
  const [publishing, setPublishing] = useState(false);
  const [publishMessage, setPublishMessage] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [verifyMessage, setVerifyMessage] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfOriginalTest, setPdfOriginalTest] = useState('');
  const [pdfAnswerKey, setPdfAnswerKey] = useState('');
  const [answerKeyExtracting, setAnswerKeyExtracting] = useState(false);
  const [answerKeyExtractMsg, setAnswerKeyExtractMsg] = useState('');
  const [pdfImporting, setPdfImporting] = useState(false);
  const [pdfImportMessage, setPdfImportMessage] = useState('');
  // Set once step 1 (transcription) finishes -- non-null means there's a
  // batch sitting in 'transcribed' status waiting for "Generate Answers".
  const [pdfTranscribedBatchId, setPdfTranscribedBatchId] = useState(null);
  const pdfPollRef = useRef(null);

  // Mirrors localStorage so a reload can find an in-progress batch again --
  // null once a batch reaches a terminal state (completed/needs_attention/
  // failed/cancelled), set any time one is actively transcribing/solving or
  // sitting in 'transcribed' waiting for "Generate Answers".
  const ACTIVE_BATCH_KEY = 'active_import_batch_id';
  const [activeBatchId, setActiveBatchIdState] = useState(null);
  const setActiveBatchId = (id) => {
    setActiveBatchIdState(id);
    try {
      if (id) localStorage.setItem(ACTIVE_BATCH_KEY, id);
      else localStorage.removeItem(ACTIVE_BATCH_KEY);
    } catch (e) {}
  };
  // Populated only by the on-mount resume check below -- drives the
  // "Resume active import" banner. Distinct from activeBatchId so a fresh
  // import the admin just started in this same load doesn't also show a
  // redundant "resume" banner on top of its own inline progress message.
  const [resumeBannerInfo, setResumeBannerInfo] = useState(null);

  useEffect(() => () => clearTimeout(pdfPollRef.current), []);

  // Async solving (background concurrency + one-at-a-time needs_image calls)
  // lands draft rows in whatever order they finish, not test order -- this
  // keeps the review cards sorted to match the actual printed test instead.
  const byOriginalQuestionNumber = (a, b) =>
    (Number(a.original_question_number) || 0) - (Number(b.original_question_number) || 0);

  const blankDraftRow = () => ({
    title: '', topic: 'Algebra 1 & 2', difficulty: 'Easy', source: '',
    question: '', choices: ['(A) ', '(B) ', '(C) ', '(D) ', '(E) '],
    answer: '', explanation: '', tags: [],
    original_test: '', original_question_number: '', source_reference: '',
    image_pending_filename: '', image_alt: '',
  });

  const loadDraftFile = (file) => {
    if (!file) return;
    setParseError('');
    setPublishMessage('');
    const reader = new FileReader();
    reader.onload = () => {
      let parsed;
      try {
        parsed = JSON.parse(reader.result);
      } catch (e) {
        setParseError('Could not parse that file as JSON: ' + e.message);
        return;
      }
      if (!Array.isArray(parsed)) {
        setParseError('Draft file must be a JSON array of question objects.');
        return;
      }
      setDraftRows(parsed.map(q => ({
        ...blankDraftRow(),
        ...q,
        choices: Array.isArray(q.choices) && q.choices.length ? q.choices : blankDraftRow().choices,
        tags: Array.isArray(q.tags) ? q.tags : (typeof q.tags === 'string' ? q.tags.split(',').map(t=>t.trim()).filter(Boolean) : []),
        _key: crypto.randomUUID(),
        _status: 'pending', // 'pending' | 'approved' | 'rejected' | 'published'
        _publishError: '',
      })).sort(byOriginalQuestionNumber));
    };
    reader.readAsText(file);
  };

  const loadImageFiles = (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;
    setImageMap(prev => {
      const next = { ...prev };
      files.forEach(file => {
        if (next[file.name]) URL.revokeObjectURL(next[file.name].url);
        next[file.name] = { file, url: URL.createObjectURL(file) };
      });
      return next;
    });
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result.split(',')[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

  const VERIFY_BATCH_SIZE = 60; // matches verify-draft-questions' MAX_QUESTIONS_PER_CALL

  // Spends a small, bounded amount of API credit re-solving each manually-extracted
  // question once (no thinking-retry loop) and comparing against the answer already
  // in the row -- the cheap alternative to running these through the full
  // transcribe+solve PDF pipeline. Writes verification_status/verification_notes onto
  // draftRows, which the existing match/mismatch badges already know how to render.
  const verifyDraftRows = async () => {
    const candidates = draftRows.filter(r => r._status !== 'published' && r.question.trim() && r.answer.trim());
    if (!candidates.length) { setVerifyMessage('Nothing to verify -- load questions with a question and answer first.'); return; }

    setVerifying(true);
    setVerifyMessage('Verifying…');
    try {
      const payloadByKey = {};
      for (const r of candidates) {
        const entry = { key: r._key, question: r.question, choices: r.choices.filter(Boolean), answer: r.answer };
        const matchedImage = r.image_pending_filename ? imageMap[r.image_pending_filename] : null;
        if (matchedImage) {
          entry.image_base64 = await fileToBase64(matchedImage.file);
          entry.image_media_type = matchedImage.file.type;
        }
        payloadByKey[r._key] = entry;
      }
      const allEntries = Object.values(payloadByKey);

      const allResults = [];
      for (let i = 0; i < allEntries.length; i += VERIFY_BATCH_SIZE) {
        const chunk = allEntries.slice(i, i + VERIFY_BATCH_SIZE);
        const { data, error } = await _supabase.functions.invoke('verify-draft-questions', { body: { questions: chunk } });
        if (error) throw new Error(await edgeFunctionErrorMessage(error));
        if (data?.error) throw new Error(data.error);
        allResults.push(...(data.results || []));
      }

      const resultByKey = {};
      allResults.forEach(r => { resultByKey[r.key] = r; });
      setDraftRows(prev => prev.map(r => {
        const res = resultByKey[r._key];
        if (!res) return r;
        return { ...r, verification_status: res.verification_status, verification_notes: res.verification_notes };
      }));

      const matchCount = allResults.filter(r => r.verification_status === 'match').length;
      const mismatchCount = allResults.filter(r => r.verification_status === 'mismatch').length;
      const unverifiedCount = allResults.filter(r => r.verification_status === 'unverified').length;
      setVerifyMessage(`Verified ${allResults.length} question(s): ${matchCount} match, ${mismatchCount} mismatch, ${unverifiedCount} unverified.`);
    } catch (e) {
      setVerifyMessage('Verification failed: ' + (e.message || String(e)));
    } finally {
      setVerifying(false);
    }
  };

  // Maps a draft_questions table row (from the PDF import pipeline) into the same
  // shape blankDraftRow()-derived rows use, so the rest of the panel (editing,
  // approve/reject, live preview, publish) doesn't need to know where a row came from.
  const draftQuestionRowToLocal = (row) => ({
    ...blankDraftRow(),
    title: row.title || '',
    topic: row.topic,
    difficulty: row.difficulty,
    source: row.source || '',
    question: row.question,
    choices: Array.isArray(row.choices) && row.choices.length ? row.choices : blankDraftRow().choices,
    answer: row.answer || '',
    explanation: row.explanation || '',
    tags: Array.isArray(row.tags) ? row.tags : [],
    original_test: row.original_test || '',
    original_question_number: row.original_question_number != null ? String(row.original_question_number) : '',
    source_reference: row.source_reference || '',
    image_alt: row.image_alt || '',
    needs_image: !!row.needs_image,
    verification_status: row.verification_status || null,
    verification_notes: row.verification_notes || null,
    _key: row.id,
    _draftId: row.id,
    _status: ['approved', 'rejected', 'published'].includes(row.review_status) ? row.review_status : 'pending',
    _publishError: '',
  });

  // Both steps now process one expensive unit of work (one PDF page, or one
  // needs_image question) per call, synchronously, and report progress back
  // immediately -- no more background EdgeRuntime.waitUntil + DB polling for
  // the rate-limited parts. The Anthropic account's 30,000-input-tokens/
  // minute limit means even one page/image-question at a time has to be
  // paced, so the browser re-invokes the same function after a safe delay
  // until the response says there's nothing left to do.
  const PACED_CALL_DELAY_MS = 65000;

  const continueTranscription = async (batchId) => {
    try {
      const { data, error } = await _supabase.functions.invoke('import-test-pdf', { body: { batch_id: batchId } });
      if (error) throw new Error(await edgeFunctionErrorMessage(error));
      if (data?.error) throw new Error(data.error);

      if (data.status === 'transcribed') {
        setPdfImporting(false);
        setPdfTranscribedBatchId(batchId);
        setActiveBatchId(batchId); // still active -- waiting on "Generate Answers", not done yet
        setPdfImportMessage(
          `Transcribed ${data.questions_so_far ?? '?'} question(s) into JSON.` +
          (data.answer_key_found ? ' Answer key detected in the PDF — answers will be checked against it.' : '') +
          (data.error_message ? ' Note: ' + data.error_message : '') +
          ' Click "Generate Answers" below to solve them.'
        );
        return;
      }
      if (data.status === 'failed') {
        setPdfImporting(false);
        setActiveBatchId(null);
        setPdfImportMessage('Failed: ' + (data.error_message || 'Unknown error.'));
        return;
      }

      setPdfImportMessage(
        `Transcribed page ${data.next_page_index} of ${data.pages_total} ` +
        `(${data.questions_so_far ?? 0} question(s) so far)… next page in ~${PACED_CALL_DELAY_MS / 1000}s.`
      );
      pdfPollRef.current = setTimeout(() => continueTranscription(batchId), PACED_CALL_DELAY_MS);
    } catch (e) {
      const message = e.message || String(e);
      // Don't trust the error message alone -- a concurrent cron tick can
      // advance (or even finish) this batch between this call firing and
      // its response landing, so re-check the batch's actual status and
      // branch on ground truth instead of guessing from error text. This
      // catches every "not really a failure" case in one place, not just
      // the one lease-conflict string this used to special-case.
      const { data: fresh } = await _supabase.from('import_batches').select('*').eq('id', batchId).single();
      if (fresh) {
        if (fresh.status === 'transcribed') {
          setPdfImporting(false);
          setPdfTranscribedBatchId(batchId);
          setActiveBatchId(batchId);
          setPdfImportMessage(`Transcription already finished (${(fresh.boundaries_json || []).length} question(s)) — click "Generate Answers" below to solve them.`);
          return;
        }
        if (fresh.status === 'processing') {
          setPdfImportMessage('Background queue is working on this batch right now… checking again shortly.');
          pdfPollRef.current = setTimeout(() => continueTranscription(batchId), PACED_CALL_DELAY_MS);
          return;
        }
        if (fresh.status === 'completed' || fresh.status === 'needs_attention') {
          const { data: drafts } = await _supabase.from('draft_questions').select('*').eq('batch_id', batchId);
          setDraftRows((drafts || []).map(draftQuestionRowToLocal).sort(byOriginalQuestionNumber));
          setPdfImporting(false);
          setActiveBatchId(null);
          setResumeBannerInfo(null);
          setPdfImportMessage(`This batch already finished (${drafts ? drafts.length : 0} question(s) solved) — loaded for review.`);
          return;
        }
        if (fresh.status === 'failed' || fresh.status === 'cancelled') {
          setPdfImporting(false);
          setActiveBatchId(null);
          setPdfImportMessage('Transcription failed: ' + (fresh.error_message || message));
          return;
        }
      }
      setPdfImporting(false);
      setPdfImportMessage('Transcription failed: ' + message);
    }
  };

  // Uploading the answer key as its own file (instead of relying on Claude to
  // spot it buried in the test PDF, or retyping it by hand) gives a cleaner,
  // dedicated OCR pass on just that page -- more reliable than detection
  // mid-batch. Just fills the existing answer-key textarea below so the
  // admin can still review/fix it before transcribing; the manual-key-wins
  // priority in import-test-pdf is unaffected either way.
  const extractAnswerKeyFile = async (file) => {
    if (!file) return;
    if (file.type !== 'application/pdf' && !file.type.startsWith('image/')) {
      setAnswerKeyExtractMsg('Please choose a PDF or image file.');
      return;
    }
    setAnswerKeyExtracting(true);
    setAnswerKeyExtractMsg('Reading answer key…');
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(file);
      });
      const file_base64 = dataUrl.split(',')[1];
      const { data, error } = await _supabase.functions.invoke('extract-answer-key', {
        body: { file_base64, media_type: file.type },
      });
      if (error) throw new Error(await edgeFunctionErrorMessage(error));
      if (data?.error) throw new Error(data.error);
      setPdfAnswerKey(data.answer_key_text || '');
      setAnswerKeyExtractMsg('Answer key extracted — review it below before transcribing.');
    } catch (e) {
      setAnswerKeyExtractMsg('Could not read answer key: ' + (e.message || String(e)));
    } finally {
      setAnswerKeyExtracting(false);
    }
  };

  const extractFromPdf = async () => {
    if (!pdfFile) { setPdfImportMessage('Pick a PDF file first.'); return; }
    if (pdfFile.type !== 'application/pdf') { setPdfImportMessage('That file is not a PDF.'); return; }
    if (pdfFile.size > 15 * 1024 * 1024) { setPdfImportMessage('PDF is over 15 MB — split it into smaller page ranges first.'); return; }

    clearTimeout(pdfPollRef.current);
    setPdfTranscribedBatchId(null);
    setSelectedReviewBatchId(null);
    setPdfImporting(true);
    setPdfImportMessage('Uploading PDF and transcribing page 1…');
    // Self-heal any batch abandoned mid-run (e.g. the admin closed this tab
    // partway through) -- otherwise it would sit in 'processing' forever and
    // permanently block the "one active import at a time" guardrail below.
    // Capped at 8s so a slow/hung reap call can never silently freeze the
    // whole import flow -- if it times out, the actual upload below still
    // proceeds, and the real guardrail error (if any) will surface normally.
    await Promise.race([
      Promise.resolve(_supabase.rpc('reap_stale_import_batches')).catch(() => {}),
      new Promise(resolve => setTimeout(resolve, 8000)),
    ]);
    try {
      const dataUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(pdfFile);
      });
      const pdf_base64 = dataUrl.split(',')[1];
      const { data, error } = await _supabase.functions.invoke('import-test-pdf', {
        body: {
          pdf_base64,
          source_label: pdfOriginalTest || null,
          original_test: pdfOriginalTest || null,
          answer_key: pdfAnswerKey || null,
        },
      });
      if (error) throw new Error(await edgeFunctionErrorMessage(error));
      if (data?.error) throw new Error(data.error);

      // Set as soon as a batch exists, regardless of how far this first call
      // got -- this is what lets a reload find and resume it.
      setActiveBatchId(data.batch_id);

      if (data.status === 'transcribed') {
        setPdfImporting(false);
        setPdfTranscribedBatchId(data.batch_id);
        setPdfImportMessage(
          `Transcribed ${data.questions_so_far ?? '?'} question(s) into JSON.` +
          (data.answer_key_found ? ' Answer key detected in the PDF — answers will be checked against it.' : '') +
          ' Click "Generate Answers" below to solve them.'
        );
        return;
      }
      if (data.status === 'failed') {
        setPdfImporting(false);
        setActiveBatchId(null);
        setPdfImportMessage('Failed: ' + (data.error_message || 'Unknown error.'));
        return;
      }
      setPdfImportMessage(
        `Transcribed page ${data.next_page_index} of ${data.pages_total}… next page in ~${PACED_CALL_DELAY_MS / 1000}s.`
      );
      pdfPollRef.current = setTimeout(() => continueTranscription(data.batch_id), PACED_CALL_DELAY_MS);
    } catch (e) {
      setPdfImporting(false);
      setPdfImportMessage('Transcription failed: ' + (e.message || String(e)));
    }
  };

  // Merges any draft_questions rows that have landed since the last check --
  // both the cheap text-only background batch and the one-at-a-time
  // needs_image calls insert rows independently, so this is how new ones
  // show up live instead of waiting for the whole batch to finish.
  const mergeNewDraftRows = async (batchId) => {
    const { data: drafts } = await _supabase.from('draft_questions').select('*').eq('batch_id', batchId);
    if (!drafts) return;
    setDraftRows(prev => {
      const known = new Set(prev.map(r => r._draftId).filter(Boolean));
      const fresh = drafts.filter(r => !known.has(r.id)).map(draftQuestionRowToLocal);
      return fresh.length ? [...prev, ...fresh].sort(byOriginalQuestionNumber) : prev;
    });
  };

  // Step 2: takes the JSON already saved on the batch row (by step 1) and
  // solves every question from it -- no PDF re-upload needed. Text-only
  // questions finish in the background within a call or two; needs_image
  // questions are paced one per call like transcription.
  const continueSolving = async (batchId) => {
    try {
      const { data, error } = await _supabase.functions.invoke('solve-pdf-questions', { body: { batch_id: batchId } });
      if (error) throw new Error(await edgeFunctionErrorMessage(error));
      if (data?.error) throw new Error(data.error);

      await mergeNewDraftRows(batchId);

      if (data.status === 'completed' || data.status === 'needs_attention') {
        setPdfImporting(false);
        setActiveBatchId(null); // terminal -- nothing left to auto-resume, drafts are loaded for review
        setResumeBannerInfo(null);
        setPdfImportMessage(
          `Solved ${data.questions_solved ?? '?'} question(s)` +
          (data.status === 'needs_attention' ? ' — some need review (answer mismatch, duplicate, or a solve failure), check the badges below.' : ' — all answers matched the key.')
        );
        return;
      }
      if (data.status === 'failed') {
        setPdfImporting(false);
        setActiveBatchId(null);
        setResumeBannerInfo(null);
        setPdfImportMessage('Failed: ' + (data.error_message || 'Unknown error.'));
        return;
      }

      // No rate-limit risk left to wait out if there's no needs_image work
      // pending -- just poll quickly until the background text-only batch finishes.
      const delay = data.needs_image_remaining > 0 ? PACED_CALL_DELAY_MS : 4000;
      setPdfImportMessage(
        data.needs_image_remaining > 0
          ? `Solved ${data.questions_solved ?? 0} question(s) so far (${data.needs_image_total - data.needs_image_remaining} of ${data.needs_image_total} image question(s) done)… next one in ~${delay / 1000}s.`
          : `Solved ${data.questions_solved ?? 0} question(s) so far… finishing up.`
      );
      pdfPollRef.current = setTimeout(() => continueSolving(batchId), delay);
    } catch (e) {
      const message = e.message || String(e);
      // Same reasoning as continueTranscription's catch block -- re-check
      // ground truth instead of guessing from error text, since a
      // concurrent cron tick can finish solving this batch between this
      // call firing and its response landing.
      const { data: fresh } = await _supabase.from('import_batches').select('*').eq('id', batchId).single();
      if (fresh) {
        if (fresh.status === 'completed' || fresh.status === 'needs_attention') {
          await mergeNewDraftRows(batchId);
          setPdfImporting(false);
          setActiveBatchId(null);
          setResumeBannerInfo(null);
          setPdfImportMessage(
            'Solving already finished' +
            (fresh.status === 'needs_attention' ? ' — some need review (answer mismatch, duplicate, or a solve failure), check the badges below.' : ' — all answers matched the key.')
          );
          return;
        }
        if (fresh.status === 'processing' || fresh.status === 'transcribed') {
          setPdfImportMessage('Background queue is working on this batch right now… checking again shortly.');
          pdfPollRef.current = setTimeout(() => continueSolving(batchId), PACED_CALL_DELAY_MS);
          return;
        }
        if (fresh.status === 'failed' || fresh.status === 'cancelled') {
          setPdfImporting(false);
          setActiveBatchId(null);
          setResumeBannerInfo(null);
          setPdfImportMessage('Failed to generate answers: ' + (fresh.error_message || message));
          return;
        }
      }
      setPdfImporting(false);
      setPdfImportMessage('Failed to generate answers: ' + message);
    }
  };

  const generateAnswers = () => {
    const batchId = pdfTranscribedBatchId;
    if (!batchId) return;
    clearTimeout(pdfPollRef.current);
    setPdfTranscribedBatchId(null);
    setResumeBannerInfo(null);
    setPdfImporting(true);
    setPdfImportMessage('Solving text-only questions and the first image question…');
    continueSolving(batchId);
  };

  // On mount: if a batch was left active by a previous load (tab reload,
  // crash, accidental close), find it and pick back up exactly where the
  // database says it left off -- never from page 1 / question 1, and never
  // re-calling Claude for anything already in boundaries_json or already
  // a draft_questions row, since both continuation functions already key
  // off DB state (next_page_index / which original_question_numbers exist)
  // rather than anything the browser remembers locally.
  useEffect(() => {
    let stale = false;
    const resume = async () => {
      let batchId;
      try { batchId = localStorage.getItem(ACTIVE_BATCH_KEY); } catch (e) { return; }
      if (!batchId) return;

      // Self-heal first -- if this batch went quiet for 6+ minutes (laptop
      // closed, tab killed) it gets marked 'failed' here instead of being
      // resumed as if it were still healthy. Capped so a slow reap call
      // can't block the rest of the panel from loading.
      await Promise.race([
        Promise.resolve(_supabase.rpc('reap_stale_import_batches')).catch(() => {}),
        new Promise(resolve => setTimeout(resolve, 8000)),
      ]);
      if (stale) return;

      const { data: batch } = await _supabase.from('import_batches').select('*').eq('id', batchId).single();
      if (stale) return;
      if (!batch || ['failed', 'cancelled'].includes(batch.status)) {
        setActiveBatchId(null);
        return;
      }

      const { data: drafts } = await _supabase.from('draft_questions').select('*').eq('batch_id', batchId);
      if (stale) return;
      if (drafts && drafts.length) {
        setDraftRows(drafts.map(draftQuestionRowToLocal).sort(byOriginalQuestionNumber));
      }
      const testName = batch.original_test || batch.source_label || '';
      setPdfOriginalTest(testName);
      setPdfAnswerKey(batch.answer_key || '');
      setActiveBatchIdState(batchId); // already in localStorage; just sync React state

      if (batch.status === 'transcribed') {
        setPdfTranscribedBatchId(batchId);
        setResumeBannerInfo({ batchId, testName, stage: 'Ready to solve' });
        setPdfImportMessage(`Resumed: transcription finished (${(batch.boundaries_json || []).length} question(s)). Click "Generate Answers" to continue.`);
      } else if (batch.status === 'processing') {
        const stillTranscribing = (batch.pages_total ?? 0) > 0 && (batch.next_page_index ?? 0) < (batch.pages_total ?? 0);
        setPdfImporting(true);
        if (stillTranscribing) {
          setResumeBannerInfo({ batchId, testName, stage: `Resuming transcription (page ${(batch.next_page_index ?? 0) + 1} of ${batch.pages_total})` });
          setPdfImportMessage(`Resuming transcription from page ${(batch.next_page_index ?? 0) + 1} of ${batch.pages_total}…`);
          continueTranscription(batchId);
        } else {
          setResumeBannerInfo({ batchId, testName, stage: 'Resuming solving' });
          setPdfImportMessage('Resuming solving…');
          continueSolving(batchId);
        }
      } else if (batch.status === 'completed' || batch.status === 'needs_attention') {
        // Nothing left to auto-resume -- just surface what's already staged.
        setActiveBatchId(null);
        setPdfImportMessage(`Loaded ${drafts ? drafts.length : 0} previously-solved question(s) for review.`);
      }
    };
    resume();
    return () => { stale = true; };
  }, []);

  // Batches the background queue finished that nobody has actually opened
  // yet -- distinct from the single localStorage-tracked "active" batch
  // above, since those handle only the admin's own in-flight import. This
  // is what the Review Imports tab's notification badge actually points
  // to: every other finished batch only ever existed as a DB row with no
  // way to browse into it from here.
  const [pastBatches, setPastBatches] = useState([]);
  const refreshPastBatches = () => {
    _supabase
      .from('import_batches')
      .select('id, source_label, original_test, status, started_at, questions_extracted')
      .in('status', ['completed', 'needs_attention'])
      .is('notified_at', null)
      .order('started_at', { ascending: false })
      .then(({ data }) => setPastBatches(data || []));
  };
  useEffect(() => { refreshPastBatches(); }, []);

  // Loads one finished batch's questions into the review grid below, marks
  // just that batch notified (never the whole list at once), and tells the
  // parent dashboard to refresh its badge count immediately rather than
  // waiting for its own 30s poll.
  // Tracks which list entry is currently loaded below, so it can stay
  // visible in its list (instead of vanishing the moment it's clicked) with
  // a highlight showing which one is on screen right now.
  const [selectedReviewBatchId, setSelectedReviewBatchId] = useState(null);

  const loadBatchForReview = async (batchId) => {
    const { data: batch } = await _supabase.from('import_batches').select('*').eq('id', batchId).single();
    if (!batch) return;
    const { data: drafts } = await _supabase.from('draft_questions').select('*').eq('batch_id', batchId);
    setDraftRows((drafts || []).map(draftQuestionRowToLocal).sort(byOriginalQuestionNumber));
    setPdfOriginalTest(batch.original_test || batch.source_label || '');
    setPdfAnswerKey(batch.answer_key || '');
    setActiveBatchId(null);
    setResumeBannerInfo(null);
    setPdfImportMessage(`Loaded ${drafts ? drafts.length : 0} question(s) from "${batch.source_label || batch.original_test || batchId}" for review.`);
    setSelectedReviewBatchId(batchId);
    await _supabase.from('import_batches').update({ notified_at: new Date().toISOString() }).eq('id', batchId);
    if (onBatchReviewed) onBatchReviewed();
  };

  // Permanently removes a batch and its draft_questions (cascades via FK) --
  // for duplicate/unwanted imports cluttering this list. Never touches the
  // published questions table, regardless of batch status.
  const deleteBatch = async (batchId, label) => {
    if (!confirm(`Permanently delete "${label}" and all its draft questions? This cannot be undone.`)) return;
    await _supabase.from('import_batches').delete().eq('id', batchId);
    setPastBatches(prev => prev.filter(b => b.id !== batchId));
    setAllBatches(prev => prev.filter(b => b.id !== batchId));
    if (selectedReviewBatchId === batchId) setSelectedReviewBatchId(null);
    if (onBatchReviewed) onBatchReviewed();
  };

  // Full history, regardless of notified_at -- a fallback for finding any
  // batch whose "needs review" flag got cleared without ever actually being
  // opened (e.g. a past bug that marked everything notified on tab-click).
  // Collapsed by default since pastBatches above already covers the normal
  // case; this is for digging up something that fell through that signal.
  const [allBatches, setAllBatches] = useState([]);
  const [showAllBatches, setShowAllBatches] = useState(false);
  const toggleAllBatches = () => {
    if (!showAllBatches && allBatches.length === 0) {
      _supabase
        .from('import_batches')
        .select('id, source_label, original_test, status, started_at, questions_extracted, source_pdf_path')
        .in('status', ['completed', 'needs_attention'])
        .order('started_at', { ascending: false })
        .then(({ data }) => setAllBatches(data || []));
    }
    setShowAllBatches(s => !s);
  };

  // Cancel marks the batch 'cancelled' (never deletes draft_questions) and
  // stops the local poll loop -- anything already solved stays staged for
  // review exactly as if the batch had completed normally.
  const cancelActiveImport = async () => {
    const batchId = activeBatchId;
    if (!batchId) return;
    clearTimeout(pdfPollRef.current);
    setPdfImporting(false);
    setPdfTranscribedBatchId(null);
    await _supabase.from('import_batches')
      .update({ status: 'cancelled', finished_at: new Date().toISOString(), updated_at: new Date().toISOString() })
      .eq('id', batchId);
    setActiveBatchId(null);
    setResumeBannerInfo(null);
    setPdfImportMessage('Import cancelled. Already-solved questions remain below for review.');
  };

  // Warns before closing/reloading while a transcribe/solve poll loop is
  // actually in flight -- progress itself is never lost (it's durable in
  // import_batches/draft_questions either way), this is purely so the
  // admin doesn't lose track of where things stood without meaning to.
  useEffect(() => {
    if (!pdfImporting) return;
    const handler = (e) => { e.preventDefault(); e.returnValue = ''; };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [pdfImporting]);

  const updateRow = (key, field, value) => {
    setDraftRows(prev => prev.map(r => r._key === key ? { ...r, [field]: value } : r));
  };
  const updateChoice = (key, idx, value) => {
    setDraftRows(prev => prev.map(r => {
      if (r._key !== key) return r;
      const choices = [...r.choices]; choices[idx] = value;
      return { ...r, choices };
    }));
  };

  // Lets the admin attach a diagram directly on a needs_image card instead of
  // publishing first and switching to the question editor's upload. Uploads
  // straight to question-images under a draft-scoped path (rowKey, not a
  // final question id, since drafts don't have one yet) -- publishing later
  // just reads r.image as-is, same as any other manually attached image.
  const uploadDraftDiagram = async (rowKey, file) => {
    if (!file) return;
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      updateRow(rowKey, '_imageUploadMsg', 'Please choose a PNG, JPEG, WEBP, or GIF image.');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      updateRow(rowKey, '_imageUploadMsg', 'Image is too large. Please use a file under 5 MB.');
      return;
    }
    updateRow(rowKey, '_imageUploading', true);
    updateRow(rowKey, '_imageUploadMsg', '');

    const resized = await resizeImageForUpload(file);
    if (resized.size > MAX_IMAGE_BYTES) {
      updateRow(rowKey, '_imageUploading', false);
      updateRow(rowKey, '_imageUploadMsg', 'Image is still too large after resizing. Please use a smaller file.');
      return;
    }

    const ext = (resized.name.split('.').pop() || 'png').toLowerCase();
    const path = `draft-${rowKey}/diagram-${Date.now()}.${ext}`;
    const { error } = await uploadWithSessionRetry('question-images', path, resized,
      { upsert: true, contentType: resized.type });

    updateRow(rowKey, '_imageUploading', false);
    if (error) {
      updateRow(rowKey, '_imageUploadMsg', error.message || 'Image upload failed.');
      return;
    }

    const { data } = _supabase.storage.from('question-images').getPublicUrl(path);
    updateRow(rowKey, 'image', data.publicUrl);
    updateRow(rowKey, '_imageUploadMsg', 'Diagram uploaded and attached.');
  };

  // Re-solves exactly one question in place (e.g. to fix a bad LaTeX
  // delimiter or an answer-key mismatch) without rerunning the whole batch.
  // Only applies to rows that came from the automatic PDF pipeline -- only
  // those have a real draft_questions id and batch data backing them. The
  // mismatch-retry loop lives server-side now (solve-pdf-questions retries
  // internally up to 5x on its own before responding), so this is a single
  // call -- looping here too would compound into way more attempts than
  // intended. The mismatch badge above clears on its own once
  // verification_status flips to 'match', since it just reads this row state.
  const redoQuestion = async (key, draftId) => {
    if (!draftId) return;
    updateRow(key, '_redoing', true);
    updateRow(key, '_redoMsg', '');
    try {
      const { data, error } = await _supabase.functions.invoke('solve-pdf-questions', { body: { redo_draft_id: draftId } });
      if (error) throw new Error(await edgeFunctionErrorMessage(error));
      if (data?.error) throw new Error(data.error);
      updateRow(key, 'answer', data.answer);
      updateRow(key, 'explanation', data.explanation);
      updateRow(key, 'verification_status', data.verification_status);
      updateRow(key, 'verification_notes', data.verification_notes);
      if (data.verification_status === 'match') {
        updateRow(key, '_redoMsg', 'Now matches the answer key.');
      } else if (data.verification_status === 'mismatch') {
        updateRow(key, '_redoMsg', 'Still mismatched after several automatic attempts — may need manual review.');
      } else {
        updateRow(key, '_redoMsg', 'Redone — review the new answer/explanation below.');
      }
    } catch (e) {
      updateRow(key, '_redoMsg', 'Redo failed: ' + (e.message || String(e)));
    } finally {
      updateRow(key, '_redoing', false);
    }
  };
  const setStatus = (key, status) => {
    updateRow(key, '_status', status);
    const row = draftRows.find(r => r._key === key);
    if (row?._draftId) {
      _supabase.from('draft_questions').update({ review_status: status }).eq('id', row._draftId)
        .then(({ error }) => { if (error) console.error('Failed to persist review status:', error.message); });
    }
  };

  const counts = useMemo(() => ({
    pending: draftRows.filter(r => r._status === 'pending').length,
    approved: draftRows.filter(r => r._status === 'approved').length,
    rejected: draftRows.filter(r => r._status === 'rejected').length,
    published: draftRows.filter(r => r._status === 'published').length,
    mismatch: draftRows.filter(r => r.verification_status === 'mismatch').length,
    needsImage: draftRows.filter(r => r.needs_image).length,
  }), [draftRows]);

  const publishApproved = async () => {
    const approved = draftRows.filter(r => r._status === 'approved');
    if (!approved.length) {
      setPublishMessage('No approved questions to publish.');
      return;
    }

    // Validate before writing anything.
    const errors = [];
    approved.forEach(r => {
      if (!r.question.trim()) errors.push(`"${r.title || 'Untitled'}": missing question text.`);
      const filledChoices = r.choices.filter(c => c && c.trim());
      if (filledChoices.length < 2) errors.push(`"${r.title || 'Untitled'}": needs at least 2 choices.`);
      if (!r.answer.trim()) errors.push(`"${r.title || 'Untitled'}": missing correct answer.`);
      if (!r.topic) errors.push(`"${r.title || 'Untitled'}": missing topic.`);
    });
    if (errors.length) {
      setPublishMessage('Fix these before publishing: ' + errors.join(' '));
      return;
    }

    setPublishing(true);
    setPublishMessage('');

    const { data: idRows } = await _supabase
      .from('questions')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);
    let nextId = idRows && idRows.length > 0 ? idRows[0].id + 1 : 1;

    const rowsToUpsert = [];
    const idByKey = {};
    for (const r of approved) {
      const id = nextId++;
      idByKey[r._key] = id;

      let imageUrl = r.image || null;
      let imageAlt = r.image_alt || null;
      const matchedImage = r.image_pending_filename ? imageMap[r.image_pending_filename] : null;
      if (matchedImage) {
        if (!ALLOWED_IMAGE_TYPES.includes(matchedImage.file.type)) {
          setPublishing(false);
          setPublishMessage(`"${r.title || 'Untitled'}": attached image must be PNG, JPEG, WEBP, or GIF.`);
          return;
        }
        if (matchedImage.file.size > MAX_IMAGE_BYTES) {
          setPublishing(false);
          setPublishMessage(`"${r.title || 'Untitled'}": attached image is over 5 MB.`);
          return;
        }
        const resizedImage = await resizeImageForUpload(matchedImage.file);
        if (resizedImage.size > MAX_IMAGE_BYTES) {
          setPublishing(false);
          setPublishMessage(`"${r.title || 'Untitled'}": attached image is still too large after resizing.`);
          return;
        }
        const ext = (resizedImage.name.split('.').pop() || 'png').toLowerCase();
        const path = `${id}/question-${id}-${Date.now()}.${ext}`;
        const { error: uploadErr } = await uploadWithSessionRetry('question-images', path, resizedImage,
          { upsert: true, contentType: resizedImage.type });
        if (uploadErr) {
          setPublishing(false);
          setPublishMessage(`"${r.title || 'Untitled'}": image upload failed — ${uploadErr.message}`);
          return;
        }
        const { data: pub } = _supabase.storage.from('question-images').getPublicUrl(path);
        imageUrl = pub.publicUrl;
        imageAlt = imageAlt || (r.title ? `Image for ${r.title}` : `Image for question ${id}`);
      }

      rowsToUpsert.push({
        id,
        title: r.title || null,
        topic: r.topic,
        difficulty: r.difficulty,
        source: r.source || null,
        question: r.question,
        choices: r.choices.filter(Boolean),
        answer: r.answer,
        explanation: r.explanation || null,
        tags: r.tags,
        date_added: new Date().toISOString().slice(0, 10),
        original_test: r.original_test || r.source || null,
        original_question_number: r.original_question_number ? Number(r.original_question_number) : null,
        source_reference: r.source_reference || null,
        image: imageUrl,
        image_alt: imageAlt,
      });
    }

    const { error } = await _supabase.from('questions').upsert(rowsToUpsert, { onConflict: 'id' });
    setPublishing(false);

    if (error) {
      setPublishMessage('Publish failed — nothing was saved: ' + error.message);
      return;
    }

    // Keep the source draft_questions rows in sync so a page refresh doesn't
    // show already-published drafts as pending again.
    const publishedDraftIds = approved.filter(r => r._draftId).map(r => r._draftId);
    if (publishedDraftIds.length) {
      await _supabase.from('draft_questions').update({ review_status: 'published' }).in('id', publishedDraftIds);
    }

    setDraftRows(prev => prev.map(r =>
      idByKey[r._key] != null ? { ...r, _status: 'published', id: idByKey[r._key] } : r
    ));
    setPublishMessage(`Published ${rowsToUpsert.length} question(s).`);

    // Rows with no _draftId came from a manually-loaded JSON, not the automatic
    // PDF pipeline, so there's no import_batches row tracking them anywhere --
    // write one now purely as a publish receipt so it shows up under "View all
    // past imports" instead of leaving no trace at all. notified_at is set
    // immediately since the admin just reviewed and published this themselves.
    const manualRows = approved.filter(r => !r._draftId);
    if (manualRows.length) {
      const label = manualRows[0].original_test || manualRows[0].source || 'Manual import';
      const now = new Date().toISOString();
      await _supabase.from('import_batches').insert({
        source_label: label,
        original_test: label,
        status: 'completed',
        questions_extracted: manualRows.length,
        started_at: now,
        finished_at: now,
        notified_at: now,
        created_by: authUser?.id || null,
      });
      if (showAllBatches) {
        _supabase
          .from('import_batches')
          .select('id, source_label, original_test, status, started_at, questions_extracted, source_pdf_path')
          .in('status', ['completed', 'needs_attention'])
          .order('started_at', { ascending: false })
          .then(({ data }) => setAllBatches(data || []));
      }
    }
  };

  const publishAll = async () => {
    const toPublish = draftRows.filter(r => r._status !== 'published');
    if (!toPublish.length) {
      setPublishMessage('No questions to publish.');
      return;
    }

    const errors = [];
    toPublish.forEach(r => {
      if (!r.question.trim()) errors.push(`"${r.title || 'Untitled'}": missing question text.`);
      const filledChoices = r.choices.filter(c => c && c.trim());
      if (filledChoices.length < 2) errors.push(`"${r.title || 'Untitled'}": needs at least 2 choices.`);
      if (!r.answer.trim()) errors.push(`"${r.title || 'Untitled'}": missing correct answer.`);
      if (!r.topic) errors.push(`"${r.title || 'Untitled'}": missing topic.`);
    });
    if (errors.length) {
      setPublishMessage('Fix these before publishing: ' + errors.join(' '));
      return;
    }

    setPublishing(true);
    setPublishMessage('');

    const { data: idRows } = await _supabase
      .from('questions')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);
    let nextId = idRows && idRows.length > 0 ? idRows[0].id + 1 : 1;

    const rowsToUpsert = [];
    const idByKey = {};
    for (const r of toPublish) {
      const id = nextId++;
      idByKey[r._key] = id;

      let imageUrl = r.image || null;
      let imageAlt = r.image_alt || null;
      const matchedImage = r.image_pending_filename ? imageMap[r.image_pending_filename] : null;
      if (matchedImage) {
        if (!ALLOWED_IMAGE_TYPES.includes(matchedImage.file.type)) {
          setPublishing(false);
          setPublishMessage(`"${r.title || 'Untitled'}": attached image must be PNG, JPEG, WEBP, or GIF.`);
          return;
        }
        if (matchedImage.file.size > MAX_IMAGE_BYTES) {
          setPublishing(false);
          setPublishMessage(`"${r.title || 'Untitled'}": attached image is over 5 MB.`);
          return;
        }
        const resizedImage = await resizeImageForUpload(matchedImage.file);
        if (resizedImage.size > MAX_IMAGE_BYTES) {
          setPublishing(false);
          setPublishMessage(`"${r.title || 'Untitled'}": attached image is still too large after resizing.`);
          return;
        }
        const ext = (resizedImage.name.split('.').pop() || 'png').toLowerCase();
        const path = `${id}/question-${id}-${Date.now()}.${ext}`;
        const { error: uploadErr } = await uploadWithSessionRetry('question-images', path, resizedImage,
          { upsert: true, contentType: resizedImage.type });
        if (uploadErr) {
          setPublishing(false);
          setPublishMessage(`"${r.title || 'Untitled'}": image upload failed — ${uploadErr.message}`);
          return;
        }
        const { data: pub } = _supabase.storage.from('question-images').getPublicUrl(path);
        imageUrl = pub.publicUrl;
        imageAlt = imageAlt || (r.title ? `Image for ${r.title}` : `Image for question ${id}`);
      }

      rowsToUpsert.push({
        id,
        title: r.title || null,
        topic: r.topic,
        difficulty: r.difficulty,
        source: r.source || null,
        question: r.question,
        choices: r.choices.filter(Boolean),
        answer: r.answer,
        explanation: r.explanation || null,
        tags: r.tags,
        date_added: new Date().toISOString().slice(0, 10),
        original_test: r.original_test || r.source || null,
        original_question_number: r.original_question_number ? Number(r.original_question_number) : null,
        source_reference: r.source_reference || null,
        image: imageUrl,
        image_alt: imageAlt,
      });
    }

    const { error } = await _supabase.from('questions').upsert(rowsToUpsert, { onConflict: 'id' });
    setPublishing(false);

    if (error) {
      setPublishMessage('Publish failed — nothing was saved: ' + error.message);
      return;
    }

    const publishedDraftIds = toPublish.filter(r => r._draftId).map(r => r._draftId);
    if (publishedDraftIds.length) {
      await _supabase.from('draft_questions').update({ review_status: 'published' }).in('id', publishedDraftIds);
    }

    setDraftRows(prev => prev.map(r =>
      idByKey[r._key] != null ? { ...r, _status: 'published', id: idByKey[r._key] } : r
    ));
    setPublishMessage(`Published ${rowsToUpsert.length} question(s).`);

    const manualRows = toPublish.filter(r => !r._draftId);
    if (manualRows.length) {
      const label = manualRows[0].original_test || manualRows[0].source || 'Manual import';
      const now = new Date().toISOString();
      await _supabase.from('import_batches').insert({
        source_label: label,
        original_test: label,
        status: 'completed',
        questions_extracted: manualRows.length,
        started_at: now,
        finished_at: now,
        notified_at: now,
        created_by: authUser?.id || null,
      });
      if (showAllBatches) {
        _supabase
          .from('import_batches')
          .select('id, source_label, original_test, status, started_at, questions_extracted, source_pdf_path')
          .in('status', ['completed', 'needs_attention'])
          .order('started_at', { ascending: false })
          .then(({ data }) => setAllBatches(data || []));
      }
    }
  };

  const isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');
  if (!isAdmin) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="font-display text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Admin Only</p>
        <p className="text-slate-500 dark:text-slate-400">Review Imports is only available to the Rizvi admin account.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
        <h2 className="font-display text-2xl font-black text-slate-900 dark:text-white mb-1">Review Imports</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
          Load a draft JSON file (extracted from a PDF), review/edit each question with a live preview, then approve
          and publish only the ones you've checked. Nothing is saved to Supabase until you click Publish Approved.
        </p>
        {resumeBannerInfo && (
          <div className="mb-4 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-500/10 p-4 flex items-center justify-between gap-3 flex-wrap">
            <div>
              <p className="text-sm font-bold text-amber-800 dark:text-amber-300">
                Resume active import{resumeBannerInfo.testName ? ` — ${resumeBannerInfo.testName}` : ''}
              </p>
              <p className="text-xs text-amber-700 dark:text-amber-400 mt-0.5">{resumeBannerInfo.stage} — picked up automatically from where it left off.</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button onClick={() => setResumeBannerInfo(null)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-amber-300 dark:border-amber-700 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-500/20">
                Dismiss
              </button>
              <button onClick={cancelActiveImport}
                className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white">
                Cancel active import
              </button>
            </div>
          </div>
        )}
        {pastBatches.length > 0 && (
          <div className="mb-4 rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-500/10 p-4">
            <p className="text-sm font-bold text-blue-800 dark:text-blue-300 mb-2">
              {pastBatches.length} import{pastBatches.length === 1 ? '' : 's'} finished and waiting for review
            </p>
            <div className="space-y-2">
              {pastBatches.map(b => (
                <div key={b.id} className={`flex items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-lg border px-3 py-2 ${b.id === selectedReviewBatchId ? 'border-blue-500 ring-2 ring-blue-400/50' : 'border-slate-200 dark:border-slate-700'}`}>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{b.source_label || b.original_test || b.id}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                      {b.status === 'needs_attention' ? '⚠ needs attention' : '✓ completed'} · {b.questions_extracted ?? '?'} question(s)
                      {b.started_at ? ` · ${new Date(b.started_at).toLocaleDateString()}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={() => loadBatchForReview(b.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white">
                      Review
                    </button>
                    <button onClick={() => deleteBatch(b.id, b.source_label || b.original_test || b.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-bold border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="mb-4">
          <button onClick={toggleAllBatches}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span className={`transition-transform ${showAllBatches ? 'rotate-90' : ''}`}>▸</span>
            {showAllBatches ? 'Hide all past imports' : 'View all past imports'}
          </button>
          {showAllBatches && (
            <div className="mt-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                All past imports ({allBatches.length}) — includes ones already marked reviewed
              </p>
              <div className="space-y-2 max-h-80 overflow-y-auto">
                {allBatches.map(b => (
                  <div key={b.id} className={`flex items-center justify-between gap-3 bg-white dark:bg-slate-900 rounded-lg border px-3 py-2 ${b.id === selectedReviewBatchId ? 'border-blue-500 ring-2 ring-blue-400/50' : 'border-slate-200 dark:border-slate-700'}`}>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-100 truncate">{b.source_label || b.original_test || b.id}</p>
                      <p className="text-xs text-slate-400 dark:text-slate-500">
                        {b.source_pdf_path == null ? 'manual extraction' : (b.status === 'needs_attention' ? '⚠ needs attention' : '✓ completed')} · {b.questions_extracted ?? '?'} question(s)
                        {b.started_at ? ` · ${new Date(b.started_at).toLocaleDateString()}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {b.source_pdf_path != null && (
                        <button onClick={() => loadBatchForReview(b.id)}
                          className="px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-500/10">
                          Review
                        </button>
                      )}
                      <button onClick={() => deleteBatch(b.id, b.source_label || b.original_test || b.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 mb-4">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">Import from PDF (automatic)</p>
          <div className="grid sm:grid-cols-2 gap-3">
            <input type="file" accept="application/pdf" onChange={e => setPdfFile(e.target.files?.[0] || null)}
              className="text-sm text-slate-600 dark:text-slate-300 sm:col-span-2" />
            <input value={pdfOriginalTest} onChange={e => setPdfOriginalTest(e.target.value)} placeholder="Original test, e.g. 2025-2026 TMSCA Mathematics Test 5"
              className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm sm:col-span-2" />
            <div className="sm:col-span-2 flex items-center gap-2 flex-wrap">
              <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                {answerKeyExtracting ? 'Reading…' : 'Upload answer key (PDF or image, optional)'}
                <input type="file" accept="application/pdf,image/*" className="hidden" disabled={answerKeyExtracting}
                  onChange={e => extractAnswerKeyFile(e.target.files?.[0])} />
              </label>
              {answerKeyExtractMsg && <span className="text-xs text-slate-500 dark:text-slate-400">{answerKeyExtractMsg}</span>}
            </div>
            <textarea value={pdfAnswerKey} onChange={e => setPdfAnswerKey(e.target.value)} rows={2}
              placeholder="Answer key (optional), e.g. 1.C 2.C 3.D 4.E or just C, C, D, E"
              className="w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm resize-none sm:col-span-2" />
          </div>
          <div className="mt-3 flex items-center gap-3 flex-wrap">
            <button onClick={extractFromPdf} disabled={pdfImporting || !pdfFile}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white">
              {pdfImporting ? 'Working…' : 'Step 1: Transcribe to JSON'}
            </button>
            {pdfTranscribedBatchId && (
              <button onClick={generateAnswers} disabled={pdfImporting}
                className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white">
                Step 2: Generate Answers
              </button>
            )}
            {activeBatchId && !resumeBannerInfo && (
              <button onClick={cancelActiveImport}
                className="px-4 py-2 rounded-lg text-sm font-semibold border border-rose-300 dark:border-rose-700 text-rose-700 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10">
                Cancel active import
              </button>
            )}
            {pdfImportMessage && (
              <p className={`text-sm ${/failed/i.test(pdfImportMessage) ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300'}`}>{pdfImportMessage}</p>
            )}
          </div>
          <p className="mt-2 text-xs text-slate-400 dark:text-slate-500">
            Diagrams aren't auto-cropped yet — questions that need one are flagged below for manual follow-up before publishing.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Or load a draft questions JSON (manual extraction)</span>
            <input type="file" accept="application/json" onChange={e => loadDraftFile(e.target.files?.[0])}
              className="text-sm text-slate-600 dark:text-slate-300" />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Diagram images for the manual path (optional, can pick multiple)</span>
            <input type="file" accept="image/*" multiple onChange={e => loadImageFiles(e.target.files)}
              className="text-sm text-slate-600 dark:text-slate-300" />
          </label>
        </div>
        {parseError && <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">{parseError}</p>}
        {draftRows.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{draftRows.length} loaded</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400">{counts.pending} pending</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">{counts.approved} approved</span>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400">{counts.rejected} rejected</span>
            {counts.published > 0 && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-500/15 text-blue-700 dark:text-blue-400">{counts.published} published</span>}
            {counts.mismatch > 0 && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400">⚠ {counts.mismatch} answer key mismatch{counts.mismatch === 1 ? '' : 'es'}</span>}
            {counts.needsImage > 0 && <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400">⚠ {counts.needsImage} needs diagram</span>}
            <button onClick={verifyDraftRows} disabled={verifying || publishing}
              title="Spend a small amount of API credit re-solving each question once and flagging any answer that doesn't match"
              className="ml-auto px-4 py-2 rounded-lg text-sm font-bold border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40">
              {verifying ? 'Verifying…' : 'Verify Answers'}
            </button>
            <button onClick={publishApproved} disabled={publishing || counts.approved === 0}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-blue-600 hover:bg-blue-700 disabled:opacity-40 text-white">
              {publishing ? 'Publishing…' : `Publish Approved (${counts.approved})`}
            </button>
            <button onClick={publishAll} disabled={publishing || draftRows.filter(r => r._status !== 'published').length === 0}
              className="px-4 py-2 rounded-lg text-sm font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white">
              {publishing ? 'Publishing…' : `Publish All (${draftRows.filter(r => r._status !== 'published').length})`}
            </button>
          </div>
        )}
        {verifyMessage && <p className={`mt-3 text-sm ${/failed/i.test(verifyMessage) ? 'text-rose-600 dark:text-rose-400' : 'text-slate-600 dark:text-slate-300'}`}>{verifyMessage}</p>}
        {publishMessage && <p className={`mt-3 text-sm ${publishMessage.startsWith('Published') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{publishMessage}</p>}
      </div>

      {draftRows.map(r => {
        const borderClass = r._status === 'approved' ? 'border-emerald-300 dark:border-emerald-600'
          : r._status === 'rejected' ? 'border-rose-300 dark:border-rose-700 opacity-60'
          : r._status === 'published' ? 'border-blue-300 dark:border-blue-600'
          : 'border-slate-200 dark:border-slate-800';
        const matchedImage = r.image_pending_filename ? imageMap[r.image_pending_filename] : null;

        return (
          <div key={r._key} className={`rounded-2xl border-2 ${borderClass} bg-white dark:bg-slate-900 p-5`}>
            <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider
                  ${r._status === 'approved' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400'
                    : r._status === 'rejected' ? 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400'
                    : r._status === 'published' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400'
                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'}`}>
                  {r._status}{r.id != null ? ` · #${r.id}` : ''}
                </span>
                <span className={`w-2 h-2 rounded-full ${TOPIC_DOT[r.topic]||'bg-slate-400'}`}></span>
                <DiffPill d={r.difficulty} />
                {r.verification_status === 'match' && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-400">✓ answer key match</span>
                )}
                {r.verification_status === 'mismatch' && (
                  <span title={r.verification_notes || ''} className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-400">⚠ answer key mismatch</span>
                )}
                {r.needs_image && (
                  <span className="px-2 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">⚠ needs diagram</span>
                )}
              </div>
              {r._status !== 'published' && (
                <div className="flex items-center gap-2">
                  <button onClick={()=>setStatus(r._key, 'approved')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white">Approve</button>
                  <button onClick={()=>setStatus(r._key, 'rejected')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white">Reject</button>
                  {r._status !== 'pending' && (
                    <button onClick={()=>setStatus(r._key, 'pending')}
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">Reset</button>
                  )}
                  {r._draftId && (
                    <button onClick={()=>redoQuestion(r._key, r._draftId)} disabled={r._redoing}
                      title="Re-solve this question with Claude (fixes bad LaTeX, answer mismatches, etc.)"
                      className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-40">
                      {r._redoing ? 'Redoing…' : 'Redo'}
                    </button>
                  )}
                </div>
              )}
            </div>
            {r._redoMsg && (
              <p className={`text-xs mt-1 ${/failed/i.test(r._redoMsg) ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'}`}>{r._redoMsg}</p>
            )}

            <div className="grid lg:grid-cols-2 gap-4">
              {/* Editable fields */}
              <div className="space-y-2">
                <input value={r.title} onChange={e=>updateRow(r._key,'title',e.target.value)} placeholder="Title"
                  className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"/>
                <div className="grid grid-cols-2 gap-2">
                  <select value={r.topic} onChange={e=>updateRow(r._key,'topic',e.target.value)}
                    className="px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm">
                    {TOPICS.filter(t=>t!=='All Topics' && !t.startsWith('Column')).map(t=><option key={t}>{t}</option>)}
                  </select>
                  <select value={r.difficulty} onChange={e=>updateRow(r._key,'difficulty',e.target.value)}
                    className="px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm">
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                  </select>
                </div>
                <input value={r.source} onChange={e=>updateRow(r._key,'source',e.target.value)} placeholder="Source, e.g. 2026 UIL District"
                  className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"/>
                <textarea value={r.question} onChange={e=>updateRow(r._key,'question',e.target.value)} rows={3}
                  placeholder="Question text, use \\( ... \\) for math"
                  className="w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm resize-none"/>
                {r.choices.map((c,i)=>(
                  <input key={i} value={c} onChange={e=>updateChoice(r._key,i,e.target.value)} placeholder={`Choice ${String.fromCharCode(65+i)}`}
                    className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"/>
                ))}
                <input value={r.answer} onChange={e=>updateRow(r._key,'answer',e.target.value)} placeholder="Correct answer, exactly as stored, e.g. (C) 8"
                  className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"/>
                <textarea value={r.explanation} onChange={e=>updateRow(r._key,'explanation',e.target.value)} rows={3}
                  placeholder="Worked explanation"
                  className="w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm resize-none"/>
                <input value={r.tags.join(', ')} onChange={e=>updateRow(r._key,'tags', e.target.value.split(',').map(t=>t.trim()).filter(Boolean))}
                  placeholder="Tags separated by commas"
                  className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 text-sm"/>

                {r.image_pending_filename && (
                  <div className="rounded-xl border border-dashed border-slate-300 dark:border-slate-700 p-3">
                    <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
                      Needs image: <code>{r.image_pending_filename}</code>
                    </p>
                    {matchedImage ? (
                      <img src={matchedImage.url} alt="Attached diagram preview" className="max-w-full max-h-40 rounded-lg border border-slate-200 dark:border-slate-700" />
                    ) : (
                      <p className="text-xs text-rose-600 dark:text-rose-400">Not attached yet — pick this file in the image picker above.</p>
                    )}
                  </div>
                )}
                {!r.image_pending_filename && (
                  r.image ? (
                    <div className="rounded-xl border border-emerald-300 dark:border-emerald-700 p-3 bg-emerald-50 dark:bg-emerald-500/10">
                      <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">✓ Diagram attached</p>
                      <img src={r.image} alt={r.image_alt || 'Diagram preview'} className="max-w-full max-h-40 rounded-lg border border-slate-200 dark:border-slate-700 bg-white" />
                      <label className="mt-2 inline-block text-xs font-semibold text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                        Replace image
                        <input type="file" accept="image/*" className="hidden" onChange={e=>uploadDraftDiagram(r._key, e.target.files?.[0])} />
                      </label>
                      {r._imageUploadMsg && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r._imageUploadMsg}</p>}
                    </div>
                  ) : r.needs_image ? (
                    <div className="rounded-xl border border-dashed border-amber-300 dark:border-amber-700 p-3 bg-amber-50 dark:bg-amber-500/10">
                      <p className="text-xs font-semibold text-amber-700 dark:text-amber-400 mb-1">⚠ Diagram needed (not auto-cropped yet)</p>
                      <p className="text-xs text-amber-700 dark:text-amber-400 mb-2">{r.image_alt || 'No description provided.'}</p>
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 hover:bg-amber-700 text-white cursor-pointer">
                        {r._imageUploading ? 'Uploading…' : 'Upload diagram'}
                        <input type="file" accept="image/*" className="hidden" disabled={r._imageUploading} onChange={e=>uploadDraftDiagram(r._key, e.target.files?.[0])} />
                      </label>
                      {r._imageUploadMsg && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r._imageUploadMsg}</p>}
                    </div>
                  ) : (
                    <div className="rounded-xl border border-dashed border-slate-200 dark:border-slate-700 p-3">
                      <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer">
                        {r._imageUploading ? 'Uploading…' : 'Add diagram (optional)'}
                        <input type="file" accept="image/*" className="hidden" disabled={r._imageUploading} onChange={e=>uploadDraftDiagram(r._key, e.target.files?.[0])} />
                      </label>
                      {r._imageUploadMsg && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{r._imageUploadMsg}</p>}
                    </div>
                  )
                )}
              </div>

              {/* Live preview */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 p-4 overflow-x-auto">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">Live Preview</p>
                <p className="font-display text-base font-black text-slate-900 dark:text-white mb-2 break-words">{r.title || 'Untitled Question'}</p>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed break-words"><MathText text={r.question || 'Question preview will appear here.'} /></p>
                {matchedImage && <img src={matchedImage.url} alt="Diagram" className="mt-3 max-w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white" />}
                <div className="mt-3 space-y-1.5">
                  {r.choices.filter(Boolean).map((c,i)=>(
                    <div key={i} className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300 break-words">
                      <MathText text={c} />
                    </div>
                  ))}
                </div>
                {r.answer && (
                  <p className="mt-3 text-sm font-semibold text-emerald-700 dark:text-emerald-400 break-words">Answer: <MathText text={r.answer} /></p>
                )}
                {r.explanation && (
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 break-words"><MathText text={r.explanation} /></p>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function AdminQuestionManager({ authUser }) {
  const blank = {
    id: '',
    title: '',
    topic: 'Algebra 1 & 2',
    difficulty: 'Easy',
    source: '',
    question: '',
    choices: ['(A) ','(B) ','(C) ','(D) ','(E) '],
    answer: '',
    explanation: '',
    tags: '',
    date_added: new Date().toISOString().slice(0,10),
    original_test: '',
    original_question_number: '',
    source_reference: '',
    image: '',
    image_alt: '',
  };
  const [form, setForm] = useState(blank);
  const [message, setMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [adminPanelTab, setAdminPanelTab] = useLocalStorage('admin_panel_tab', 'activity');
  const [showDateOverride, setShowDateOverride] = useState(false);
  const [idLoading, setIdLoading] = useState(false);
  const [questionList, setQuestionList] = useState([]);
  const [questionListLoading, setQuestionListLoading] = useState(false);
  const [questionSearch, setQuestionSearch] = useState('');
  const [editingExisting, setEditingExisting] = useState(false);

  // Auto-generate next question ID when switching to Question Manager tab
  useEffect(() => {
    if (adminPanelTab !== 'questions' || editingExisting || form.id) return;
    setIdLoading(true);
    _supabase
      .from('questions')
      .select('id')
      .order('id', { ascending: false })
      .limit(1)
      .then(({ data }) => {
        const nextId = data && data.length > 0 ? data[0].id + 1 : 1;
        setForm(f => ({ ...f, id: String(nextId) }));
        setIdLoading(false);
      });
  }, [adminPanelTab, editingExisting]);

  useEffect(() => {
    if (adminPanelTab !== 'editQuestions') return;
    setQuestionListLoading(true);
    _supabase
      .from('questions')
      .select('*')
      .order('id', { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          setMessage(error.message || 'Could not load questions to edit.');
          setQuestionList([]);
        } else {
          setQuestionList(data || []);
        }
        setQuestionListLoading(false);
      });
  }, [adminPanelTab]);

  // Notification badge for import batches the background queue has finished
  // (completed/needs_attention) that nobody has opened Review Imports for
  // yet. Polled so it stays current even if this dashboard tab is left open
  // while the cron-driven pipeline finishes work in the background.
  const [pendingReviewCount, setPendingReviewCount] = useState(0);
  const refreshPendingReviewCount = () => {
    if (!authUser) return;
    _supabase
      .from('import_batches')
      .select('id', { count: 'exact', head: true })
      .in('status', ['completed', 'needs_attention'])
      .is('notified_at', null)
      .then(({ count }) => setPendingReviewCount(count || 0));
  };
  useEffect(() => {
    refreshPendingReviewCount();
    const interval = setInterval(refreshPendingReviewCount, 30000);
    return () => clearInterval(interval);
  }, [authUser]);

  const openReviewImports = () => {
    setAdminPanelTab('reviewImports');
  };

  const normalizeQuestionForForm = (q) => {
    const choices = Array.isArray(q.choices) ? [...q.choices] : [];
    while (choices.length < 5) choices.push(`(${String.fromCharCode(65 + choices.length)}) `);

    return {
      id: q.id != null ? String(q.id) : '',
      title: q.title || '',
      topic: q.topic || 'Algebra 1 & 2',
      difficulty: q.difficulty || 'Easy',
      source: q.source || q.original_test || '',
      question: q.question || '',
      choices: choices.slice(0,5),
      answer: q.answer || '',
      explanation: q.explanation || '',
      tags: Array.isArray(q.tags) ? q.tags.join(', ') : (q.tags || ''),
      date_added: q.date_added || new Date().toISOString().slice(0,10),
      original_test: q.original_test || q.source || '',
      original_question_number: q.original_question_number != null ? String(q.original_question_number) : '',
      source_reference: q.source_reference || '',
      image: q.image || '',
      image_alt: q.image_alt || q.imageAlt || '',
    };
  };

  const loadQuestionForEditing = (q) => {
    setForm(normalizeQuestionForForm(q));
    setEditingExisting(true);
    setAdminPanelTab('questions');
    setShowDateOverride(false);
    setMessage(`Editing question #${q.id}. Make changes and click Save Changes.`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const startNewQuestion = async () => {
    setEditingExisting(false);
    setShowDateOverride(false);
    setMessage('');
    setAdminPanelTab('questions');
    setIdLoading(true);
    const { data } = await _supabase
      .from('questions')
      .select('id')
      .order('id', { ascending: false })
      .limit(1);
    const nextId = data && data.length > 0 ? data[0].id + 1 : 1;
    setForm({ ...blank, id: String(nextId), date_added: new Date().toISOString().slice(0,10) });
    setIdLoading(false);
  };

  const isAdmin = authUser && ADMIN_EMAILS.includes(authUser.email || '');
  if (!isAdmin) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="font-display text-2xl font-black text-slate-800 dark:text-slate-100 mb-2">Admin Only</p>
        <p className="text-slate-500 dark:text-slate-400">This question manager is only available to the Rizvi admin account.</p>
      </div>
    );
  }

  const set = (key, value) => setForm(f => ({ ...f, [key]: value }));
  const setChoice = (i, value) => setForm(f => {
    const choices = [...f.choices]; choices[i] = value; return { ...f, choices };
  });

  const insertLatex = (snippet, target = 'question') => {
    set(target, (form[target] || '') + snippet);
  };

  const uploadImage = async (file) => {
    if (!file) return;
    if (!form.id) {
      setMessage('Question ID not yet generated. Wait a moment and try again.');
      return;
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setMessage('Please choose a PNG, JPEG, WEBP, or GIF image.');
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setMessage('Image is too large. Please use a file under 5 MB.');
      return;
    }
    setImageUploading(true);
    setMessage('');

    const resized = await resizeImageForUpload(file);
    if (resized.size > MAX_IMAGE_BYTES) {
      setImageUploading(false);
      setMessage('Image is still too large after resizing. Please use a smaller file.');
      return;
    }

    const ext = (resized.name.split('.').pop() || 'png').toLowerCase();
    const safeName = `question-${form.id}-${Date.now()}.${ext}`;
    const path = `${form.id}/${safeName}`;

    const { error } = await _supabase.storage
      .from('question-images')
      .upload(path, resized, { upsert: true, contentType: resized.type });

    setImageUploading(false);

    if (error) {
      setMessage(error.message || 'Image upload failed.');
      return;
    }

    const { data } = _supabase.storage.from('question-images').getPublicUrl(path);
    set('image', data.publicUrl);
    if (!form.image_alt) set('image_alt', form.title ? `Image for ${form.title}` : `Image for question ${form.id}`);
    setMessage('Image uploaded and attached to this question.');
  };

  const saveQuestion = async () => {
    setSaving(true);
    setMessage('');
    const row = {
      id: Number(form.id),
      title: form.title || null,
      topic: form.topic,
      difficulty: form.difficulty,
      source: form.source || null,
      question: form.question,
      choices: form.choices.filter(Boolean),
      answer: form.answer,
      explanation: form.explanation || null,
      tags: form.tags.split(',').map(t=>t.trim()).filter(Boolean),
      date_added: form.date_added || null,
      original_test: form.original_test || form.source || null,
      original_question_number: form.original_question_number ? Number(form.original_question_number) : null,
      original_question_reference: form.original_test && form.original_question_number ? `${form.original_test}, Question ${form.original_question_number}` : null,
      source_reference: form.source_reference || (form.source && form.original_question_number ? `${form.source} #${form.original_question_number}` : null),
      image: form.image || null,
      image_alt: form.image_alt || null,
    };

    if (!row.id || !row.question || row.choices.length < 2 || !row.answer) {
      setSaving(false);
      setMessage('Please fill in the question text, choices, and correct answer.');
      return;
    }

    const { error } = await _supabase.from('questions').upsert(row, { onConflict: 'id' });
    setSaving(false);
    if (error) {
      setMessage(error.message || 'Could not save question.');
      return;
    }
    setShowDateOverride(false);
    if (editingExisting) {
      setMessage(`Question #${row.id} updated successfully.`);
      setQuestionList(prev => prev.map(q => q.id === row.id ? { ...q, ...row } : q));
    } else {
      const nextId = String(row.id + 1);
      setForm({ ...blank, id: nextId, date_added: new Date().toISOString().slice(0,10) });
      setMessage(`Question #${row.id} saved! Ready to add question #${nextId}.`);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 dark:text-white mb-1">Admin</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Monitor usage and manage the question bank.</p>
        <div className="mt-4 inline-flex rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-1">
          <button onClick={()=>setAdminPanelTab('activity')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${adminPanelTab==='activity' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            User Activity
          </button>
          <button onClick={startNewQuestion}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${adminPanelTab==='questions' ? 'bg-blue-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            Add Question
          </button>
          <button onClick={()=>setAdminPanelTab('editQuestions')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${adminPanelTab==='editQuestions' ? 'bg-violet-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            Edit Questions
          </button>
          <button onClick={openReviewImports}
            className={`px-4 py-2 rounded-lg text-sm font-semibold inline-flex items-center gap-1.5 ${adminPanelTab==='reviewImports' ? 'bg-emerald-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            Review Imports
            {pendingReviewCount > 0 && (
              <span className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1 rounded-full bg-rose-500 text-white text-[11px] font-bold">
                {pendingReviewCount}
              </span>
            )}
          </button>
          <button onClick={()=>setAdminPanelTab('bugReports')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold ${adminPanelTab==='bugReports' ? 'bg-rose-600 text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
            Bug Reports
          </button>
        </div>
      </div>

      {adminPanelTab === 'activity' ? (
        <AdminUserActivity authUser={authUser} />
      ) : adminPanelTab === 'bugReports' ? (
        <AdminBugReports authUser={authUser} />
      ) : adminPanelTab === 'reviewImports' ? (
        <ReviewImportsPanel authUser={authUser} onBatchReviewed={refreshPendingReviewCount} />
      ) : adminPanelTab === 'editQuestions' ? (
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
          <div className="p-5 border-b border-slate-200 dark:border-slate-800">
            <h2 className="font-display text-2xl font-black text-slate-900 dark:text-white mb-1">Edit Existing Questions</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Search/select a question. It will open in the same question manager form with all fields filled in.</p>
            <div className="relative">
              <input value={questionSearch} onChange={e=>setQuestionSearch(e.target.value)}
                placeholder="Search by title, question text, topic, source, tags, or ID..."
                className="w-full pl-3 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
          </div>

          {questionListLoading ? (
            <div className="py-20 text-center">
              <div className="inline-block w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Loading questions...</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-[70vh] overflow-y-auto">
              {questionList
                .filter(q => {
                  const s = questionSearch.toLowerCase().trim();
                  if (!s) return true;
                  return (
                    String(q.id || '').includes(s) ||
                    String(q.title || '').toLowerCase().includes(s) ||
                    String(q.question || '').toLowerCase().includes(s) ||
                    String(q.topic || '').toLowerCase().includes(s) ||
                    String(q.source || '').toLowerCase().includes(s) ||
                    (q.tags || []).some(t => String(t).toLowerCase().includes(s))
                  );
                })
                .map(q => (
                  <button key={q.id} onClick={()=>loadQuestionForEditing(q)}
                    className="group w-full text-left px-5 py-4 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1">
                          <span className="text-xs font-mono text-slate-400">#{q.id}</span>
                          <span className={`w-2 h-2 rounded-full ${TOPIC_DOT[q.topic] || 'bg-slate-400'}`}></span>
                          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">{q.topic}</span>
                          <DiffPill d={q.difficulty} />
                          {q.source && <span className="text-xs text-slate-400 dark:text-slate-500">{q.source}</span>}
                        </div>
                        <p className="font-bold text-slate-800 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                          {q.title || plainText(q.question) || 'Untitled Question'}
                        </p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1 line-clamp-2">
                          {plainText(q.question)}
                        </p>
                      </div>
                      <span className="shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-600 text-white">
                        Edit
                      </span>
                    </div>
                  </button>
                ))}
              {questionList.length === 0 && (
                <div className="py-20 text-center text-sm text-slate-400">No questions found.</div>
              )}
            </div>
          )}
        </div>
      ) : (
      <div className="grid lg:grid-cols-[1fr_22rem] gap-6">
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 space-y-4">

          {/* Auto-generated ID + date row */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Question ID</span>
              <span className="font-mono text-sm font-bold text-slate-700 dark:text-slate-200">
                {idLoading ? <span className="text-slate-400">…</span> : form.id || '—'}
              </span>
              {editingExisting && <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">Editing</span>}
            </div>
            {editingExisting && (
              <button type="button" onClick={startNewQuestion}
                className="text-xs px-3 py-2 rounded-lg border border-blue-200 dark:border-blue-700 text-blue-600 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-500/10 font-semibold">
                + Add New Instead
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 dark:text-slate-500">Date added: <span className="font-semibold text-slate-600 dark:text-slate-300">{form.date_added || 'today'}</span></span>
              <button type="button" onClick={()=>setShowDateOverride(v=>!v)}
                className="text-xs px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                {showDateOverride ? 'Use today' : 'Change date'}
              </button>
            </div>
            {showDateOverride && (
              <input type="date" value={form.date_added} onChange={e=>set('date_added', e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-blue-300 dark:border-blue-600 bg-white dark:bg-slate-800 text-sm text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500" />
            )}
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <input value={form.title} onChange={e=>set('title', e.target.value)} placeholder="Title"
              className="px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"/>
            <select value={form.topic} onChange={e=>set('topic', e.target.value)}
              className="px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              {TOPICS.filter(t=>t!=='All Topics' && !t.startsWith('Column')).map(t=><option key={t}>{t}</option>)}
            </select>
            <select value={form.difficulty} onChange={e=>set('difficulty', e.target.value)}
              className="px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700">
              <option>Easy</option><option>Medium</option><option>Hard</option>
            </select>
            <input value={form.source} onChange={e=>set('source', e.target.value)} placeholder="Source, e.g. 2026 UIL District"
              className="px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"/>
            <input value={form.original_question_number} onChange={e=>set('original_question_number', e.target.value)} placeholder="Original problem #"
              className="px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"/>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">Question</label>
            <textarea value={form.question} onChange={e=>set('question', e.target.value)} rows={5}
              placeholder="Type the question. Use \\( ... \\) for inline math."
              className="w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 resize-none"></textarea>
            <div className="mt-2 space-y-2">
              {[
                ['Basics', ['\\(x^2\\)','\\(x_n\\)','\\(\\frac{a}{b}\\)','\\(\\sqrt{x}\\)','\\(\\pi\\)','\\(\\theta\\)','\\(\\pm\\)','\\(\\le\\)','\\(\\ge\\)','\\(\\neq\\)']],
                ['Algebra / Functions', ['\\(f(x)\\)','\\(f^{-1}(x)\\)','\\(|x|\\)','\\(\\log_b x\\)','\\(\\ln x\\)','\\(a_n=a_1+(n-1)d\\)','\\(S_n=\\frac{n}{2}(a_1+a_n)\\)']],
                ['Geometry / Trig', ['\\(\\sin x\\)','\\(\\cos x\\)','\\(\\tan x\\)','\\(\\sin^2 x+\\cos^2 x=1\\)','\\(A=\\pi r^2\\)','\\(a^2+b^2=c^2\\)','\\(\\angle ABC\\)']],
                ['Calculus', ['\\(\\lim_{x\\to a}\\)','\\(\\frac{dy}{dx}\\)','\\(f\\prime(x)\\)','\\(f\\prime\\prime(x)\\)','\\(\\int f(x)\\,dx\\)','\\(\\int_a^b f(x)\\,dx\\)','\\(\\frac{d}{dx}\\)','\\(\\frac{d}{dx}[\\sin x]=\\cos x\\)']],
                ['Statistics', ['\\(\\bar{x}\\)','\\(s^2\\)','\\(\\sigma\\)','\\(z=\\frac{x-\\mu}{\\sigma}\\)','\\(P(A)\\)','\\(P(A\\cap B)\\)','\\(P(A\\cup B)\\)']],
                ['Display', ['\\[ y = mx+b \\]','\\[ ax^2+bx+c=0 \\]','\\[ \\frac{-b\\pm\\sqrt{b^2-4ac}}{2a} \\]']]
              ].map(([group, items]) => (
                <div key={group}>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">{group}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {items.map(s => (
                      <button key={s} onClick={()=>insertLatex(s)}
                        className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-colors">{s}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            {form.choices.map((c,i)=>(
              <input key={i} value={c} onChange={e=>setChoice(i,e.target.value)} placeholder={`Choice ${String.fromCharCode(65+i)}`}
                className="px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"/>
            ))}
          </div>

          <input value={form.answer} onChange={e=>set('answer', e.target.value)} placeholder="Correct answer exactly as stored, e.g. (C) 8"
            className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"/>

          <textarea value={form.explanation} onChange={e=>set('explanation', e.target.value)} rows={4}
            placeholder="Official explanation. Use LaTeX with \\( ... \\)."
            className="w-full px-3 py-2 rounded-xl border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700 resize-none"></textarea>
          <div className="flex flex-wrap gap-1.5">
            {['\\(\\frac{a}{b}\\)','\\(x^2\\)','\\(\\sqrt{x}\\)','\\(\\lim_{x\\to a}\\)','\\(\\frac{dy}{dx}\\)','\\(\\int_a^b f(x)\\,dx\\)'].map(s => (
              <button key={s} onClick={()=>insertLatex(s, 'explanation')}
                className="px-2 py-1 rounded-lg text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10 dark:hover:text-blue-400 transition-colors">{s}</button>
            ))}
          </div>

          <input value={form.tags} onChange={e=>set('tags', e.target.value)} placeholder="Tags separated by commas, e.g. sequences, arithmetic series"
            className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"/>

          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/40 p-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">Question Image</label>
            <label onDragOver={e=>{e.preventDefault(); e.currentTarget.classList.add('ring-2','ring-blue-500');}}
              onDragLeave={e=>e.currentTarget.classList.remove('ring-2','ring-blue-500')}
              onDrop={e=>{e.preventDefault(); e.currentTarget.classList.remove('ring-2','ring-blue-500'); uploadImage(e.dataTransfer.files?.[0]);}}
              className="flex flex-col items-center justify-center gap-2 min-h-[140px] rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-500 cursor-pointer transition-colors text-center px-4">
              <span className="text-sm font-bold text-slate-700 dark:text-slate-200">Drag image here</span>
              <span className="text-xs text-slate-400 dark:text-slate-500">or click to upload a screenshot/graph</span>
              <input type="file" accept="image/*" onChange={e=>uploadImage(e.target.files?.[0])} className="hidden" />
            </label>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              Screenshots work best as PNG/JPG. The question ID is auto-assigned.
            </p>
            {imageUploading && <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">Uploading image…</p>}
            {form.image && (
              <div className="mt-3">
                <img src={form.image} alt={form.image_alt || 'Question image preview'} className="max-w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white" />
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1 break-all">{form.image}</p>
              </div>
            )}
            <div className="mt-3">
              <input value={form.image_alt} onChange={e=>set('image_alt', e.target.value)} placeholder="Image description for accessibility, e.g. graph of hyperbola with asymptotes"
                className="w-full px-3 py-2 rounded-lg border bg-white border-slate-200 dark:bg-slate-800 dark:border-slate-700"/>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                Image description helps screen readers and gives fallback text if the image fails to load.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <button onClick={saveQuestion} disabled={saving}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white">
              {saving ? 'Saving…' : editingExisting ? 'Save Changes' : 'Save Question'}
            </button>
            {message && <p className={`text-sm ${message.includes('saved') ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>{message}</p>}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-3">{editingExisting ? 'Editing Preview' : 'Live Preview'}</p>
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/50 overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-mono">#{form.id || '…'}</span>
                <span className={`w-2 h-2 rounded-full ${TOPIC_DOT[form.topic]||'bg-slate-400'}`}></span>
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">{form.topic}</span>
                <DiffPill d={form.difficulty} />
              </div>
              <p className="mt-2 font-display text-lg font-black text-slate-900 dark:text-white">{form.title || 'Untitled Question'}</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">{form.source || 'Source'} {form.original_question_number ? `· Problem ${form.original_question_number}` : ''}</p>
            </div>
            <div className="p-4">
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><MathText text={form.question || 'Question preview will appear here.'} /></p>
              {form.image && <img src={form.image} alt={form.image_alt || 'Question image preview'} className="mt-3 max-w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-white" />}
              <div className="mt-3 space-y-2">
                {form.choices.filter(Boolean).map((c,i)=>(
                  <div key={i} className="px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-300">
                    <MathText text={c} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 text-xs text-slate-500 dark:text-slate-400 space-y-2">
            <p className="font-bold text-slate-600 dark:text-slate-300">LaTeX quick guide</p>
            <p>Inline math: <code>\\(x^2+1\\)</code></p>
            <p>Fraction: <code>\\(\\frac&#123;a&#125;&#123;b&#125;\\)</code></p>
            <p>Square root: <code>\\(\\sqrt&#123;x&#125;\\)</code></p>
            <p>Derivative: <code>\\(\\frac&#123;dy&#125;&#123;dx&#125;\\)</code></p>
            <p>Limit: <code>\\(\\lim_&#123;x\\to a&#125; f(x)\\)</code></p>
            <p>Integral: <code>\\(\\int_a^b f(x)\\,dx\\)</code></p>
            <p>Display equation: <code>\\[ y=mx+b \\]</code></p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
}
