
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { AuthPage } from "./pages/auth"
import { HomePage } from "./pages/home"
import { useRecoilValue } from "recoil"
import user from "./atoms/user"

function App() {
  const userLoggedIn = useRecoilValue(user);

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={!userLoggedIn?<AuthPage/>:<Navigate to='/home'/>}/>
        <Route path="/home" element={userLoggedIn?<HomePage/>:<Navigate to='/'/>}/>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
