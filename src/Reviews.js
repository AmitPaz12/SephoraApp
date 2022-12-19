import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reviews.css";
import { useEffect, useState } from "react";

function Reviews({ product_reviews }) {
  var clicked_reviews = [];

  useEffect(() => {
    product_reviews.map((review) => (
      clicked_reviews.push({
        key: review.review_id,
        value: false
    })))
  }, [])


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

  function addLike(id) {
    console.log("like")

    if (clicked_reviews[id]["value"] === false) {
      // db stuff
      clicked_reviews[id] = {key: id, value: true}
      console.log(clicked_reviews[id]["value"])
    }
  }

  function addDislike(id){
    console.log("dislike")
    if (clicked_reviews[id]["value"] === false) {
      // db stuff
      clicked_reviews[id] = {key: id, value: true}
      console.log(clicked_reviews[id]["value"])
    }
  };
  
  return (
    <div>
      {product_reviews.length !== 0
        ? product_reviews
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((review) => (
              <div className="Product-review">
                <div className="Date">
                  {review.date.substring(0, 10)}
                </div>
                <div className="Buttons">
                  <button
                    onClick={() => addLike(review.review_id)}
                    type="button"
                    class="btn btn-outline-secondary"
                  >
                    <i class="bi bi-heart-fill"></i>
                  </button>
                  <button
                    onClick={() => addDislike(review.review_id)}
                    type="button"
                    class="btn btn-outline-secondary"
                  >
                    <i class="bi bi-heartbreak-fill"></i>
                  </button>
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
                    Likes <i class="bi bi-heart-fill"></i> {review.likes}
                  </div>
                  <div>
                    Dislikes <i class="bi bi-heartbreak-fill"></i> {review.disLikes}
                  </div>
                </div>
              </div>
            ))
        : null}
    </div>
  );
}

export default Reviews;
