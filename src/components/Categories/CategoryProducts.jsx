import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsByCategory } from "../../states/Products/Action";
import { categories } from "../Data/Data";
import ProductCard from "../UI/ProductCard";
import { ArrowLeft, ChevronDown } from "lucide-react";

const CategoryProducts = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { categoryProducts, loading } = useSelector((state) => state.product);
  

  const [sortBy, setSortBy] = useState("default");
  const [isSortOpen, setIsSortOpen] = useState(false);

  const currentCategory = categories.find(c => c.id === category) || {
    label: category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
    icon: null,
    gradient: "from-gray-400 to-gray-500"
  };

  useEffect(() => {
    if (category) {
      dispatch(getProductsByCategory(category));
    }
  }, [dispatch, category]);

  const getSortedProducts = () => {
    if (!categoryProducts) return [];
    const productsArray = categoryProducts.data || categoryProducts;
    
    if (!Array.isArray(productsArray)) return [];
    
    const sortedProducts = [...productsArray];
    
    switch (sortBy) {
      case "price-low":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }
    
    return sortedProducts;
  };

  const sortedProducts = getSortedProducts();
  console.log("Sorted products:", sortedProducts);

  const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
  ];

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
  };

  const handleAddToWishlist = (product) => {
    console.log("Add to wishlist:", product);
  };

  const handleQuickView = (product) => {
    console.log("Quick view:", product);
  };

  const IconComponent = currentCategory.icon;

  return (
    <div className="min-h-screen bg-gray-50">
   
      {/* Header Banner */}
      <div className={`bg-linear-to-r ${currentCategory.gradient} py-12 px-4`}>
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-white/90 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          
          <div className="flex items-center gap-4">
            {IconComponent && (
              <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
                <IconComponent className="w-12 h-12 text-white" />
              </div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                {currentCategory.label}
              </h1>
              <p className="text-white/90 text-lg">
                {sortedProducts.length} Products Available
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className=" px-4 sm:px-6 lg:px-8 py-8">
        {/* Sort Dropdown */}
        {!loading && sortedProducts.length > 0 && (
          <div className="flex justify-end mb-6">
            <div className="relative w-64">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl hover:border-amber-500 transition-all duration-200"
              >
                <span className="text-sm font-medium text-gray-700">
                  Sort by: {sortOptions.find(opt => opt.value === sortBy)?.label}
                </span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                  isSortOpen ? "rotate-180" : ""
                }`} />
              </button>

              {isSortOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-10"
                    onClick={() => setIsSortOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-20 animate-slideDown">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setSortBy(opt.value);
                          setIsSortOpen(false);
                        }}
                        className={`
                          w-full text-left px-4 py-3 text-sm transition-all duration-150
                          ${
                            sortBy === opt.value
                              ? "bg-amber-50 text-amber-600 font-semibold"
                              : "text-gray-700 hover:bg-gray-50"
                          }
                        `}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            {/* No Products Found */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-200">
                <div className="text-6xl mb-4">🛒</div>
                <p className="text-gray-500 text-lg mb-3 font-semibold">
                  No products found in this category
                </p>
                <button
                  onClick={() => navigate('/products')}
                  className="px-6 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/30"
                >
                  Browse All Products
                </button>
              </div>
            ) : (
              /* Products Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product._id || index}
                    product={product}
                    onAddToCart={handleAddToCart}
                    onAddToWishlist={handleAddToWishlist}
                    onQuickView={handleQuickView}
                    showRating={true}
                    showWishlist={true}
                    showQuickView={true}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CategoryProducts;