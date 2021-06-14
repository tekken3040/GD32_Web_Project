import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import MypageProfile from 'src/components/mypage/MypageProfile';
import MypageProfileDetails from 'src/components/mypage/MypageProfileDetails';

const Mypage = () => (
  <>
    <Helmet>
      <title>마이페이지</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            md={6}
            xs={12}
          >
            <MypageProfile />
          </Grid>
          <Grid
            item
            lg={8}
            md={6}
            xs={12}
          >
            <MypageProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Mypage;
