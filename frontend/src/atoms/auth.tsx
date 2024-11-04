import { atom } from "recoil";

const authAtom = atom({
    key: 'authAtom',
    default: 'signin'
})

export default authAtom;