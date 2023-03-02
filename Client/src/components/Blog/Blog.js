import React, { useEffect, useState } from 'react';
import BlogBox from '../blogBox/BlogBox';
import { fetchBlog } from '../../helpers/verify';
import './blog.css'
import { Link } from 'react-router-dom';

export default function Blog() {
    const [blog, setBlog] = useState();

    useEffect(() => {
        fetchBlog().then((result) => {
            setBlog(result);
        });
    }, []);

    return (
        <div className="blog_com">
            {Array.isArray(blog) ? blog.map((blog) => {
                return <BlogBox blog={blog} />
            }) : null}
        </div>
    );
}
