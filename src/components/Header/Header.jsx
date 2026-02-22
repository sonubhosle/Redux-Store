// Header.jsx
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { logoutUser } from "../../states/Auth/Action";
import {ShoppingBag,Heart,Search,User,LogOut,UserRound,ChevronDown,Menu,X,Package,Home,Grid,Info,Phone} from "lucide-react";
import { toast } from "react-toastify";
import CartDrawer from "./CartDrawer";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const cartCount = 3;
const wishlistCount = user?.wishlist?.length || 0;

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen, isCartOpen]);

  const handleLogout = () => {
    toast.success("Logged out successfully", {
      position: "top-right",
      autoClose: 2000,
      theme: "light",
    });
    dispatch(logoutUser());
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    navigate("/");
  };

 
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setIsCartOpen(true);
  };

  const dropdownItems = [
    {
      icon: UserRound,
      label: "My Profile",
      path: "/profile",
      color: "text-emerald-500",
    },
    {
      icon: ShoppingBag,
      label: "My Cart",
      path: "/cart",
      color: "text-amber-500",
      badge: cartCount,
      onClick: () => {
        setIsDropdownOpen(false);
        setIsCartOpen(true);
      },
    },
    {
      icon: Package,
      label: "Orders",
      path: "/orders",
      color: "text-blue-500",
    },
    {
      icon: Heart,
      label: "Wishlist",
      path: "/wishlist",
      color: "text-rose-500",
      badge: wishlistCount,
    },
    { type: "divider" },
    {
      icon: LogOut,
      label: "Sign Out",
      action: handleLogout,
      color: "text-red-500",
      danger: true,
    },
  ];

 const mobileMenuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Grid, label: "Categories", path: "/categories" },
    { icon: ShoppingBag, label: "Shop", path: "/shop" },
    { icon: Heart, label: "Wishlist", path: "/wishlist", badge: wishlistCount },
    { 
      icon: ShoppingBag, 
      label: "Cart", 
      path: "#", 
      badge: cartCount,
      onClick: () => {
        setIsMobileMenuOpen(false);
        setIsCartOpen(true);
      }
    },
    { icon: Package, label: "Orders", path: "/orders" },
    { icon: User, label: "Profile", path: "/profile" },
    { type: "divider" },
    { icon: Info, label: "About Us", path: "/about" },
    { icon: Phone, label: "Contact", path: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white backdrop-blur-xl border-b border-slate-200 ">
        <div className=" px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* ═══ LEFT: Logo ═══ */}
            <Link to="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="relative">
                <div className="relative w-11 h-11 bg-linear-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="">
                 <p className="text-xl lg:text-2xl font-bold bg-linear-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">ShopMart</p>
                 <p className="text-xs text-slate-500">App Store</p>
              </span>
            </Link>

            {/* ═══ CENTER: Search (Desktop) ═══ */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8" ref={searchRef}>
              <div
                className={`
                  relative w-full transition-all duration-300
                 
                `}
              >
                <div
                  className={`
                    absolute inset-0 bg-linear-to-r from-amber-500/20 to-emerald-500/20 rounded-2xl blur-xl transition-opacity duration-300
                    ${isSearchOpen ? "opacity-100" : "opacity-0"}
                  `}
                />
                <div
                  className={`
                    relative flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300
                    ${
                      isSearchOpen
                        ? "bg-white ring-3 ring-amber-400/20 border-amber-500 shadow-lg shadow-amber-500/10"
                        : "bg-state-50 border-slate-200 hover:border-slate-300"
                    }
                  `}
                >
                  <Search
                    size={20}
                    className={`transition-colors duration-300 ${
                      isSearchOpen ? "text-amber-500" : "text-slate-400"
                    }`}
                  />
                  <input
                    type="text"
                    placeholder="Search products..."
                    onFocus={() => setIsSearchOpen(true)}
                    onBlur={() => setIsSearchOpen(false)}
                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                  />
                  <kbd
                    className={`
                      hidden xl:inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-lg transition-colors duration-300
                      ${
                        isSearchOpen
                          ? "bg-amber-50 text-amber-600"
                          : "bg-slate-200 text-slate-500"
                      }
                    `}
                  >
                
                  </kbd>
                </div>
              </div>
            </div>

            {/* ═══ RIGHT: Actions ═══ */}
            <div className="flex items-center gap-2 lg:gap-3">
              {/* Search Icon (Mobile) */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <Search size={20} className="text-slate-600" />
              </button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-200 hover:border-rose-300 transition-all duration-300 hover:scale-105 active:scale-95 group" >
                <Heart size={20} className="text-slate-600 group-hover:text-rose-500 transition-colors duration-300" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-rose-500/50">
                    {wishlistCount}
                  </span>
                
              </Link>

              {/* Cart - Opens drawer */}
              <button
                onClick={handleCartClick}
                className="relative p-2.5 rounded-xl bg-slate-50 hover:bg-amber-50 border border-slate-200 hover:border-amber-300 transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <ShoppingBag
                  size={20}
                  className="text-slate-600 group-hover:text-amber-500 transition-colors duration-300"
                />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-amber-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg shadow-amber-500/50">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Auth: Login Button or User Dropdown */}
              {!user ? (
                <Link
                  to="/auth"
                  className="px-4 lg:px-5 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/30 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-amber-500/40"
                >
                  <span className="hidden sm:inline">Sign In</span>
                  <User size={18} className="sm:hidden" />
                </Link>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2.5  transition-all duration-300 group"
                  >
                    {/* Avatar */}
                    <div className="relative">
                      <div className="relative w-11 h-11 bg-linear-to-br from-slate-200 to-slate-300 rounded-2xl border-2 border-emerald-500/20 shadow-sm overflow-hidden flex items-center justify-center">
                        {user.photo ? (
                          <img
                            src={user.photo}
                            alt={user.name || "User"}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <UserRound className="w-4 h-4 text-slate-500" />
                        )}
                      </div>
                    </div>

                    {/* Name (Desktop) */}
                    <span className="hidden lg:block text-sm font-semibold text-slate-700 max-w-25 truncate">
                      <p>Welcome</p>
                      <div className="flex items-center gap-2 text-slate-500 text-sm capitalize"><p className="w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"></p>{user.name}</div>
                    </span>

                    {/* Chevron */}
                    <ChevronDown
                      size={16}
                      className={`hidden lg:block text-slate-400 transition-transform duration-300 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  <div
                    className={`
                      absolute right-0 mt-3 w-72 rounded-2xl bg-white border border-slate-200 shadow-2xl overflow-hidden
                      transition-all duration-300 origin-top-right
                      ${
                        isDropdownOpen
                          ? "opacity-100 scale-100 translate-y-0"
                          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }
                    `}
                  >
                    {/* User Card */}
                    <div className="p-4 bg-linear-to-br from-slate-50 to-white border-b border-slate-100">
                      <div className="flex items-center gap-3">
                        <div className="relative group/avatar">
                          <div className="relative w-12 h-12 bg-linear-to-br from-slate-200 to-slate-300 rounded-2xl border-2 border-emerald-500/20 shadow-md overflow-hidden flex items-center justify-center">
                            {user.photo ? (
                              <img
                                src={user.photo}
                                alt={user.name || "User"}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <UserRound className="w-6 h-6 text-slate-500" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-sm text-slate-800 truncate">
                            {user.name || "User"} {user.surname || ""}
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            {user.email || "user@example.com"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <div className="">
                      {dropdownItems.map((item, index) => {
                        if (item.type === "divider") {
                          return (
                            <div
                              key={index}
                              className="border-t border-slate-100"
                            />
                          );
                        }

                        const Icon = item.icon;
                        const handleClick = () => {
                          if (item.action) {
                            item.action();
                          } else if (item.onClick) {
                            item.onClick();
                          } else if (item.path) {
                            navigate(item.path);
                            setIsDropdownOpen(false);
                          }
                        };

                        return (
                          <button
                            key={index}
                            onClick={handleClick}
                            className={`
                              w-full flex items-center gap-3 px-4 py-3 transition-all duration-200
                              ${
                                item.danger
                                  ? "hover:bg-red-50"
                                  : "hover:bg-slate-50"
                              }
                            `}
                          >
                            <div
                              className={`
                                rounded-xl flex items-center justify-center transition-all duration-200
                               
                              `}
                            >
                              <Icon size={18} className={item.color} />
                            </div>
                            <span
                              className={`flex-1 text-left text-sm font-semibold ${
                                item.danger ? "text-red-600" : "text-slate-700"
                              }`}
                            >
                              {item.label}
                            </span>
                            {item.badge && (
                              <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 transition-all duration-300"
              >
                {isMobileMenuOpen ? (
                  <X size={20} className="text-slate-600" />
                ) : (
                  <Menu size={20} className="text-slate-600" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4 animate-slideDown">
              <div className="relative">
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200">
                  <Search size={18} className="text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="flex-1 bg-transparent text-sm text-slate-700 placeholder-slate-400 outline-none"
                    autoFocus
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div
        className={`
          fixed inset-0 z-60 lg:hidden
          transition-opacity duration-300 ease-in-out
          ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        {/* Backdrop */}
        <div
          className={`
            absolute inset-0 bg-black/50
            transition-opacity duration-300 ease-in-out
            ${isMobileMenuOpen ? "opacity-100" : "opacity-0"}
          `}
          onClick={closeMobileMenu}
        />

        {/* Drawer */}
        <div
          ref={mobileMenuRef}
          className={`
            absolute top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl
            transition-transform duration-300 ease-in-out
            ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}
          `}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-linear-to-br from-amber-500 to-amber-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-800">Menu</span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors duration-200"
            >
              <X size={20} className="text-slate-600" />
            </button>
          </div>

          {/* User Info (if logged in) */}
          {user && (
            <div className="p-4 bg-linear-to-br from-slate-50 to-white border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-linear-to-br from-slate-200 to-slate-300 rounded-xl border-2 border-white shadow-md overflow-hidden flex items-center justify-center">
                  {user.photo ? (
                    <img
                      src={user.photo}
                      alt={user.name || "User"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserRound className="w-6 h-6 text-slate-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-slate-800 truncate">
                    {user.name || "User"} {user.surname || ""}
                  </div>
                  <div className="text-xs text-slate-500 truncate">
                    {user.email || "user@example.com"}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Drawer Content */}
          <div className="overflow-y-auto h-[calc(100%-140px)] py-2">
            {mobileMenuItems.map((item, index) => {
              if (item.type === "divider") {
                return (
                  <div key={index} className="my-2 border-t border-slate-100" />
                );
              }

              const Icon = item.icon;
              const handleClick = (e) => {
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                } else {
                  closeMobileMenu();
                }
              };

              return (
                <Link
                  key={index}
                  to={item.path}
                  onClick={handleClick}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                    <Icon size={18} className="text-slate-600" />
                  </div>
                  <span className="flex-1 text-sm font-medium text-slate-700">
                    {item.label}
                  </span>
                  {item.badge > 0 && (
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Drawer Footer */}
          {user && (
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 bg-white">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 font-semibold rounded-xl transition-colors duration-200"
              >
                <LogOut size={18} />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />


    </>
  );
};

export default Header;