import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../Data/Data';
import { GalleryVerticalEnd } from 'lucide-react';

const Categories = () => {
    const navigate = useNavigate();

    return (
        <div className=" px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex items-center gap-3 mb-8">
            
                    <div className="p-3 bg-linear-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg shadow-orange-500/30">
                        <GalleryVerticalEnd className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Shop by Category</h2>
                        <p className="text-gray-500 text-sm mt-1">Explore our wide range of fresh products</p>
                    </div>
                </div>


            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-8 gap-4">
                {categories.map((category) => {
                    const IconComponent = category.icon;
                    
                    return (
                        <div
                            key={category.id}
                            onClick={() => navigate(`/products/${category.id}`)}
                            className={`
                                group relative overflow-hidden
                                bg-linear-to-br ${category.gradient}
                                p-6 rounded-2xl
                                cursor-pointer
                                transform transition-all duration-300
                                hover:scale-105 hover:shadow-xl
                                active:scale-95
                            `}
                        >
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500" />
                            <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full translate-y-8 -translate-x-8 group-hover:scale-150 transition-transform duration-500" />
                            
                            {/* Content */}
                            <div className="relative flex flex-col items-center text-center">
                                {/* Icon Container */}
                                <div className="mb-3 p-3 bg-white/20 rounded-xl backdrop-blur-sm group-hover:bg-white/30 transition-colors">
                                    <IconComponent className="w-6 h-6 text-white" />
                                </div>
                                
                                {/* Label */}
                                <span className="text-xs font-semibold text-white">
                                    {category.label}
                                </span>
                                
                                {/* Product Count (optional - add if you have product counts) */}
                                <span className="text-[10px] text-white/70 mt-1">
                                    {/* Add count here if available */}
                                </span>
                            </div>

                            {/* Hover Effect - Shine */}
                            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                        </div>
                    );
                })}
            </div>


            {/* Decorative Background Pattern */}
            <div className="absolute inset-0 pointer-events-none opacity-5">
                <div className="absolute top-20 left-10 w-40 h-40 bg-amber-200 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-60 h-60 bg-emerald-200 rounded-full blur-3xl" />
            </div>
        </div>
    );
};

export default Categories;