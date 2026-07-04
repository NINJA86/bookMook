import { Link } from 'lucide-react';
import '../authLayout.css';
export default function CheckEmailPage() {
  return (
    <div className="auth-wrapper">
      <div className="box">
        <div className="email-icon">✉</div>
        <h1>Check email</h1>
        <p className="subtitle">
          We sent a reset link to your inbox.
          <br />
          It expires in 15 minutes.
        </p>

        <p className="auth-footer" style={{ marginTop: '28px' }}>
          Didn&apos;t get it? <Link href="/forgot-password">Resend</Link>
        </p>
      </div>
    </div>
  );
}
