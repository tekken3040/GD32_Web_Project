import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography
} from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import customAxios from 'src/ApiService';

const NotFound = () => {
  const [ip, setIp] = useState('');
  // IP주소 값을 설정합니다.
  function callback(data) {
    setIp(data);
  }

  // 첫번째 렌더링을 다 마친 후 실행합니다.
  useEffect(
    () => {
      // 클라이언트의 IP주소를 알아내는 백엔드의 함수를 호출합니다.
      // customAxios('/ip', callback);
      customAxios('/test', callback);
    }, []
  );

  // 값이 정확히 들어오는지 확인하기 위한 콘솔 로그
  console.log(ip);
  // 백엔드에서 전달받은 JSON데이터를 String 형식으로 파싱해서 element 변수에 저장
  const element = JSON.stringify(ip);

  return (
    <>
      <Helmet>
        <title>404 | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography
            align="center"
            color="textPrimary"
            variant="h1"
          >
            404: The page you are looking for isn’t here
          </Typography>
          <Typography
            align="center"
            color="textPrimary"
            variant="subtitle2"
          >
            You either tried some shady route or you came here by mistake.
            Whichever it is, try using the navigation
            {element}
          </Typography>
          <Box sx={{ textAlign: 'center' }}>
            <img
              alt="Under development"
              src="/static/images/undraw_page_not_found_su7k.svg"
              style={{
                marginTop: 50,
                display: 'inline-block',
                maxWidth: '100%',
                width: 560
              }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default NotFound;
