import React, { useEffect, useState } from "react";
import "../Category/CategoryItem.css";
import CategoryItem from "../Category/CategoryItem";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function HomePageBody({ categoriesList, mostLikedProduct, mostRatedProduct, mostPopularBrand }) {
  const [showMostLikedProduct, setShowMostLikedProduct] = useState(false);
  const [showMostRatedProduct, setShowMostRatedProduct] = useState(false);

  const list = categoriesList.map((category, key) => {
    return (
      <CategoryItem
        id={category.id}
        category_name={category.category_name}
        picture={category.picture}
        key={key}
      />
    );
  });

  const handleCloseLikedProduct = (e) => {
    setShowMostLikedProduct(false);
  };

  const handleCloseRatedProduct = (e) => {
    setShowMostRatedProduct(false);
  };

  var mostLiked = null;
  var mostRated = null;
  var brand = ""

  if(mostPopularBrand !== "") {
    brand = (<span className="mostPopularBrand"> {"Most Popular brand: " + mostPopularBrand} <i class="bi bi-balloon-heart"></i></span>)
  }

  if (mostLikedProduct !== null) {
    mostLiked = (
      <div>
        <span
          className="mostLikeRateProduct"
          onClick={() => {
            setShowMostLikedProduct(true);
          }}
        >
          <i class="bi bi-stars"></i> Tap to see most liked product <i class="bi bi-stars"></i>
        </span>
        <div className="MostLikedProduct">
          <Modal show={showMostLikedProduct} onHide={!showMostLikedProduct}>
            <Modal.Header>
              <div className="toproduct-header">
                <h5>
                  Most liked product <i class="bi bi-stars"></i>
                </h5>
              </div>
              <i
                onClick={() => {
                  handleCloseLikedProduct();
                }}
                class="bi bi-x-lg"
              ></i>
            </Modal.Header>
            <Modal.Body>
              <div className="signIn-header">
                <Link
                  to={`/Products/${mostLikedProduct.product_id}`}
                  style={{ textDecoration: "none" , color: "purple"}}
                >
                  Go to "{mostLikedProduct.product_name}"
                </Link>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }

  if (mostRatedProduct !== null) {
    mostRated = (
      <div>
        <span
          className="mostLikeRateProduct"
          onClick={() => {
            setShowMostRatedProduct(true);
          }}
        >
          <i class="bi bi-stars"></i> Tap to see most rated product <i class="bi bi-stars"></i>
        </span>
        <div className="MostRatedProduct">
          <Modal show={showMostRatedProduct} onHide={!showMostRatedProduct}>
            <Modal.Header>
              <div className="toproduct-header">
                <h5>
                  Most rated product <i class="bi bi-stars"></i>
                </h5>
              </div>
              <i
                onClick={() => {
                  handleCloseRatedProduct();
                }}
                class="bi bi-x-lg"
              ></i>
            </Modal.Header>
            <Modal.Body>
              <div className="signIn-header">
                <Link
                  to={`/Products/${mostRatedProduct.product_id}`}
                  style={{ textDecoration: "none", color: "purple"}}
                >
                  Go to "{mostRatedProduct.product_name}"
                </Link>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    );
  }

  return (
    <div className="homepagebody">
      <div className="Top-Products">
        {brand}
        {mostLiked}
        {mostRated}
      </div>
      <div class="listDesign">{list}</div>
    </div>
  );
}

export default HomePageBody;
