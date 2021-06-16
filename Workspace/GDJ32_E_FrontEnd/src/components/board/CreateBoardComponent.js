import {
    Button,
    Card,
    CardHeader,
    Divider,
    CardContent,
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Typography,
    TextField,
    Grid
} from '@material-ui/core';
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

            BoardService.getOneBoard(pIdx).then((res) => {
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
        if (idx === '_create') {
            BoardService.createBoard(board).then(res => {
                console.log(res);
                history('/app/board/1', { replace: true });
            });
        } else {
            // BoardService.updateBoard(this.state.index, board).then(res => {
            BoardService.updateBoard(idx, board).then(res => {
                console.log(res);
                history(`/app/board/1`, { replace: true });
            })
        }
    }

    // 글작성 취소 버튼이 클릭되었을때 글목록 페이지로 이동하는 함수선언
    const cancel = (event) => {
        event.preventDefault();
        history('/app/board/1', { replace: true });
    }

    const textFieldStyle = {
        marginTop: 8,
        width: '80%'
    }

    return (
        <Card>
            <CardHeader
                variant="h2"
                title={getTitle()}
            />
            <Divider />
            <CardContent>
                <form>
                    <Grid
                        marginTop="10px"
                        marginBottom="25px">
                        <Typography
                            variant="h4"
                            marginBottom="10px"
                        >
                            카테고리
                        </Typography>
                        <FormControl variant="outlined">
                            <InputLabel htmlFor="outlined-age-native-simple" id="category-Type" />
                            <Select
                                placeholder="category"
                                name="category"
                                className="form-control"
                                value={pCategory}
                                onChange={changeCategoryHandler}
                            >
                                <MenuItem value={0}>공지사항</MenuItem>
                                <MenuItem value={2}>자유게시판</MenuItem>
                                <MenuItem value={3}>자료실</MenuItem>
                                <MenuItem value={4}>사고팝니다</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid
                        marginTop="10px"
                        marginBottom="25px">
                        <Typography
                            variant="h4"
                            marginBottom="10px"
                        >
                            제목
                        </Typography>
                        <TextField
                            id="title-name"
                            placeholder="title"
                            name="title"
                            className="form-control"
                            type="text"
                            value={pTitle}
                            onChange={changeTitleHandler}
                            size="medium"
                            margin="normal"
                            marginBottom="50px"
                            style={textFieldStyle}
                        />
                    </Grid>
                    <Grid>
                        <Typography
                            variant="h4"
                            marginBottom="10px"
                        >
                            내용
                        </Typography>
                        <TextField
                            Value={pContent}
                            placeholder="content"
                            id="content"
                            name="content"
                            className="form-control"
                            size="medium"
                            maril
                            margin="normal"
                            onChange={changeContentHandler}
                            multiline="true"
                            rows="20"
                            rowsMax="20"
                            style={textFieldStyle}
                        />
                    </Grid>
                    <Grid
                        marginRight="350px"
                        marginTop="70px"
                        marginBottom="50px"
                        align="right"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={createBoard}
                        >
                            저장
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={cancel}
                            style={{ marginLeft: "10px" }
                            }>
                            취소
                        </Button>
                    </Grid>
                </form>
            </CardContent>
        </Card >
    );
}
export default CreateBoardComponent;