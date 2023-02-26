import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import CatBTN from '../../components/catButton/CatBTN'


import './home.css'

import fashionBTN from '../../assets/fashionBTN.jpg'
import foodBTN from '../../assets/foodBTN.jpg'
import techBTN from '../../assets/techBTN.jpg'
import travelBTN from '../../assets/travelBTN.jpg'

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="category_buttons">
        <CatBTN IMAGE={fashionBTN} nameCat={"Fashion"} tagCat={"See some Fashion blogs"} />
        <CatBTN IMAGE={foodBTN} nameCat={"Food"} tagCat={"See some Food blogs"} />
        <CatBTN IMAGE={techBTN} nameCat={"Technology"} tagCat={"See some Technology blogs"} />
        <CatBTN IMAGE={travelBTN} nameCat={"Travel"} tagCat={"See some Travel blogs"} />
      </div>

    </>
  )
}
