import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./Product.css";
import photo from "../images/sephoraa.jpg";
import React, { useState, useContext, useEffect } from "react";
import Reviews from "../Reviews";
import { Modal } from "react-bootstrap";
import { UserContext } from "../UserContext";

function Product() {
  // access the parameters of the current route.
  const { productId } = useParams();
  const { user, setUser } = useContext(UserContext);
  const [reviews, setReviews] = useState([])
  // const [clickedLike, setClickedLike] = useState(false);
  const [isAddReview, setIsAddReview] = useState(false);
  const [showValue, setShowValue] = useState(false);
  // const [showLikesDetails, setShowLikesDetails] = useState(false);

  const [likeProductErrors, setLikeProductErrors] = useState("");

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
    likes: null,
  });

  useEffect(() => {
      async function fetchData() {
        getProductInfo();
        await getReviews();
      }
      fetchData();
  }, []);

  async function getReviews() {
    let reviews_lst = [];
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    await fetch(
      "https://localhost:7266/api/Products/" + productId + "/Reviews",
      requestOptions
    )
      .then((response) => response.json())
      .then((responseJson) => {
        reviews_lst = responseJson;
      })
      .catch((error) => {
        console.log("error");
        reviews_lst = [];
      });
    setReviews(reviews_lst);
  }

  const handleCloseAddReview = (e) => {
    setIsAddReview(false);
    setAddReviewData({ content: "", rate: null });
  };

  // const handleCloseLikesDetails = (e) => {
  //   setShowLikesDetails(false);
  // };

  const handleAddReview = async () => {
    setIsAddReview(!isAddReview);
    setAddReviewData({ content: "", rate: null });
    await getReviews();
  };

  function postNewReview() {
    console.log("post review");
    let ret = false;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
      body: JSON.stringify({
        content: addReviewData.content,
        rate: addReviewData.rate,
        user_name: user.user_name,
      }),
    };
    fetch(
      "https://localhost:7266/api/Products/" + productId,
      requestOptions
    ).then((response) => {
      if (response.status === 201) {
        ret = true;
      }
    });
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
    if (productId || isAddReview) {
      async function fetchData() {
        getProductInfo();
        await getReviews();
      }
      fetchData();
    }
  }, [productId, isAddReview]);

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
    if (postNewReview()) {
      setIsSubmitReview(true);
      setAddReviewData({ content: "", rate: null });
    }
    await getReviews();
    setIsAddReview(!isAddReview);
  };

  const validate = (values) => {
    const errors = {};
    if (!values.content) {
      errors.content = "Content is required!";
    }
    if (!values.rate) {
      errors.rate = "Rate is required!";
    }
    if (!user) {
      errors.user = "You have to sign in!";
    }

    return errors;
  };

  async function addLikeToProduct() {
    let ret = false;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
      body: JSON.stringify({
        product_id: productId,
        user_name: user.user_name,
      }),
    };
    await fetch(
      "https://localhost:7266/api/Products/" + productId + "/Reviews/",
      requestOptions
    )
      .then((response) => {
        if (response.status === 204) {
          ret = true;
        }
        if (response.status === 400) {
          console.log("You already liked this product.");
          setLikeProductErrors("You already liked this product.");
          ret = false;
        }
      })
      .catch((error) => {
        console.log("Error");
      });
    return ret;
  }

  async function addLike() {
    console.log("like");

    if (user && !clickedLike) {
      await addLikeToProduct();
      getProductInfo();
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
            if (item !== "no options")
              return <span key={item}>{(index ? ", " : "") + item}</span>;
          })}
        </div>
        <div
          className="product-likes"
          // onClick={() => {
          //   setShowLikesDetails(true);
          // }}
        >
          <i class="bi bi-heart-fill"></i> {currentProduct.likes}
        </div>
{/* 
        <Modal show={showLikesDetails} onHide={!showLikesDetails}>
          <Modal.Header>
            <div className="signIn-name">
              <h5>Users who liked this product</h5>
            </div>
            <i onClick={handleCloseLikesDetails} class="bi bi-x-lg"></i>
          </Modal.Header>
          <Modal.Body>
            <div className="signIn-header"></div>
          </Modal.Body>
        </Modal> */}
      </div>

      <div className="Product-footer">
        <div className="addReview-button">
          <span className="liked-button">
              <button
                onClick={async () => await addLike()}
                type="button"
                class="btn btn-outline-secondary"
              >
                <i class="bi bi-heart-fill"></i>
              </button>
          </span>
          <button
            onClick={async () => {await handleAddReview()}}
            type="button"
            class="btn btn-outline-secondary"
          >
            Add review
          </button>
          <p>{likeProductErrors}</p>
        </div>

        <Modal show={isAddReview} onHide={async () => {await handleAddReview()}}>
          <Modal.Header>
            <div className="signIn-name">
              <h5>Add new review</h5>
            </div>
            <i onClick={handleCloseAddReview} class="bi bi-x-lg"></i>
          </Modal.Header>
          <Modal.Body>
            <div className="signIn-header"></div>
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

            <p>{addReviewErrors.rate}</p>
          </Modal.Body>
          <Modal.Footer>
            <p>{addReviewErrors.user}</p>
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

            {showValue ? (
              <Reviews product_reviews={reviews} product_id={productId} />
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default Product;
