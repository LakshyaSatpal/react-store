import AppContext from "../../store/app-context";
import "./Header.css";
import { useContext } from "react";

function Header() {
  const { openCart, openAddProduct } = useContext(AppContext);

  return (
    <div className="header">
      <h1>My React Store</h1>
      <div>
        <button
          className="yellow-button"
          style={{ marginRight: "20px" }}
          onClick={openAddProduct}
        >
          Add Product
        </button>
        <button className="yellow-button" onClick={openCart}>
          Cart
        </button>
      </div>
    </div>
  );
}

export default Header;
