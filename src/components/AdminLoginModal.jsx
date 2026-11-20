import { useEffect, useState } from 'react';
import { Eye, EyeOff, KeyRound, Lock, ShieldCheck, X } from 'lucide-react';
import { useTours } from '../context/ToursContext';

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const { loginAdmin, defaultPassword } = useTours();
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) return undefined;

    setPassword('');
    setShowPassword(false);
    setError('');

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password.trim()) {
      setError('Enter your owner password to unlock the studio.');
      return;
    }

    const ok = loginAdmin(password);
    if (!ok) {
      setError('Incorrect owner password. Please try again.');
      return;
    }

    setError('');
    onSuccess();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-login-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl border border-bronze/40 bg-obsidian text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.2em] uppercase text-bronze">
              <Lock className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Owner Access Only</span>
            </p>
            <h2
              id="admin-login-title"
              className="mt-1.5 font-display text-2xl font-semibold text-white"
            >
              Tourly.pk Admin Studio
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close owner login"
            className="rounded-full border border-white/15 bg-white/5 p-2 text-white/75 transition-colors hover:border-bronze hover:text-bronze cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <p className="text-xs leading-relaxed text-white/75">
            Sign in to add or edit tour packages, adjust seasonal PKR pricing, update departure schedules, or manage official WhatsApp lines.
          </p>

          <div>
            <label htmlFor="admin-password-input" className="block text-xs font-medium text-white/90">
              Owner PIN / Password
            </label>
            <div className="relative mt-2">
              <KeyRound
                className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-bronze"
                aria-hidden="true"
              />
              <input
                id="admin-password-input"
                type={showPassword ? 'text' : 'password'}
                autoFocus
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Enter owner password..."
                className="w-full rounded-xl border border-white/15 bg-pine-slate/70 py-2.5 pr-10 pl-10 text-sm text-white placeholder:text-white/40 focus:border-bronze focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-white/60 transition-colors hover:text-bronze cursor-pointer"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-2.5 rounded-lg border border-copper/50 bg-copper/15 px-3 py-2 text-xs font-medium text-white"
              >
                {error}
              </p>
            )}
          </div>

          {/* Development Helper Note */}
          <div className="rounded-xl border border-bronze/30 bg-pine-slate/55 px-4 py-3 text-xs text-white/80">
            <div className="flex items-center gap-2 font-semibold text-bronze">
              <ShieldCheck className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Owner Demo Access Note</span>
            </div>
            <p className="mt-1 leading-relaxed text-white/75">
              Default owner password is{' '}
              <code className="rounded bg-obsidian px-1.5 py-0.5 font-mono text-[11px] font-semibold text-bronze">
                {defaultPassword}
              </code>{' '}
              (you can change it anytime inside Admin Settings).
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-white/15 px-4 py-2.5 text-xs font-medium text-white/80 transition-colors hover:border-bronze hover:text-white cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-2.5 text-xs font-semibold tracking-wide text-white shadow-sm transition-all duration-200 hover:bg-copper-hover cursor-pointer"
            >
              <span>Unlock Dashboard</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
