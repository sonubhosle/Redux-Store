import { useState } from "react";
import { ShoppingCart, Heart, Eye, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ 
  product,
  onAddToCart,
  onAddToWishlist,
  onQuickView,
  showRating = false,
  showWishlist = true,
  showQuickView = true
}) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const {_id, title, price,
    discount = 0,
    image,
    category,
    rating = 0,
  } = product;

  const discountedPrice = discount > 0 
    ? (price * (1 - discount / 100)).toFixed(2) 
    : price;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) onAddToCart(product);
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToWishlist) onAddToWishlist(product);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onQuickView) onQuickView(product);
  };

  return (
    <div 
      className="group bg-white rounded-2xl border border-stone-200 overflow-hidden hover:shadow-2xl transition-all duration-300  animate-fadeInUp"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square bg-stone-100 overflow-hidden">
        {!isImageLoaded && (
          <div className="absolute inset-0 bg-stone-200 animate-pulse" />
        )}
        <img
          src={image}
          alt={title}
          className='w-full h-full object-cover transition-transform duration-500 '
          onLoad={() => setIsImageLoaded(true)}
        />
        
        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-linear-to-r from-rose-500 to-red-500 text-white text-xs font-bold px-2.5 py-1.5 rounded-full shadow-lg z-10">
            {discount}%
          </div>
        )}

        {/* Quick Action Buttons (appear on hover) */}
        <div className={`absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-all duration-300 ${
          isHovered ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}>
          {showQuickView && (
            <button
              onClick={handleQuickView}
              className="p-3 bg-white rounded-full hover:bg-amber-500 text-stone-700 hover:text-white transition-all duration-200 transform "
              title="Quick view"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          )}
          {showWishlist && (
            <button
              onClick={handleAddToWishlist}
              className="p-3 bg-white rounded-full hover:bg-rose-500 text-stone-700 hover:text-white transition-all duration-200 transform "
              title="Add to wishlist"
            >
              <Heart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      <div className="p-4">
        {/* Category */}
        <p className="text-xs text-stone-500 mb-1 capitalize font-semibold">
          {category}
        </p>

        {/* Title */}
        <h3 onClick={() => navigate(`/product/${_id}`)} className="font-bold text-stone-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
          {title}
        </h3>

        {/* Rating */}
        {showRating && rating > 0 && (
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(rating)
                    ? "text-amber-400 fill-amber-400"
                    : "text-stone-300"
                }`}
              />
            ))}
            <span className="text-xs text-stone-500 ml-1">({rating})</span>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-stone-800">
              ₹{discountedPrice}
            </span>
            {discount > 0 && (
              <span className="text-sm text-stone-400 line-through">
                ₹{price}
              </span>
            )}
          </div>
        </div>

    
      </div>
    </div>
  );
};

export default ProductCard;