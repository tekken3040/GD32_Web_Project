import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
// import BoardListResults from 'src/components/board/BoardListResults';
// import BoardListToolbar from 'src/components/board/BoardListToolbar';
// import customers from 'src/__mocks__/customers';

const BoardList = () => (
  <>
    <Helmet>
      <title>게시판</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        {/* <BoardListToolbar />
        <Box sx={{ pt: 3 }}>
          <BoardListResults Board={Board} />
        </Box> */}
      </Container>
    </Box>
  </>
);

export default BoardList;
