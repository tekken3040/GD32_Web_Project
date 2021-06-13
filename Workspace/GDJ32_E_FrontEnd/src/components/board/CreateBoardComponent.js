import { Button } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import BoardService from '../../service/BoardService';

const CreateBoardComponent = () => {
    const history = useNavigate();
    const [idx, setIdx] = useState();
    const [pCategory, setCategory] = useState(1);
    const [pTitle, setTitle] = useState('');
    const [pContent, setContent] = useState('');
    const { state } = useLocation();
    const pIdx = state.idx;

    useEffect(() => {
        setIdx(pIdx);
        if (pIdx !== '_create') {
            
            BoardService.getOneBoard(pIdx).then( (res) => {
                const board = res.data;
                console.log(`board => ${JSON.stringify(board)}`);
                setIdx(board.idx);
                setCategory(board.category);
                setTitle(board.title);
                setContent(board.content);
            });
        }
    }, []);

    const getTitle = () => {
        if (idx === '_create') {
        // if (this.state.index === '_create') {
            return <h3 className="text-center">새글을 작성해주세요</h3>
        }
        return <h3 className="text-center">{idx}글을 수정 합니다.</h3>
    }

    // # 3. 
    const changeCategoryHandler = (event) => {
        event.preventDefault();
        setCategory(event.target.value);
        console.log(event.target.value);
    }
    // # 3. 
    const changeTitleHandler = (event) => {
        event.preventDefault();
        setTitle(event.target.value);
        console.log(event.target.value);
    }
    // # 3. 
    const changeContentHandler = (event) => {
        event.preventDefault();
        setContent(event.target.value);
        console.log(event.target.value);
    }

    // # 4. save 버튼을 클릭시 api에 글 작성 리퀘스트를 보내는 함수를 선언
    const createBoard = (event) => {
        event.preventDefault();
        const board = {
            category: pCategory,
            title: pTitle,
            content: pContent
            // ID: this.state.ID
        };
        console.log(event.target.value);
        console.log(`board => ${JSON.stringify(board)}`); // 보내짐 확인
        // if(this.state.index == '_create'){
            if(idx === '_create'){
                BoardService.createBoard(board).then(res => {
                    console.log(res);
              history('/app/board', {replace:true});
            });
        } else {
            // BoardService.updateBoard(this.state.index, board).then(res => {
                BoardService.updateBoard(idx, board).then(res => {
                    console.log(res);
                history('/app/board', {replace:true});
            })
        }   
    }

    // 글작성 취소 버튼이 클릭되었을때 글목록 페이지로 이동하는 함수선언
    const cancel = (event) => {
        event.preventDefault();
        history('/app/board', {replace: true});
    }

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                       {
                           getTitle()
                        }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label htmlFor="category-Type"> Type 
                                    <select placeholder="category" name="category" className="form-control" 
                                    value={pCategory} onChange={changeCategoryHandler}>
                                        <option value="0">공지사항</option>
                                        <option value="1">자유게시판</option>
                                        <option value="2">자료실</option>
                                        <option value="3">사고팝니다</option>
                                        </select>
                                    </label>
                                </div>
                                <div className = "form-group">
                                    <label htmlFor="title-name"> 제목 
                                        <input type="text" id="title-name" placeholder="title" name="title" className="form-control" 
                                            value={pTitle} onChange={changeTitleHandler} />
                                    </label>
                                </div>
                                <div className = "form-group">
                                    <label htmlFor="content"> 내용  
                                    <textarea placeholder="content" id="content" name="content" className="form-control" 
                                            value={pContent} onChange={changeContentHandler} />
                                        </label>
                                </div>
                        
                                <Button className="btn btn-success" type="button" onClick={createBoard}>Save</Button>
                                <Button className="btn btn-danger" type="button" onClick={cancel} style={{marginLeft:"10px"}}>Cancel</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default CreateBoardComponent;