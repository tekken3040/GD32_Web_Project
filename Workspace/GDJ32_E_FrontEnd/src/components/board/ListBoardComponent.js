import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Pagination from '@material-ui/lab/Pagination';
import BoardService from '../../service/BoardService';

const Category = {
        NOTICE: {value: 0, name: "공지사항"},
        FREEBOARD: {value: 1, name: "자유게시판"},
        STORAGE: {value: 2, name: "자료실"},
        MARCKET: {value: 3, name: "중고나라"}
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginTop: theme.spacing(2),
        },
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const ListBoardComponent = () => {    
    const history = useNavigate();
    const [pNum, setNum] = useState(1);
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
        });
    }, []);
    
    // 지정한 페이지에 해당하는 글목록과 페이지 객체를 가져오는 함수
    const listBoard = (pageNum) => {
        console.log("listBoard", pageNum);

        console.log("pageNumCountTotal : ", paging.pageNumCountTotal);
        BoardService.getBoards(pageNum, 10, paging.pageNumCountTotal).then((res) => {
            setNum(res.data.pagingData.currentPageNum);
            setPage(res.data.pagingData);
            setBoards(res.data.list);
        });
    }

    const handleChange = (event, value) => {
        setNum(value);
        console.log("value : ", value);
        console.log(paging);
        listBoard(value);
        history(`/app/board/${value}`, { replace: false });
    }

    const getBoardCategory = (value) => {
        console.log("getBoardCategory");
        let name = "Not Defined";
        switch(value) {
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
                name = "Not Defined";
                break;
        }
        return name;
    }

    const getBoardCreateDay = (value) => {
        const createDay = new Intl.DateTimeFormat('ko-KR').format(Date.parse(value));
        return createDay;
    }

    // # 글 제목을 클릭 했을 때 글 상세보기 페이지로 이동해주는 함수정의
    const readBoard = (event) => {
        // console.log("readBoard event", idx);
        event.preventDefault();
        console.log("###################", event.target.getAttribute('value'));
        const idx = event.target.getAttribute('value');
        BoardService.getOneBoard(event.target.getAttribute('value'))
            .then(res => {
                console.log(res);
                console.log(`/read-board/${res.data.idx}`);
                history(`/app/read-board/${idx}`, {
                    replace: false,
                    state: {
                        idx: res.data.idx,
                        board: res.data
                    }
                });
            })
            .catch(err => {
                console.log(`getBoard err : ${ err }`);
            });
    }

    // # 글 작성 버튼을 클릭시 글 작성 페이지로 이동 (this.props.history.push -> 인자 전달 )
    // this.props.history.push('이동할 링크'); -> 일반적
    // 사용자 토큰 정보나 결제 정보 또는 게시물의 일련번호 등 다음 페이지로 넘어갈 때 파라미터를 가지고 넘어가야할 때 push를 써서 이동할 때는 아래처럼 이용
    // this.props.history.push({pathname:'이동할 링크',state:{detail:전달할 파라미터}})
    const createBoard = (event) => {
        event.preventDefault();
        const pIdx = "_create";
        history("/app/create-board/_create", {
            replace: false,
            state: { idx: pIdx }
        });
    }
    return (
        <div>
            <h2 className="text-center">게시판 목록</h2>
            <div className = "row">
                <Button className="btn btn-primary" onClick={(e) => createBoard(e)}> 글 작성</Button>
            </div>
            <div className ="table" style={{ padding: "0 12px" }}>
                <table className="table table-striped table-bordered">
                    <colgroup>
                        <col width="5%" />
                        <col width="*" />
                        <col width="50%" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                        <col width="*" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>카테고리 </th>
                            <th>제목</th>
                            <th>작성자 </th>
                            <th>작성일 </th>
                            <th>조회수</th>
                            <th>좋아요수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            boards.map(
                                board => 
                                <tr key = {board.idx}>
                                    <td> {board.idx} </td>
                                    <td> {getBoardCategory(board.category)} </td>
                                        <td>
                                            <a href="#" value={board.idx} onClick={(e) => readBoard(e)}>
                                                {board.title}
                                            </a>
                                        </td>
                                    <td> {board.id} </td>
                                    <td> {getBoardCreateDay(board.createtDay)} </td>
                                    <td> {board.viewCnt} </td>
                                    <td> {board.likes} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className={classes.root}>
                <Typography>Page: {pNum}</Typography>
                <Pagination count={paging.pageNumCountTotal} page={pNum} onChange={handleChange} value={pNum} name="pNum"/>
            </div>
        </div>
    );
}

export default ListBoardComponent;
