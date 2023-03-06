import React, { useState, useEffect } from 'react';
import './showblog.css';
import Navbar from '../../components/Navbar/Navbar';
import { useParams } from 'react-router-dom';
import { fetchSingleBlog } from '../../helpers/verify';

export default function ShowBlog() {
  const [loading, setLoading] = useState(true);
  const [blogData, setBlogData] = useState(null);
  const { id } = useParams();



  useEffect(() => {
    fetchSingleBlog(id)
      .then(result => {
        setBlogData(result);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
        console.log(blogData);
      });
  }, [id]);





  const extractFirstParagraph = (htmlString) => {
    const start = htmlString.indexOf('<p>');
    const end = htmlString.indexOf('</p>', start) + 4;
    const firstParagraph = htmlString.substring(start, end);
    const restOfContent = htmlString.substring(end);
    return [firstParagraph, restOfContent];
  }

  return (
    <>
      <Navbar />
      <div className="content">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="blog">
            <h1 className="heading">{blogData[0]?.heading?.S}</h1>
            <div className="content_div">
              <div className="blog_content">
                <div dangerouslySetInnerHTML={{ __html: extractFirstParagraph(blogData[0]?.content?.S)[0] }} />
                <img className='image' src={blogData[0].Images.L[0].S} alt="" />
                <div dangerouslySetInnerHTML={{ __html: extractFirstParagraph(blogData[0]?.content?.S)[1] }} />
                <img className='image' src={blogData[0].Images.L[1].S} alt="" />
              </div>
              <div className="ads">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusamus, placeat mollitia? Excepturi nisi ducimus dolorem nobis molestias, corporis cum modi hic quaerat officia aperiam consequatur nesciunt vel veniam, sint doloribus?
              </div>
            </div>
            <div className="details">
              <div className="mail">contact Author for work: <a href={"mailto:{blogData[0].useremail.S}"}>{blogData[0].useremail.S}</a></div>
            </div>
          </div>

        )}
      </div>
    </>
  );
}
