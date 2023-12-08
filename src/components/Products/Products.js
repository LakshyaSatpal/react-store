import { useContext } from "react";
import "./Products.css";
import AppContext from "../../store/app-context";
import Loader from "../UI/Loader";

function Product({ id, name, image }) {
  const { handleAddToCart } = useContext(AppContext);
  return (
    <div key={id} className="product">
      <img src={require(`../../assets/${image}`)} alt={name} />
      <div className="product-name">{name}</div>
      <button
        className="yellow-button"
        onClick={() => handleAddToCart(id, name, image)}
      >
        Add to Cart
      </button>
    </div>
  );
}

function Products() {
  const { products, loading } = useContext(AppContext);
  if (loading) {
    return <Loader />;
  }
  return (
    <div className="products-container">
      {Object.keys(products).map((k) => (
        <Product
          key={k}
          id={products[k].id}
          name={products[k].name}
          image={products[k].image}
        />
      ))}
    </div>
  );
}

export default Products;
