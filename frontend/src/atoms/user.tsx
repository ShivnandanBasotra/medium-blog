import { atom } from "recoil";

interface User {
  id: string;
  email: string;
  name: string;
  // add other user properties
}

const user = atom<User | null>({
    key: 'user',
    default: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null
});

export default user;
