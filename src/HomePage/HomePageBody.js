import React, { useEffect, useState } from 'react'
import '../Category/CategoryItem.css'
import CategoryItem from '../Category/CategoryItem';
import { Link } from "react-router-dom";

function HomePageBody({categoriesList}) {
  const [mostLikedProduct, setMostLikedProduct] = useState({
    product: {},
    ingredients: [],
    options: [],
    likes: null
  });

  const [mostRatedProduct, setMostRatedProduct] = useState({
    product: {},
    ingredients: [],
    options: [],
    likes: null
  });

  function getMostRatedProduct() {
    // const requestOptions = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // fetch("https://localhost:7266/api/Products/" + productId, requestOptions)
    //   .then((response) => response.json())
    //   .then((res) => {
    //     setCurrentProduct(res);
    //   })
    //   .catch((error) => {
    //     console.log("Error");
    //   });
  }

  function getMostLikedProduct() {
    // const requestOptions = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    // };
    // fetch("https://localhost:7266/api/Products/" + productId, requestOptions)
    //   .then((response) => response.json())
    //   .then((res) => {
    //     setCurrentProduct(res);
    //   })
    //   .catch((error) => {
    //     console.log("Error");
    //   });
  }

  const list = categoriesList.map((category, key) => {
    return <CategoryItem id={category.id} category_name={category.category_name} picture={category.picture} key={key}/>
  });
  useEffect(() => {
    const fetchData = async () => {
      setMostLikedProduct(await getMostLikedProduct());
      setMostRatedProduct(await getMostRatedProduct());
    };
    fetchData();
  }, []);

  return(
    <div className='homepagebody'>
      <div className='Top-Products'>
      <Link
        // to={`/Products/${amit}`}
        style={{ textDecoration: "none" }}
        >
          Tap to see most liked product <i class="bi bi-stars"></i>
      </Link>

      <Link
        // to={`/Products/${amit}`}
        style={{ textDecoration: "none" }}
        >
          Tap to see most rated product <i class="bi bi-stars"></i>
      </Link>
      </div>
      <div class="listDesign">
        {list}
      </div>
    </div>
    
  )
};

export default HomePageBody
