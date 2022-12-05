import React from 'react'
import './HomePageBody.css'
import CategoryItem from '../Category/CategoryItem';


function HomePageBody({categoriesList}) {
  const list = categoriesList.map((category, key) => {
    return <CategoryItem id={category.id} category_name={category.category_name} picture={category.picture} key={key}/>
});
  
  return(
    <div className="HomePageBody">
      {list}
    </div>
  )
}

export default HomePageBody
