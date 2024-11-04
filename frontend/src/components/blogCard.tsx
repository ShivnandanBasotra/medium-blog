import { useRecoilValue } from "recoil"
import { Avatar } from "./avatar"
import user from "../atoms/user"

interface BlogCard {
    fullName: string,
    date: string,
    title: string,
    content: string
}

export function BlogCard({ fullName, date, title, content }: BlogCard) {
    const loggedinUser = useRecoilValue(user);
    let userName = JSON.parse(loggedinUser||"").name
    return (
        <div className="border-b-2">
            <div className="flex items-center py-3">
                <Avatar name={userName||"U"}/>
                <div className="font-medium pl-2 text-slate-600">{fullName}</div>
                <div className="h-1 w-1 bg-slate-600 rounded-full m-2"></div>
                <div className="text-slate-400">{date}</div>
            </div>
            <div>
                <div className="text-2xl font-bold pb-1">{title}</div>
                <div className="text-lg text-slate-500">{content.slice(0,180)}{content.length<180?"":"..."}</div>
            </div>
            <div className="py-2 text-slate-400">{Math.floor(content.length/150)===0?1:Math.floor(content.length/220)} minutes read</div>
        </div>
    )
}