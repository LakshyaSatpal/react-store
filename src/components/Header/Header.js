import "./Header.css";

function Header({ openCart, openAddProduct, onAddProduct }) {
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
