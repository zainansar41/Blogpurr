import React, { useState, useRef, useMemo } from 'react'
import './writeblog.css'
import Navbar from '../../components/Navbar/Navbar'
import JoditEditor from 'jodit-react';
import { uploadBlog } from '../../helpers/verify';
import convertBase64 from '../../helpers/convert';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast'



export default function WriteBlog() {
    const editor = useRef(null);
    const navigate = useNavigate();

    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [image1, setImage1] = useState();
    const [image2, setImage2] = useState();
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('personal');
    const [type, settype] = useState('post');

    const editorConfig = {
        height: 400
    };

    const submitForm = async function (e) {
        e.preventDefault();
        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('description', description);
        formData.append('keywords', keywords);
        formData.append('category', category);
        formData.append('type', type);
        formData.append('content', content);
        formData.append('image1', image1)
        formData.append('image2', image2)

    
        const formBody = Object.fromEntries(formData)
        let updatePromise = uploadBlog(formBody)
            toast.promise(updatePromise,{
                loading:"uploading! Do not close this tab ...!",
                success:"Upload Successful.... ",
                error:"Error in Updating"
            })
            updatePromise.then(result=>{
                navigate('/profile')
            })
        
        
    }
    
    const onUpload1 = async e => {
        const base64 = await convertBase64(e.target.files[0]);
        setImage1(base64)
    }
    const onUpload2 = async e => {
        const base64 = await convertBase64(e.target.files[0]);
        setImage2(base64)
    }

    return (
        <>
            <Toaster containerStyle={{zIndex:99999}} position='top-center'></Toaster>
            <Navbar />
            <h1 className="heading">Write a Blog</h1>
            <div className="writeBlogContent">
                <div className="writeblog_div">
                    <form action="" onSubmit={(e) => submitForm(e)}>
                        <div className="heading_input">
                            <label className='label' htmlFor="heading">Heading</label>
                            <input className='input_form' type="text" id='heading' name="heading" placeholder='Heading of your Blog' value={heading} onChange={(e) => { setHeading(e.target.value) }} required />
                        </div>
                        <div className="text_editor">
                            <JoditEditor className='JoditEditor'

                                ref={editor}
                                value={content}
                                config={editorConfig}
                                tabIndex={1} // tabIndex of textarea
                                onBlur={newContent => setContent(newContent)}
                                onChange={newContent => { }}
                            />
                        </div>
                        <div className="image_input">
                            <label className='label' htmlFor="image1">Add Image 1</label>
                            <input className='input_form img_input' type="file" multiple id="image1" onChange={onUpload1} />
                        </div>
                        <div className="image_input">
                            <label className='label' htmlFor="image2">Add Image 1</label>
                            <input className='input_form img_input' type="file" multiple id="image2" onChange={onUpload2} />
                        </div>
                        <div className="keyword_input">
                            <label className='label' htmlFor="keywords">Keywords</label>
                            <input className='input_form' type="text" id='keywords' name="keywords" placeholder='Keywords of your Blog' value={keywords} onChange={(e) => { setKeywords(e.target.value) }} required />
                        </div>
                        <div className="description_input">
                            <label className='label' htmlFor="description">Description</label>
                            <textarea type="text" id='description' name="description" placeholder='Write a small description of your blog' value={description} onChange={(e) => { setDescription(e.target.value) }} required />
                        </div>
                        <div className="category_input">
                            <label className='label' htmlFor="category">Category</label>
                            <select id='category' name="category" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                                <option value="personal">Personal Blog</option>
                                <option value="food">Food Blog</option>
                                <option value="fashion">Fashion Blog</option>
                                <option value="technology">Technology Blog</option>
                                <option value="travel">Travel Blog</option>
                            </select>
                        </div>
                        <div className="category_input">
                            <label className='label' htmlFor="type">Content</label>
                            <select id='type' name="type" value={type} onChange={(e) => { settype(e.target.value) }} >
                                <option value="post">Blog Post</option>
                                <option value="review">Product Review</option>
                            </select>
                        </div>

                        <div className="btn_div">
                            <button class="buttonDownload">Upload</button>
                        </div>
                    </form>
                </div>
                <div className="adblock">
                </div>
            </div>
        </>
    )
}
