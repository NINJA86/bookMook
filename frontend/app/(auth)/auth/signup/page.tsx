'use client';
import Link from 'next/link';
import '../authLayout.css';
import { bookService } from '@/services/book.service';

import { useActionState } from 'react';
import { register } from '@/utils/actions';

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(register, null);

  return (
    <div className="auth-wrapper">
      <div className="box">
        <h1>Register</h1>
        <p className="subtitle">Create your account</p>

        <form action={formAction}>
          {state?.error && !state?.fieldErrors && (
            <p className="auth-error">{state.error}</p>
          )}
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="auth-input"
          />

          <input
            type="text"
            name="email"
            placeholder="Email"
            className="auth-input"
          />
          {state?.fieldErrors?.email && (
            <p className="auth-error">{state.fieldErrors.email[0]}</p>
          )}

          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone number"
            className="auth-input"
          />
          {state?.fieldErrors?.phoneNumber && (
            <p className="auth-error">{state.fieldErrors.phoneNumber[0]}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="auth-input"
          />
          {state?.fieldErrors?.password && (
            <p className="auth-error">{state.fieldErrors.password[0]}</p>
          )}

          <button type="submit" className="auth-btn" disabled={isPending}>
            {isPending ? 'Loading...' : 'Create account'}
          </button>
        </form>

        <div className="auth-divider">
          <span />
          <p>or</p>
          <span />
        </div>

        <p className="auth-footer">
          Already have an account? <Link href="/auth/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
