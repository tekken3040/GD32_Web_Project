import Cookies from 'universal-cookie';

const cookies = new Cookies();

const logout = () => {
    cookies.remove("accessToken");
    cookies.remove("userId");
    cookies.remove("memberIndex");
    cookies.remove("id");
    cookies.remove("name");
    cookies.remove("phone");
    cookies.remove("zipcode");
    cookies.remove("address");
    cookies.remove("addressDetail");
    cookies.remove("birthday");
    cookies.remove("email");
    window.location.replace("/")
}


export default logout;