import React, { useEffect, useState } from 'react'
import './service.css'

import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { getBlogByService } from '../../helpers/verify'


export default function Service() {
    const { type } = useParams();

    useEffect(() => {
        getBlogByService(type)
        .then((result)=>{
            console.log(result)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [type])


    return (
        <>
            <Navbar />

        </>
    )
}
