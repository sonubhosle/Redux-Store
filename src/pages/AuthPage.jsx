import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../states/Auth/Action";
import {
  Eye,
  EyeOff,
  Check,
  Upload,
  User,
  ShoppingBag,
  Loader2,
  Rocket,
  Lock,
  Repeat,
  MessageCircle,
  Shield,
  Verified,
  LockIcon
} from "lucide-react";
import { toast } from "react-toastify";

const getStrength = (pw) => {
  let s = 0;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  if (/[!@#$%^&*]/.test(pw)) s++;
  return s;
};

const strengthMeta = [
  { label: "", barClass: "bg-stone-100" },
  { label: "Weak", barClass: "bg-red-400", textClass: "text-red-400" },
  { label: "Fair", barClass: "bg-orange-400", textClass: "text-orange-400" },
  { label: "Good", barClass: "bg-yellow-400", textClass: "text-yellow-500" },
  { label: "Strong", barClass: "bg-emerald-500", textClass: "text-emerald-500" },
];

const rules = [
  { label: "8+ characters", test: (p) => p.length >= 8 },
  { label: "Uppercase letter", test: (p) => /[A-Z]/.test(p) },
  { label: "Number", test: (p) => /\d/.test(p) },
  { label: "Symbol (!@#$%^&*)", test: (p) => /[!@#$%^&*]/.test(p) },
];

const Label = ({ children }) => (
  <label className="block text-xs font-semibold tracking-widest uppercase text-stone-400 mb-1.5">
    {children}
  </label>
);

const TextInput = ({ rightSlot, className = "", ...props }) => (
  <div className="relative">
    <input
      {...props}
      className={`w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm placeholder-stone-300 outline-none transition-all duration-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10 ${rightSlot ? "pr-11" : ""} ${className}`}
    />
    {rightSlot && (
      <div className="absolute right-3 top-1/2 -translate-y-1/2">
        {rightSlot}
      </div>
    )}
  </div>
);

export default function AuthPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user, isAuthenticated } = useSelector((s) => s.auth);

  const [mode, setMode] = useState("login");
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [localError, setLocalError] = useState("");
  const [success, setSuccess] = useState("");
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileRef = useRef(null);

  const [form, setForm] = useState({
    name: "", surname: "", email: "", mobile: "",
    password: "", confirmPassword: "", photo: "",
  });

  const [photoFile, setPhotoFile] = useState(null);

  const strength = getStrength(form.password);
  const isLogin = mode === "login";

  useEffect(() => {

    if (user) {

      const userRole = user.role || user?.user?.role || user?.data?.role;
      if (userRole === "ADMIN") {
        toast.success('Welcome Admin! Redirecting to dashboard...', { autoClose: 2000 });
        navigate("/admin", { replace: true });
      } else if (userRole === "USER") {
        toast.success('Welcome User! Redirecting to home...', { autoClose: 2000 });
        navigate("/", { replace: true });
      } else {
        toast.warning('Logged in but no valid role found.', { autoClose: 3000 });
      }
    } else {
    }
  }, [user, isAuthenticated, navigate]);

  const switchMode = (next) => {

    if (next === mode) return;
    setLocalError(""); setSuccess(""); setPhotoPreview(null); setPhotoFile(null);
    setForm({ name: "", surname: "", email: "", mobile: "", password: "", confirmPassword: "", photo: "" });
    setMode(next);
  };

  const handleChange = (e) => {
    setLocalError("");
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setPhotoFile(file);
    // Show local preview instantly
    const reader = new FileReader();
    reader.onloadend = () => setPhotoPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(""); setSuccess("");

    if (!isLogin) {
      if (form.password !== form.confirmPassword) {
        setLocalError("Passwords do not match.");
        return;
      }
      if (strength < 4) {
        setLocalError("Password doesn't meet all requirements yet.");
        return;
      }

      // Build FormData so multer can read req.file on the backend
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("surname", form.surname);
      formData.append("email", form.email);
      formData.append("mobile", form.mobile);
      formData.append("password", form.password);
      if (photoFile) {
        formData.append("photo", photoFile);
      }

      try {
        const res = await dispatch(registerUser(formData));

        if (!res?.error) {
          setSuccess("Account created! Redirecting...");
        }
      } catch (err) {
        setLocalError(err.message || "Registration failed");
      }
    } else {
      try {
        const res = await dispatch(loginUser({
          email: form.email,
          password: form.password
        }));

        if (!res?.error) {
          setSuccess("Welcome back! Redirecting...");
        }
      } catch (err) {
        setLocalError(err.message || "Login failed");
      }
    }
  };

  useEffect(() => {
    if (error) {
      setLocalError(error);
    }
  }, [error]);

  const features = [
    { icon: <Rocket className="w-4 h-4" />, title: "Fast Delivery", desc: "Same-day shipping available" },
    { icon: <Lock className="w-4 h-4" />, title: "Secure Payments", desc: "256-bit SSL encryption" },
    { icon: <Repeat className="w-4 h-4" />, title: "Free Returns", desc: "30-day hassle-free policy" },
    { icon: <MessageCircle className="w-4 h-4" />, title: "24/7 Support", desc: "Always here to help" },
  ];

  return (
    <div className="min-h-screen flex bg-stone-50">
      <div className="flex-1 flex items-start justify-center p-6 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-105 py-8">

          {/* Mobile brand */}

          {/* Mode tabs */}
          <div className="flex bg-stone-100 rounded-2xl p-1 mb-8 gap-1">
            {[
              { key: "login", label: "Sign In" },
              { key: "register", label: "Create Account" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => switchMode(key)}
                className={`flex-1 py-2.5 text-sm font-semibold rounded-xl transition-all duration-200 ${mode === key
                  ? "bg-white text-stone-800 shadow-sm"
                  : "text-stone-400 hover:text-stone-600"
                  }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-stone-800 mb-1.5">
              {isLogin ? "Welcome back 👋" : "Join ShopMart"}
            </h1>
            <p className="text-stone-400 text-sm leading-relaxed">
              {isLogin
                ? "Sign in to access your orders, wishlist and more."
                : "Create your free account in under a minute."}
            </p>
          </div>

          {/* Alerts */}
          {localError && (
            <div className="flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl mb-5">
              <span className="mt-0.5">⚠️</span>
              <span>{localError}</span>
            </div>
          )}
          {success && (
            <div className="flex items-start gap-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm px-4 py-3 rounded-xl mb-5">
              <span className="mt-0.5">✅</span>
              <span>{success}</span>
            </div>
          )}

          {/* ── FORM ── */}
          <form onSubmit={handleSubmit} noValidate className="space-y-4">

            {/* REGISTER ONLY */}
            {!isLogin && (
              <>
                {/* Name grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>First Name</Label>
                    <TextInput
                      name="name" value={form.name} onChange={handleChange}
                      placeholder="Jane" required
                    />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <TextInput
                      name="surname" value={form.surname} onChange={handleChange}
                      placeholder="Smith" required
                    />
                  </div>
                </div>

                {/* Mobile */}
                <div>
                  <Label>
                    Mobile{" "}
                    <span className="normal-case tracking-normal font-normal text-stone-300">
                      (optional)
                    </span>
                  </Label>
                  <TextInput
                    name="mobile" type="tel" value={form.mobile}
                    onChange={handleChange} placeholder="+1 555 000 0000"
                  />
                </div>

                {/* Photo Upload */}
                <div>
                  <Label>
                    Profile Photo{" "}
                    <span className="normal-case tracking-normal font-normal text-stone-300">
                      (optional)
                    </span>
                  </Label>
                  <div className="flex items-center gap-4 p-3 rounded-xl border border-stone-200 bg-white">
                    {/* Circle preview */}
                    <div className="w-14 h-14 rounded-full bg-stone-100 border-2 border-dashed border-stone-200 overflow-hidden flex items-center justify-center shrink-0 transition-all duration-200">
                      {photoPreview ? (
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-6 h-6 text-stone-300" />
                      )}
                    </div>
                    {/* Controls */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-stone-600 bg-stone-100 border border-stone-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-all duration-150"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          {photoPreview ? "Change photo" : "Upload photo"}
                        </button>
                        {photoPreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setPhotoPreview(null);
                              setPhotoFile(null);
                              setForm((f) => ({ ...f, photo: "" }));
                              if (fileRef.current) fileRef.current.value = "";
                            }}
                            className="text-xs text-red-400 hover:text-red-600 transition-colors underline underline-offset-2"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                      <p className="text-xs text-stone-300 mt-1.5">JPG, PNG or GIF · max 5 MB</p>
                    </div>
                  </div>
                  <input
                    ref={fileRef} type="file" accept="image/*"
                    onChange={handlePhoto} className="hidden"
                  />
                </div>
              </>
            )}

            {/* Email */}
            <div>
              <Label>Email</Label>
              <TextInput
                name="email" type="email" value={form.email}
                onChange={handleChange} placeholder="jane@example.com" required
              />
            </div>

            {/* Password */}
            <div>
              <Label>Password</Label>
              <TextInput
                name="password"
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                placeholder={isLogin ? "Your password" : "Create a strong password"}
                required
                rightSlot={
                  <button
                    type="button" onClick={() => setShowPw((v) => !v)}
                    className="text-stone-400 hover:text-amber-500 transition-colors p-0.5"
                  >
                    {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                }
              />

              {/* Strength meter — register only */}
              {!isLogin && form.password && (
                <div className="mt-3 space-y-2.5">
                  {/* Bars */}
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i <= strength
                          ? strengthMeta[strength].barClass
                          : "bg-stone-100"
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
                      const pass = r.test(form.password);
                      return (
                        <div
                          key={r.label}
                          className={`flex items-center gap-1.5 text-xs transition-colors duration-200 ${pass ? "text-emerald-600" : "text-stone-400"
                            }`}
                        >
                          <div
                            className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200 ${pass
                              ? "bg-emerald-500 border-emerald-500 text-white"
                              : "border-stone-200"
                              }`}
                          >
                            {pass && <Check className="w-2.5 h-2.5 stroke-3" />}
                          </div>
                          {r.label}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password — register only */}
            {!isLogin && (
              <div>
                <Label>Confirm Password</Label>
                <TextInput
                  name="confirmPassword"
                  type={showCPw ? "text" : "password"}
                  value={form.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  rightSlot={
                    <button
                      type="button" onClick={() => setShowCPw((v) => !v)}
                      className="text-stone-400 hover:text-amber-500 transition-colors p-0.5"
                    >
                      {showCPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  }
                />
                {form.confirmPassword && (
                  <p className={`text-xs mt-1.5 font-medium ${form.password === form.confirmPassword
                    ? "text-emerald-500"
                    : "text-red-400"
                    }`}>
                    {form.password === form.confirmPassword
                      ? "✓ Passwords match"
                      : "✗ Passwords don't match"}
                  </p>
                )}
              </div>
            )}

            {/* Forgot password link */}
            {isLogin && (
              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-xs font-semibold text-amber-600 hover:text-amber-700 transition-colors"
                >
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full mt-2 py-3.5 rounded-xl text-sm font-bold tracking-wide flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed ${isLogin
                ? "bg-stone-900 text-white hover:bg-stone-800"
                : "bg-amber-500 text-stone-900 hover:bg-amber-400"
                }`}
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading
                ? isLogin ? "Signing in…" : "Creating account…"
                : isLogin ? "Sign In →" : "Create Account →"}
            </button>
          </form>

          {/* Switch mode */}
          <p className="text-center text-sm text-stone-400 mt-6">
            {isLogin ? "Don't have an account? " : "Already a member? "}
            <button
              onClick={() => switchMode(isLogin ? "register" : "login")}
              className="font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              {isLogin ? "Sign up free" : "Sign in"}
            </button>
          </p>

          {/* Trust strip */}
          <div className="flex items-center justify-center gap-6 mt-8 pt-6 border-t border-stone-100">
            {[
              { icon: Shield, label: "SSL Secure" },
              { icon: Verified, label: "Verified" },
              { icon: LockIcon, label: "Private" }
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="flex items-center gap-1 text-xs text-stone-300 font-medium">
                <Icon className="w-3 h-3" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}