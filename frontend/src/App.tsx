
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthPage } from "./pages/auth"
import { HomePage } from "./pages/home"
import { useRecoilValue } from "recoil"
import user from "./atoms/user"
import { Appbar } from "./components/appbar"
import { FullBlogPage } from "./pages/fullBlogPage"

function App() {
  const userLoggedIn = useRecoilValue(user);

  return (
    <>
    <BrowserRouter>
      <Appbar/>
      <Routes>
        <Route path="/" element={!userLoggedIn?<AuthPage/>:<Navigate to='/home'/>}/>
        <Route path="/home" element={userLoggedIn?<HomePage/>:<Navigate to='/'/>}/>
        <Route path="/blog/:id" element={<FullBlogPage/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
