import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Wordmark } from '../components/ui/BrandLogo';
import usePageMeta from '../hooks/usePageMeta';
import { PORTALS, portalLogin } from '../lib/portalLogin';

const CAPTCHA_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
const newCaptcha = () => Array.from({ length: 5 }, () => CAPTCHA_CHARS[Math.floor(Math.random() * CAPTCHA_CHARS.length)]).join('');

/**
 * Common login of the three portals. The user picks the login type; the
 * credentials only go to that portal's backend, so a wrong password never
 * counts against an account in another portal.
 */
const LoginPage = () => {
    usePageMeta('Login', 'Sign in to the iBima Assist Super Admin, Admin and Claim portals.');
    const [params] = useSearchParams();
    const [type, setType] = useState(PORTALS.some((p) => p.key === params.get('type')) ? params.get('type') : 'claim');
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [captcha, setCaptcha] = useState(newCaptcha);
    const [captchaInput, setCaptchaInput] = useState('');
    const [error, setError] = useState(params.get('expired') ? 'Your session has ended. Please sign in again.' : '');
    const [busy, setBusy] = useState(false);
    const portal = PORTALS.find((p) => p.key === type);

    useEffect(() => {
        setError((e) => (e.startsWith('Your session') ? e : ''));
    }, [type]);

    const refresh = () => {
        setCaptcha(newCaptcha());
        setCaptchaInput('');
    };

    const submit = async (e) => {
        e.preventDefault();
        if (!identifier.trim()) return setError(`Enter your ${portal.idLabel}.`);
        if (!password) return setError('Enter your password.');
        if (captchaInput.trim() !== captcha) {
            refresh();
            return setError('Captcha does not match (it is case-sensitive).');
        }
        setError('');
        setBusy(true);
        try {
            window.location.assign(await portalLogin(type, identifier.trim(), password));
        } catch (err) {
            setError(err.message);
            setPassword('');
            refresh();
            setBusy(false);
        }
        return undefined;
    };

    const field = 'w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-brand-500 focus:bg-white focus:ring-2 focus:ring-brand-100';

    return (
        <section className="surface-deep flex min-h-[calc(100vh-5rem)] items-center justify-center px-4 py-16">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
                <div className="mb-5 flex flex-col items-center gap-2 text-center">
                    <Wordmark className="text-[1.6rem]" />
                    <h1 className="m-0 text-xl font-bold text-slate-900">Sign in</h1>
                    <p className="m-0 text-sm text-slate-600">Choose your login type and use the account your administrator created.</p>
                </div>

                <div role="radiogroup" aria-label="Login type" className="mb-5 grid grid-cols-3 gap-1 rounded-xl bg-slate-100 p-1">
                    {PORTALS.map((p) => (
                        <button
                            key={p.key}
                            type="button"
                            role="radio"
                            aria-checked={type === p.key}
                            onClick={() => setType(p.key)}
                            className={`rounded-lg px-2 py-2 text-[13px] font-semibold transition ${
                                type === p.key ? 'bg-white text-brand-600 shadow' : 'text-slate-600 hover:text-slate-900'
                            }`}
                        >
                            {p.label}
                        </button>
                    ))}
                </div>
                <p className="-mt-3 mb-4 text-center text-xs text-slate-500">{portal.hint}</p>

                <form onSubmit={submit} noValidate className="flex flex-col gap-3.5">
                    <label className="block text-sm">
                        <span className="mb-1.5 block font-semibold text-slate-800">{portal.idLabel}</span>
                        <input className={field} value={identifier} onChange={(e) => setIdentifier(e.target.value)} autoComplete="username" placeholder={portal.idPlaceholder} />
                    </label>
                    <label className="block text-sm">
                        <span className="mb-1.5 block font-semibold text-slate-800">Password</span>
                        <input className={field} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" placeholder="Enter password" />
                    </label>
                    <div className="flex items-center gap-3">
                        <span data-testid="captcha" className="rounded-md bg-slate-100 px-3 py-1.5 font-mono text-sm tracking-[0.5em] text-slate-900 select-none">
                            {captcha}
                        </span>
                        <button type="button" onClick={refresh} className="text-xs font-semibold text-brand-600 hover:underline">
                            New captcha
                        </button>
                    </div>
                    <input className={field} value={captchaInput} onChange={(e) => setCaptchaInput(e.target.value)} aria-label="Captcha" placeholder="Enter the captcha" />

                    {error ? (
                        <p role="alert" className="m-0 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">
                            {error}
                        </p>
                    ) : null}

                    <button
                        type="submit"
                        disabled={busy}
                        className="rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
                    >
                        {busy ? 'Signing in…' : 'Sign In'}
                    </button>
                    <p className="m-0 text-center text-xs text-slate-500">Forgot your password? Ask your administrator to reset it.</p>
                </form>
            </div>
        </section>
    );
};

export default LoginPage;
