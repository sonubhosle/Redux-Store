import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../states/Products/Action";
import { sortOptions } from "../components/Data/Data";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  X,
  ArrowUpDown,
} from "lucide-react";
import FilterSidebar from "../components/UI/FilterSidebar";
import Pagination from "../components/UI/Pagination";
import ProductCard from "../components/UI/ProductCard";

const PRODUCTS_PER_PAGE = 10;

const ProductsPage = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPageTransitioning, setIsPageTransitioning] = useState(false);

  // Filter states
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedDiscounts, setSelectedDiscounts] = useState([]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, priceRange, selectedDiscounts, sortBy]);

  // Filter & Sort logic
  const filteredAndSortedProducts = () => {
    let filtered = [...(products || [])];

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category));
    }

    filtered = filtered.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (selectedDiscounts.length > 0) {
      const maxDiscount = Math.max(...selectedDiscounts);
      filtered = filtered.filter((p) => (p.discount || 0) >= maxDiscount);
    }

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      default:
        break;
    }

    return filtered;
  };

  const allFilteredProducts = filteredAndSortedProducts();
  const totalPages = Math.ceil(allFilteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const displayProducts = allFilteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages || newPage === currentPage) return;
    setIsPageTransitioning(true);
    setTimeout(() => {
      setCurrentPage(newPage);
      setIsPageTransitioning(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 300);
  };

  const toggleCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((c) => c !== categoryId)
        : [...prev, categoryId]
    );
  };

  const toggleDiscount = (value) => {
    setSelectedDiscounts((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 10000]);
    setSelectedDiscounts([]);
    setSearchQuery("");
    setSortBy("default");
  };

  const activeFiltersCount =
    selectedCategories.length +
    selectedDiscounts.length +
    (priceRange[0] !== 0 || priceRange[1] !== 10000 ? 1 : 0);

  // Handlers for product interactions
  const handleAddToCart = (product) => {
    console.log("Add to cart:", product);
    // Implement your add to cart logic here
  };

  const handleAddToWishlist = (product) => {
    console.log("Add to wishlist:", product);
  };

  const handleQuickView = (product) => {
    console.log("Quick view:", product);
  };

  return (
    <div className="min-h-screen">
      <div className="px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* LEFT: Filter Sidebar (Desktop) */}
          <aside className="hidden lg:block w-80 shrink-0">
            <FilterSidebar 
              isMobile={false}
              activeFiltersCount={activeFiltersCount}
              selectedCategories={selectedCategories}
              priceRange={priceRange}
              selectedDiscounts={selectedDiscounts}
              clearAllFilters={clearAllFilters}
              toggleCategory={toggleCategory}
              toggleDiscount={toggleDiscount}
              setPriceRange={setPriceRange}
            />
          </aside>

          {/* RIGHT: Products Grid */}
          <main className="flex-1">
            {/* Top Bar */}
            <div className="bg-white rounded-2xl border border-slate-200 p-4 mb-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 placeholder-slate-400 outline-none focus:border-amber-500 focus:ring-3 focus:ring-amber-500/20 transition-all duration-200"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setIsSortOpen(!isSortOpen)}
                    className="flex items-center gap-2 px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all duration-200 min-w-50"
                  >
                    <ArrowUpDown className="w-4 h-4 text-slate-500" />
                    <span className="flex-1 text-sm font-bold text-slate-700 text-left">
                      {sortOptions.find((o) => o.value === sortBy)?.label}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${
                        isSortOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isSortOpen && (
                    <div className="absolute right-0 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-20 animate-slideDown">
                      {sortOptions.map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setSortBy(opt.value);
                            setIsSortOpen(false);
                          }}
                          className={`
                            w-full text-left px-4 py-3 text-sm font-semibold transition-all duration-150
                            ${
                              sortBy === opt.value
                                ? "bg-amber-100 text-amber-500"
                                : "text-slate-700 hover:bg-slate-50"
                            }
                          `}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-3 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/30"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span className="text-sm font-bold">Filters</span>
                  {activeFiltersCount > 0 && (
                    <span className="bg-white text-amber-600 text-xs font-bold px-2 py-0.5 rounded-full">
                      {activeFiltersCount}
                    </span>
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-center justify-between text-sm">
                <span className="text-slate-500">
                  Showing <span className="font-bold text-slate-700">{startIndex + 1}-{Math.min(endIndex, allFilteredProducts.length)}</span> of{" "}
                  <span className="font-bold text-slate-700">{allFilteredProducts.length}</span> products
                </span>
                {totalPages > 1 && (
                  <span className="text-slate-500">
                    Page <span className="font-bold text-slate-700">{currentPage}</span> of{" "}
                    <span className="font-bold text-slate-700">{totalPages}</span>
                  </span>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`transition-opacity duration-300 ${
                isPageTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
              }`}
            >
              {loading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="w-12 h-12 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin" />
                </div>
              ) : displayProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-2xl border border-slate-200">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-slate-500 text-lg mb-3 font-semibold">No products found</p>
                  <button
                    onClick={clearAllFilters}
                    className="px-6 py-2.5 bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/30"
                  >
                    Clear all filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayProducts.map((product, index) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      onAddToWishlist={handleAddToWishlist}
                      onQuickView={handleQuickView}
                      showRating={true}
                      showWishlist={true}
                      showQuickView={true}
                      // variant prop removed
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Pagination */}
            {!loading && displayProducts.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                maxVisible={5}
                showFirstLast={true}
                showPageNumbers={true}
                size="md"
              />
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fadeIn"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-slate-50 z-50 lg:hidden overflow-y-auto animate-slideInLeft shadow-2xl">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-slate-800">Filters</h2>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-2 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <FilterSidebar 
                isMobile={true}
                activeFiltersCount={activeFiltersCount}
                selectedCategories={selectedCategories}
                priceRange={priceRange}
                selectedDiscounts={selectedDiscounts}
                clearAllFilters={clearAllFilters}
                toggleCategory={toggleCategory}
                toggleDiscount={toggleDiscount}
                setPriceRange={setPriceRange}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductsPage;