import React from 'react'
import './catBTN.css'

export default function CatBTN(props) {
  return (
    <button className="cat_btn">
        <img className='cat_img' src={props.IMAGE} alt="" />
        <div className="category">
            <div className="cat_name">{props.nameCat}</div>
            <div className="cat_tag">{props.tagCat}</div>
        </div>
    </button>
  )
}
