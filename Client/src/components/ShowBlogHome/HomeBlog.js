import React, { useState, useEffect } from 'react';
import './homeblog.css';
import { getBlogHome } from '../../helpers/verify';
import { useNavigate } from 'react-router-dom';

const addElipse = (str, limit) => {
  return str.length > limit ? str.substring(0, limit) + '....' : str;
};

const togetpara = (content) => {
  const div = document.createElement('div');
  div.innerHTML = content;
  const firstParagraphText = div.querySelector('p').textContent;

  return addElipse(firstParagraphText, 200);
};

export default function HomeBlog() {
  const [blogs, setBlogs] = useState([]);
  const [element, setElement] = useState([]);
  const [noOFElement, setNoOfElements] = useState(2);
  const navigate = useNavigate();

  useEffect(() => {
    getBlogHome().then((result) => {
      setBlogs(result);
    });
  }, []);

  useEffect(() => {
    if (blogs.length !== 0) {
      setElement(blogs.slice(0, noOFElement));
    }
  }, [blogs, noOFElement]);

  const loadMoreBlogs = () => {
    setNoOfElements(noOFElement + 2);
  };

  return (
    <>
      <div className="home_blog_div">
        {element.map((item) => {
          return (
            <div
              key={item.blogID}
              className="blog_container"
              onClick={() => navigate(`/showBlog/${item.blogID.S}`)}
            >
              <div className="blog_container_image">
                <img src={item.Images.L[0].S} alt="" className="imageHome" />
              </div>
              <div className="contentBlogH">
                <h2 className="headingHome">{addElipse(item.heading.S)}</h2>
                <div className="para">{togetpara(item.content.S)}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="loadmore">
        <button className="loadBTN" onClick={loadMoreBlogs}>
          <span className="loadBTN_span">View more</span>
        </button>
      </div>
    </>
  );
}
