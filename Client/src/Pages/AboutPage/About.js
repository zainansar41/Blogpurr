import React from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../../components/Navbar/Navbar'

import './about.css'
import about from '../../assets/about.jpg'
import DATA from './aboutPara'


export default function About() {
    const navigate = useNavigate()
    return (
        <>
            <Navbar />
            <div className="about_page">
                <img src={about} alt="" />
            </div>
            <h1 className="about_heading">
                Blogpurr
            </h1>
            <div className="aboutpg_content">
                <div className="btn_div">
                    <button class="button" onClick={()=>{
                        navigate('/login')
                    }}>
                        <span class="button_lg">
                            <span class="button_sl"></span>
                            <span class="button_text">Join Hands with us</span>
                        </span>
                    </button>
                </div>
                <p className="about_para">
                    {DATA.data}
                </p>
            </div>

        </>
    )
}
