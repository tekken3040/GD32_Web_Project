import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
} from '@material-ui/core';
import MyRoom from 'src/components/home/MyRoom';

const Home = () => (
  <>
    <Helmet>
      <title>홈</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <MyRoom />
      </Container>
    </Box>
  </>
);

export default Home;
