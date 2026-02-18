import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../states/Auth/Action";

const BagIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ArrowLeft = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="19" y1="12" x2="5" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
);

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, forgotPasswordMessage } = useSelector((s) => s.auth);

  const [email, setEmail] = useState("");
  const [localError, setLocalError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!email) {
      setLocalError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setLocalError("Please enter a valid email address");
      return;
    }

    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  return (
    <div className="min-h-screen flex bg-stone-50">
      
  
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10">
        <div className="w-full max-w-md">

          {/* Mobile brand */}
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center text-stone-900">
              <BagIcon />
            </div>
            <span className="text-stone-800 text-lg font-bold">ShopMart</span>
          </div>

          {/* Back button */}
          <button
            onClick={() => navigate("/auth")}
            className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-stone-700 transition-colors mb-6"
          >
            <ArrowLeft />
            Back to sign in
          </button>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-stone-800 mb-1.5">
              Forgot your password?
            </h1>
            <p className="text-stone-400 text-sm leading-relaxed">
              No worries. We'll email you a reset link to get you back in.
            </p>
          </div>

          {/* Success Message */}
          {forgotPasswordMessage && (
            <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-5">
              <span className="mt-0.5">✅</span>
              <div>
                <p className="font-semibold mb-0.5">Email sent!</p>
                <p className="text-xs text-emerald-600">{forgotPasswordMessage}</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {localError && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
              <span className="mt-0.5">⚠️</span>
              <span>{localError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            
            {/* Email input */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setLocalError("");
                    setEmail(e.target.value);
                  }}
                  placeholder="jane@example.com"
                  className="w-full px-4 py-3 pl-11 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm placeholder-stone-300 outline-none transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                  required
                />
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-300">
                  <MailIcon />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-amber-500 text-stone-900 text-sm font-bold tracking-wide hover:bg-amber-400 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              {loading ? "Sending reset link…" : "Send Reset Link"}
            </button>
          </form>

          {/* Info box */}
          <div className="mt-8 p-4 rounded-xl bg-stone-100 border border-stone-200">
            <p className="text-xs text-stone-500 leading-relaxed">
              <span className="font-semibold text-stone-600">📧 Check your spam folder</span>
              <br />
              If you don't see the email in a few minutes, check your spam or junk folder.
            </p>
          </div>

          {/* Trust strip */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-stone-100">
            {["🔒 SSL Secure", "✅ Verified", "🛡️ Private"].map((b) => (
              <span key={b} className="text-xs text-stone-300 font-medium">
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}