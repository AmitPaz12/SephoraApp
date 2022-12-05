import React from 'react'
import './CategoryItem.css'
import Image from 'react-bootstrap/Image'


function CategoryItem({id, category_name, picture}) {

  return (
    <div className="CategoryItem">
        <Image class="w-100 hover-shadow" bsPrefix="img" src={picture} width="350" height="350"></Image>
      <h5>{ category_name }</h5>
    </div>
  )
}

export default CategoryItem
