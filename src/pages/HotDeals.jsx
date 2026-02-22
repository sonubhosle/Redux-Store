import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getHotDeals } from '../states/Products/Action';
import { ChevronLeft, ChevronRight, Flame, Clock, ShoppingCart, Zap } from 'lucide-react';

const HotDeals = () => {
    const dispatch = useDispatch();
    const { hotDeals, loading } = useSelector((state) => state.product);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);
    const carouselRef = useRef(null);

    useEffect(() => {
        dispatch(getHotDeals());
    }, [dispatch]);

    useEffect(() => {
        if (!hotDeals?.length) return;

        const interval = setInterval(() => {
            if (!isAnimating) {
                nextSlide();
            }
        }, 4000);

        return () => clearInterval(interval);
    }, [hotDeals, currentSlide, isAnimating]);

    const totalSlides = hotDeals ? Math.ceil(hotDeals.length / 4) : 0;

    const nextSlide = () => {
        if (isAnimating || totalSlides <= 1) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev + 1) % totalSlides);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating || totalSlides <= 1) return;
        setIsAnimating(true);
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const goToSlide = (index) => {
        if (isAnimating || index === currentSlide) return;
        setIsAnimating(true);
        setCurrentSlide(index);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        setTouchEnd(e.touches[0].clientX);
    };

    const handleTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        
        const distance = touchStart - touchEnd;
        const minSwipeDistance = 50;

        if (Math.abs(distance) > minSwipeDistance) {
            if (distance > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }

        setTouchStart(null);
        setTouchEnd(null);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Flame className="w-6 h-6 text-amber-500 animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    if (!hotDeals?.length) {
        return (
            <div className="text-center py-16 bg-linear-to-br from-orange-50 to-amber-50 rounded-3xl">
                <Flame className="w-16 h-16 text-amber-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-semibold">No hot deals available</p>
                <p className="text-gray-400 text-sm mt-2">Check back later for exciting offers!</p>
            </div>
        );
    }

    return (
        <div className="relative  px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-linear-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg shadow-orange-500/30">
                        <Flame className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Hot Deals</h2>
                        <p className="text-gray-500 text-sm mt-1">Limited time offers</p>
                    </div>
                </div>
                
                {/* Timer */}
                <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl">
                    <Clock className="w-4 h-4 text-amber-600" />
                    <span className="text-sm font-semibold text-amber-600">Ends in 23:59:59</span>
                </div>
            </div>

            {/* Carousel Container */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-orange-100 to-amber-100 p-8">
                {/* Navigation Buttons */}
                {totalSlides > 1 && (
                    <>
                        <button  onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white shadow-lg transition-all duration-300 transform hover:scale-110 text-gray-800">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white shadow-lg transition-all duration-300 transform hover:scale-110 text-gray-800">
                            <ChevronRight className="w-6 h-6" />
                        </button>
                    </>
                )}

                {/* Carousel Content */}
                <div 
                    className="overflow-hidden"
                    onTouchStart={handleTouchStart}
                    onTouchMove={handleTouchMove}
                    onTouchEnd={handleTouchEnd}
                    ref={carouselRef}
                >
                    <div   className="flex transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }} >
                        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
                            <div key={slideIndex} className="w-full shrink-0">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {hotDeals
                                        .slice(slideIndex * 4, slideIndex * 4 + 4)
                                        .map((deal, index) => (
                                            <div
                                                key={deal._id || index}
                                                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fadeInUp"
                                                style={{ animationDelay: `${index * 100}ms` }}
                                            >
                                                {/* Hot Deal Badge */}
                                                <div className="absolute top-3 left-3 z-10">
                                                    <div className="relative">
                                                        <div className="bg-linear-to-r from-orange-500 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1 shadow-lg animate-pulse">
                                                            <Zap className="w-3 h-3" />
                                                            HOT DEAL
                                                        </div>
                                                        <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-50"></div>
                                                    </div>
                                                </div>

                                                {/* Discount Badge */}
                                                {deal.discount > 0 && (
                                                    <div className="absolute top-3 right-3 z-10">
                                                        <div className="bg-linear-to-r from-amber-500 to-amber-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                                                            {deal.discount}% OFF
                                                        </div>
                                                    </div>
                                                )}

                                                {/* Image Container */}
                                                <div className="relative aspect-square bg-linear-to-br from-gray-50 to-gray-100 overflow-hidden">
                                                    <img
                                                        src={deal.image}
                                                        alt={deal.title}
                                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    />
                                                    
                                                    {/* Overlay on Hover */}
                                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                                        <button className="bg-white text-gray-800 px-4 py-2 rounded-xl font-semibold text-sm transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-amber-500 hover:text-white">
                                                            Quick View
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Content */}
                                                <div className="p-4">
                                                    <p className="text-xs text-amber-600 font-semibold mb-1">
                                                        {deal.brand}
                                                    </p>
                                                    <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors">
                                                        {deal.title}
                                                    </h3>
                                                    
                                                    {/* Price */}
                                                    <div className="flex items-baseline gap-2 mb-3">
                                                        <span className="text-xl font-bold text-gray-800">
                                                            ₹{deal.discountedPrice || deal.price}
                                                        </span>
                                                        {deal.discount > 0 && (
                                                            <span className="text-sm text-gray-400 line-through">
                                                                ₹{deal.price}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {/* Progress Bar (fake urgency) */}
                                               

                                                    {/* Stock Status */}
                                                    <p className="text-xs text-orange-600 font-semibold mb-3">
                                                        ⚡ Only {Math.floor(Math.random() * 10) + 1} left in stock
                                                    </p>

                                                    {/* Add to Cart Button */}
                                                    <button className="w-full bg-linear-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-amber-500/30">
                                                        <ShoppingCart className="w-4 h-4" />
                                                        Add to Cart
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>



        
        </div>
    );
};

export default HotDeals;