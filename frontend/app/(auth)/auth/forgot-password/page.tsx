'use client';
import Link from 'next/link';
import '../authLayout.css';
import { useActionState, useRef, useState } from 'react';
import {
  sendCodeAction,
  verifyCodeAction,
  resetPasswordAction,
} from '@/utils/actions';

export default function ForgotPasswordPage() {
  const [emailState, emailAction, emailPending] = useActionState(
    sendCodeAction,
    null,
  );
  const [codeState, codeAction, codePending] = useActionState(
    verifyCodeAction,
    null,
  );
  const [resetState, resetAction, resetPending] = useActionState(
    resetPasswordAction,
    null,
  );

  const [digits, setDigits] = useState(['', '', '', '', '', '']);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const step =
    codeState?.step === 'reset'
      ? 'reset'
      : emailState?.step === 'code'
        ? 'code'
        : 'email';

  const handleDigitChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    if (value && index < 5) inputs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="box">
        <Link href="/auth/login" className="back-link">
          ← Back to login
        </Link>
        <h1>Reset</h1>

        {/* ── Step 1: Email ── */}
        {step === 'email' && (
          <>
            <p className="subtitle">Enter your email to receive a code</p>
            <form action={emailAction}>
              <input
                type="email"
                name="email"
                placeholder="Email address"
                autoComplete="email"
                className="auth-input"
                required
              />
              {emailState?.error && (
                <p className="auth-error">{emailState.error}</p>
              )}
              <button
                type="submit"
                className="auth-btn"
                disabled={emailPending}
              >
                {emailPending ? 'Sending...' : 'Send code'}
              </button>
            </form>
          </>
        )}

        {/* ── Step 2: Code ── */}
        {step === 'code' && (
          <>
            <p className="subtitle">
              Enter the 6-digit code sent to your email
            </p>
            <form action={codeAction}>
              <input type="hidden" name="email" value={emailState?.email} />
              <input type="hidden" name="code" value={digits.join('')} />

              <div
                style={{
                  display: 'flex',
                  gap: '8px',
                  justifyContent: 'center',
                  margin: '12px 0',
                }}
              >
                {digits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    name={`code-${index}`}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="auth-input"
                    style={{
                      width: '44px',
                      padding: '14px 0',
                      textAlign: 'center',
                    }}
                  />
                ))}
              </div>

              {codeState?.error && (
                <p className="auth-error">{codeState.error}</p>
              )}
              <button
                type="submit"
                className="auth-btn"
                disabled={codePending || digits.join('').length < 6}
              >
                {codePending ? 'Verifying...' : 'Verify code'}
              </button>
            </form>
          </>
        )}

        {/* ── Step 3: Reset Password ── */}
        {step === 'reset' && (
          <>
            <p className="subtitle">Choose a new password</p>
            <form action={resetAction}>
              <input type="hidden" name="email" value={emailState?.email} />

              <input
                type="password"
                name="password"
                placeholder="New password"
                autoComplete="new-password"
                className="auth-input"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                autoComplete="new-password"
                className="auth-input"
                required
              />

              {resetState?.error && (
                <p className="auth-error">{resetState.error}</p>
              )}
              <button
                type="submit"
                className="auth-btn"
                disabled={resetPending}
              >
                {resetPending ? 'Saving...' : 'Reset password'}
              </button>
            </form>
          </>
        )}

        <p className="auth-footer" style={{ marginTop: '16px' }}>
          Remembered it? <Link href="/auth/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
