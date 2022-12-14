import React from 'react'
import './CategoryItem.css'
import Image from 'react-bootstrap/Image'


function CategoryItem({id, category_name, picture}) {

  return (
    <div class="CategoryItem">
      <Image bsPrefix="img" src={picture} width="350" height="350"></Image>
      <div className="CategoryItem-info">
        <h5>{ category_name }</h5>
      </div>
    </div>
  )
}

export default CategoryItem
