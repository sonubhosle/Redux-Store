import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from '../states/Products/Action';

const Home = () => {

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.product);
  console.log(products)
  useEffect(() => {
      console.log('Dispatching action to get products...');

    dispatch(getAllProducts)
  }, [dispatch])
  return (
    <div>Home</div>
  )
}

export default Home