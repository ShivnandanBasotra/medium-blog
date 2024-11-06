import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../config";
import { useParams } from "react-router-dom";

interface Blog {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
}

export function useBlog () {
    const {id} = useParams();
    const [loading, setLoading] = useState(false);
    const [blog, setBlog] = useState<Blog>();
    const jwt = localStorage.getItem('jwt');
    useEffect(()=>{
        console.log(id);
        setLoading(true)
        axios.get(`${backendUrl}/api/v1/blog/blog/${id}`,{headers: {
            'Authorization': `Bearer ${jwt}`, 
        },withCredentials: true})
        .then(response=>{
            console.log(response.data.blog)
            setBlog(response.data.blog)
            setLoading(false);
        })
    },[id])

    return {loading,blog}
}