import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);
        // console.log("확인"+this.props.match.params.index);

        // # 1. this.state에 글 상세보기에 사용될 파라미터 정의 
        this.state = { 
            // index : this.props.match.params.index,
            idx : this.props.match.params.idx,
            board: {}
        }

        this.goToUpdate = this.goToUpdate.bind(this);

    }

    // # 2. 페이지가 로딩될때 api와 통신하여 글 객체를 가져온다
    //componentDidMount() {
    componentDidMount(){
        // console.log("####게시글번호 : " + this.state.index)
        // BoardService.getOneBoard(this.state.index).then( res => {
            BoardService.getOneBoard(this.state.idx).then( res => {
            this.setState({board: res.data});
            console.log("get result => " + JSON.stringify(res.data));
        });
    }

    // # 3. 파라미터 값에 따라 페이지에 표시할 내용을 변경 / 게시판 타입별로 표시를 다르게 하기
    returnBoardType(categoryNo) {
        let category = null;
        if (categoryNo == 0) {
            category = "공지사항";

        } else if (categoryNo == 1 ) {
            category = "자유게시판";

        } else if (categoryNo == 2 ) {
            category = "자료실";

        } else {
            category = "사고팝니다";
        }

        return (
            <div className = "row">
                <label> 카테고리 : </label> {category}
            </div>
        )

    }

    returnDate(cTime) {
        console.log("생성일 :" + {cTime})
        // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat (date format 링크)
        console.log(new Intl.DateTimeFormat('ko-KR').format(cTime))
        return (
            <div className = "row">
                <label>생성일 : [ {new Intl.DateTimeFormat('ko-KR').format(cTime)} ] </label>
            </div>
        )
    }

    // # 4. 글 목록으로 이동하는 함수를 정의 
    goToList() {
        this.props.history.push('/board');
    }

    goToUpdate = (event) => {
        event.preventDefault();
        // this.props.history.push(`/create-board/${this.state.index}`);
        this.props.history.push(`/create-board/${this.state.idx}`);
    }

    deleteView = async function () {
        if(window.confirm("정말로 글을 삭제하시겠습니까?")){
            // BoardService.deleteBoard(this.state.index).then( res => {
                BoardService.deleteBoard(this.state.idx).then( res => {
                console.log("delete result => " + JSON.stringify(res));
                if (res.status == 200) {
                    this.props.history.push('/board');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            })
        }
    }

    render() {
        return (
            <div>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className ="text-center"> 상세페이지</h3>
                    <div className = "card-body">
                            {this.returnBoardType(this.state.board.category)}      
                            <div className = "row">      
                                <label> 제목 </label> : {this.state.board.title}
                            </div>

                            <div className = "row">
                                <label> 내용 </label> : <br></br> 
                                <textarea value={this.state.board.content} readOnly/>
                                {/* {this.state.board.createtDay} */}
                            </div >

                            {/* <div className = "row">
                                <label>   </label>: 
                                {this.state.board.memberNo}
                            </div> */}

                            {this.returnDate(this.state.board.createdTime, this.state.board.updatedTime) }
                           
                            <button className="btn btn-primary" onClick={this.goToList.bind(this)} style={{marginLeft:"10px"}}>글 목록으로 이동</button>
                            <button className="btn btn-info" onClick={this.goToUpdate} style={{marginLeft:"10px"}}>글 수정</button>
                          
                            <button className="btn btn-danger" onClick={() => this.deleteView()} style={{marginLeft:"10px"}}>글 삭제</button>
                    </div>
                </div>

            </div>
        );
    }
}

export default ReadBoardComponent;