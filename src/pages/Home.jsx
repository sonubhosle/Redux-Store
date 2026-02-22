import Categories from '../components/Categories/Categories'
import HotDeals from './HotDeals'
import Hero from '../components/Hero'
import { EqualApproximately } from 'lucide-react'
import { useEffect } from 'react'
import { getAllProducts } from '../states/Products/Action'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/UI/ProductCard'

const Home = () => {
  const dispatch = useDispatch()
  const { products, loading, } = useSelector((state) => state.product)

  useEffect(()=>{
    dispatch(getAllProducts())
  },[dispatch])

  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      <Hero/>
      <Categories/>
      <div className='px-4 sm:px-6 lg:px-8 py-5'>
              <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-linear-to-r from-orange-500 to-amber-500 rounded-2xl shadow-lg shadow-orange-500/30">
                        <EqualApproximately className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800">Featured Grocery</h2>
                        <p className="text-gray-500 text-sm mt-1">Explore our wide range of fresh products</p>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {loading ? (
                    <div className="flex items-center justify-center py-20">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-amber-200 border-t-amber-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <EqualApproximately className="w-6 h-6 text-amber-500 animate-pulse" />
                    </div>
                </div>
            </div>
                  ) : (
                     featuredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))
                  
                  )
                }
                </div>
      </div>
      <HotDeals/>
    </div>
  )
}

export default Home
