import Link from 'next/link';
import '../authLayout.css';

export default function RegisterPage() {
  return (
    <div className="auth-wrapper">
      <div className="box">
        <h1>Register</h1>
        <p className="subtitle">Create your account</p>

        <input
          type="text"
          name="name"
          id="username"
          placeholder="Username"
          autoComplete="off"
          className="auth-input"
        />
        <input
          type="tel"
          name="phone"
          id="phone"
          placeholder="Phone number"
          autoComplete="off"
          className="auth-input"
        />

        <button type="submit" className="auth-btn">
          Create account
        </button>

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
