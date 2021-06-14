import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
// import Budget from 'src/components/dashboard//Budget';
// import LatestOrders from 'src/components/dashboard//LatestOrders';
import Calendar from 'src/components/home/Calendar';
import Materialroom from 'src/components/home/Materialroom';
// import TasksProgress from 'src/components/dashboard//TasksProgress';
// import TotalCustomers from 'src/components/dashboard//TotalCustomers';
import Notice from 'src/components/home/Notice';
import Gallery from 'src/components/home/Gallery';

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
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Notice sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Materialroom />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <Gallery sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <Calendar sx={{ height: '100%' }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Home;
