import React from 'react'
import './blogbox.css'

const addElipse = (str, limit)=>{
    return str.length > limit ? str.substring(0, limit) + '....' :str;
}


export default function BlogBox(props) {
    const {blog} = props
    const div = document.createElement('div');
    div.innerHTML = blog.content.S;
    const firstParagraphText = div.querySelector('p').textContent;
  return (
    <div className="blog_box">
        <div className="blog_box_image">
            <img src={blog.Images.L[0].S} alt="" />
        </div>
        <div className="blog_box_content">
            <h3 className="blog_box_heading">{addElipse(blog.heading.S, 20)}</h3>
            <p className='blog_box_para'>{addElipse(firstParagraphText, 200)}</p>
        </div>
    </div>
  )
}       
