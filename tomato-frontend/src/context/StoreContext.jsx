import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const url = "http://localhost:4000";
  const [food_list, setFoodList] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [search, setSearch] = useState("")
  const [showSearch, setShowSearch] = useState(false)


  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };


  const addToCart = async (itemId) => {
  if (!token) {
    setShowLogin(true);
    return;
  }
  setCartItems((prev) => {
    if (!prev[itemId]) {
      return { ...prev, [itemId]: 1 };
    } else {
      return { ...prev, [itemId]: prev[itemId] + 1 };
    }
  });
  await axios.post(url + "/api/cart/add", { itemId }, { headers: { token } });
};


  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if (token) {
      await axios.post(url + "/api/cart/remove", { itemId }, { headers: { token } });
    }
  };

  const loadCartData = async (token) => {
    const response = await axios.post(url + "/api/cart/get", {}, { headers: { token } });
    setCartItems(response.data.cartData);
  };


  useEffect(() => {
  async function loadData() {
    await fetchFoodList();
    if (localStorage.getItem("token")) {
      const savedToken = localStorage.getItem("token");
      setToken(savedToken);
      await loadCartData(savedToken);
    }
  }
  loadData();
}, []);

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        let itemInfo = food_list.find((product) => product._id === itemId);
        if (itemInfo) totalAmount += itemInfo.price * cartItems[itemId];
      }
    }
    return totalAmount;
  };

   const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
    loadCartData,
    showLogin,
    setShowLogin,
     search,
  setSearch,
  showSearch,
  setShowSearch,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;