import React, { useState, useRef, useMemo } from 'react'
import './writeblog.css'
import Navbar from '../../components/Navbar/Navbar'
import JoditEditor from 'jodit-react';

export default function WriteBlog() {
    const editor = useRef(null);

    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');
    const [keywords, setKeywords] = useState('');
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('Personal Blog');

    const editorConfig = {
        height: 400
    };

    return (
        <>
            <Navbar />
            <h1 className="heading">Write a Blog</h1>
            <div className="writeBlogContent">
                <div className="writeblog_div">
                    <form action="">
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
                            <label className='label' htmlFor="images">Add Images</label>
                            <input className='input_form' type="file" multiple id="images" onChange={(e) => { setImage(e.target.value) }} />
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
                            <select id='category' name="category" value={category} onChange={(e) => { setCategory(e.target.value) }} required>
                                <option value="personal">Personal Blog</option>
                                <option value="food">Food Blog</option>
                                <option value="fashion">Fashion Blog</option>
                                <option value="technology">Technology Blog</option>
                                <option value="travel">Travel Blog</option>
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
