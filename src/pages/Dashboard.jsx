import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import EditProfileModal from '../components/Modals/EditProfileModal';
const StatCard = ({ title, children }) => (
  <div className="bg-gradient-to-br from-gray-900/80 to-gray-900/70 border border-blue-700/40 p-4 rounded-2xl shadow-sm">
    <h4 className="text-sm text-blue-200 font-semibold mb-2">{title}</h4>
    <div>{children}</div>
  </div>
);

const Donut = ({ percent = 0, size = 120 }) => {
  const stroke = 12;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
      </defs>
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle r={radius} fill="none" stroke="#0f172a" strokeWidth={stroke} />
        <circle r={radius} fill="none" stroke="url(#g1)" strokeWidth={stroke} strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" transform="rotate(-90)" />
        <text x="0" y="4" textAnchor="middle" className="text-white font-semibold" style={{ fontSize: 14 }}>{percent}%</text>
      </g>
    </svg>
  );
};

const Dashboard = ({ token, onUpdateUser, onLogout }) => {
  const [profile, setProfile] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ firstName: '', lastName: '', phone: '', education: '' });
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [courses, setCourses] = useState([]);
  const [editingProgressId, setEditingProgressId] = useState(null);
  const [progressDrafts, setProgressDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // helper to normalize token values (avoid sending 'null'/'undefined')
  const getSafeToken = () => {
    const t = token || localStorage.getItem('ft_token');
    return t && t !== 'null' && t !== 'undefined' ? t : null;
  };

  const safeFetch = async (url, opts = {}) => {
    const t = getSafeToken();
    const headers = opts.headers || {};
    if (t) headers.Authorization = `Bearer ${t}`;
    const res = await fetch(url, { ...opts, headers });
    if (res.status === 401) window.dispatchEvent(new Event('ft:auth-failed'));
    return res;
  };

  const processResponse = async (res) => {
    let data = null;
    try { data = await res.json(); } catch (e) { data = null; }
    if (res.status === 401) throw { detail: 'Session expired. Please login again.' };
    if (!res.ok) throw data || { detail: 'Request failed' };
    return data;
  };

  useEffect(() => {
    // normalize token for fetch headers
  const safeToken = getSafeToken();
  const headers = safeToken ? { Authorization: `Bearer ${safeToken}` } : {};
    setLoading(true);
    Promise.all([
      safeFetch('http://127.0.0.1:8000/api/profile/', { headers }).then(processResponse),
      safeFetch('http://127.0.0.1:8000/api/enrollments/', { headers }).then(processResponse)
    ])
      .then(([profileData, enrollData]) => {
        setProfile(profileData || null);
        setForm({
          firstName: profileData?.firstName || profileData?.first_name || '',
          lastName: profileData?.lastName || profileData?.last_name || '',
          phone: profileData?.phone || '',
          education: profileData?.education || '',
          goal: profileData?.goal || ''
        });
        setAvatarPreview(profileData?.avatar_url || null);
        setCourses(enrollData || []);
      })
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, [token]);

  // listen for navigation events (e.g., go to a specific enrollment after enroll)
  useEffect(() => {
    const onNavigate = (e) => {
      const section = e?.detail?.section;
      const enrollmentId = e?.detail?.enrollmentId;
      if (section === 'dashboard' && enrollmentId) {
        // scroll to the enrollment card and open editor
        setTimeout(() => {
          const el = document.getElementById(`enrollment-${enrollmentId}`);
          if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // open editor for that enrollment
          setEditingProgressId(enrollmentId);
          setProgressDrafts((p) => ({ ...p, [enrollmentId]: Number((courses.find(x => x.id === enrollmentId)?.progress) ?? 0) }));
        }, 300);
      }
    };
    window.addEventListener('ft:navigate', onNavigate);
    return () => window.removeEventListener('ft:navigate', onNavigate);
  }, [courses]);

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSave = (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
  const token2 = getSafeToken();
  const headers = token2 ? { Authorization: `Bearer ${token2}` } : {};
  const fd = new FormData();
    fd.append('firstName', form.firstName);
    fd.append('lastName', form.lastName);
    fd.append('phone', form.phone);
    fd.append('education', form.education);
  if (form.avatarFile) fd.append('avatar', form.avatarFile);
  if (form.goal) fd.append('goal', form.goal);
    safeFetch('http://127.0.0.1:8000/api/profile/', { method: 'PUT', headers, body: fd })
      .then(processResponse)
      .then((data) => {
        setProfile(data);
        setEditing(false);
        if (onUpdateUser) onUpdateUser(data);
      })
      .catch((err) => setError(err.detail || 'Failed to update profile'))
      .finally(() => setSaving(false));
  };

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  // Simple derived stats for the mock
  const totalTime = 4 * 60 + 35; // minutes for mock visualization (can be computed from courses)
  const mathMinutes = 45;
  const physicsMinutes = 120;
  const biologyMinutes = 25;
  const languageMinutes = 50;

  const percentComplete = Math.min(100, Math.round((courses.length ? (courses.length / 5) * 100 : 0)));

  return (
    <div className="w-full px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column: Greeting and profile */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-r from-blue-700 to-purple-700 text-white p-6 rounded-2xl flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-extrabold">Welcome back{profile?.firstName ? ` ${profile.firstName}` : ''}!</h1>
                <p className="text-sm opacity-90 mt-1">Here are your enrolled courses and profile details.</p>
              </div>
            </div>

            <StatCard title="Enrolled Courses">
              <div className="space-y-3">
                {(courses.length ? courses : []).map((c) => (
                  <div id={`enrollment-${c.id}`} key={c.id} className="flex items-center justify-between bg-gray-900/60 p-3 rounded-lg border border-blue-600/20">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-sm font-semibold">{(c.title || '').split(' ')[0]?.slice(0,2)}</div>
                      <div>
                        <div className="text-sm font-semibold">{c.title}</div>
                        <div className="text-xs text-gray-300">{c.provider || 'Provider'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-gray-300">{c.progress ?? '—'}%</div>
                      <div className="w-20 h-6 bg-gray-800 rounded-full overflow-hidden border border-gray-700">
                        <div style={{ width: `${c.progress ?? 0}%` }} className="h-full bg-gradient-to-r from-green-400 to-blue-500"></div>
                      </div>
                      <div>
                        {editingProgressId === c.id ? (
                          <div className="flex items-center gap-2">
                            <input type="range" min="0" max="100" value={progressDrafts[c.id] ?? (c.progress ?? 0)} onChange={(e) => setProgressDrafts((p) => ({ ...p, [c.id]: Number(e.target.value) }))} />
                            <button className="text-xs bg-blue-600 px-2 py-1 rounded" onClick={() => {
                              const token3 = getSafeToken();
                              const prog = progressDrafts[c.id] ?? (c.progress ?? 0);
                              const pheaders = { 'Content-Type': 'application/json' };
                              if (token3) pheaders.Authorization = `Bearer ${token3}`;
                              safeFetch(`http://127.0.0.1:8000/api/enrollments/${c.id}/`, { method: 'PATCH', headers: pheaders, body: JSON.stringify({ progress: prog }) })
                                .then(async (r) => { if (!r.ok) throw await r.json(); return r.json(); })
                                .then((data) => {
                                  setCourses((cs) => cs.map((x) => x.id === data.id ? data : x));
                                  setEditingProgressId(null);
                                })
                                .catch(() => toast.error('Failed to update progress'));
                            }}>Save</button>
                            <button className="text-xs bg-gray-700 px-2 py-1 rounded" onClick={() => { setEditingProgressId(null); setProgressDrafts((p) => { const np = { ...p }; delete np[c.id]; return np; }); }}>Cancel</button>
                          </div>
                        ) : (
                          <button className="text-xs bg-gray-700 px-2 py-1 rounded" onClick={() => { setEditingProgressId(c.id); setProgressDrafts((p) => ({ ...p, [c.id]: c.progress ?? 0 })); }}>Edit</button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {courses.length === 0 && <div className="text-sm text-gray-400">You have not enrolled in any courses yet.</div>}
              </div>
            </StatCard>
          </div>

          {/* Right column: profile card and actions */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/70 p-4 rounded-2xl border border-blue-700/30 text-center">
              <img src={profile?.avatar_url || '/assets/profile-avatar.jpg'} alt="profile" className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-2 border-blue-600" />
              <div className="mt-3">
                <button type="button" onClick={() => setEditing(true)} className="mb-2 w-full bg-blue-600 text-white py-2 rounded">Edit Profile</button>
                <button onClick={() => { const t = getSafeToken(); fetch('http://127.0.0.1:8000/api/export/', { headers: t ? { Authorization: `Bearer ${t}` } : {} }).then(async (r) => { if (!r.ok) throw await r.json(); return r.json() }).then((data) => { const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' }); const url = URL.createObjectURL(blob); const a = document.createElement('a'); a.href = url; a.download = 'futuretrack_data.json'; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url); }).catch(() => toast.error('Failed to export data')); }} className="w-full bg-green-600 text-white py-2 rounded">Download Data</button>
                <button onClick={onLogout} className="w-full bg-red-600 text-white py-2 rounded mt-2">Logout</button>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900/75 to-gray-800/60 p-4 rounded-2xl border border-blue-700/30">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-sm text-blue-200 font-semibold">Account</h4>
                <a className="text-xs text-blue-300">Manage</a>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <div>Email: <span className="font-medium text-gray-100">{profile?.email}</span></div>
                <div>Phone: <span className="font-medium text-gray-100">{profile?.phone || '—'}</span></div>
                <div>Goal: <span className="font-medium text-gray-100">{profile?.goal || '—'}</span></div>
              </div>
            </div>
          </div>
        </div>

        
          {/* Edit Profile Modal */}

          
          <EditProfileModal open={editing} onClose={() => setEditing(false)} profile={profile} form={form} setForm={setForm} avatarPreview={avatarPreview} setAvatarPreview={setAvatarPreview} handleSave={handleSave} saving={saving} error={error} getSafeToken={getSafeToken} />

      </div>
    </div>
  );
};

export default Dashboard;
