import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import BoardService from '../../service/BoardService';
// import '../../css/ListBoardComponent.css';

const Category = {
  NOTICE: { value: 0, name: '공지사항' },
  FREEBOARD: { value: 1, name: '자유게시판' },
  STORAGE: { value: 2, name: '자료실' },
  MARCKET: { value: 3, name: '중고나라' }
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2)
    },
    '& > *': {
      margin: theme.spacing(1)
    }
  }
}));

const PaginationStyle = withStyles({
  ul: {
    justifyContent: 'center'
  }
})(Pagination);

const ListBoardComponent = () => {
  const history = useNavigate();
  const { state } = useLocation();
  const [pNum, setNum] = useState(() => {
    if (state != null) return state.pIdx;
    return 1;
  });
  const [paging, setPage] = useState({});
  const [boards, setBoards] = useState([]);
  const classes = useStyles();

  // 페이지가 로딩될 때, 글 목록만 가져오던 것을 , 페이징 객체도 같이 가져오도록 수정
  useEffect(() => {
    // getBoard호출시 페이지 번호 외에 한페이지에 표시할 게시물 수와 총 페이지 수량을 적어줘야함
    BoardService.getBoards(pNum, 10, 10).then((res) => {
      setNum(res.data.pagingData.currentPageNum);
      setPage(res.data.pagingData);
      setBoards(res.data.list);
      console.log(res.data.list);
      console.log('pNum : ', pNum);
    });
  }, [pNum]);

  // 지정한 페이지에 해당하는 글목록과 페이지 객체를 가져오는 함수
  // const listBoard = (pageNum) => {
  //     console.log("listBoard", pageNum);
  //
  //     console.log("pageNumCountTotal : ", paging.pageNumCountTotal);
  //     BoardService.getBoards(pageNum, 10, paging.pageNumCountTotal).then((res) => {
  //         setNum(res.data.pagingData.currentPageNum);
  //         setPage(res.data.pagingData);
  //         setBoards(res.data.list);
  //     });
  // }

  const handleChange = (event, value) => {
    setNum(value);
    console.log('value : ', value);
    console.log(paging);
    history(`/app/board/${value}`, {
      replace: false,
      state: {
        pIdx: pNum
      }
    });
    // listBoard(value);
  };

  const getBoardCategory = (value) => {
    console.log('getBoardCategory');
    let name = 'Not Defined';

    switch (value) {
      case Category.NOTICE.value:
        name = Category.NOTICE.name;
        break;
      case Category.FREEBOARD.value:
        name = Category.FREEBOARD.name;
        break;
      case Category.STORAGE.value:
        name = Category.STORAGE.name;
        break;
      case Category.MARCKET.value:
        name = Category.MARCKET.name;
        break;
      default:
        name = 'Not Defined';
        break;
    }
    return name;
  };

  const getBoardCreateDay = (value) => {
    const createDay = new Intl.DateTimeFormat('ko-KR').format(
      Date.parse(value)
    );
    return createDay;
  };

  // # 글 제목을 클릭 했을 때 글 상세보기 페이지로 이동해주는 함수정의
  const readBoard = (event) => {
    // console.log("readBoard event", idx);
    event.preventDefault();
    console.log('###################', event.target.getAttribute('value'));
    const idx = event.target.getAttribute('value');
    BoardService.getOneBoard(event.target.getAttribute('value'))
      .then((res) => {
        console.log(res);
        console.log(`/read-board/${res.data.idx}`);
        history(`/app/read-board/${idx}`, {
          replace: true,
          state: {
            idx: res.data.idx,
            board: res.data
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // # 글 작성 버튼을 클릭시 글 작성 페이지로 이동 (this.props.history.push -> 인자 전달 )
  // this.props.history.push('이동할 링크'); -> 일반적
  // 사용자 토큰 정보나 결제 정보 또는 게시물의 일련번호 등 다음 페이지로 넘어갈 때 파라미터를 가지고 넘어가야할 때 push를 써서 이동할 때는 아래처럼 이용
  // this.props.history.push({pathname:'이동할 링크',state:{detail:전달할 파라미터}})
  const createBoard = (event) => {
    event.preventDefault();
    const pIdx = '_create';
    history('/app/create-board/_create', {
      replace: true,
      state: { idx: pIdx }
    });
  };
  return (
    <Box>
      <h2 className="text-center">게시판 목록</h2>
      <br />
      <Box className="row">
        <Button
          variant="contained"
          color="primary"
          className="btn btn-primary"
          startIcon={<CreateOutlinedIcon />}
          onClick={(e) => createBoard(e)}
        >
          {' '}
          글 작성
        </Button>
      </Box>
      <Box className="table" style={{ padding: '0 12px' }}>
        <Table className="table table-striped table-bordered">
          <colgroup>
            <col width="*" />
            <col width="*" />
            <col width="50%" />
            <col width="*" />
            <col width="*" />
            <col width="*" />
            <col width="*" />
          </colgroup>
          <TableHead>
            <TableRow>
              <TableCell align="center">번호</TableCell>
              <TableCell align="center">카테고리 </TableCell>
              <TableCell align="center">제목</TableCell>
              <TableCell align="center">작성자 </TableCell>
              <TableCell align="center">작성일 </TableCell>
              <TableCell align="center">조회수</TableCell>
              <TableCell align="center">좋아요수</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {boards.map((board) => (
              <TableRow key={board.idx}>
                <TableCell align="center"> {board.idx} </TableCell>
                <TableCell align="center">
                  {' '}
                  {getBoardCategory(board.category)}{' '}
                </TableCell>
                <TableCell>
                  <a href="#" value={board.idx} onClick={(e) => readBoard(e)}>
                    {board.title}
                  </a>
                </TableCell>

                <TableCell align="center"> {board.id} </TableCell>
                <TableCell align="center">
                  {' '}
                  {getBoardCreateDay(board.createtDay)}{' '}
                </TableCell>
                <TableCell align="center"> {board.viewCnt} </TableCell>
                <TableCell align="center"> {board.likes} </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box className={classes.root}>
        <Typography>
          Page: {pNum}
          <PaginationStyle
            count={paging.pageNumCountTotal}
            page={pNum}
            onChange={handleChange}
            value={pNum}
            name="pNum"
          />
        </Typography>
      </Box>
    </Box>
  );
};

export default ListBoardComponent;
