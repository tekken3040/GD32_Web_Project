import { Box, Button } from '@material-ui/core';

const Materialroom = () => {
  console.log('myHome');

  return (
    <>
      <Box>
        <Button
          sx={{
            cursor: 'pointer',
            width: 150,
            height: 55,
            m: 2,
            mt: 50,
            ml: 30,
            display: 'flex',
            flexDirection: 'column'
          }}
          color="primary"
          component="a"
          href="http://localhost:3000/register"
          variant="contained"
        >
          회원가입
        </Button>
      </Box>
    </>
  );
};

export default Materialroom;
