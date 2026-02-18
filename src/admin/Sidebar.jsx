import { useState, useEffect } from 'react';
import { Users, Menu, X, LayoutDashboard, LogOut, ClipboardList, Leaf, Package, UserRound, ChevronRight, Sparkles } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile, logoutUser } from '../states/Auth/Action';
import { toast } from 'react-toastify';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt && !user) dispatch(getUserProfile());
  }, [dispatch, user]);

  const handleLogout = () => {
    toast.success('Logged out successfully', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "dark",
    });
    dispatch(logoutUser());
    navigate('/auth');
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard', color: 'from-violet-400 to-purple-400' },
    { icon: Leaf, label: 'Grocery', path: '/admin/groceries', color: 'from-emerald-400 to-teal-400' },
    { icon: ClipboardList, label: 'Orders', path: '/admin/orders', color: 'from-amber-400 to-orange-400' },
    { icon: Package, label: 'Recipes', path: '/admin/recipes', color: 'from-rose-400 to-pink-400' },
    { icon: Users, label: 'Users', path: '/admin/users', color: 'from-blue-400 to-cyan-400' },
  ];

  if (loading && !user) {
    return (
      <aside className="fixed lg:relative top-0 left-0 h-screen w-70 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 z-40 flex items-center justify-center shadow-2xl border-r border-white/5">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
          <span className="text-sm text-slate-400 font-medium">Loading dashboard...</span>
        </div>
      </aside>
    );
  }

  if (!user) {
    return (
      <aside className="fixed lg:relative top-0 left-0 h-screen w-70 bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 z-40 flex items-center justify-center shadow-2xl border-r border-white/5">
        <div className="text-center px-6">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <X className="w-8 h-8 text-red-400" />
          </div>
          <p className="text-slate-400 text-sm mb-4">Unable to load profile</p>
          <button
            onClick={() => navigate('/auth')}
            className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-emerald-500/25"
          >
            Go to Login
          </button>
        </div>
      </aside>
    );
  }

  const isActiveRoute = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile toggle */}
      <button onClick={() => setIsMobileOpen(!isMobileOpen)}
        className="lg:hidden fixed top-4 left-5.5 z-50 p-3 bg-emerald-500 backdrop-blur-2xl  rounded-2xl shadow-2xl hover:bg-slate-800/90 transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Toggle menu" >
        {isMobileOpen ? <X size={22} className="text-white" /> : <Menu size={22} className="text-white" />}
      </button>

      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/70 backdrop-blur-sm z-30 transition-opacity animate-fadeIn"
          onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
          fixed lg:relative top-0 left-0 h-screen 
          bg-linear-to-br from-slate-950 via-slate-900 to-slate-950
          z-40 flex flex-col shadow-2xl border-r border-white/5
          transition-all duration-500 ease-out
          ${isOpen ? 'w-74' : 'w-24'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500/5 via-transparent to-violet-500/5 opacity-40 pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-emerald-500/30 to-transparent" />

        {/* Header */}
        <div className={`relative flex items-center px-6 py-4 border-b border-white/5 shrink-0 backdrop-blur-sm transition-all duration-500 ${isOpen ? "justify-between px-4" : "justify-center"
            }`} >

          <div className={`flex items-center gap-3.5 overflow-hidden transition-all duration-500 ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}>
            {/* Avatar with glow */}
            <div className="relative group">
              <div className="relative w-11 h-11 bg-linear-to-br from-emerald-500 to-emerald-600  text-white rounded-2xl flex items-center justify-center overflow-hidden">
               <LayoutDashboard/>
              </div>
            </div>

            {/* User info */}
            <div className="flex-1 min-w-0">
              <p className='text-xl font-extrabold text-white'>Dashboard</p>
              <p className='flex items-center gap-2 text-slate-600'><div className="w-2 h-2 ring-2 ring-emerald-500/20 bg-emerald-500 rounded-full"></div>Admin</p>
            </div>
          </div>

          {/* Toggle button */}
          <button onClick={() => setIsOpen(!isOpen)}
             className={`flex items-center justify-center w-10 h-10 shrink-0 rounded-xl transition-all duration-300 ${
              isOpen
               ? 'bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10'
              : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
              }`}
              aria-label={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}>
           <Menu size={20} className={`transition-transform duration-500 ${!isOpen ? 'rotate-180' : ''}`}/>
          </button>

        </div>

        {/* Navigation */}
        <nav className="relative flex-1 py-6 px-3 space-y-1.5  scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = isActiveRoute(item.path);
            const isHovered = hoveredItem === index;

            return (
              <Link
                key={index}
                to={item.path}
                onMouseEnter={() => setHoveredItem(index)}
                onMouseLeave={() => setHoveredItem(null)}
                onClick={() => setIsMobileOpen(false)}
                className={`
                  group relative flex items-center gap-3 px-3.5 py-3 rounded-2xl
                  transition-all duration-300 cursor-pointer overflow-visible
              
                `}
              >
                {/* Active indicator */}
                {isActive && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-linear-to-b from-emerald-400 to-emerald-600 rounded-r-full shadow-lg shadow-emerald-500/50" />
                )}

                {/* Icon with gradient background */}
                <div className={`
                  relative shrink-0 w-10 h-10 rounded-xl flex items-center justify-center
                  transition-all duration-300
                  ${isActive ? 'bg-linear-to-br ' + item.color + ' shadow-lg' : 'bg-white/5'}
                  ${isHovered && !isActive ? 'scale-110 bg-white/10' : ''}
                `}>
                  <Icon
                    size={20}
                    className={`transition-all duration-300 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'
                      }`}
                  />
                </div>

                {/* Label */}
                <span
                  className={`
                    font-semibold text-[15px] whitespace-nowrap transition-all duration-500
                    ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-white'}
                    ${isOpen ? 'opacity-100 w-auto translate-x-0' : 'opacity-0 w-0 -translate-x-4 overflow-hidden'}
                  `}
                >
                  {item.label}
                </span>

                {/* Arrow indicator for active */}
                {isActive && isOpen && (
                  <ChevronRight
                    size={16}
                    className="ml-auto text-emerald-400 animate-pulse"
                  />
                )}

                {/* Tooltip (collapsed mode) */}
                <div
                  className={`
                    absolute left-full top-1/2 -translate-y-1/2 ml-4 px-4 py-2.5
                    bg-slate-800 border border-white/10 text-white text-sm font-semibold rounded-xl shadow-2xl
                    whitespace-nowrap pointer-events-none z-50
                    transition-all duration-300 backdrop-blur-xl
                    ${!isOpen
                      ? 'opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 visible'
                      : 'opacity-0 invisible'
                    }
                  `}
                >
                  {item.label}
                  <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-slate-800 border-l border-b border-white/10 rotate-45" />
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Logout footer */}
       <div className="relative p-4 border-t border-white/5 shrink-0 backdrop-blur-sm">
        <div className={`flex items-center transition-all duration-500 ${isOpen ? "gap-3" : "justify-center"}`}>
    {/* Animated Logout Button */}
    <button
      onClick={handleLogout}
      className="group relative flex items-center overflow-hidden rounded-2xl transition-all duration-500"
    >
      {/* Animated Gradient Border */}
      <div className="absolute inset-0 bg-linear-to-r from-red-500 via-rose-500 to-pink-500 opacity-70 blur-md group-hover:opacity-100 transition duration-500" />

      {/* Inner Content */}
      <div className={`relative flex items-center bg-slate-900 rounded-2xl transition-all duration-500 ${
          isOpen ? "px-4 py-2.5 gap-3" : "w-11 h-11 justify-center" }`}>
        <LogOut size={18} className="text-rose-600 group-hover:text-white transition-colors duration-300" />

        {/* Text (slide animation) */}
        <span className={`font-semibold text-sm text-white transition-all duration-500 whitespace-nowrap ${
            isOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-4 w-0"
          }`}>
          Logout
        </span>
      </div>

      {/* Tooltip (Collapsed mode only) */}
      {!isOpen && (
        <div className="absolute left-14 bg-slate-800 text-white text-xs px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition duration-300 whitespace-nowrap">
          Logout
        </div>
      )}
    </button>
  </div>
</div>


        {/* Bottom gradient accent */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-linear-to-r from-transparent via-emerald-500/30 to-transparent" />
      </aside>


    </>
  );
}