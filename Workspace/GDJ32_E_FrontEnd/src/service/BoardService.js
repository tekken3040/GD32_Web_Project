import axios from 'axios'; // axios를 사용하는 것을 의미

const BOARD_API_BASE_URL = "http://localhost:8080/api/board"; // spring boot api url를 정의

class BoardService {

    getBoards = (pNum, objCnt, pageCnt) => {
        console.log("getBoards");
        return axios.get(`${BOARD_API_BASE_URL}?p_num=${pNum}&objCnt=${objCnt}&pageCnt=${pageCnt}`); // 표시할 페이지 번호를 파라미터로 설정하여 통신하도록 함
    }

    createBoard = (board) => {
        console.log("createBoards");
        return axios.post(BOARD_API_BASE_URL,board);
    }
    
    // getOneBoard(index){
    //     console.log("readBoards: "+index);
    //     return axios.get(BOARD_API_BASE_URL + "/" + index);
    // }

    getOneBoard = (idx) => {
        console.log(`readBoards: ${idx}`);
        return axios.get(`${BOARD_API_BASE_URL}/${idx}`);
    }

    // updateBoard(index, board){
    //     return axios.put(BOARD_API_BASE_URL + "/" + index,board);
    // }

    updateBoard = (idx, board) => {
        console.log(idx);
        return axios.put(`${BOARD_API_BASE_URL}/${idx}`, board);
    }

    // deleteBoard(index) {
    //     return axios.delete(BOARD_API_BASE_URL + "/" + index);
    // }

    deleteBoard = (idx) => {
        console.log(idx);
        return axios.delete(`${BOARD_API_BASE_URL}/${idx}`);
    }

}


export default new BoardService();