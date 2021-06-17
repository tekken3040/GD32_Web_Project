import { Box, Button, Typography } from '@material-ui/core';

const Materialroom = () => {
  console.log('myHome');

  return (
    <>
      <Box>
        <Typography
          variant="h1"
          color="#5664d2"
          sx={{
            m: 2,
            mt: 8,
            ml: 3,
            display: 'flex'
            // fontFamily: 'courrbd'
          }}
        >
          TGIF
        </Typography>
        <Typography
          variant="h3"
          color="#5664d2"
          sx={{
            mt: 3,
            ml: 3,
            display: 'flex'
          }}
        >
          Thanks(T)&nbsp;God(G)&nbsp;It(I)&#39;s&nbsp;Friday(F)
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="h4"
          color="#172B4D"
          fontFamily="rr"
          sx={{
            m: 2,
            mt: 9,
            ml: 3,
            display: 'flex'
          }}
        >
          사용자에게&nbsp;보다&nbsp;나은&nbsp;업무&nbsp;효율성을&nbsp;제공하기&nbsp;위해
          <br />
          전자&nbsp;출결,&nbsp;스케줄러,&nbsp;게시판을&nbsp;통한&nbsp;정보&nbsp;공유&nbsp;등&nbsp;기능을&nbsp;제공합니다.
        </Typography>
      </Box>
      <Box>
        <Button
          sx={{
            cursor: 'pointer',
            width: 150,
            height: 55,
            m: 2,
            mt: 30,
            ml: 30,
            display: 'flex',
            flexDirection: 'column'
          }}
          color="primary"
          component="a"
          href="/register"
          variant="contained"
        >
          회원가입
        </Button>
      </Box>
    </>
  );
};

export default Materialroom;
