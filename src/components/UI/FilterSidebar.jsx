import { Filter, SlidersHorizontal, Tag, TrendingDown } from "lucide-react";
import { categories, discountOptions } from "../Data/Data";

const FilterSidebar = ({ 
  isMobile,
  activeFiltersCount,
  selectedCategories,
  priceRange,
  selectedDiscounts,
  clearAllFilters,
  toggleCategory,
  toggleDiscount,
  setPriceRange
}) => (
  <div className={`${isMobile ? "" : "sticky top-24"} space-y-6`}>
    {/* Header */}
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="p-2 rounded-xl bg-linear-to-r from-amber-500 to-amber-600 shadow-lg shadow-amber-500/30">
          <SlidersHorizontal className="w-4 h-4 text-white" />
        </div>
        <h2 className="text-lg font-bold text-stone-800">Filters</h2>
        {activeFiltersCount > 0 && (
          <span className="px-2.5 py-1 bg-linear-to-r from-amber-500 to-amber-600 text-white text-xs font-bold rounded-full shadow-lg shadow-amber-500/30">
            {activeFiltersCount}
          </span>
        )}
      </div>
      {activeFiltersCount > 0 && (
        <button
          onClick={clearAllFilters}
          className="text-xs font-bold text-red-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
        >
          Clear All
        </button>
      )}
    </div>

    {/* Categories */}
    <div className="bg-white rounded-3xl border border-slate-200 p-5 transition-shadow duration-300">
      <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2">
        <Filter className="w-4 h-4 text-emerald-500" />
        Categories
      </h3>
      <div className="flex flex-col gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => toggleCategory(cat.id)}
            className={`
              relative overflow-hidden px-4 py-2.5  rounded-3xl transition-all duration-300 transform 
              ${
                selectedCategories.includes(cat.id)
                  ? `bg-linear-to-r ${cat.gradient} text-white shadow-lg`
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700"
              }
            `}
          >
            <div className="flex  items-center gap-2">
              <cat.icon className="w-5 h-5 " />
              <span className="text-xs font-bold text-center leading-tight">{cat.label}</span>
            </div>
            {selectedCategories.includes(cat.id) && (
              <div className="absolute top-2 right-2 w-5 h-5 bg-white rounded-full flex items-center justify-center">
                <span className="text-emerald-500 font-bold text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>

    {/* Price Range */}
    <div className="bg-white rounded-2xl border border-slate-200 p-5 transition-shadow duration-300">
      <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
        <Tag className="w-4 h-4 text-amber-500" />
        Price Range
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1.5 bg-linear-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-amber-500/30">
            ₹{priceRange[0]}
          </span>
          <span className="text-slate-400 font-bold">—</span>
          <span className="px-3 py-1.5 bg-linear-to-r from-amber-500 to-amber-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-amber-500/30">
            ₹{priceRange[1]}
          </span>
        </div>
        <div className="relative pt-2">
          <input
            type="range"
            min="0"
            max="10000"
            step="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            className="w-full h-3 bg-slate-200 rounded-full appearance-none cursor-pointer accent-amber-500"
            style={{
              background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${(priceRange[1] / 10000) * 100}%, #e7e5e4 ${(priceRange[1] / 10000) * 100}%, #e7e5e4 100%)`
            }}
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs  text-slate-500 block mb-1.5">Minimum</label>
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm  text-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200"
            />
          </div>
          <div>
            <label className="text-xs  text-slate-500 block mb-1.5">Maximum</label>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 10000])}
              className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm  text-stone-700 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all duration-200"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Discount */}
    <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
      <h3 className="text-sm font-bold text-stone-700 mb-4 flex items-center gap-2">
        <TrendingDown className="w-4 h-4 text-rose-500" />
        Discount Offers
      </h3>
      <div className="space-y-2">
        {discountOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => toggleDiscount(opt.value)}
            className={`
              w-full flex items-center justify-between px-4 py-2 rounded-3xl transition-all duration-300 transform 
              ${
                selectedDiscounts.includes(opt.value)
                  ? `bg-linear-to-r ${opt.gradient} text-white shadow-lg`
                  : "bg-slate-50 hover:bg-slate-100 text-slate-700"
              }
            `}
          >
            <span className="text-sm font-bold">{opt.label}</span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
              selectedDiscounts.includes(opt.value)
                ? "bg-white/30 text-white"
                : "bg-rose-100 text-rose-600"
            }`}>
              {opt.value}%
            </span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default FilterSidebar;