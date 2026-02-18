import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { resetPassword } from "../states/Auth/Action";

const BagIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const EyeOn = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
  </svg>
);

const EyeOff = () => (
  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

const CheckTiny = () => (
  <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[!@#$%^&*]/.test(pw)) s++;
  return s;
};

const strengthMeta = [
  { label: "",       barClass: "bg-stone-100" },
  { label: "Weak",   barClass: "bg-red-400",     textClass: "text-red-400" },
  { label: "Fair",   barClass: "bg-orange-400",  textClass: "text-orange-400" },
  { label: "Good",   barClass: "bg-yellow-400",  textClass: "text-yellow-500" },
  { label: "Strong", barClass: "bg-emerald-500", textClass: "text-emerald-500" },
];

const rules = [
  { label: "8+ characters",      test: (p) => p.length >= 8 },
  { label: "Uppercase letter",   test: (p) => /[A-Z]/.test(p) },
  { label: "Number",             test: (p) => /\d/.test(p) },
  { label: "Symbol (!@#$%^&*)", test: (p) => /[!@#$%^&*]/.test(p) },
];

export default function ResetPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { resetToken: token } = useParams();

  const { loading, error, resetPasswordMessage } = useSelector((s) => s.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [localError, setLocalError] = useState("");

  const strength = getStrength(password);

  useEffect(() => {
    if (!token) {
      setLocalError("Invalid or missing reset token. Please request a new reset link.");
    }
  }, [token]);

  useEffect(() => {
    if (error) setLocalError(error);
  }, [error]);

  // Redirect to login after successful reset
  useEffect(() => {
    if (resetPasswordMessage) {
      setTimeout(() => navigate("/auth"), 3000);
    }
  }, [resetPasswordMessage, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLocalError("");

    if (!password || !confirmPassword) {
      setLocalError("Both password fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    if (strength < 4) {
      setLocalError("Password doesn't meet all requirements yet");
      return;
    }

    dispatch(resetPassword(token, password, confirmPassword));
  };

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

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-stone-800 mb-1.5">
              Reset your password
            </h1>
            <p className="text-stone-400 text-sm leading-relaxed">
              Enter a new password to regain access to your account.
            </p>
          </div>

          {/* Success Message */}
          {resetPasswordMessage && (
            <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-5">
              <span className="mt-0.5">✅</span>
              <div>
                <p className="font-semibold mb-0.5">{resetPasswordMessage}</p>
                <p className="text-xs text-emerald-600">Redirecting you to sign in...</p>
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

          <form onSubmit={handleSubmit} noValidate className="space-y-4">
            
            {/* New Password */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setLocalError("");
                    setPassword(e.target.value);
                  }}
                  placeholder="Create a strong password"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm placeholder-stone-300 outline-none transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-500 transition-colors p-0.5"
                >
                  {showPw ? <EyeOff /> : <EyeOn />}
                </button>
              </div>

              {/* Strength meter */}
              {password && (
                <div className="mt-3 space-y-2.5">
                  {/* Bars */}
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          i <= strength ? strengthMeta[strength].barClass : "bg-stone-100"
                        }`}
                      />
                    ))}
                  </div>
                  {/* Label */}
                  {strength > 0 && (
                    <span className={`text-xs font-semibold ${strengthMeta[strength].textClass}`}>
                      {strengthMeta[strength].label}
                    </span>
                  )}
                  {/* Rules checklist */}
                  <div className="grid grid-cols-2 gap-y-1.5 gap-x-2 pt-0.5">
                    {rules.map((r) => {
                      const pass = r.test(password);
                      return (
                        <div
                          key={r.label}
                          className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${
                            pass ? "text-emerald-600" : "text-stone-400"
                          }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${
                              pass ? "bg-emerald-500 border-emerald-500 text-white" : "border-stone-200"
                            }`}
                          >
                            {pass && <CheckTiny />}
                          </div>
                          {r.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showCPw ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => {
                    setLocalError("");
                    setConfirmPassword(e.target.value);
                  }}
                  placeholder="Repeat your password"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm placeholder-stone-300 outline-none transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-amber-500 transition-colors p-0.5"
                >
                  {showCPw ? <EyeOff /> : <EyeOn />}
                </button>
              </div>
              {confirmPassword && (
                <p className={`text-xs mt-1.5 font-medium ${
                  password === confirmPassword ? "text-emerald-500" : "text-red-400"
                }`}>
                  {password === confirmPassword ? "✓ Passwords match" : "✗ Passwords don't match"}
                </p>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading || !token}
              className="w-full mt-2 py-3.5 rounded-xl bg-amber-500 text-stone-900 text-sm font-bold tracking-wide hover:bg-amber-400 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading && (
                <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                </svg>
              )}
              {loading ? "Resetting password…" : "Reset Password"}
            </button>
          </form>

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