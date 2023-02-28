import React from 'react'
import './blogbox.css'

const addElipse = (str, limit)=>{
    return str.length > limit ? str.substring(0, limit) + '....' :str;
}


export default function BlogBox() {
  return (
    <div className="blog_box">
        <div className="blog_box_image">
            <img src="https://res.cloudinary.com/dlhwfesiz/image/upload/v1677593125/cumvtwld4shjyce3uij7.png" alt="" />
        </div>
        <div className="blog_box_content">
            <h3 className="blog_box_heading">{addElipse('Hello world', 20)}</h3>
            <p className='blog_box_para'>{addElipse('Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus, dolore minima necessitatibus accusamus aliquam consequatur neque iusto molestiae fugiat earum aliquid beatae quibusdam laudantium, adipisci minus quisquam, possimus quasi amet!', 200)}</p>
        </div>
    </div>
  )
}   
