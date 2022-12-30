import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reviews.css";
import { useEffect, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import { Modal } from "react-bootstrap";


function Reviews({ product_reviews, product_id }) {

  const { user, setUser } = useContext(UserContext);
  const [likeReviewErrors, setLikeReviewErrors] = useState("");
  const [isDeleteReview, setIsDeleteReview] = useState(false);
  let navigate = useNavigate();

  var clicked_reviews = []; 
  var deleted_reviews = [];

  useEffect(() => {
    clicked_reviews = [];
    product_reviews.map((review) =>
      clicked_reviews.push({
        key: review.review_id,
        value: false,
      })
    );
  }, []);

  useEffect(() => {
    deleted_reviews = [];
    product_reviews.map((review) =>
      deleted_reviews.push({
        key: review.review_id,
        value: false,
      })
    );
  }, []);

  function showStars(rate) {
    let i,
      stars = [];
    for (i = 0; i < rate; i++) {
      stars.push(<i class="bi bi-star-fill"></i>);
    }
    for (; i < 5; i++) {
      stars.push(<i class="bi bi-star"></i>);
    }
    return stars;
  }


  async function addLikeOrDislikeToReview(review_id, like) {
    console.log("post like or dislike on review");
    let ret = false;
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
      body: JSON.stringify({
        review_id: review_id,
        user_name: user.user_name,
        is_like: like
      }),
    }; 
    await fetch(
      "https://localhost:7266/api/Products/" +
        product_id +
        "/Reviews/" +
        review_id,
      requestOptions
    ).then((response) => {
      console.log(response.body);
      if (response.status === 204) {
        ret = true;
      }
      if (response.status === 400) {
        if (response.body === "already liked this review")
        setLikeReviewErrors("You already liked this review.");
      if (response.body === "already disliked this review")
        setLikeReviewErrors("You already disliked this review.");

      ret = false
      }
    });

    return ret;
  }

  async function addLike(id) {
    console.log("like");

    var val = false;
    clicked_reviews.map(function(r) {
      if (r.key === id){
        val = r.value;
      }
    });

    console.log(val);
    if (val === false && user) {
      if (await addLikeOrDislikeToReview(id, 1)) {
        console.log("addLike")
        clicked_reviews[id] = { key: id, value: true };

        var likesCounter = document.getElementById("likesCounter" + id);
        likesCounter.textContent = parseInt(likesCounter.textContent) + 1;
      }
    }
  }

  async function addDislike(id) {
    console.log("dislike");
    var val;
    clicked_reviews.map(function(r) {
      if (r.key === id){
        val = r.value;
      }
    });

    if (val === false && user) {
      if (await addLikeOrDislikeToReview(id, 0)) {
        clicked_reviews[id] = { key: id, value: true };        
        var dislikesCounter = document.getElementById("dislikesCounter" + id);
        dislikesCounter.textContent = parseInt(dislikesCounter.textContent) + 1;
      }
    }
  }


  async function deleteReview(review_id) {
    console.log(user)
    let ret = false
    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
      body: JSON.stringify({
        user_name: user.user_name
      }),
    }; 
    await fetch(
      "https://localhost:7266/api/Products/" +
        product_id +
        "/Reviews/" +
        review_id,
      requestOptions
    ).then((response) => {
      if (response.status === 204)
        ret = true;
      if (response.status === 400)
        ret = false
    });
    console.log(ret)
    return ret;
  }

  async function handleDeleteReview(review_id){
    if (await deleteReview(review_id)){
      navigate("../Products/" + product_id, { replace: true });
    } 
  }

  return (
    <div>
      {product_reviews.length !== 0
        ? product_reviews
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((review) => (
              <div className="Product-review">
                <div className="Date">{review.date.substring(0, 10)}</div>
                {/* <span className="delete"><i onClick={handleDelete} class="bi bi-x-lg"></i></span>
                <Modal show={deleted_reviews[review.review_id]} onHide={!deleted_reviews[review.review_id]}>
                  <div class="modal-header">
                    <h6>Are you sure you want to delete the review ?</h6>
                    <button type="button" onClick={deleted_reviews[review.review_id] = false} class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <Modal.Body>
                    <button onClick={async () => {await handleDeleteReview(review.review_id)}} type="button" class="btn btn-outline-danger">delete</button>
                  </Modal.Body>
                </Modal> */}
                <div className="Buttons">
                  <button
                    onClick={async () => await addLike(review.review_id)}
                    type="button"
                    class="btn btn-outline-secondary"
                  >
                    <i class="bi bi-heart-fill"></i>
                  </button>
                  <button
                    onClick={async () => await addDislike(review.review_id)}
                    type="button"
                    class="btn btn-outline-secondary"
                  >
                    <i class="bi bi-heartbreak-fill"></i>
                  </button>
                  <p>{likeReviewErrors}</p>
                </div>
                <h5>{review.user_name}</h5>
                <div className="stars">
                  {showStars(review.rate).map((star) => (
                    <span>{star} </span>
                  ))}
                </div>
                <div className="review-content">{review.content}</div>
                <div className="review-info">
                  <div>
                    Likes <i class="bi bi-heart-fill"></i> {" "} <span id={"likesCounter" + review.review_id}> {review.likes} </span>
                  </div>
                  <div>
                    Dislikes <i class="bi bi-heartbreak-fill"></i>{" "}<span id={"dislikesCounter" + review.review_id}> {review.dislikes} </span>
                  </div>
                </div>
              </div>
            ))
        : null}
    </div>
  );
}

export default Reviews;
