import { atom } from "recoil";

const user = atom({
    key: 'user',
    default: localStorage.getItem('user')
})

export default user;