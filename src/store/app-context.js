import { createContext } from "react";

const AppContext = createContext({
  showCart: false,
  showAddProduct: false,
  products: [],
  cartItems: [],
  openCart: () => {},
  closeCart: () => {},
  openAddProduct: () => {},
  closeAddProduct: () => {},
  handleAddProduct: () => {},
  handleAddToCart: () => {},
  handleIncreaseQuantity: () => {},
  handleDecreaseQuantity: () => {},
});

export default AppContext;
