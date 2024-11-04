import { BlogCard } from "./blogCard";
import { useBlogs } from "../hooks/useBlogs";
export function Blogs () {
    const {loading,blogs} = useBlogs();
    return (
        <div className="w-740 m-auto">
        {loading?"... Loading":""}
        {loading?"... Loading":""}
        {loading?"... Loading":""}
        {loading?"... Loading":""}
        {blogs.map(blog=><BlogCard fullName={blog.author.name || "anonymous"} date="11-11-2011" title={blog.title} content={blog.content} />)}
        </div>    
    )
}
