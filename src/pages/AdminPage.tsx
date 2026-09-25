import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import { Activity, CalendarDays, Compass, LogOut, Mountain, Plus, Save, ShieldCheck, Tent, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { Trek } from '../../shared/types/trek';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';

interface AdminTrekRow {
  id: string;
  slug: string;
  status: 'draft' | 'published' | 'archived';
  updated_at: string | null;
  category_name: string | null;
  website_content: Trek;
}

interface DepartureRow {
  id: string;
  trek_id: string;
  trek_title: string;
  starts_at: string;
  ends_at: string;
  seat_capacity: number;
  reserved_seats: number;
  remaining_seats: number;
  status: string;
}

interface DashboardData {
  treks: { total: number; published: number };
  departures: { upcoming: number };
  bookings: { total: number; payment_pending: number };
  pendingPayments: number;
}

interface BookingRow {
  id: string;
  booking_code: string;
  status: string;
  participant_count: number;
  total_minor: number;
  currency: string;
  customer_name: string;
  customer_phone: string;
  trek_title: string;
  starts_at: string;
  pickup_name: string | null;
}

const emptyTrek: Trek = {
  id: '', slug: '', title: '', host: 'Adventure Chaarana', date: 'Every Saturday Night', location: '',
  description: '', originalPrice: 0, currentPrice: 0, discount: '', image: '', badgeColor: 'bg-brand-orange',
  category: 'sunrise', duration: '1 day', difficulty: 'Moderate', itinerary: [], inclusions: [], exclusions: [], thingsToCarry: [],
};

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm text-slate-900 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100';
const labelClass = 'mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-500';

export default function AdminPage() {
  const { user, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authenticating, setAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const [activeSection, setActiveSection] = useState<'dashboard' | 'treks' | 'departures' | 'bookings'>('dashboard');
  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [treks, setTreks] = useState<AdminTrekRow[]>([]);
  const [departures, setDepartures] = useState<DepartureRow[]>([]);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [selectedTrekId, setSelectedTrekId] = useState<string | null>(null);
  const [trekEditorOpen, setTrekEditorOpen] = useState(false);
  const [trekForm, setTrekForm] = useState<Trek>(emptyTrek);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>('draft');
  const [itineraryText, setItineraryText] = useState('[]');
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState('');
  const [departureFormOpen, setDepartureFormOpen] = useState(false);
  const [departureTrekId, setDepartureTrekId] = useState('');
  const [departureStart, setDepartureStart] = useState('');
  const [departureEnd, setDepartureEnd] = useState('');
  const [departureCapacity, setDepartureCapacity] = useState('25');

  const api = async <T,>(url: string, init: RequestInit = {}): Promise<T> => {
    const idToken = await auth.currentUser?.getIdToken();
    if (!idToken) throw new Error('Your sign-in session has ended. Please sign in again.');
    const response = await fetch(url, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
        ...init.headers,
      },
    });
    const payload = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(payload.error?.message ?? `Request failed (${response.status})`);
    return payload as T;
  };

  const loadAdminData = async () => {
    setPageError('');
    try {
      const [summary, trekRows, departureRows, bookingRows] = await Promise.allSettled([
        api<DashboardData>('/api/v1/admin/dashboard'),
        api<AdminTrekRow[]>('/api/v1/admin/treks'),
        api<DepartureRow[]>('/api/v1/admin/departures'),
        api<BookingRow[]>('/api/v1/admin/bookings'),
      ]);
      if (summary.status === 'fulfilled') setDashboard(summary.value);
      if (trekRows.status === 'fulfilled') setTreks(trekRows.value);
      if (departureRows.status === 'fulfilled') setDepartures(departureRows.value);
      if (bookingRows.status === 'fulfilled') setBookings(bookingRows.value);

      const failedRequest = [summary, trekRows, departureRows, bookingRows]
        .find((result): result is PromiseRejectedResult => result.status === 'rejected');
      if (failedRequest) {
        setPageError(failedRequest.reason instanceof Error
          ? `Some admin data could not load: ${failedRequest.reason.message}`
          : 'Some admin data could not load.');
      }
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Unable to load admin data.');
    }
  };

  const verifyToken = async (idToken: string) => {
    const response = await fetch('/api/v1/admin/auth/verify', { method: 'POST', headers: { Authorization: `Bearer ${idToken}` } });
    if (!response.ok) {
      const payload = await response.json().catch(() => ({}));
      throw new Error(payload.error?.message ?? 'Admin sign-in could not be verified.');
    }
  };

  useEffect(() => {
    if (authLoading || !user) {
      setAuthenticated(false);
      return;
    }
    let active = true;
    void user.getIdToken()
      .then(verifyToken)
      .then(() => {
        if (active) {
          setAuthenticated(true);
          void loadAdminData();
        }
      })
      .catch((error: unknown) => {
        if (active) {
          setAuthenticated(false);
          setAuthError(error instanceof Error ? error.message : 'Unable to authenticate.');
          void signOut(auth);
        }
      });
    return () => { active = false; };
  }, [authLoading, user]);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setAuthError('');
    setAuthenticating(true);
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
    } catch (error) {
      setAuthError(error instanceof Error && 'code' in error
        ? 'Email or password is incorrect, or this account is not authorized for admin access.'
        : error instanceof Error ? error.message : 'Unable to sign in.');
    } finally {
      setAuthenticating(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAuthenticated(false);
    setDashboard(null);
  };

  const selectedTrek = useMemo(() => treks.find((trek) => trek.id === selectedTrekId), [treks, selectedTrekId]);
  const dashboardCards: Array<{ label: string; value: string | number; hint: string; icon: LucideIcon }> = [
    { label: 'TREKS', value: dashboard?.treks.total ?? '—', hint: `${dashboard?.treks.published ?? 0} published`, icon: Mountain },
    { label: 'UPCOMING DEPARTURES', value: dashboard?.departures.upcoming ?? '—', hint: 'Open and sold out', icon: CalendarDays },
    { label: 'BOOKINGS', value: dashboard?.bookings.total ?? '—', hint: `${dashboard?.bookings.payment_pending ?? 0} payment pending`, icon: Tent },
    { label: 'PENDING PAYMENTS', value: dashboard?.pendingPayments ?? '—', hint: 'Needs reconciliation', icon: Compass },
  ];

  const openTrek = (trek?: AdminTrekRow) => {
    setTrekEditorOpen(true);
    setSelectedTrekId(trek?.id ?? null);
    setStatus(trek?.status ?? 'draft');
    const nextTrek = trek?.website_content ?? { ...emptyTrek };
    setTrekForm(nextTrek);
    setItineraryText(JSON.stringify(nextTrek.itinerary ?? [], null, 2));
    setPageError('');
    setActiveSection('treks');
  };

  const saveTrek = async (event: FormEvent) => {
    event.preventDefault();
    setSaving(true);
    setPageError('');
    try {
      const itinerary = JSON.parse(itineraryText);
      if (!Array.isArray(itinerary)) throw new Error('Itinerary must be a JSON array of days.');
      const payload: Trek = { ...trekForm, itinerary };
      const endpoint = selectedTrekId ? `/api/v1/admin/treks/${selectedTrekId}` : '/api/v1/admin/treks';
      await api(endpoint, { method: selectedTrekId ? 'PUT' : 'POST', body: JSON.stringify({ ...payload, status }) });
      setSelectedTrekId(null);
      setTrekEditorOpen(false);
      await loadAdminData();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Unable to save trek.');
    } finally {
      setSaving(false);
    }
  };

  const toggleTrekStatus = async () => {
    if (!selectedTrek) return;
    const nextStatus = selectedTrek.status === 'published' ? 'draft' : 'published';
    try {
      await api(`/api/v1/admin/treks/${selectedTrek.id}/status`, { method: 'PATCH', body: JSON.stringify({ status: nextStatus }) });
      await loadAdminData();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Unable to update status.');
    }
  };

  const createDeparture = async (event: FormEvent) => {
    event.preventDefault();
    setPageError('');
    try {
      await api('/api/v1/admin/departures', {
        method: 'POST',
        body: JSON.stringify({ trekId: departureTrekId, startsAt: new Date(departureStart).toISOString(), endsAt: new Date(departureEnd).toISOString(), seatCapacity: Number(departureCapacity) }),
      });
      setDepartureFormOpen(false);
      await loadAdminData();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Unable to create departure.');
    }
  };

  const updateDepartureStatus = async (departureId: string, nextStatus: string) => {
    try {
      await api(`/api/v1/admin/departures/${departureId}`, { method: 'PATCH', body: JSON.stringify({ status: nextStatus }) });
      await loadAdminData();
    } catch (error) {
      setPageError(error instanceof Error ? error.message : 'Unable to update departure status.');
    }
  };

  if (authLoading || (user && !authenticated && !authError)) {
    return <main className="flex min-h-screen items-center justify-center bg-slate-950 text-sm font-semibold text-white">Checking admin sign in…</main>;
  }

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12 text-slate-900">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">
          <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-orange-100 text-orange-600"><ShieldCheck size={23} /></div>
          <p className="text-xs font-black uppercase tracking-[0.22em] text-orange-600">Adventure Chaarana</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight">Admin sign in</h1>
          <p className="mt-2 text-sm leading-6 text-slate-500">Sign in with your authorized admin email and password.</p>
          <label className="mt-6 block">
            <span className={labelClass}>Email address</span>
            <input className={inputClass} type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="username" required />
          </label>
          <label className="mt-4 block">
            <span className={labelClass}>Password</span>
            <input className={inputClass} type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete="current-password" required />
          </label>
          {authError && <p role="alert" className="mt-4 text-sm font-semibold text-red-600">{authError}</p>}
          <button disabled={authenticating} className="mt-6 w-full rounded-xl bg-slate-950 px-4 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-wait disabled:opacity-60">{authenticating ? 'Signing in…' : 'Sign in'}</button>
        </form>
      </main>
    );
  }

  const sidebar = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: Activity },
    { id: 'treks' as const, label: 'Treks', icon: Mountain },
    { id: 'departures' as const, label: 'Departures', icon: CalendarDays },
    { id: 'bookings' as const, label: 'Bookings', icon: Tent },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col bg-slate-950 px-5 py-6 text-white lg:flex">
        <a href="/" className="mb-10 flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-orange-500"><Mountain size={20} /></span>
          <span><strong className="block text-sm">ADVENTURE</strong><small className="text-[10px] font-bold tracking-[0.2em] text-white/50">CHAARANA ADMIN</small></span>
        </a>
        <nav className="space-y-1">
          {sidebar.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setActiveSection(id); setSelectedTrekId(null); setTrekEditorOpen(false); }} className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold transition ${activeSection === id ? 'bg-orange-500 text-white' : 'text-white/60 hover:bg-white/10 hover:text-white'}`}>
              <Icon size={17} />{label}
            </button>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-4">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-white/60 hover:bg-white/10 hover:text-white"><LogOut size={17} />Sign out</button>
        </div>
      </aside>

      <main className="min-h-screen lg:pl-64">
        <header className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white/90 px-5 py-4 backdrop-blur md:px-8">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600">Adventure Chaarana</p>
            <h1 className="text-lg font-black">{selectedTrekId ? (selectedTrek?.website_content.title ?? 'Edit trek') : activeSection[0].toUpperCase() + activeSection.slice(1)}</h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" className="hidden text-sm font-bold text-slate-500 hover:text-orange-600 sm:block">View website</a>
            <button onClick={handleLogout} className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 lg:hidden" aria-label="Sign out"><LogOut size={17} /></button>
          </div>
        </header>

        <nav className="flex gap-2 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 lg:hidden">
          {sidebar.map(({ id, label }) => <button key={id} onClick={() => { setActiveSection(id); setSelectedTrekId(null); setTrekEditorOpen(false); }} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-black ${activeSection === id ? 'bg-orange-500 text-white' : 'text-slate-500'}`}>{label}</button>)}
        </nav>

        <div className="p-5 md:p-8">
          {pageError && <div role="alert" className="mb-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">{pageError}</div>}

          {activeSection === 'dashboard' && (
            <section>
              <div className="mb-7">
                <h2 className="text-2xl font-black tracking-tight">Your trips at a glance</h2>
                <p className="mt-1 text-sm text-slate-500">Manage trek content and upcoming departures.</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {dashboardCards.map(({ label, value, hint, icon: Icon }) => (
                  <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between"><span className="text-[10px] font-black tracking-widest text-slate-400">{label}</span><span className="rounded-xl bg-orange-50 p-2 text-orange-600"><Icon size={17} /></span></div>
                    <p className="mt-5 text-3xl font-black">{value}</p><p className="mt-1 text-xs font-semibold text-slate-500">{hint}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-5">
                <div className="mb-4 flex items-center justify-between"><h3 className="font-black">Upcoming departures</h3><button onClick={() => setActiveSection('departures')} className="text-xs font-black text-orange-600">View all</button></div>
                {departures.filter((item) => new Date(item.starts_at) >= new Date()).slice(0, 5).map((departure) => (
                  <div key={departure.id} className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 py-3 text-sm">
                    <span className="font-bold">{departure.trek_title}</span><span className="text-slate-500">{new Date(departure.starts_at).toLocaleDateString()}</span><span className="font-bold text-orange-600">{departure.reserved_seats}/{departure.seat_capacity} booked</span>
                  </div>
                ))}
                {!departures.length && <p className="text-sm text-slate-500">No departures created yet.</p>}
              </div>
            </section>
          )}

          {activeSection === 'treks' && !trekEditorOpen && (
            <section>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div><h2 className="text-2xl font-black tracking-tight">Trek catalog</h2><p className="mt-1 text-sm text-slate-500">Edit products once; use departures for each scheduled date.</p></div>
                <button onClick={() => openTrek()} className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-black text-white shadow-sm hover:bg-orange-600"><Plus size={17} />Add trek</button>
              </div>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <div className="grid grid-cols-[1fr_auto] gap-4 bg-slate-50 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-slate-400 md:grid-cols-[1fr_180px_120px_130px]"><span>Trek</span><span className="hidden md:block">Category</span><span>Status</span><span className="hidden md:block">Updated</span></div>
                {treks.map((row) => (
                  <button key={row.id} onClick={() => openTrek(row)} className="grid w-full grid-cols-[1fr_auto] items-center gap-4 border-t border-slate-100 px-5 py-4 text-left transition hover:bg-orange-50/40 md:grid-cols-[1fr_180px_120px_130px]">
                    <span><strong className="block text-sm">{row.website_content.title}</strong><small className="text-xs text-slate-400">/{row.slug}</small></span>
                    <span className="hidden text-sm text-slate-500 md:block">{row.category_name ?? '—'}</span>
                    <span className={`rounded-full px-2.5 py-1 text-center text-[10px] font-black uppercase ${row.status === 'published' ? 'bg-emerald-100 text-emerald-700' : row.status === 'archived' ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'}`}>{row.status}</span>
                    <span className="hidden text-xs text-slate-400 md:block">{row.updated_at ? new Date(row.updated_at).toLocaleDateString() : 'Website content'}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          {activeSection === 'treks' && trekEditorOpen && (
            <form onSubmit={saveTrek} className="mx-auto max-w-5xl space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div><h2 className="text-2xl font-black">{selectedTrek ? 'Edit trek' : 'Add trek'}</h2><p className="mt-1 text-sm text-slate-500">Core details, pricing, and structured trip content.</p></div>
                <div className="flex gap-2">
                  {selectedTrek && <button type="button" onClick={toggleTrekStatus} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold">{selectedTrek.status === 'published' ? 'Unpublish' : 'Publish'}</button>}
                  <button type="button" onClick={() => { setSelectedTrekId(null); setTrekEditorOpen(false); }} className="rounded-xl border border-slate-200 p-2.5 text-slate-500" aria-label="Close editor"><X size={18} /></button>
                  <button disabled={saving} className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-black text-white disabled:opacity-60"><Save size={16} />{saving ? 'Saving…' : 'Save draft'}</button>
                </div>
              </div>
              <div className="grid gap-5 rounded-2xl border border-slate-200 bg-white p-5 md:grid-cols-2">
                <label><span className={labelClass}>Trek name</span><input className={inputClass} required value={trekForm.title} onChange={(event) => setTrekForm({ ...trekForm, title: event.target.value })} /></label>
                <label><span className={labelClass}>URL slug</span><input className={inputClass} required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" value={trekForm.slug} onChange={(event) => setTrekForm({ ...trekForm, slug: event.target.value })} /></label>
                <label><span className={labelClass}>Location</span><input className={inputClass} required value={trekForm.location} onChange={(event) => setTrekForm({ ...trekForm, location: event.target.value })} /></label>
                <label><span className={labelClass}>Category key</span><select className={inputClass} value={trekForm.category} onChange={(event) => setTrekForm({ ...trekForm, category: event.target.value })}><option value="sunrise">Sunrise</option><option value="western-ghats">Western Ghats</option><option value="weekend">Weekend Getaways</option></select></label>
                <label><span className={labelClass}>Duration</span><input className={inputClass} value={trekForm.duration} onChange={(event) => setTrekForm({ ...trekForm, duration: event.target.value })} /></label>
                <label><span className={labelClass}>Difficulty</span><select className={inputClass} value={trekForm.difficulty} onChange={(event) => setTrekForm({ ...trekForm, difficulty: event.target.value as Trek['difficulty'] })}><option>Easy</option><option>Moderate</option><option>Difficult</option><option>Moderate - Difficult</option></select></label>
                <label><span className={labelClass}>With transport price (₹)</span><input className={inputClass} type="number" min="0" value={trekForm.currentPrice} onChange={(event) => setTrekForm({ ...trekForm, currentPrice: Number(event.target.value) })} /></label>
                <label><span className={labelClass}>Original price (₹)</span><input className={inputClass} type="number" min="0" value={trekForm.originalPrice} onChange={(event) => setTrekForm({ ...trekForm, originalPrice: Number(event.target.value) })} /></label>
                <label><span className={labelClass}>Self-travel price (optional, ₹)</span><input className={inputClass} type="number" min="0" value={trekForm.withoutTransportPrice ?? ''} onChange={(event) => setTrekForm({ ...trekForm, withoutTransportPrice: event.target.value ? Number(event.target.value) : undefined })} /></label>
                <label><span className={labelClass}>Cover image URL</span><input className={inputClass} type="url" value={trekForm.image} onChange={(event) => setTrekForm({ ...trekForm, image: event.target.value })} /></label>
                <label className="md:col-span-2"><span className={labelClass}>Description</span><textarea className={inputClass} rows={3} value={trekForm.description} onChange={(event) => setTrekForm({ ...trekForm, description: event.target.value })} /></label>
                <label className="md:col-span-2"><span className={labelClass}>Day-wise itinerary (JSON)</span><textarea className={`${inputClass} font-mono text-xs`} rows={12} value={itineraryText} onChange={(event) => setItineraryText(event.target.value)} /></label>
                <label><span className={labelClass}>Inclusions (one per line)</span><textarea className={inputClass} rows={5} value={trekForm.inclusions.join('\n')} onChange={(event) => setTrekForm({ ...trekForm, inclusions: event.target.value.split('\n').filter(Boolean) })} /></label>
                <label><span className={labelClass}>Exclusions (one per line)</span><textarea className={inputClass} rows={5} value={trekForm.exclusions.join('\n')} onChange={(event) => setTrekForm({ ...trekForm, exclusions: event.target.value.split('\n').filter(Boolean) })} /></label>
                <label><span className={labelClass}>Packing list (one per line)</span><textarea className={inputClass} rows={5} value={trekForm.thingsToCarry.join('\n')} onChange={(event) => setTrekForm({ ...trekForm, thingsToCarry: event.target.value.split('\n').filter(Boolean) })} /></label>
                <label><span className={labelClass}>Gallery URLs (one per line)</span><textarea className={inputClass} rows={5} value={(trekForm.gallery ?? []).join('\n')} onChange={(event) => setTrekForm({ ...trekForm, gallery: event.target.value.split('\n').filter(Boolean) })} /></label>
              </div>
            </form>
          )}

          {activeSection === 'departures' && (
            <section>
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <div><h2 className="text-2xl font-black tracking-tight">Departure batches</h2><p className="mt-1 text-sm text-slate-500">Each batch owns its dates and seat capacity; trek content stays reusable.</p></div>
                <button onClick={() => { setDepartureTrekId(treks.find((trek) => trek.status === 'published')?.id ?? ''); setDepartureFormOpen(true); }} className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-3 text-sm font-black text-white"><Plus size={17} />Add departure</button>
              </div>
              {departureFormOpen && <form onSubmit={createDeparture} className="mb-6 grid gap-4 rounded-2xl border border-orange-200 bg-orange-50 p-5 md:grid-cols-5">
                <label className="md:col-span-2"><span className={labelClass}>Published trek</span><select className={inputClass} value={departureTrekId} onChange={(event) => setDepartureTrekId(event.target.value)} required>{treks.filter((trek) => trek.status === 'published').map((trek) => <option key={trek.id} value={trek.id}>{trek.website_content.title}</option>)}</select></label>
                <label><span className={labelClass}>Starts</span><input className={inputClass} type="datetime-local" value={departureStart} onChange={(event) => setDepartureStart(event.target.value)} required /></label>
                <label><span className={labelClass}>Ends</span><input className={inputClass} type="datetime-local" value={departureEnd} onChange={(event) => setDepartureEnd(event.target.value)} required /></label>
                <label><span className={labelClass}>Capacity</span><input className={inputClass} type="number" min="1" value={departureCapacity} onChange={(event) => setDepartureCapacity(event.target.value)} required /></label>
                <div className="flex gap-2 md:col-span-5"><button className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-bold text-white">Create draft departure</button><button type="button" onClick={() => setDepartureFormOpen(false)} className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-bold">Cancel</button></div>
              </form>}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400"><tr><th className="px-5 py-3">Trek</th><th className="px-5 py-3">Dates</th><th className="px-5 py-3">Seats</th><th className="px-5 py-3">Status</th></tr></thead><tbody>{departures.map((departure) => <tr key={departure.id} className="border-t border-slate-100"><td className="px-5 py-4 font-bold">{departure.trek_title}</td><td className="px-5 py-4 text-slate-500">{new Date(departure.starts_at).toLocaleString()} – {new Date(departure.ends_at).toLocaleDateString()}</td><td className="px-5 py-4 font-bold">{departure.reserved_seats}/{departure.seat_capacity} <span className="font-normal text-slate-400">({departure.remaining_seats} left)</span></td><td className="px-5 py-4"><select aria-label={`Status for ${departure.trek_title}`} className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-xs font-bold" value={departure.status} onChange={(event) => void updateDepartureStatus(departure.id, event.target.value)}>{['draft','open','sold_out','cancelled','completed'].map((item) => <option key={item} value={item}>{item.replaceAll('_',' ')}</option>)}</select></td></tr>)}</tbody></table>
                {!departures.length && <p className="p-8 text-center text-sm text-slate-500">No departures yet. Publish a trek, then add its first batch.</p>}
              </div>
            </section>
          )}

          {activeSection === 'bookings' && (
            <section>
              <div className="mb-6"><h2 className="text-2xl font-black tracking-tight">Bookings</h2><p className="mt-1 text-sm text-slate-500">Participant and payment status for every booking.</p></div>
              <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
                <table className="w-full min-w-[850px] text-left text-sm"><thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400"><tr><th className="px-5 py-3">Booking / Customer</th><th className="px-5 py-3">Trek / Departure</th><th className="px-5 py-3">People</th><th className="px-5 py-3">Total</th><th className="px-5 py-3">Status</th></tr></thead><tbody>{bookings.map((booking) => <tr key={booking.id} className="border-t border-slate-100"><td className="px-5 py-4"><strong className="block">{booking.booking_code}</strong><span>{booking.customer_name}</span><small className="block text-slate-400">{booking.customer_phone}</small></td><td className="px-5 py-4"><strong className="block">{booking.trek_title}</strong><span className="text-xs text-slate-500">{new Date(booking.starts_at).toLocaleDateString()} · {booking.pickup_name ?? 'No pickup selected'}</span></td><td className="px-5 py-4">{booking.participant_count}</td><td className="px-5 py-4 font-bold">₹{(booking.total_minor / 100).toLocaleString('en-IN')}</td><td className="px-5 py-4"><span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-black uppercase">{booking.status.replaceAll('_', ' ')}</span></td></tr>)}</tbody></table>
                {!bookings.length && <p className="p-8 text-center text-sm text-slate-500">No bookings have been created yet.</p>}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
