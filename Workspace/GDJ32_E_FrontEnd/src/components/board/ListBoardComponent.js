import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@material-ui/core';
import BoardService from '../../service/BoardService';

const Category = {
        NOTICE: {value: 0, name: "공지사항"},
        FREEBOARD: {value: 1, name: "자유게시판"},
        STORAGE: {value: 2, name: "자료실"},
        MARCKET: {value: 3, name: "중고나라"}
}

const ListBoardComponent = () => {    
    const history = useNavigate();
    const [pNum, setNum] = useState(1);
    const [paging, setPage] = useState({});
    const [boards, setBoards] = useState([]);

    // 페이지가 로딩될 때, 글 목록만 가져오던 것을 , 페이징 객체도 같이 가져오도록 수정
    useEffect(() => {
        BoardService.getBoards(pNum).then((res) => {
            setNum(res.data.pagingData.currentPageNum);
            setPage(res.data.pagingData);
            setBoards(res.data.list);
        });
    });
    
    // 지정한 페이지에 해당하는 글목록과 페이지 객체를 가져오는 함수
    const listBoard = (pageNum) => {
        console.log("listBoard");

        BoardService.getBoards(pageNum).then((res) => {
            setNum(res.data.pagingData.currentPageNum);
            setPage(res.data.pagingData);
            setBoards(res.data.list);
        });
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
        console.log(value);
        return value;
    }

    // 페이지 버튼을 표시하는 함수
    const viewPaging = () => {
        const pageNums = [];
        console.log("viewPaging");
        for (let i = paging.pageNumStart; i <= paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }
        if (Object.keys(pageNums).length > 0) {
            Object.keys(pageNums).forEach((page) => {
                console.log("=========call viewPaging");
                (
                    <li className="page-item" key={page.toString()} >
                        <Button className="page-link" onClick={listBoard(page)} aria-hidden="true" role="button">{page}</Button>
                    </li>
                );
            })
        }
    }

    // 이전 페이지 이동버튼을 출력하는 함수
    const isPagingPrev = () => {
        console.log("isPagingPrev : ", paging.prev);
        if (paging.prev) {
            console.log("=========call prevPaging");
            (
                <li className="page-item">
                    <Button className="page-link" onClick = {listBoard( (paging.currentPageNum - 1) )} aria-hidden="true" role="button">Previous</Button>
                </li>
            );
        }
    }

    // 다음 페이지 이동 버튼을 출력하는 함수
    const isPagingNext = () => {
        console.log("isPagingNext : ", paging.next);
        if (paging.next) {
            console.log("=========call nextPaging");
            (
                <li className="page-item">
                    <Button className="page-link" onClick = {listBoard( (paging.currentPageNum + 1) )} aria-hidden="true" role="button">Next</Button>
                </li>
            )
        }
    }

    // 첫페이지 이동 버튼을 출력하는 함수
    const isMoveToFirstPage = () => {
        console.log("isMoveToFirstPage : ", pNum);
        if (pNum !== 1) {
            console.log("=========call firstPaging");
            (
                <li className="page-item">
                    <Button className="page-link" onClick = {listBoard(1)} aria-hidden="true" role="button">Move to First Page</Button>
                </li>
            );
        }
    }

    // 마지막 페이지 이동 버튼을 출력하는 함수
    const isMoveToLastPage = () => {
        console.log("isMoveToLastPage : ", paging.pageNumCountTotal);
        if (pNum !== paging.pageNumCountTotal) {
            console.log("=========call lastPaging");
            (
                <li className="page-item">
                    <Button className="page-link" onClick={listBoard((paging.pageNumCountTotal))} aria-hidden="true" role="button">LastPage({paging.pageNumCountTotal})</Button>
                </li>
            );
        }
    }

    // # 글 제목을 클릭 했을 때 글 상세보기 페이지로 이동해주는 함수정의
    const readBoard = (idx) => {
        console.log("readBoard event", idx);
        
        BoardService.getOneBoard(idx)
            .then(res => {
                history(`/read-board/${idx}`);
                console.log(res);
            })
            .catch(err => {
                console.log(`getBoard err : ${ err }`);
            });
    }

    // # 글 작성 버튼을 클릭시 글 작성 페이지로 이동 (this.props.history.push -> 인자 전달 )
    // this.props.history.push('이동할 링크'); -> 일반적
    // 사용자 토큰 정보나 결제 정보 또는 게시물의 일련번호 등 다음 페이지로 넘어갈 때 파라미터를 가지고 넘어가야할 때 push를 써서 이동할 때는 아래처럼 이용
    // this.props.history.push({pathname:'이동할 링크',state:{detail:전달할 파라미터}})
    const createBoard = () => {
        history("/create-board/_create");
    }
    return (
        <div>
            <h2 className="text-center">게시판 목록</h2>
            <div className = "row">
                <Button className="btn btn-primary" 
                    onClick={createBoard}> 글 작성</Button>
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
                            {/* <th>수정일</th> */}
                            <th>조회수</th>
                            <th>좋아요수</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            boards.map(
                                board => 
                                // <tr key = {board.index}>
                                <tr key = {board.idx}>
                                    {/* <td> {board.index} </td> */}
                                    <td> {board.idx} </td>
                                    <td> {getBoardCategory(board.category)} </td>
                                        {/* <td> <a onClick = {() => this.readBoard(board.index)}>{board.title}</a></td> */}
                                        <td>
                                            <Button onClick={readBoard(board.idx)} aria-hidden="true" role="button">
                                                {board.title}
                                            </Button>
                                        </td>
                                    <td> {board.id} </td>
                                    <td> {getBoardCreateDay(board.created_day)} </td>
                                    <td> {board.viewCnt} </td>
                                    <td> {board.likes} </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
            <div className ="row">
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {
                            isMoveToFirstPage()
                        }
                        {
                            isPagingPrev()
                        }
                        {
                            viewPaging()
                        }
                        {
                            isPagingNext()
                        }
                        {
                            isMoveToLastPage()
                        }
                    </ul>
                </nav>
            </div>
        </div>
    );
}

export default ListBoardComponent;
