import React, { Component } from 'react';
import BoardService from '../service/BoardService';

class CreateBoardComponent extends Component {
    constructor(props) {
        super(props);

        //# 1. this.state에 폼 양식에서 사용될 파라미터를 정의
        this.state = {
            // index : this.props.match.params.index, // 글 작성인지 수정인지 구분하기 위한 파라미터
            idx : this.props.match.params.idx,
            category: 1, // 초기값(기본값) 설정
            title: '',
            content: '',
            // ID: ''
        }

        //# 2.
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentHandler = this.changeContentHandler.bind(this);
        // this.changeIdHandler = this.changeIdHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);
    }

    //# 3. 
    changeCategoryHandler = (event) => {
        this.setState({category: event.target.value});
       // console.log(event.target.value);
    }
    //# 3. 
    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
        //console.log(event.target.value);
    }
    //# 3. 
    changeContentHandler = (event) => {
        this.setState({content: event.target.value});
        //console.log(event.target.value);
    }
    // # 3. 
    // changeIdHandler = (event) => {
    //     this.setState({ID: event.target.value});
    // }

    //# 4. save 버튼을 클릭시 api에 글 작성 리퀘스트를 보내는 함수를 선언
    createBoard = (event) => {
        event.preventDefault();
        let board = {
            category: this.state.category,
            title: this.state.title,
            content: this.state.content
            // ID: this.state.ID
        };
        console.log("board => "+ JSON.stringify(board)); // 보내짐 확인
        // if(this.state.index == '_create'){
            if(this.state.idx == '_create'){
            BoardService.createBoard(board).then(res => {
              this.props.history.push('/board');
            });
        } else {
            // BoardService.updateBoard(this.state.index, board).then(res => {
                BoardService.updateBoard(this.state.idx, board).then(res => {
                this.props.history.push('/board');
            })
        }   
    }

    //글작성 취소 버튼이 클릭되었을때 글목록 페이지로 이동하는 함수선언
    cancel() {
        this.props.history.push('/board');
    }

    getTitle() {
        if (this.state.idx === '_create') {
        // if (this.state.index === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>
        } else {
            return <h3 className="text-center">{this.state.index}글을 수정 합니다.</h3>
        }
    }

    componentDidMount() {
        // if (this.state.index === '_create') {
        if (this.state.idx === '_create') {    
            return
        } else {
            // BoardService.getOneBoard(this.state.index).then( (res) => {
            BoardService.getOneBoard(this.state.idx).then( (res) => {
                let board = res.data;
                console.log("board => "+ JSON.stringify(board));
                
                this.setState({
                        category: board.category,
                        title: board.title,
                        content: board.content
                       
                    });
            });
        }
    }


    render() {
        return (
            <div>
                <div className = "container">
                    <div className = "row">
                        <div className = "card col-md-6 offset-md-3 offset-md-3">
                           {
                               this.getTitle()
                            }
                            <h3 className="text-center">새글을 작성해주세요</h3>
                            <div className = "card-body">
                                <form>
                                    <div className = "form-group">
                                        <label> Type </label>
                                        <select placeholder="category" name="category" className="form-control" 
                                        value={this.state.category} onChange={this.changeCategoryHandler}>
                                            <option value="0">공지사항</option>
                                            <option value="1">자유게시판</option>
                                            <option value="2">자료실</option>
                                            <option value="3">사고팝니다</option>
                                        </select>
                                    </div>
                                    <div className = "form-group">
                                        <label> 제목 </label>
                                        <input type="text" placeholder="title" name="title" className="form-control" 
                                        value={this.state.title} onChange={this.changeTitleHandler}/>
                                    </div>
                                    <div className = "form-group">
                                        <label> 내용  </label>
                                        <textarea placeholder="content" name="content" className="form-control" 
                                        value={this.state.content} onChange={this.changeContentHandler}/>
                                    </div>
                            
                                    <button className="btn btn-success" onClick={this.createBoard}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default CreateBoardComponent;