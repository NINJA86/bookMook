'use client';

import Link from 'next/link';
import '../authLayout.css';
import { useActionState } from 'react';
import { login } from '@/utils/actions';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="auth-wrapper">
      <div className="box">
        <h1>Login</h1>
        <p className="subtitle">Welcome back</p>

        <form action={formAction}>
          <input
            type="text"
            name="numberORemail"
            id="numberORemail"
            placeholder="phone number or email"
            autoComplete="username"
            className="auth-input"
          />

          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            autoComplete="current-password"
            className="auth-input"
          />
          {state?.fieldErrors?.numberORemail && (
            <p className="auth-error">{state.fieldErrors.numberORemail}</p>
          )}
          <Link href="/auth/forgot-password" className="forgot-link">
            Forgot password?
          </Link>

          {state?.error && <p className="auth-error">{state.error}</p>}

          {state?.success && <p className="auth-success">{state.message}</p>}

          <button type="submit" className="auth-btn" disabled={isPending}>
            {isPending ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="auth-divider">
          <span />
          <p>or</p>
          <span />
        </div>

        <p className="auth-footer">
          Don&apos;t have an account? <Link href="/auth/signup">Register</Link>
        </p>
      </div>
    </div>
  );
}
