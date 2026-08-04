import { createContext, useContext, useEffect, useState } from "react";
import { API_BASE } from "../api";

const CartContext = createContext();


export function CartProvider({children}){
    const [cart , setCart] = useState(null)


    useEffect(()=>{
        fetch(`${API_BASE}/carts`, {credentials:"include"}).then(res => res.json())
        .then(data =>setCart(data.cart))
    },[])


  const addToCart = async (bookId) => {
  const res = await fetch(`${API_BASE}/carts/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify({ bookId })  
  });

  const data = await res.json();
  
  setCart(data.cart);
};


     const updateCart = async(bookId, quantity)=>{
        const res = await fetch(`${API_BASE}/carts/update`,{
             method:"PUT",
            headers:{
              "Content-Type": "application/json" 
            },
            credentials:"include",
            body:JSON.stringify({bookId,quantity})

       
        })

       const data = await res.json();
      if (!res.ok) {
     
      alert(data.message || "Error updating cart");
      return;
    }

         
         setCart(data.cart);
     }


     const removeFromCart = async(bookId)=>{
         const res = await fetch(`${API_BASE}/carts/remove/${bookId}`,{
              method:"DELETE",
              credentials:"include",
         })

        const data = await res.json();
         setCart(data.cart); 
     }


     return(
        <CartContext.Provider value={{cart,addToCart, updateCart, removeFromCart}}>{children}</CartContext.Provider>
     )


}

export const useCart = () => useContext(CartContext);