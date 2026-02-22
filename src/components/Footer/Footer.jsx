import React from 'react';
import { 
  ShoppingBag, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Truck,
  Shield,
  Clock,
  Heart,
  ChevronRight,
  Send
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const categories = [
    { name: 'Fruits & Vegetables', path: '/category/fruits-veggies' },
    { name: 'Dairy & Eggs', path: '/category/dairy' },
    { name: 'Meat & Seafood', path: '/category/meat-seafood' },
    { name: 'Bakery & Bread', path: '/category/bakery' },
    { name: 'Beverages', path: '/category/beverages' },
    { name: 'Snacks', path: '/category/snacks' }
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'FAQs', path: '/faqs' },
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Return Policy', path: '/returns' }
  ];

  const socialLinks = [
    { icon: Facebook, url: '#', color: 'hover:bg-blue-600' },
    { icon: Twitter, url: '#', color: 'hover:bg-sky-500' },
    { icon: Instagram, url: '#', color: 'hover:bg-pink-600' },
    { icon: Youtube, url: '#', color: 'hover:bg-red-600' }
  ];

  const features = [
    { icon: Truck, text: 'Free Delivery', subtext: 'On orders above ₹500' },
    { icon: Clock, text: '30 Min Delivery', subtext: 'Express delivery' },
    { icon: Shield, text: 'Secure Payment', subtext: '100% secure' },
    { icon: Heart, text: 'Best Quality', subtext: 'Fresh products' }
  ];

  return (
    <footer className="bg-linear-to-b from-gray-900 to-gray-950 text-white pt-16 pb-8">
      {/* Features Section */}
      <div className=" px-4 sm:px-6 lg:px-8 mb-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all duration-300 "
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-500/20 rounded-lg group-hover:bg-amber-500/30 transition-colors">
                  <feature.icon className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm">{feature.text}</h4>
                  <p className="text-xs text-gray-400">{feature.subtext}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Footer */}
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
              <Link to="/" className="flex items-center gap-2.5 group shrink-0">
                         <div className="relative">
                           <div className="relative w-11 h-11 bg-linear-to-r from-orange-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300">
                             <ShoppingBag className="w-5 h-5 text-white" />
                           </div>
                         </div>
                         <span className="">
                            <p className="text-xl lg:text-2xl font-bold bg-linear-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent">ShopMart</p>
                            <p className="text-xs text-slate-500">App Store</p>
                         </span>
                       </Link>
            
            <p className="text-gray-400 text-sm leading-relaxed">
              Your one-stop destination for fresh groceries and daily essentials. 
              We deliver happiness to your doorstep.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group">
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">123 Market Street, Food City, FC 12345</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group">
                <Phone className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">+1 234 567 8900</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 hover:text-amber-400 transition-colors group">
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm">support@grocerystore.com</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-110 ${social.color}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative inline-block">
              Categories
              <span className="absolute -bottom-2 left-0 w-12 h-1  bg-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {categories.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 grouptext-sm transition-all duration-300 flex items-center gap-1.5 group"
                  >
                    <div className="w-2 h-2  bg-slate-800 rounded-full transition-all group-hover:bg-amber-400 " />
                    <span className="group-hover:text-amber-400  transition-transform">
                      {link.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1  bg-amber-500 rounded-full"></span>
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 group text-sm transition-all duration-300 flex items-center gap-2 group"
                  >
                    <div className="w-2 h-2 bg-slate-800 rounded-full  transition-all group-hover:bg-amber-400" />
                    <span className="group-hover:text-amber-400 transition-transform">
                      {link.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-5 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-12 h-1  bg-amber-500 rounded-full"></span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to get updates on new products and exclusive offers.
            </p>
            
            <div className="relative group">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-amber-500 transition-all duration-300"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-amber-500 rounded-lg hover:bg-amber-600 transition-all duration-300 hover:scale-110 group-hover:rotate-12">
                <Send className="w-4 h-4" />
              </button>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-sm text-gray-400 mb-3">We Accept</p>
              <div className="flex gap-2">
                <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <span className="text-xs font-bold">VISA</span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <span className="text-xs font-bold">MC</span>
                </div>
                <div className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-300">
                  <span className="text-xs font-bold">UPI</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} GroceryStore. All rights reserved.
            </p>
            
            <div className="flex gap-6">
              <button className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Privacy Policy
              </button>
              <button className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Terms of Use
              </button>
              <button className="text-gray-400 hover:text-amber-400 text-sm transition-colors">
                Cookie Policy
              </button>
            </div>

            <p className="text-gray-500 text-xs">
              Made with <span className="text-red-500 animate-pulse">❤</span> for fresh groceries
            </p>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-amber-500 rounded-full shadow-lg shadow-amber-500/30 hover:bg-amber-600 transition-all duration-300 hover:scale-110 z-50"
      >
        <ChevronRight className="w-5 h-5 -rotate-90" />
      </button>
    </footer>
  );
};

export default Footer;