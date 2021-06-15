import {
    Box,
    Button,
    Card,
    // Container,
    Grid,
    // Link,
    TextField,
    Divider,
    CardContent,
    CardHeader,
    Typography
} from '@material-ui/core';
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

        } else if (categoryNo === 1) {
            category = "자유게시판";

        } else if (categoryNo === 2) {
            category = "자료실";

        } else {
            category = "사고팝니다";
        }

        return (
            <Typography
                variant="h4"
                gutterBottom>
                카테고리 : {category}
            </Typography>
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
        history('/app/board/1', { replace: true });
    }

    const goToUpdate = (event) => {
        event.preventDefault();
        // this.props.history.push(`/create-board/${this.state.index}`);
        history(`/app/create-board/${pIdx}`, {
            replace: true,
            state: {
                idx: pIdx,
                board: pBoard
            }
        });
    }

    const deleteView = async function () {
        if (window.confirm("정말로 글을 삭제하시겠습니까?")) {
            // BoardService.deleteBoard(this.state.index).then( res => {
            BoardService.deleteBoard(pIdx).then(res => {
                console.log("delete result => ", JSON.stringify(res));
                if (res.status === 200) {
                    history('/app/board/1');
                } else {
                    alert("글 삭제가 실패했습니다.");
                }
            })
        }
    }

    const textFieldStyle = {
        marginTop: 8,
        width: '80%',
        height: "550px  "
    }



    return (
        <Box>
            <Card>
                <CardHeader
                    variant="h2"
                    subheader="게시글 보기"
                    title="게시글"
                />
                <Divider />
                <CardContent>
                    <Grid >
                        <Typography
                            variant="h3"
                            marginBottom="25px"
                        >
                            제목 : {pBoard.title}
                        </Typography>
                    </Grid>
                    <Grid
                        marginBottom="50px">
                        <Typography
                            marginBottom="25px"
                            marginRight="350px"
                            align="right">
                            {returnBoardType(pBoard.category)}
                        </Typography>
                        <TextField
                            defaultValue={pBoard.content}
                            label="내용"
                            InputProps={{
                                readOnly: true,
                            }}
                            size="medium"
                            margin="normal"
                            multiline="true"
                            rows="20"
                            rowsMax="20"
                            style={textFieldStyle}
                        />
                    </Grid>
                    <Grid
                        marginRight="300px"
                        marginBottom="50px">
                        <Typography
                            align="right">
                            {returnDate(pBoard.createdTime, pBoard.updatedTime)}
                        </Typography>

                    </Grid>
                    <Grid
                        marginRight="300px"
                        align="right">
                        <Button
                            onClick={goToList}
                            style={{ marginLeft: "10px" }}
                            variant="contained"
                            color="primary"
                        >
                            글 목록으로 이동
                        </Button>
                        <Button
                            onClick={goToUpdate}
                            style={{ marginLeft: "10px" }}
                            variant="contained"
                            color="primary"
                        >
                            글 수정
                        </Button>
                        <Button
                            onClick={() => deleteView()}
                            style={{ marginLeft: "10px" }}
                            variant="contained"
                            color="primary"
                        >
                            글 삭제
                        </Button>
                    </Grid>
                </CardContent>
            </Card >
        </Box>
    );
}

export default ReadBoardComponent;