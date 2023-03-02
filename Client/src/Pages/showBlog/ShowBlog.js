import React,{useState, useEffect} from 'react'
import './showblog.css'
import Navbar from '../../components/Navbar/Navbar'
import { useParams } from 'react-router-dom'
import { fetchSingleBlog } from '../../helpers/verify'

export default function ShowBlog() {
    const [blog, setBlog] = useState(null)
    const { id } = useParams();
    useEffect(()=>{
        fetchSingleBlog(id).then(result=>{
            setBlog(result)
            console.log(result);
        })
    },[])

  return (
    <>
        <Navbar/>

    </>
  )
}
