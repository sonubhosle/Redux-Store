import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById, getRelatedProducts } from '../states/Products/Action';
import { useParams } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  ChevronLeft, 
  ChevronRight, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  Package,
  Share2,
  CreditCard
} from 'lucide-react';
import ProductCard from '../components/UI/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, relatedProducts, loading } = useSelector(state => state.product);
  
  const [activeTab, setActiveTab] = useState('description');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const carouselRef = useRef(null);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
      dispatch(getRelatedProducts(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (!relatedProducts?.length) return;

    const interval = setInterval(() => {
      if (!isAnimating) {
        setCurrentSlide((prev) => 
          prev >= Math.ceil(relatedProducts.length / 4) - 1 ? 0 : prev + 1
        );
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [relatedProducts, isAnimating]);

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => 
      prev <= 0 ? Math.ceil(relatedProducts.length / 4) - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentSlide((prev) => 
      prev >= Math.ceil(relatedProducts.length / 4) - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 bg-amber-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-4 animate-bounce">😢</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-500">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const productData = product.data || product;
  const relatedProductsArray = relatedProducts?.data || relatedProducts || [];

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 animate-fadeIn">
          <span>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span>{productData.category}</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-amber-600 font-semibold">{productData.title?.slice(0, 30)}...</span>
        </div>

        {/* Main Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="lg:col-span-2 space-y-4 animate-slideInLeft">
            <div className="relative w-96 h-96 bg-white rounded-3xl border border-gray-200 overflow-hidden group shadow-xl hover:shadow-2xl transition-shadow">
              <img
                src={productData.image}
                alt={productData.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {productData.discount > 0 && (
                <div className="absolute top-4 right-4 bg-linear-to-r from-rose-500 to-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg animate-pulse">
                  {productData.discount}% OFF
                </div>
              )}
              {productData.tag && (
                <div className="absolute top-4 left-4 bg-linear-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                  {productData.tag}
                </div>
              )}
              
              {/* Share Button */}
              <button className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg hover:bg-amber-500 hover:text-white transition-all duration-300 transform hover:scale-110">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className=" lg:col-span-3 space-y-6 animate-slideInRight">
            <div>
              <p className="text-sm font-semibold text-amber-600 uppercase tracking-wide mb-2">
                {productData.brand}
              </p>
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                {productData.title}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(productData.rating || 0)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  ({productData.numRatings || 0} Reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-4">
              <span className="text-5xl font-bold text-gray-800">
                ₹{productData.discountedPrice || productData.price}
              </span>
              {productData.discount > 0 && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    ₹{productData.price}
                  </span>
                  <span className="text-sm font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                    Save ₹{productData.price - (productData.discountedPrice || productData.price)}
                  </span>
                </>
              )}
            </div>


            {/* Action Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button className="flex-1 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600  text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform  hover:shadow-xl  flex items-center justify-center gap-3">
                <ShoppingCart className="w-6 h-6" />
                Add to Cart
              </button>
               <button className="flex-1 bg-linear-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600  text-white py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 transform hover:shadow-xl  flex items-center justify-center gap-3">
                <CreditCard className="w-6 h-6" />
                Buy Now
              </button>
              <button className="p-4 border-2 border-gray-200 rounded-xl hover:border-rose-500 hover:text-rose-500 transition-all duration-300 transform ">
                <Heart className="w-6 h-6" />
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="text-center">
                <Truck className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-600">Free Delivery</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-600">Secure Payment</p>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 text-amber-500 mx-auto mb-2" />
                <p className="text-xs font-semibold text-gray-600">Easy Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-12 animate-fadeIn">
          <div className="flex gap-8 border-b border-gray-200">
            {['description', 'reviews', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 px-1 font-semibold capitalize transition-all duration-300 relative ${
                  activeTab === tab
                    ? 'text-amber-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-amber-500 animate-slideIn" />
                )}
              </button>
            ))}
          </div>

          <div className="py-6 animate-fadeIn">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">{productData.description}</p>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No reviews yet</p>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <Truck className="w-6 h-6 text-amber-500" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Free Delivery</h4>
                    <p className="text-sm text-gray-500">Free delivery on orders above ₹500</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                  <RotateCcw className="w-6 h-6 text-amber-500" />
                  <div>
                    <h4 className="font-semibold text-gray-800">7 Days Return</h4>
                    <p className="text-sm text-gray-500">Easy return within 7 days of delivery</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel */}
        {relatedProductsArray.length > 0 && (
          <div className="mt-16 animate-slideUp">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Related Products</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevSlide}
                  className="p-3 border-2 border-gray-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNextSlide}
                  className="p-3 border-2 border-gray-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all duration-300 transform hover:scale-110"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative overflow-hidden" ref={carouselRef}>
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(relatedProductsArray.length / 4) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full shrink-0 grid grid-cols-4 gap-6 px-1">
                    {relatedProductsArray
                      .slice(slideIndex * 4, slideIndex * 4 + 4)
                      .map((relatedProduct) => (
                        <ProductCard
                          key={relatedProduct._id}
                          product={relatedProduct}
                          showRating={true}
                          showWishlist={true}
                          showQuickView={true}
                        />
                      ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Slide Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: Math.ceil(relatedProductsArray.length / 4) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'w-8 bg-amber-500' 
                      : 'w-2 bg-gray-300 hover:bg-amber-300'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

export default ProductDetails;