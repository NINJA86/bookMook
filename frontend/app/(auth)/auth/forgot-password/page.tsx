import Link from 'next/link';
import '../authLayout.css';

export default function ForgotPasswordPage() {
  return (
    <div className="auth-wrapper">
      <div className="box">
        <Link href="/login" className="back-link">
          ← Back to login
        </Link>

        <h1>Reset</h1>

        <p className="subtitle">Enter your email to receive a reset link</p>
        <form action="/auth/check-email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            autoComplete="email"
            className="auth-input"
          />

          <button type="submit" className="auth-btn">
            Send reset link
          </button>
        </form>

        <p className="auth-footer" style={{ marginTop: '16px' }}>
          Remembered it? <Link href="/auth/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
