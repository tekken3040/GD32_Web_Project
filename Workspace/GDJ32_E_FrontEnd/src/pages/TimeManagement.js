import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';

const TimeManagement = () => (
  <>
    <Helmet>
      <title>근태관리</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth="lg">
        근태관리
      </Container>
    </Box>
  </>
);

export default TimeManagement;
