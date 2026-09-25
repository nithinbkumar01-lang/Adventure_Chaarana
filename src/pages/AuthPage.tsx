import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  RecaptchaVerifier,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import type { ConfirmationResult } from 'firebase/auth';
import { ArrowLeft, CheckCircle2, LockKeyhole, Mail, Mountain, Phone, UserRound } from 'lucide-react';
import { auth } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { Seo } from '../components/Seo';

type AuthMode = 'signin' | 'signup' | 'forgot';
type AuthMethod = 'email' | 'phone';

const inputClass = 'w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-brand-dark outline-none transition placeholder:text-slate-400 focus:border-brand-orange focus:ring-4 focus:ring-orange-100';

function getAuthError(error: unknown) {
  const code = (error as { code?: string })?.code;
  const messages: Record<string, string> = {
    'auth/email-already-in-use': 'An account already exists with this email. Try signing in instead.',
    'auth/invalid-email': 'Enter a valid email address.',
    'auth/invalid-credential': 'That email/phone or password doesn’t match an account.',
    'auth/user-not-found': 'No account was found. Create an account first.',
    'auth/wrong-password': 'That password is incorrect. Try again or reset it.',
    'auth/weak-password': 'Choose a password with at least 8 characters.',
    'auth/too-many-requests': 'Too many attempts. Wait a little while and try again.',
    'auth/popup-closed-by-user': 'The Google sign-in window was closed before finishing.',
    'auth/popup-blocked': 'Your browser blocked the Google sign-in window. Allow pop-ups and try again.',
    'auth/account-exists-with-different-credential': 'An account already exists with this email using a different sign-in method. Sign in with that method first.',
    'auth/invalid-phone-number': 'Enter a valid phone number with its country code, such as +91 9980489494.',
    'auth/missing-phone-number': 'Enter your phone number with its country code.',
    'auth/invalid-verification-code': 'That SMS code is incorrect. Check it and try again.',
    'auth/code-expired': 'That SMS code has expired. Request a new code.',
    'auth/captcha-check-failed': 'reCAPTCHA verification failed. Try again.',
    'auth/operation-not-allowed': 'This sign-in method is not enabled in Firebase Authentication yet.',
    'auth/unauthorized-domain': 'This website domain is not authorized in Firebase Authentication settings.',
    'auth/network-request-failed': 'A network error interrupted sign-in. Check your connection and retry.',
  };
  return (code && messages[code]) || (error instanceof Error ? error.message : 'Unable to complete sign-in. Please try again.');
}

function GoogleMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 48" className="size-5">
      <path fill="#FFC107" d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.8-3.5 6.1-8.7 6.1-15Z" />
      <path fill="#FF3D00" d="M24 44c5.4 0 10-1.8 13.4-4.9l-6.6-5.1c-1.8 1.2-4.1 2-6.8 2-5.2 0-9.6-3.5-11.2-8.2H6v5.2A20 20 0 0 0 24 44Z" />
      <path fill="#4CAF50" d="M12.8 27.8a12 12 0 0 1 0-7.6V15H6a20 20 0 0 0 0 18l6.8-5.2Z" />
      <path fill="#1976D2" d="M24 12.1c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 6.1 29.4 4 24 4A20 20 0 0 0 6 15l6.8 5.2c1.6-4.7 6-8.1 11.2-8.1Z" />
    </svg>
  );
}

export default function AuthPage() {
  const { user, isLoading } = useAuth();
  const [mode, setMode] = useState<AuthMode>('signin');
  const [method, setMethod] = useState<AuthMethod>('email');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const verifier = useRef<RecaptchaVerifier | null>(null);
  const recaptchaContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => () => verifier.current?.clear(), []);

  const resetFeedback = () => {
    setNotice('');
    setError('');
  };

  const changeMode = (nextMode: AuthMode) => {
    resetFeedback();
    setMode(nextMode);
  };

  const changeMethod = (nextMethod: AuthMethod) => {
    resetFeedback();
    setMethod(nextMethod);
    setConfirmation(null);
    setSmsCode('');
    verifier.current?.clear();
    verifier.current = null;
  };

  const handleEmailSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFeedback();
    setBusy(true);
    try {
      if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, email.trim());
        setNotice(`Password reset instructions were sent to ${email.trim()}.`);
      } else if (mode === 'signup') {
        const credential = await createUserWithEmailAndPassword(auth, email.trim(), password);
        if (name.trim()) await updateProfile(credential.user, { displayName: name.trim() });
        await sendEmailVerification(credential.user);
        setNotice('Your account is ready. Check your email for a verification link.');
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
        setNotice('You’re signed in.');
      }
    } catch (submitError) {
      setError(getAuthError(submitError));
    } finally {
      setBusy(false);
    }
  };

  const handleGoogleSignIn = async () => {
    resetFeedback();
    setBusy(true);
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      setNotice('You’re signed in with Google.');
    } catch (signInError) {
      setError(getAuthError(signInError));
    } finally {
      setBusy(false);
    }
  };

  const handleSendCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    resetFeedback();
    setBusy(true);
    try {
      if (!verifier.current) {
        if (!recaptchaContainer.current) throw new Error('The reCAPTCHA container is not ready. Refresh the page and try again.');
        verifier.current = new RecaptchaVerifier(auth, recaptchaContainer.current, { size: 'normal' });
      }
      const result = await signInWithPhoneNumber(auth, phone.trim(), verifier.current);
      setConfirmation(result);
      setNotice(`A verification code was sent to ${phone.trim()}.`);
    } catch (sendError) {
      verifier.current?.clear();
      verifier.current = null;
      setError(getAuthError(sendError));
    } finally {
      setBusy(false);
    }
  };

  const handleConfirmCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!confirmation) return;
    resetFeedback();
    setBusy(true);
    try {
      await confirmation.confirm(smsCode.trim());
      setNotice('Your phone is verified and you’re signed in.');
      verifier.current?.clear();
      verifier.current = null;
    } catch (confirmError) {
      setError(getAuthError(confirmError));
    } finally {
      setBusy(false);
    }
  };

  const handleSignOut = async () => {
    setBusy(true);
    try {
      await signOut(auth);
      setNotice('You have been signed out.');
    } catch (signOutError) {
      setError(getAuthError(signOutError));
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className="relative z-10 flex min-h-[78vh] items-center justify-center px-4 pb-20 pt-36 sm:px-6 md:pt-40">
      <Seo title="Sign In or Create an Account | Adventure Chaarana" description="Sign in or create your Adventure Chaarana account to manage your trekking and travel bookings." path="/auth" noindex />
      <section className="grid w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/70 bg-white shadow-[0_32px_100px_-40px_rgba(15,15,15,0.3)] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative hidden min-h-[650px] overflow-hidden bg-brand-dark p-10 text-white md:flex md:flex-col md:justify-between">
          <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(15,15,15,0.97),rgba(15,15,15,0.7),rgba(232,117,26,0.35)),url('https://res.cloudinary.com/dofg6bsom/image/upload/v1777477957/Background_tdfgts.png')] bg-cover bg-center" />
          <Link to="/" className="relative inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em]">
            <span className="flex size-10 items-center justify-center rounded-xl bg-brand-orange"><Mountain size={20} /></span>
            Adventure Chaarana
          </Link>
          <div className="relative max-w-sm">
            <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-orange-300">Find your wild</p>
            <h1 className="font-syne text-5xl font-black leading-[1.04]">Your next trail starts here.</h1>
            <p className="mt-5 text-sm leading-7 text-white/70">Sign in to keep your adventures, bookings, and plans close at hand.</p>
          </div>
          <p className="relative text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">Go farther, together · Bengaluru, India</p>
        </div>

        <div className="px-6 py-9 sm:px-10 sm:py-12 md:px-12">
          <Link to="/" className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-slate-500 transition hover:text-brand-orange md:hidden">
            <ArrowLeft size={15} /> Back to Adventure Chaarana
          </Link>

          {isLoading ? (
            <div className="flex min-h-[420px] items-center justify-center text-sm font-semibold text-slate-500">Loading your account…</div>
          ) : user ? (
            <div className="flex min-h-[420px] flex-col justify-center">
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-orange-100 text-brand-orange"><CheckCircle2 size={27} /></div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">Your account</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">Welcome{user.displayName ? `, ${user.displayName.split(' ')[0]}` : ' back'}.</h2>
              <p className="mt-3 break-all text-sm text-slate-500">{user.email ?? user.phoneNumber}</p>
              {user.email && !user.emailVerified && <p className="mt-5 rounded-xl bg-orange-50 p-4 text-sm leading-6 text-orange-800">Please check your inbox for the email verification link.</p>}
              {notice && <p role="status" className="mt-5 text-sm font-semibold text-emerald-700">{notice}</p>}
              {error && <p role="alert" className="mt-5 text-sm font-semibold text-red-600">{error}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/" className="rounded-xl bg-brand-orange px-5 py-3 text-sm font-black text-white transition hover:bg-orange-600">Explore treks</Link>
                <button onClick={() => void handleSignOut()} disabled={busy} className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-600 transition hover:border-slate-400 disabled:opacity-50">{busy ? 'Signing out…' : 'Sign out'}</button>
              </div>
            </div>
          ) : (
            <>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-brand-orange">Adventure Chaarana</p>
              <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                {mode === 'signup' ? 'Create your account' : mode === 'forgot' ? 'Reset your password' : 'Welcome back'}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                {mode === 'signup' ? 'Join us and keep your next adventure in reach.' : mode === 'forgot' ? 'We’ll email you a secure password reset link.' : 'Sign in to continue your adventure.'}
              </p>

              {mode !== 'forgot' && (
                <>
                  <button type="button" onClick={() => void handleGoogleSignIn()} disabled={busy} className="mt-7 flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 px-4 py-3.5 text-sm font-bold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 disabled:opacity-50">
                    <GoogleMark /> Continue with Google
                  </button>
                  <div className="my-6 flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400"><span className="h-px flex-1 bg-slate-200" />or continue with<span className="h-px flex-1 bg-slate-200" /></div>
                  <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
                    <button type="button" onClick={() => changeMethod('email')} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-black transition ${method === 'email' ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-500'}`}><Mail size={15} /> Email</button>
                    <button type="button" onClick={() => changeMethod('phone')} className={`flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-xs font-black transition ${method === 'phone' ? 'bg-white text-brand-dark shadow-sm' : 'text-slate-500'}`}><Phone size={15} /> Phone</button>
                  </div>
                </>
              )}

              {method === 'email' || mode === 'forgot' ? (
                <form onSubmit={(event) => void handleEmailSubmit(event)} className="space-y-4">
                  {mode === 'signup' && <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Full name</span><span className="relative block"><UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input className={`${inputClass} pl-10`} type="text" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" required /></span></label>}
                  <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Email address</span><span className="relative block"><Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input className={`${inputClass} pl-10`} type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></span></label>
                  {mode !== 'forgot' && <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Password</span><span className="relative block"><LockKeyhole className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input className={`${inputClass} pl-10`} type="password" autoComplete={mode === 'signup' ? 'new-password' : 'current-password'} value={password} onChange={(event) => setPassword(event.target.value)} placeholder={mode === 'signup' ? 'At least 8 characters' : 'Your password'} minLength={8} required /></span></label>}
                  {mode === 'signin' && <div className="-mt-1 text-right"><button type="button" onClick={() => changeMode('forgot')} className="text-xs font-bold text-brand-orange hover:text-orange-700">Forgot password?</button></div>}
                  <button disabled={busy} className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-orange px-4 py-3.5 text-sm font-black text-white shadow-lg shadow-orange-600/15 transition hover:-translate-y-0.5 hover:bg-orange-600 disabled:translate-y-0 disabled:opacity-60">
                    {busy ? 'Please wait…' : mode === 'signup' ? 'Create account' : mode === 'forgot' ? 'Send reset link' : 'Sign in'}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  {!confirmation ? (
                    <form onSubmit={(event) => void handleSendCode(event)} className="space-y-4">
                      <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">Phone number</span><span className="relative block"><Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={17} /><input className={`${inputClass} pl-10`} type="tel" autoComplete="tel" inputMode="tel" value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="+91 9980489494" required /></span><span className="mt-1.5 block text-xs leading-5 text-slate-400">Include the country code. Firebase sends a one-time SMS code.</span></label>
                      <div ref={recaptchaContainer} className="min-h-0" />
                      <button disabled={busy} className="w-full rounded-xl bg-brand-orange px-4 py-3.5 text-sm font-black text-white transition hover:bg-orange-600 disabled:opacity-60">{busy ? 'Sending code…' : 'Send verification code'}</button>
                    </form>
                  ) : (
                    <form onSubmit={(event) => void handleConfirmCode(event)} className="space-y-4">
                      <label className="block"><span className="mb-1.5 block text-xs font-bold text-slate-600">SMS verification code</span><input className={inputClass} type="text" autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]*" maxLength={6} value={smsCode} onChange={(event) => setSmsCode(event.target.value)} placeholder="6-digit code" required /></label>
                      <button disabled={busy || smsCode.trim().length < 6} className="w-full rounded-xl bg-brand-orange px-4 py-3.5 text-sm font-black text-white transition hover:bg-orange-600 disabled:opacity-60">{busy ? 'Verifying…' : 'Verify and sign in'}</button>
                      <button type="button" onClick={() => { verifier.current?.clear(); verifier.current = null; setConfirmation(null); setSmsCode(''); resetFeedback(); }} className="w-full text-xs font-bold text-slate-500 hover:text-brand-orange">Use a different number</button>
                    </form>
                  )}
                </div>
              )}

              {notice && <p role="status" className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-semibold leading-6 text-emerald-800">{notice}</p>}
              {error && <p role="alert" className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold leading-6 text-red-700">{error}</p>}

              <div className="mt-6 text-center text-sm text-slate-500">
                {mode === 'forgot' ? (
                  <button type="button" onClick={() => changeMode('signin')} className="inline-flex items-center gap-2 font-bold text-brand-orange hover:text-orange-700"><ArrowLeft size={15} /> Back to sign in</button>
                ) : mode === 'signup' ? (
                  <>Already have an account? <button type="button" onClick={() => changeMode('signin')} className="font-black text-brand-orange hover:text-orange-700">Sign in</button></>
                ) : (
                  <>New to Adventure Chaarana? <button type="button" onClick={() => changeMode('signup')} className="font-black text-brand-orange hover:text-orange-700">Create an account</button></>
                )}
              </div>
              {method === 'phone' && mode !== 'forgot' && <p className="mt-6 text-center text-[11px] leading-5 text-slate-400">SMS verification is subject to carrier rates and Firebase abuse protection.</p>}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
