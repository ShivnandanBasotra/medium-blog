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

    useEffect(()=>{
        axios.get(`${backendUrl}/api/v1/blog/bulk`,{withCredentials: true})
        .then(response=>{
            setBlogs(response.data.blogs)
            setLoading(false);
        })
    },[])

    return {loading,blogs}
}