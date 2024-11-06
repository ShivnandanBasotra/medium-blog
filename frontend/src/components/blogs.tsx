import { BlogCard } from "./blogCard";
import { useBlogs } from "../hooks/useBlogs";
import { Link } from "react-router-dom";
export function Blogs () {
    const {loading,blogs} = useBlogs();
    return (
        <div className="w-740 m-auto">
        {loading?"... Loading":""}
        {loading?"... Loading":""}
        {loading?"... Loading":""}
        {loading?"... Loading":""}
        {blogs.map((blog, index)=> <Link to={`/blog/${blog.id}`}><BlogCard id={blog.id} key={index} fullName={blog.author.name || "anonymous"} date="11-11-2011" title={blog.title} content={blog.content} /></Link>)}
        </div>    
    )
}
