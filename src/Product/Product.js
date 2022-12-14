import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Product.css";
import photo from "../images/sephoraa.jpg"
import React, { useState, useContext, useEffect, useRef } from "react";

function Product() {
  // access the parameters of the current route.
  const { productId } = useParams();

  var [currentProduct, setCurrentProduct] = useState({
    product: {},
    ingredients: [],
    options: [],
  });

  const [reviews, setReviews] = useState([{content: "bla bla bla bla bla", date: "12/12/12", rate: "5", likes: 2, dislikes: 10, user_name: "user1"},
                                           {content: "bla bla bla bla bla", date: "12/12/12", rate: "5", likes: 2, dislikes: 10, user_name: "user2"}]);

  function getProductInfo() {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("https://localhost:7266/api/Products/" + productId, requestOptions)
      .then((response) => response.json())
      .then((res) => {
        setCurrentProduct(res);
      })
      .catch((error) => {
        console.log("Error");
      });

  }

  useEffect(() => {
    console.log(productId)
    if (productId) {
      function fetchData() {
        getProductInfo();
      }
      fetchData();
    }
  }, [productId]);

  return (
    <div className="Product">
      <div className="Product-header">
        <div className="Product-header-right">
          <p>S E P H O R E V I E W S</p>
        </div>
        <div className="Product-header-left">
          <Link to="HomePage">
            <button type="button" class="btn btn-outline-secondary">
              Go Back
            </button>
          </Link>
        </div>
      </div>

      <div className="Product-body">
        <img src={photo} className="product-img"></img>
        <h3>{currentProduct.product.product_name}</h3>
        <a href={currentProduct.product.url}>Link to the product on website</a>
        <h5>{(currentProduct.ingredients.length !== 0 ? "Ingredients:" : "")}</h5>
        <div className="ingredients-list">
        {currentProduct.ingredients.map(function(item, index) {
          return <span key={item}>{(index ? ', ' : '') + item }</span>
        })}
        </div>
        <h5>Details:</h5>
        <p>{currentProduct.product.details}</p>
        <h5>How to use:</h5>
        <p>{currentProduct.product.how_to_use}</p>
        <h5>{(currentProduct.product.online_only ? "Available online only." : "Available on store and online.")}</h5>
        <h5>{(currentProduct.options[0] !== "no options" ? "Options:" : "")}</h5>
        <div className="ingredients-list">
        {currentProduct.options.map(function(item, index) {
          return <span key={item}>{(index ? ', ' : '') + item }</span>
        })}
        </div>
      </div>

      <div className="Product-footer">
        {reviews ? (reviews.map((review) => (
          <div className="Product-review">
            <h5>{review.user_name}</h5>
            <div>{review.rate}</div>
            <div className="review-content">
              {review.content}
            </div>
            <div className="review-info">
              <div>Likes {review.likes}</div>
              <div>Dislikes {review.dislikes}</div>
              <div>{review.date}</div>
            </div>
          </div>
        ))) : ""}
      </div>
    </div>
  );
}

export default Product;
