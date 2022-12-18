import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Reviews.css";
import { useState } from "react";

function Reviews({ product_reviews }) {
  const [clicked, setClicked] = useState(false);

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



  const addLike = () => {
    if (!clicked) {
      // db stuff
      message = (<p>you liked this review</p>);
      setClicked(true);
      return
    }
    message = (<p>you can like or dislike a review only once.</p>);
  };

  const addDislike = () => {
    if (!clicked) {
      // db stuff
      message = (<p>you disliked this review</p>);
      setClicked(true);
      return
    }
    message = (<p>you can like or dislike a review only once.</p>);
  };
  
  let message;

  return (
    <div>
      {product_reviews.length !== 0
        ? product_reviews
            .sort((a, b) => (a.date < b.date ? 1 : -1))
            .map((review) => (
              <div className="Product-review">
                <div className="Date">
                  {review.date.toISOString().substring(0, 10)}
                </div>
                <div className="Buttons">
                  <button
                    onClick={addLike}
                    type="button"
                    class="btn btn-outline-secondary"
                  >
                    <i class="bi bi-heart-fill"></i>
                  </button>
                  <button
                    onClick={addDislike}
                    type="button"
                    class="btn btn-outline-secondary"
                  >
                    <i class="bi bi-heartbreak-fill"></i>
                  </button>
                </div>
                <div className="Message">{message}</div>
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
                    Dislikes <i class="bi bi-heartbreak-fill"></i>{" "}
                    {review.dislikes}
                  </div>
                </div>
              </div>
            ))
        : null}
    </div>
  );
}

export default Reviews;
