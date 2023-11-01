import React, { useState } from "react";
import "../styles/Home.css";
import { Carousel, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import { useSelector } from "react-redux";
import ProductPreview from "../components/ProductPreview";
import { useEffect } from "react";
import { getAllProducts } from "../redux/actions/productAction";
import { useDispatch } from "react-redux";
import Loading from "../components/Loading";
import { updateUser } from "../redux/actions/userAction";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    dispatch(getAllProducts());
    if (user) dispatch(updateUser(user._id));
  }, [dispatch]);
  const { products, loading } = useSelector((state) => state.products);

  if (products.length < 1) return <Loading />;
  return (
    <div>
      
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://babyclothes4less.us/images/KIDSBANNERMAIN.jpg"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://previews.123rf.com/images/oksun70/oksun701907/oksun70190700001/130445930-nursery-babies-playing-with-toys-isolated-on-white.jpg"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://www.mangofashiongroup.com/documents/20122/139595/Mango+Kids_Passeig+de+Gracia+%28Barcelona%29_3.jpg/6a9c0e38-d720-20d4-3f71-eba30df1d4b3?t=1695322387290"
            alt="Third slide"
          />
        </Carousel.Item>
        
        
      </Carousel>
      <div className="featured-products-container container mt-4">
        <h2>Latest products</h2>
        {/* last products here */}
        <div className="d-flex justify-content-center flex-wrap">
          {products.slice(0, 4).map((product) => (
            <ProductPreview key={product._id} product={product} />
          ))}
        </div>
        <div>
          <Link
            to="/products/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>
      <div className="sale__banner--container mt-4">
        <img
          alt="on sale"
          src="https://kidstudio.in/cdn/shop/collections/40_off_on_Kids_Wear.jpg?v=1596810901"
        />
      </div>
      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category, i) => (
            <LinkContainer
              to={`/products/${category.name.toLocaleLowerCase()}`}
              key={i}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
