import React, { useState, useEffect } from 'react'
import './homeblog.css'
import { getBlogHome, getRandomBlogs } from '../../helpers/verify';
import { useNavigate } from 'react-router-dom';



const addElipse = (str, limit)=>{
    return str.length > limit ? str.substring(0, limit) + '....' :str;
}


const togetpara = (content)=>{
    const div = document.createElement('div');
    div.innerHTML = content;
    const firstParagraphText = div.querySelector('p').textContent;

    return addElipse(firstParagraphText, 200);
}


export default function HomeBlog() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        // fetch initial set of blogs from DynamoDB
        getBlogHome(1).then((result) => {
            setBlogs(result);

            console.log(blogs);
        });
    }, []);

    const loadMoreBlogs = () => {
        // fetch more blogs from DynamoDB
        getRandomBlogs().then((data) => {
            // setBlogs((prevBlogs) => [...prevBlogs, ...data]);
        });
    };

    

    return (
        <>
            <div className="home_blog_div">

                {Array.isArray(blogs) ? blogs.map((item) => {
                    return <div key={item.blogID} className="blog_container" onClick={() => navigate(`/showBlog/${item.blogID.S}`)}>
                        <div className="blog_container_image"><img src={item.Images.L[0].S} alt="" className="imageHome" /></div>
                        <div className="content">
                            <h2 className="headingHome">{item.heading.S}</h2>
                            <div className="para">{togetpara(item.content.S)}</div>
                        </div>
                    </div>
                }) : null}

            </div>

            <div className="loadmore">
                <button className='loadBTN' onClick={loadMoreBlogs}>
                    <span className='loadBTN_span'>View more</span>
                </button>
            </div>
        </>
    )
}
