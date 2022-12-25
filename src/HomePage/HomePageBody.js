import React, { useEffect, useState } from "react";
import "../Category/CategoryItem.css";
import CategoryItem from "../Category/CategoryItem";
import { Link } from "react-router-dom";
import { Modal } from "react-bootstrap";

function HomePageBody({ categoriesList, mostLikedProduct, mostRatedProduct }) {
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

  if (mostLikedProduct !== null) {
    mostLiked = (
      <div>
        <div
          onClick={() => {
            setShowMostLikedProduct(true);
          }}
        >
          Tap to see most liked product <i class="bi bi-stars"></i>
        </div>
        <div className="MostLikedProduct">
          <Modal show={showMostLikedProduct} onHide={!showMostLikedProduct}>
            <Modal.Header>
              <div className="signIn-name">
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
                  to={`/Products/${mostLikedProduct.id}`}
                  style={{ textDecoration: "none" }}
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
        <div
          onClick={() => {
            setShowMostRatedProduct(true);
          }}
        >
          Tap to see most rated product <i class="bi bi-stars"></i>
        </div>
        <div className="MostRatedProduct">
          <Modal show={showMostRatedProduct} onHide={!showMostRatedProduct}>
            <Modal.Header>
              <div className="signIn-name">
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
                  to={`/Products/${mostRatedProduct.id}`}
                  style={{ textDecoration: "none" }}
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
        {mostLiked}
        {mostRated}
      </div>
      <div class="listDesign">{list}</div>
    </div>
  );
}

export default HomePageBody;
