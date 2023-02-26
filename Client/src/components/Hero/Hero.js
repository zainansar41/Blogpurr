import React from 'react'
import './hero.css'

import heroHome from '../../assets/heroHome.jpg'

export default function Hero() {
    return (
        <div className="hero">
            <img src={heroHome} alt="" />
            <div className="hero_desc">
                <h1 className="hero_heading">Blogpurr</h1>
                <p className='hero_tag'>Welcome to Blogpurr, your go-to destination for insightful and engaging blog content.</p>
                <button className="BTN"> let's Start
                </button>
            </div>

        </div>
    )
}

