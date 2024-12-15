import Breadcrump from "./Breadcrumb/Breadcrump";
import Gallery from "./Gallery/Gallery";
import Info from "./Info/Info";
import Tabs from "./Info/Tabs/Tabs";
import "./ProductDetails.css";

const ProductDetails = () => {
  return (
    <section className="single-product">
      <div className="container">
        <div className="single-product-wrapper">
          <Breadcrump />
          <div className="single-content">
            <main className="site-main">
              <Gallery />
              <Info />
            </main>
          </div>
        <Tabs />
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;
