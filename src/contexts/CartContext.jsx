import React, { createContext, useState, useEffect } from 'react'

//create context
export const CartContext = createContext()

const CartProvider = ({ children }) => {
  //cart state
  const [cart, setCart] = useState([]);

  //items amount state
  const [itemAmount, setItemAmount] = useState(0);

  //total price
  const [total, setTotal] = useState(0);

  useEffect(()=>{
    const total = cart.reduce((accumulator, currentItem)=>{
      return accumulator + currentItem.price * currentItem.amount;
    },0);
    setTotal(total);
  })
  //update Item amount
  useEffect(()=>{
    if(cart) {
      const amount = cart.reduce((accumulator, currentItem) =>{
        return accumulator + currentItem.amount;
      }, 0);
      setItemAmount(amount);
    }
  }, [cart])

  const addToCart = (products, id)=>{
    const newItem = { ...products, amount: 1};

    //check if the items is already in the cart
    const cartItem = cart.find((item)=>{
      return item.id === id;
    });
    // console.log(cartItem);
    //if the cart items is already in the cart
    if(cartItem) {
      const newCart = [...cart].map((item) =>{
        if(item.id === id){
          return { ...item, amount: cartItem.amount + 1};
        }else{
          return item;
        }
      });
      setCart(newCart);
    }else{
      setCart([ ...cart, newItem]);
    }
  };
//console.log(cart);

  const removeFromCart = (id) => {
    const newCart = cart.filter(item => {
      return item.id !== id;
    })
    setCart(newCart);
  };

//clear cart
  const clearCart = () =>{
    setCart([]);
  }

//increment amount
  const incrementAmount = (id) => {
    const cartItem = cart.find((item) => item.id === id);
    addToCart(cartItem, id);
  }
 
//decrement amount
  const decrementAmount = (id) => {
    const cartItem = cart.find((item) => {
      return item.id === id;
    });
    if(cartItem){
      const newCart = cart.map((item) => {
        if(item.id ===id){
          return { ...item, amount: cartItem.amount - 1};
        }else {
          return item;
        }
      });
      setCart(newCart);
    }
      if(cartItem.amount < 2){
        removeFromCart(id);
      }
  };


  return (
    <CartContext.Provider value= {{ cart, addToCart, removeFromCart, clearCart, incrementAmount, decrementAmount, itemAmount, total }}>
      { children }
    </CartContext.Provider>
  )
}

export default CartProvider