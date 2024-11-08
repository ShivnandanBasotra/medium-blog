import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../config";

interface Blog {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    }
}

export function useBlogs () {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const jwt = localStorage.getItem('jwt');
    useEffect(()=>{
        setLoading(true)
        axios.get(`${backendUrl}/api/v1/blog/bulk`,{headers: {
            'Authorization': `Bearer ${jwt}`, 
        },withCredentials: true})
        .then(response=>{
            console.log(response.data.blogs)
            setBlogs(response.data.blogs)
            setLoading(false);
        })
    },[])

    return {loading,blogs}
}