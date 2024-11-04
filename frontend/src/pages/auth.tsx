import {useRecoilValue } from "recoil"
import authAtom from "../atoms/auth"
import SigninPage from "../components/signin";
import SignupPage from "../components/signup";


export function AuthPage(){
    const currentPage = useRecoilValue(authAtom);
    return(
        <>
         {currentPage === "signin"?<SigninPage/>: <SignupPage/>}
        </>
    )
}