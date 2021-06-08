import React, { Component } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@material-ui/core';
import BoardService from '../../service/BoardService';
// const createBtn = {
//     width : "7rem",
//     color: "#212529",
//     background: "lightgray",
//     padding: ".375rem .75rem",
//     border: "1px solid lightgray",
//     borderRadius: ".25rem",
//     fontSize: "1rem",
//     lineHeight: 1.7
// }

const Category = {
        NOTICE: {value: 0, name: "공지사항"},
        FREEBOARD: {value: 1, name: "자유게시판"},
        STORAGE: {value: 2, name: "자료실"},
        MARCKET: {value: 3, name: "중고나라"}
}

const history = useNavigate;

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)
    // this.state에 현재 페이지 번호를 저장하기 위한 pNum파라미터, paging처리를 위한 paging객체 선언
        this.state = { 
            pNum: 1,
            paging: {},
            boards: []
        }
        // #1. 글 작성 버튼 클릭시 동작
        this.createBoard = this.createBoard.bind(this);
    }
    
    // 페이지가 로딩될 때, 글 목록만 가져오던 것을 , 페이징 객체도 같이 가져오도록 수정
    componentDidMount() {
        const bState = this.state;
        console.log("componentDidMount in")
        console.log(bState);
        BoardService.getBoards(bState.pNum).then((res) => {
            this.setState({ 
                pNum: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
        });
    }
    
    // 지정한 페이지에 해당하는 글목록과 페이지 객체를 가져오는 함수
    listBoard = (pNum) => {
        console.log(`pageNum : ${pNum}`);
        console.log("listBoard");
        let tempNum = 1;
        if (pNum === "undefined")
            tempNum = 1;
        else
            tempNum = pNum;
        
        console.log(tempNum);
        BoardService.getBoards(tempNum).then((res) => {
            console.log(res.data);
            this.setState({
                pNum: res.data.pagingData.currentPageNum,
                paging: res.data.pagingData,
                boards: res.data.list});
        });
    }

    getBoardCategory = (value) => {
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

    getBoardCreateDay = (value) => {
        console.log(`작성일 : ${value}`);
        console.log("getBoardCreateDay");
        return value;
    }

    // 페이지 버튼을 표시하는 함수
    viewPaging = () => {
        const pageNums = [];
        const boardState = this.state;
        console.log("viewPaging");
        for (let i = boardState.paging.pageNumStart; i <= boardState.paging.pageNumEnd; i++ ) {
            pageNums.push(i);
        }
        if (Object.keys(pageNums).length > 0) {
            Object.keys(pageNums).forEach((page) => {
                (
                    <li className="page-item" key={page.toString()} >
                        <a className="page-link" onClick={this.listBoard(page)} aria-hidden="true" role="button" tabIndex="-1">{page}</a>
                    </li>
                );
            })
        }
        // pageNums.map(page => {
        //     (
        //         <li className="page-item" key={page.toString()} >
        //             <a className="page-link" onClick={listBoard(page)} aria-hidden="true" role="button" tabIndex="-1">{page}</a>
        //         </li>
        //     );
        // });
    }

    // 이전 페이지 이동버튼을 출력하는 함수
    isPagingPrev = () => {
        const boardState = this.state;
        console.log("isPagingPrev");
        if(boardState.paging.prev) {
            (
                <li className="page-item">
                    <a className="page-link" onClick = {this.listBoard( (boardState.paging.currentPageNum - 1) )} aria-hidden="true" role="button" tabIndex="-1">Previous</a>
                </li>
            );
        }
    }

    // 다음 페이지 이동 버튼을 출력하는 함수
    isPagingNext = () => {
        const boardState = this.state;
        console.log("isPagingNext");
        if (boardState.paging.next) {
            (
                <li className="page-item">
                    <a className="page-link" onClick = {this.listBoard( (boardState.paging.currentPageNum + 1) )} aria-hidden="true" role="button" tabIndex="-1">Next</a>
                </li>
            )
        }
    }

    // 첫페이지 이동 버튼을 출력하는 함수
    isMoveToFirstPage = () => {
        const boardState = this.state;
        console.log("isMoveToFirstPage");
        if (boardState.pNum !== 1) {
            (
                <li className="page-item">
                    <a className="page-link" onClick = {this.listBoard(1)} aria-hidden="true" role="button" tabIndex="-1">Move to First Page</a>
                </li>
            );
        }
    }

    // 마지막 페이지 이동 버튼을 출력하는 함수
    isMoveToLastPage = () => {
        const boardState = this.state;
        console.log("isMoveToLastPage");
        if (boardState.pNum !== boardState.paging.pageNumCountTotal) {
            (
                <li className="page-item">
                    <a className="page-link" onClick={this.listBoard((boardState.paging.pageNumCountTotal))} aria-hidden="true" role="button" tabIndex="-1">
                        LastPage({boardState.paging.pageNumCountTotal})
                        </a>
                </li>
            );
        }
    }

    // # 글 작성 버튼을 클릭시 글 작성 페이지로 이동 (this.props.history.push -> 인자 전달 )
    // this.props.history.push('이동할 링크'); -> 일반적
    // 사용자 토큰 정보나 결제 정보 또는 게시물의 일련번호 등 다음 페이지로 넘어갈 때 파라미터를 가지고 넘어가야할 때 push를 써서 이동할 때는 아래처럼 이용
    // this.props.history.push({pathname:'이동할 링크',state:{detail:전달할 파라미터}})
    createBoard = () => {
        // const thisProps = this.props;
        
        history('/create-board/_create');
    }
    // # 글 제목을 클릭 했을 때 글 상세보기 페이지로 이동해주는 함수정의
    // readBoard(index){
    readBoard = (idx) => {
        // const thisProps = this.props;
        // this.props.history.push(`/read-board/${index}` ); // * 인자넘김 방법1
        // this.props.history.push('/read-board/' + index ); // *인자넘검 방법2
        // history(`/read-board/${idx}`, {replace: true});

        console.log("readBoard event", idx);
        
        BoardService.getOneBoard(idx)
            .then(res => {
                console.log(res);
                history(`/read-board/${idx}`);
                console.log(`/read-board/${idx}`);
            })
            .catch(err => {
                console.log("getBoard err", err);
            });
    }

    // # 3.
    render() {
        const boardState = this.state;
        console.log(boardState);
        
        return (
            <div>
                <h2 className="text-center">게시판 목록</h2>
                <div className = "row">
                    <Button className="btn btn-primary" 
                        onClick={this.createBoard}> 글 작성</Button>
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
                                boardState.boards.map(
                                    board => 
                                    // <tr key = {board.index}>
                                    <tr key = {board.idx}>
                                        {/* <td> {board.index} </td> */}
                                        <td> {board.idx} </td>

                                        <td> {this.getBoardCategory(board.category)} </td>
                                            {/* <td> <a onClick = {() => this.readBoard(board.index)}>{board.title}</a></td> */}
                                            <td>
                                                <a onClick={this.readBoard(board.idx)} aria-hidden="true" role="button" tabIndex="-1">
                                                    {board.title}
                                                </a>
                                            </td>
                                        <td> {board.id} </td>
                                        <td> {this.getBoardCreateDay(board.created_day)} </td>
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
                                // this.isMoveToFirstPage()
                            }
                            {
                                // this.isPagingPrev()
                            }
                            {
                                // this.viewPaging()
                            }
                            {
                                // this.isPagingNext()
                            }
                            {
                                // this.isMoveToLastPage()
                            }
                        </ul>
                    </nav>
                </div>
            </div>
        );
    }
}

export default ListBoardComponent;
