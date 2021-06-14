import Cookies from 'universal-cookie';

const cookies = new Cookies();

const logout = () => {
    cookies.remove("accessToken");
    cookies.remove("userId");
    window.location.replace("/")
}


export default logout;