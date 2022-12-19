import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Product.css";
import photo from "../images/sephoraa.jpg";
import React, { useState, useContext, useEffect, useRef } from "react";
import Reviews from "../Reviews";
import { Modal } from "react-bootstrap";
import { UserContext } from "../UserContext";

function Product() {
  // access the parameters of the current route.
  const { productId } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);
  // const [clickedLike, setClickedLike] = useState(false);
  const [isAddReview, setIsAddReview] = useState(false);
  const [showValue, setShowValue] = useState(false);
  const [hideButton, setHideButton] = useState(false);
  const [addReviewErrors, setAddReviewErrors] = useState({});
  const [isSubmitReview, setIsSubmitReview] = useState(false);
  const [addReviewData, setAddReviewData] = useState({
    content: "",
    rate: null,
  });

  let clickedLike = false;


  var [currentProduct, setCurrentProduct] = useState({
    product: {},
    ingredients: [],
    options: [],
    likes: null
  });

  async function getReviews(){
    let reviews = [];
    const requestOptions = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json'},
    }
  
    await fetch('https://localhost:7266/api/Products/' + productId + '/Reviews/', requestOptions)
      .then(response => response.json())
      .then(responseJson => {reviews = responseJson})
      .catch((error) => {reviews = []});
  
      setReviews(reviews);
      return reviews;
  }

  const handleClose = (e) => {
    setIsAddReview(false);
    setAddReviewData({ content: "", rate: null });
  };

  const handleAddReview = () => {
    setIsAddReview(!isAddReview);
    setAddReviewData({ content: "", rate: null });
  };

  async function postNewReview() {
    let ret = false;
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem("jwt_token")}`},
      body: JSON.stringify({ content: addReviewData.content, rate: addReviewData.rate, user_id: user.user_id})
    }
    await fetch('https://localhost:7266/api/Products/' + productId + '/Reviews/', requestOptions)
    .then(async response => {
      if (response.status === 201){
        ret = true;
      }});
    return ret;
  }

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
      async function fetchData() {
        getProductInfo();
        await getReviews();
      }
      fetchData();
    }
  }, [productId]);


  const handleAddReviewChange = (e) => {
    if (addReviewErrors !== {}) {
      setAddReviewErrors({});
      setIsSubmitReview(false);
    }
    const { name, value } = e.target;
    setAddReviewData({ ...addReviewData, [name]: value });
  };

  const handleAddReviewSubmit = async () => {
    setAddReviewErrors(validate(addReviewData));
    if(await postNewReview()){
      await getReviews();
      setIsSubmitReview(true);
      setAddReviewData({content: '', rate: null});
    }
  };


  const validate = (values) => {
    const errors = {};
    if (!values.content) {
      errors.content = "Content is required!";
    }
    if (!values.rate) {
      errors.rate = "Rate is required!";
    }

    return errors;
  };

  function addLike(id) {
    console.log("like")

    if (user && !clickedLike) {
      // db stuff
      clickedLike = true;
      console.log("clicked");
    }
  }

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
        <h4>{currentProduct.product.product_name}</h4>
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
            if(item !== "no options")
              return <span key={item}>{(index ? ", " : "") + item}</span>;
          })}
        </div>
        <div className="product-likes">
          <i class="bi bi-heart-fill"></i> {currentProduct.likes}
        </div>
        
      </div>

      <div className="Product-footer">
        <div className="addReview-button">
          <span className="liked-button">
          <button
            onClick={() => addLike(user.user_id)}
            type="button"
            class="btn btn-outline-secondary"
            >
            <i class="bi bi-heart-fill"></i>
          </button>
          </span>
        <button
        onClick={handleAddReview}
        type="button"
        class="btn btn-outline-secondary"
      >
        Add review
      </button>
        </div>
      
      <Modal show={isAddReview} onHide={handleAddReview}>
          <Modal.Header>
            <div className="signIn-name">
            <h5>
                Add new review
              </h5>
            </div>
            <i onClick={handleClose} class="bi bi-x-lg"></i>
          </Modal.Header>
          <Modal.Body>
            <div className="signIn-header">
              
            </div>
            <div className="content-addReview">
            <textarea 
              value={addReviewData.content}
              onKeyPress={handleAddReviewChange}
              onChange={handleAddReviewChange}
              placeholder="Write your opinion..."
              name="content"
              type="text"
            />
            </div>
            <p>{addReviewErrors.content}</p>
            <div className="rate-addReview">
              <input
                value={addReviewData.rate}
                onKeyPress={handleAddReviewChange}
                onChange={handleAddReviewChange}
                placeholder="Your rate"
                name="rate"
                type="number"
                max="5"
                min="1"
                
              />
            </div>

            <p>{addReviewErrors.ageField}</p>
          </Modal.Body>
          <Modal.Footer>
          <div className="signIn-button">
              <button
                className="join-now-button"
                onClick={handleAddReviewSubmit}
                type="button"
                class="btn btn-outline-success"
              >
                Add
              </button>
            </div>
          </Modal.Footer>
        </Modal>

        {reviews.length === 0 ? null : (
          <div className="footer">
            <button
              type="button"
              class="btn btn-outline-secondary"
              onClick={() => {
                setShowValue(!showValue);
                setHideButton(!hideButton);
              }}
            >
              {hideButton ? "Close reviews" : "Show reviews"}
            </button>

            {showValue ? <Reviews product_reviews={reviews} /> : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
