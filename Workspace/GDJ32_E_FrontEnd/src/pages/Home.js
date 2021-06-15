import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import MyRoom from 'src/components/home/MyRoom';

const styles = {
  backContainer: {
    backgroundImage:
      'url(https://github.com/tekken3040/testRepos/blob/master/KakaoTalk_20210616_011039856.png?raw=true)',
    backgroundSize: 'cover'
  }
};

const Home = () => (
  <>
    <Helmet>
      <title>홈</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3,
        // backgroundImage: new URL('https://github.com/tekken3040/testRepos/blob/master/4.png?raw=true')
        backgroundImage: new URL(
          'https://github.com/tekken3040/testRepos/blob/master/KakaoTalk_20210616_011039856.png?raw=true'
        )
      }}
      style={styles.backContainer}
    >
      <Container maxWidth={false}>
        <MyRoom />
      </Container>
    </Box>
  </>
);

export default Home;
