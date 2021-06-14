import { Button } from '@material-ui/core';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BoardService from '../../service/BoardService';

const ReadBoardComponent = () => {
    const history = useNavigate();
    const { state } = useLocation();
    // const { pIdx, pBoard } = state;
    const pIdx = state.idx;
    const pBoard = state.board;

    // # 2. 페이지가 로딩될때 api와 통신하여 글 객체를 가져온다
    // useEffect(() => {
    //     BoardService.getOneBoard(idx).then(res => {
    //         setIdx(res.data.getIdx);
    //         setBoard(res.data);
    //         console.log(idx);
    //         console.log(board);
    //         console.log(res);
    //     });
    // }, []);

    // # 3. 파라미터 값에 따라 페이지에 표시할 내용을 변경 / 게시판 타입별로 표시를 다르게 하기
    const returnBoardType = (categoryNo) => {
        let category = null;
        if (categoryNo === 0) {
            category = "공지사항";

        } else if (categoryNo === 1 ) {
            category = "자유게시판";

        } else if (categoryNo === 2 ) {
            category = "자료실";

        } else {
            category = "사고팝니다";
        }

        return (
            <div className = "row">
                <h3> 카테고리 : </h3> {category}
            </div>
        )
    }

    const returnDate = (cTime) => {
        console.log("생성일 : ", { cTime });
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat (date format 링크)
        console.log(new Intl.DateTimeFormat('ko-KR').format(cTime));
        return (
            <div className="row">
                <h3>생성일 : [ {new Intl.DateTimeFormat('ko-KR').format(cTime)} ] </h3>
            </div>
        );
    }

    // # 4. 글 목록으로 이동하는 함수를 정의 
    const goToList = () => {
        history('/app/board/1', {replace: false});
    }

    const goToUpdate = (event) => {
        event.preventDefault();
        // this.props.history.push(`/create-board/${this.state.index}`);
        history(`/app/create-board/${pIdx}`, {
            replace: false,
            state: {
                idx: pIdx,
                board: pBoard
            }
        });
    }

    const deleteView = async function () {
        if(window.confirm("정말로 글을 삭제하시겠습니까?")){
            // BoardService.deleteBoard(this.state.index).then( res => {
                BoardService.deleteBoard(pIdx).then( res => {
                console.log("delete result => ", JSON.stringify(res));
                if (res.status === 200) {
                    history('/app/board/1');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            })
        }
    }

    return (
        <div>
            <div className = "card col-md-6 offset-md-3">
                <h3 className ="text-center"> 상세페이지</h3>
                <div className = "card-body">
                        {returnBoardType(pBoard.category)}      
                        <div className = "row">      
                            <h3> 제목 </h3> : {pBoard.title}
                        </div>
                        <div className = "row">
                            <h3> 내용 </h3> : <br/>
                            <textarea value={pBoard.content} readOnly/>
                            {/* {this.state.board.createtDay} */}
                        </div >
                        {/* <div className = "row">
                            <label>   </label>: 
                            {this.state.board.memberNo}
                        </div> */}
                        {returnDate(pBoard.createdTime, pBoard.updatedTime) }
                       
                        <Button className="btn btn-primary" onClick={goToList} style={{marginLeft:"10px"}}>글 목록으로 이동</Button>
                        <Button className="btn btn-info" onClick={goToUpdate} style={{marginLeft:"10px"}}>글 수정</Button>
                      
                        <Button className="btn btn-danger" onClick={() => deleteView()} style={{marginLeft:"10px"}}>글 삭제</Button>
                </div>
            </div>
        </div>
    );
}

export default ReadBoardComponent;