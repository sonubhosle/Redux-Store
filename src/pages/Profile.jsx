// Profile.jsx
import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUserProfile, logoutUser } from "../states/Auth/Action";
import { toast } from "react-toastify";
import {
  User,
  Mail,
  Phone,
  Camera,
  Lock,
  Bell,
  LogOut,
  ChevronRight,
  Save,
  X,
  Edit2,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  ShoppingBag,
  Heart,
  Package,
  MapPin,
  Upload,
} from "lucide-react";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const fileInputRef = useRef(null);

  // Mock counts (replace with actual Redux state)
  const stats = {
    orders: 12,
    wishlist: 8,
    cart: 3,
  };

  // Form states
  const [profileData, setProfileData] = useState({
    name: "",
    surname: "",
    email: "",
    mobile: "",
  });

  const [errors, setErrors] = useState({});

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || "",
        surname: user.surname || "",
        email: user.email || "",
        mobile: user.mobile || "",
      });
      setPreviewImage(user.photo || null);
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setPhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removePhoto = () => {
    setPreviewImage(user?.photo || null);
    setPhotoFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const validateProfileForm = () => {
    const newErrors = {};
    
    if (!profileData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!profileData.surname.trim()) {
      newErrors.surname = "Surname is required";
    }
    
    if (!profileData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (profileData.mobile && !/^\+?[\d\s-]{10,}$/.test(profileData.mobile)) {
      newErrors.mobile = "Mobile number is invalid";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateProfileForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Create FormData exactly like in AuthPage
    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("surname", profileData.surname);
    formData.append("email", profileData.email);
    formData.append("mobile", profileData.mobile);
    
    // Only append photo if a new file was selected
    if (photoFile) {
      formData.append("photo", photoFile);
    }

    try {
      // Dispatch the update action with FormData
      const result = await dispatch(updateUserProfile(formData));
      
      // Check if update was successful
      if (!result?.error) {
        setIsEditing(false);
        setPhotoFile(null); // Clear the file state after successful upload
        toast.success("Profile updated successfully!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to update profile");
    }
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
    toast.success("Logged out successfully");
  };

 

  return (
    <div className="min-h-screen bg-stone-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800">My Account</h1>
          <p className="text-stone-500 mt-1">Manage your profile and settings</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div 
            onClick={() => navigate("/orders")}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-800">{stats.orders}</p>
                <p className="text-sm text-stone-500">Total Orders</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate("/wishlist")}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-rose-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-800">{stats.wishlist}</p>
                <p className="text-sm text-stone-500">Wishlist Items</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate("/cart")}
            className="bg-white rounded-2xl p-6 border border-stone-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-stone-800">{stats.cart}</p>
                <p className="text-sm text-stone-500">In Cart</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
              {/* User Card */}
              <div className="p-6 bg-linear-to-br from-amber-50 to-white border-b border-stone-200">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-xl bg-linear-to-brrom-amber-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                      {previewImage ? (
                        <img src={previewImage} alt={profileData.name} className="w-full h-full object-cover" />
                      ) : (
                        profileData.name?.charAt(0)?.toUpperCase() || "U"
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-stone-800 truncate">
                      {profileData.name} {profileData.surname}
                    </h2>
                    <p className="text-sm text-stone-500 truncate">{profileData.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="p-4">
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 mb-1 ${
                    activeTab === "profile"
                      ? "bg-amber-50 text-amber-600"
                      : "hover:bg-stone-50 text-stone-600"
                  }`}
                >
                  <User size={20} />
                  <span className="flex-1 font-medium">Profile Information</span>
                  <ChevronRight size={16} className={activeTab === "profile" ? "text-amber-500" : "text-stone-400"} />
                </button>

                <button
                  onClick={() => setActiveTab("addresses")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 mb-1 ${
                    activeTab === "addresses"
                      ? "bg-amber-50 text-amber-600"
                      : "hover:bg-stone-50 text-stone-600"
                  }`}
                >
                  <MapPin size={20} />
                  <span className="flex-1 font-medium">Saved Addresses</span>
                  <ChevronRight size={16} className={activeTab === "addresses" ? "text-amber-500" : "text-stone-400"} />
                </button>

                <button
                  onClick={() => setActiveTab("notifications")}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 mb-1 ${
                    activeTab === "notifications"
                      ? "bg-amber-50 text-amber-600"
                      : "hover:bg-stone-50 text-stone-600"
                  }`}
                >
                  <Bell size={20} />
                  <span className="flex-1 font-medium">Notifications</span>
                  <ChevronRight size={16} className={activeTab === "notifications" ? "text-amber-500" : "text-stone-400"} />
                </button>

                <button
                  onClick={() => navigate("/change-password")}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left hover:bg-stone-50 text-stone-600 transition-all duration-200 mb-1"
                >
                  <Lock size={20} />
                  <span className="flex-1 font-medium">Change Password</span>
                  <ChevronRight size={16} className="text-stone-400" />
                </button>

                <div className="border-t border-stone-200 my-4"></div>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-red-600 hover:bg-red-50 transition-all duration-200"
                >
                  <LogOut size={20} />
                  <span className="flex-1 font-medium">Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm border border-stone-200 p-6 lg:p-8">
              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-stone-800">Profile Information</h2>
                      <p className="text-stone-500 text-sm mt-1">Update your personal details</p>
                    </div>
                    {!isEditing && (
                      <button
                        onClick={() => setIsEditing(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors"
                      >
                        <Edit2 size={18} />
                        <span>Edit Profile</span>
                      </button>
                    )}
                  </div>

                  <form onSubmit={handleProfileSubmit}>
                    {/* Photo Upload - Styled like AuthPage */}
                    <div className="mb-8">
                      <label className="block text-sm font-medium text-stone-700 mb-3">
                        Profile Photo
                      </label>
                      <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-stone-200 bg-white">
                        {/* Circle preview */}
                        <div className="w-16 h-16 rounded-full bg-stone-100 border-2 border-dashed border-stone-200 overflow-hidden flex items-center justify-center shrink-0 transition-all duration-200">
                          {previewImage ? (
                            <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-8 h-8 text-stone-300" />
                          )}
                        </div>
                        
                        {/* Controls */}
                        <div className="flex-1">
                          {isEditing ? (
                            <>
                              <div className="flex items-center gap-2 flex-wrap">
                                <button
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-stone-600 bg-stone-100 border border-stone-200 hover:bg-amber-50 hover:text-amber-700 hover:border-amber-300 transition-all duration-150"
                                >
                                  <Upload className="w-4 h-4" />
                                  {photoFile || previewImage !== user?.photo ? "Change photo" : "Upload photo"}
                                </button>
                                {(photoFile || previewImage !== user?.photo) && (
                                  <button
                                    type="button"
                                    onClick={removePhoto}
                                    className="text-sm text-red-400 hover:text-red-600 transition-colors underline underline-offset-2"
                                  >
                                    Remove
                                  </button>
                                )}
                              </div>
                              <p className="text-xs text-stone-400 mt-2">JPG, PNG or GIF · max 5 MB</p>
                            </>
                          ) : (
                            <p className="text-sm text-stone-500">
                              {previewImage ? "Photo uploaded" : "No photo uploaded"}
                            </p>
                          )}
                        </div>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                        disabled={!isEditing}
                      />
                    </div>

                    {/* Form Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          First Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={profileData.name}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                            isEditing 
                              ? "bg-white border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                              : "bg-stone-50 border-stone-100 text-stone-600"
                          } ${errors.name ? "border-red-500" : ""}`}
                        />
                        {errors.name && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Last Name
                        </label>
                        <input
                          type="text"
                          name="surname"
                          value={profileData.surname}
                          onChange={handleInputChange}
                          disabled={!isEditing}
                          className={`w-full px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                            isEditing 
                              ? "bg-white border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                              : "bg-stone-50 border-stone-100 text-stone-600"
                          } ${errors.surname ? "border-red-500" : ""}`}
                        />
                        {errors.surname && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {errors.surname}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="email"
                            name="email"
                            value={profileData.email}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                              isEditing 
                                ? "bg-white border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                                : "bg-stone-50 border-stone-100 text-stone-600"
                            } ${errors.email ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.email && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-stone-700 mb-2">
                          Mobile Number
                        </label>
                        <div className="relative">
                          <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
                          <input
                            type="tel"
                            name="mobile"
                            value={profileData.mobile}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="+1 234 567 8900"
                            className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                              isEditing 
                                ? "bg-white border-stone-200 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/10"
                                : "bg-stone-50 border-stone-100 text-stone-600"
                            } ${errors.mobile ? "border-red-500" : ""}`}
                          />
                        </div>
                        {errors.mobile && (
                          <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                            <AlertCircle size={12} />
                            {errors.mobile}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                      <div className="flex items-center gap-3 mt-8 pt-6 border-t border-stone-200">
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex items-center gap-2 px-6 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              <span>Saving...</span>
                            </>
                          ) : (
                            <>
                              <Save size={18} />
                              <span>Save Changes</span>
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setIsEditing(false);
                            setErrors({});
                            setPhotoFile(null);
                            setProfileData({
                              name: user.name || "",
                              surname: user.surname || "",
                              email: user.email || "",
                              mobile: user.mobile || "",
                            });
                            setPreviewImage(user.photo || null);
                          }}
                          className="flex items-center gap-2 px-6 py-3 bg-stone-100 text-stone-600 rounded-xl hover:bg-stone-200 transition-colors"
                        >
                          <X size={18} />
                          <span>Cancel</span>
                        </button>
                      </div>
                    )}
                  </form>
                </div>
              )}

              {/* Addresses Tab */}
              {activeTab === "addresses" && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl font-bold text-stone-800">Saved Addresses</h2>
                      <p className="text-stone-500 text-sm mt-1">Manage your delivery addresses</p>
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors">
                      <MapPin size={18} />
                      <span>Add New</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Sample Address Card */}
                    <div className="p-4 border-2 border-stone-200 rounded-xl hover:border-amber-500 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <span className="px-2 py-1 bg-amber-100 text-amber-700 text-xs font-semibold rounded-full">Home</span>
                        <button className="text-stone-400 hover:text-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-stone-600 mb-1">{profileData.name} {profileData.surname}</p>
                      <p className="text-sm text-stone-600 mb-1">123 Main Street</p>
                      <p className="text-sm text-stone-600 mb-1">Apt 4B</p>
                      <p className="text-sm text-stone-600">New York, NY 10001</p>
                      <p className="text-sm text-stone-600 mt-2">Mobile: {profileData.mobile || "+1 234 567 8900"}</p>
                      <button className="mt-3 text-xs text-amber-600 font-semibold hover:text-amber-700">
                        Set as Default
                      </button>
                    </div>

                    <div className="p-4 border-2 border-stone-200 rounded-xl hover:border-amber-500 transition-colors">
                      <div className="flex items-start justify-between mb-2">
                        <span className="px-2 py-1 bg-stone-100 text-stone-600 text-xs font-semibold rounded-full">Work</span>
                        <button className="text-stone-400 hover:text-red-500 transition-colors">
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-stone-600 mb-1">{profileData.name} {profileData.surname}</p>
                      <p className="text-sm text-stone-600 mb-1">456 Business Ave</p>
                      <p className="text-sm text-stone-600 mb-1">Suite 200</p>
                      <p className="text-sm text-stone-600">New York, NY 10002</p>
                      <p className="text-sm text-stone-600 mt-2">Mobile: {profileData.mobile || "+1 234 567 8901"}</p>
                      <button className="mt-3 text-xs text-amber-600 font-semibold hover:text-amber-700">
                        Set as Default
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div>
                  <h2 className="text-2xl font-bold text-stone-800 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-stone-800">Order Updates</h3>
                        <p className="text-sm text-stone-500">Receive updates about your orders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5fter:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-stone-800">Promotions & Deals</h3>
                        <p className="text-sm text-stone-500">Get notified about special offers</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-stone-50 rounded-xl">
                      <div>
                        <h3 className="font-semibold text-stone-800">Newsletter</h3>
                        <p className="text-sm text-stone-500">Receive weekly newsletter</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-stone-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-stone-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;