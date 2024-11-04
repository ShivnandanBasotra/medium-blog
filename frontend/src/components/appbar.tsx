import { Avatar } from "./avatar";
import user from "../atoms/user";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";

export function Appbar() {
    const loggedinUser = useRecoilValue(user);
    const userName = typeof loggedinUser === 'object' && loggedinUser !== null && 'name' in loggedinUser ? (loggedinUser as { name: string }).name : '';
    return (
        <div className="border-b z-1 sticky top-0">
            <div className="flex justify-between items-center h-14 pt-8 pb-9 xl:w-1150 lg:w-970 md:w-780 m-auto">
                <Link to='/home'>
                    <h1 className="text-2xl font-semibold">Medium</h1>
                </Link>
                <Avatar name={userName || 'U'} />
            </div>
        </div>
    )
}