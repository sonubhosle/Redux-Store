 import { Apple, 
  Beef, 
  CakeSlice, 
  Coffee, 
  Egg, 
  Leaf, 
  Popcorn, 
  Snowflake} from 'lucide-react';
 export const categories = [
    { id: "fruits-veggies", icon:Apple, label: "Fruits & Veggies",  gradient: "from-emerald-400 to-green-500" },
    { id: "beverages", icon:Coffee, label: "Beverages",  gradient: "from-blue-400 to-cyan-500" },
    { id: "biscuits-snacks", icon:Popcorn, label: "Biscuits & Snacks",  gradient: "from-orange-400 to-amber-500" },
    { id: "breakfast-dairy", icon:Egg, label: "Breakfast & Dairy",  gradient: "from-purple-400 to-pink-500" },
    { id: "frozen-foods", icon:Snowflake, label: "Frozen Foods",  gradient: "from-indigo-400 to-blue-500" },
    {id:"meats-seafood", icon:Beef, label: "Meats & Seafood", gradient: "from-red-400 to-rose-500"},
    {id:"breads-bakery", icon:CakeSlice, label: "Breads & Bakery", gradient: "from-yellow-400 to-amber-500"},
        { id: "grocery-staples", icon:Leaf, label: "Grocery Staples",  gradient: "from-pink-400 to-rose-500" },

  ];

 export const discountOptions = [
    { value: 10, label: "10% or more", gradient: "from-rose-400 to-pink-400" },
    { value: 20, label: "20% or more", gradient: "from-rose-500 to-pink-500" },
    { value: 30, label: "30% or more", gradient: "from-rose-600 to-red-500" },
    { value: 40, label: "40% or more", gradient: "from-red-500 to-rose-600" },
    { value: 50, label: "50% or more", gradient: "from-red-600 to-rose-700" },
  ];

 export const sortOptions = [
    { value: "default", label: "Default" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "name-asc", label: "Name: A to Z" },
    { value: "name-desc", label: "Name: Z to A" },
    { value: "newest", label: "Newest First" },
  ];