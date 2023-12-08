import React, { useState } from "react";
import Header from "./components/Header/Header";
import Products from "./components/Products/Products";
import Cart from "./components/Cart/Cart";
import AddProduct from "./components/AddProduct/AddProduct";

import initialProducts from "./data/products.json";

function App() {
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

  return (
    <>
      <Header openCart={openCart} openAddProduct={openAddProduct} />
      <Products products={products} onAddToCart={handleAddToCart} />
      <Cart
        showCart={showCart}
        closeCart={closeCart}
        cartItems={cartItems}
        onIncQuantity={handleIncreaseQuantity}
        onDecQuantity={handleDecreaseQuantity}
      />
      <AddProduct
        showAddProduct={showAddProduct}
        onCloseAddProduct={closeAddProduct}
        onAddProduct={handleAddProduct}
      />
    </>
  );
}

export default App;
