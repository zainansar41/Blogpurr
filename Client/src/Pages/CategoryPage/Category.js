import React,{useEffect, useState} from 'react'
import './category.css'
import Navbar from '../../components/Navbar/Navbar'

import { useParams } from 'react-router-dom';
import {getBlogByCategory} from '../../helpers/verify'



export default function Category() {
    const { categoryname } = useParams();

    useEffect(() => {
        getBlogByCategory(categoryname).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        })
    }, [categoryname])


    return (
        <>
            <Navbar />
        </>

    )
}
