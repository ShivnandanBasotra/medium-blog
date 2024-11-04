import { Appbar } from "../components/appbar";
import { Blogs } from "../components/blogs";
export function HomePage () {
    return(
       <div className="m-auto">
        <Appbar/>
        <Blogs/>
       </div>
       
    )
}