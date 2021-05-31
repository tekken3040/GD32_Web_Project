import axios from 'axios'; // 액시오스

const DOMAIN = "http://localhost:8080";

axios.defaults.withCredentials = true; // 쿠키 데이터를 전송받기 위해서
export default function customAxios(url, callback) {
  axios( {
      // 리액트에서는 스트링 조합에 '+' 를 사용하지 못하는것 같아서
      // ${}처리함
      url:`/api$ {url}`, 
      method:'post', 

      /**
       * 개발 환경에서의 크로스 도메인 이슈를 해결하기 위한 코드로
       * 운영 환경에 배포할 경우에는 15~16행을 주석 처리합니다.
       * ※크로스 도메인 이슈: 브라우저에서 다른 도메인으로 URL 요청을 하는 경우 나타나는 보안문제
       */
      baseURL:DOMAIN, 
    }
  ).then((response) =>  {
    callback(response.data); 
  }); 
}

export const requestSignUp = async (method, url, data) => {
  console.log("request");
  try {
    console.log("request");
    const res = await axios( {
      method, 
      url: `/api$ {url}`,
      baseURL: DOMAIN,
      data, 
    }); 
    return res.data; 
  }
  catch (err) {
    return console.log(err); 
  }
}; 