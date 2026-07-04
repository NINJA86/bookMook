import Link from 'next/link';
import '../authLayout.css';

export default function LoginPage() {
  return (
    <div className="auth-wrapper">
      <div className="box">
        <h1>Login</h1>
        <p className="subtitle">Welcome back</p>

        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username or email"
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

        <Link href="/auth/forgot-password" className="forgot-link">
          Forgot password?
        </Link>

        <button type="submit" className="auth-btn">
          Sign in
        </button>

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
