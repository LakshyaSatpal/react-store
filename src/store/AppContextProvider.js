import React, { useState } from "react";
import AppContext from "./app-context";
import initialProducts from "../data/products.json";

const AppContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(initialProducts);

  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

  const openAddProduct = () => setShowAddProduct(true);
  const closeAddProduct = () => setShowAddProduct(false);

  const handleAddToCart = (productId, productName, productImage) => {
    const productInCartIndex = cartItems.findIndex(
      (item) => item.id === productId
    );
    if (productInCartIndex === -1) {
      const cartItem = {
        id: productId,
        name: productName,
        image: productImage,
        quantity: 1,
      };
      setCartItems((state) => [...state, cartItem]);
    } else {
      const updatedCartItems = [...cartItems];
      updatedCartItems[productInCartIndex].quantity += 1;
      setCartItems(updatedCartItems);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    const productInCartIndex = cartItems.findIndex(
      (item) => item.id === productId
    );
    const updatedCartItems = [...cartItems];
    updatedCartItems[productInCartIndex].quantity += 1;
    setCartItems(updatedCartItems);
  };

  const handleDecreaseQuantity = (productId) => {
    const productInCartIndex = cartItems.findIndex(
      (item) => item.id === productId
    );
    const qty = cartItems[productInCartIndex].quantity;
    let updatedCartItems = [...cartItems];
    if (qty === 1) {
      updatedCartItems = updatedCartItems.filter(
        (item) => item.id !== productId
      );
    } else {
      updatedCartItems[productInCartIndex].quantity -= 1;
    }
    setCartItems(updatedCartItems);
  };

  const handleAddProduct = (productName) => {
    const product = {
      id: products.length + 1,
      name: productName,
      image: "default_product.png",
    };
    setProducts((state) => [...state, product]);
    closeAddProduct();
  };

  const appContextValue = {
    showCart,
    showAddProduct,
    products,
    cartItems,
    openCart,
    closeCart,
    openAddProduct,
    closeAddProduct,
    handleAddProduct,
    handleAddToCart,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
  };

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
