import { FullBlog } from "../components/fullBlog";
import { useBlog } from "../hooks/useBlog";

export function FullBlogPage(){
    const {loading, blog} = useBlog();
    return (
        <div>
        {loading?"... Loading":""}
        {loading?"... Loading":""}
        {loading?"... Loading":""}
        {loading?"... Loading":""}
        {blog ? (
                <FullBlog 
                    fullName={blog.author?.name || "Anonymous"} 
                    date="11-11-2011" 
                    title={blog.title} 
                    content={blog.content}
                />
            ) : (
                <p>...loading</p>
            )}
        </div>
        
    )
}