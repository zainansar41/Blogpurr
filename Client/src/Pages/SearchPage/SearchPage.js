import React, { useEffect } from 'react'
import './search.css'

import Navbar from '../../components/Navbar/Navbar';

import { useParams, useNavigate } from 'react-router-dom'
import { getBlogBySearch } from '../../helpers/verify';

export default function SearchPage() {
    const { search } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        getBlogBySearch(search)

    })


    return (
        <>
            <Navbar />
        </>
    )
}
