import React, { useContext } from 'react'
//import product context

import { ProductContext } from '../contexts/ProductContext';

//import components
import Product from '../components/Product';
import Hero from '../components/Hero';

const Home = () => {
  
  //get product from product context
  const { products } = useContext(ProductContext);
  // console.log(products);

  //get only men's and womens's clothing catogory
  const filteredProducts = products.filter(item =>{
    return (item.category === "men's clothing" || item.category === "women's clothing");
  });

  return (
    <div>
      <Hero />
      <section className='py-16 mx-[30px]'>
        <div className="container mx-auto">
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0'>
            {filteredProducts.map((products) =>{
              return (
                <Product key={products.id} products ={products}/>
                //<div className='w-full h-[300px] bg-pink-200' key={products.id}>{product.title}</div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home