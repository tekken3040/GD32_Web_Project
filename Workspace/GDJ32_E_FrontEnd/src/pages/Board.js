import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import BoardListComponent from '../components/board/ListBoardComponent';

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
      <BoardListComponent/>
      <Container maxWidth={false}>
        {}
      </Container>
    </Box>
  </>
);

export default BoardList;
