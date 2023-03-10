import React, { useEffect, useState } from 'react'
import './service.css'

import Navbar from '../../components/Navbar/Navbar'
import '../../components/categoryTypebtn/btnStyle.css'

import { useParams, useNavigate } from 'react-router-dom'
import { getBlogByService } from '../../helpers/verify'

const addElipse = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + '....' : str;
};

const togetpara = (content) => {
    const div = document.createElement('div');
    div.innerHTML = content;
    const firstParagraphText = div.querySelector('p').textContent;

    return addElipse(firstParagraphText, 300);
};

export default function Service() {
    const { type } = useParams();
    const navigate = useNavigate();

    const [Blogs, setBlogs] = useState([])
    const [element, setElement] = useState([]);
    const [noOFElement, setNoOfElements] = useState(1);


    useEffect(() => {
        getBlogByService(type)
            .then((result) => {
                setBlogs(result)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [type])

    useEffect(() => {
        if (Blogs.length !== 0) {
            setElement(Blogs.slice(0, noOFElement));
        }
    }, [Blogs, noOFElement]);

    const loadMoreBlogs = () => {
        setNoOfElements(noOFElement + 2);
    };



    return (
        <>
            <Navbar />

            <div className="service_page_heading">
                <h1>{type}</h1>
            </div>
            <div className="blogs_map">
                {element.map((item) => {
                    return (
                        <div className="Blog_can"
                            key={item.blogID.S}
                            onClick={() => navigate(`/showBlog/${item.blogID.S}`)}
                        >
                            <div className="Blog_can_image">
                                <img src={item.Images.L[0].S} alt="" />
                            </div>
                            <div className="Blog_can_content">
                                <h1 className="Blog_can_heading">
                                    {item.heading.S}
                                </h1>
                                <p className="Blog_can_para">
                                    {togetpara(item.content.S)}
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
            <div className="categoryNtypeBTN">
                <button class="categoryNtypeBTN_btn"
                onClick={loadMoreBlogs}>
                    Load More
                </button>
            </div>


        </>
    )
}
