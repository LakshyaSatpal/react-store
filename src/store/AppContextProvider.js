import React, { useEffect, useState } from "react";
import AppContext from "./app-context";

const AppContextProvider = ({ children }) => {
  const [showCart, setShowCart] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState({});

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
      id: Object.keys(products).length + 1,
      name: productName,
      image: "default_product.png",
    };
    sendProductData(product);
    setProducts((state) => {
      return { ...state, [Object.keys(state).length + 1]: product };
    });
    closeAddProduct();
  };

  const sendProductData = async (product) => {
    try {
      await fetch(
        "https://react-store-18b7a-default-rtdb.firebaseio.com/products.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://react-store-18b7a-default-rtdb.firebaseio.com/products.json"
        );
        const data = await response.json();
        setProducts(data);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const appContextValue = {
    showCart,
    showAddProduct,
    products,
    cartItems,
    loading,
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
