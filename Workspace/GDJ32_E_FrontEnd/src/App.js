import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import customAxios from './customAxios'

function App()
{
  // IP 주소 변수 선언
  const [ip, setIp] = useState('');

  // IP 주소 값 설정
  function callback(data)
  {
    setIp(data);
  }

  // 첫번째 렌더링 후 실행
  useEffect(
    () => {
      // 클라이언트 IP주소 호출 백앤드 함수
      customAxios('/ip', callback);
    }, []
  );
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        IP Address is {ip}.
      </header>
    </div>
  );
}

export default App;
