import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Product.css";
import photo from "../images/sephoraa.jpg";
import React, { useState, useContext, useEffect, useRef } from "react";
import Reviews from "../Reviews";

function Product() {
  // access the parameters of the current route.
  const { productId } = useParams();

  const [reviews, setReviews] = useState([
    {
      content: "bla bla bla bla bla",
      date: new Date('2019-02-21 12:00:00'),
      rate: "2",
      likes: 2,
      dislikes: 10,
      user_name: "user1",
    },
    {
      content: "bla bla bla bla bla",
      date: new Date('2019-02-21 12:01:00'),
      rate: "4",
      likes: 2,
      dislikes: 10,
      user_name: "user2",
    },
    {
      content: "bla bla bla bla bla",
      date: new Date('2020-02-21 12:01:00'),
      rate: "5",
      likes: 2,
      dislikes: 10,
      user_name: "user3",
    },
  ]);

  const [showValue, setShowValue] = useState(false);
  const [hideButton, setHideButton] = useState(false);

  var [currentProduct, setCurrentProduct] = useState({
    product: {},
    ingredients: [],
    options: [],
  });

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
    console.log(productId);
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
        <h5>{currentProduct.ingredients.length !== 0 ? "Ingredients:" : ""}</h5>
        <div className="ingredients-list">
          {currentProduct.ingredients.map(function (item, index) {
            return <span key={item}>{(index ? ", " : "") + item}</span>;
          })}
        </div>
        <h5>Details:</h5>
        <p>{currentProduct.product.details}</p>
        <h5>How to use:</h5>
        <p>{currentProduct.product.how_to_use}</p>
        <h5>
          {currentProduct.product.online_only
            ? "Available online only."
            : "Available on store and online."}
        </h5>
        <h5>{currentProduct.options[0] !== "no options" ? "Options:" : ""}</h5>
        <div className="ingredients-list">
          {currentProduct.options.map(function (item, index) {
            return <span key={item}>{(index ? ", " : "") + item}</span>;
          })}
        </div>
      </div>

      <div className="Product-footer">
        {reviews.length === 0 ? <p>no reviews</p> : (
          <div className="footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              onClick={() => {
                setShowValue(!showValue);
                setHideButton(!hideButton);
              }}
            >
              {hideButton ? "Close reviews" : "Show me the reviews"}
            </button>

            {showValue ? <Reviews product_reviews={reviews} /> : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
