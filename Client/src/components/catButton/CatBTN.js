import React from 'react'
import './catBTN.css'

import { useNavigate } from 'react-router-dom'

export default function CatBTN(props) {
  const navigate = useNavigate();
  return (
    <button className="cat_btn" onClick={() => {
      navigate(`/category/${props.link}`)
    }}>
      <img className='cat_img' src={props.IMAGE} alt="" />
      <div className="category">
        <div className="cat_name">{props.nameCat}</div>
        <div className="cat_tag">{props.tagCat}</div>
      </div>
    </button>
  )
}
