package com.GDJ32.controller;

//import org.springframework.http.HttpHeaders;
import java.util.Date;
import java.util.Map;
import java.util.List;

//import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.GDJ32.vo.Board;

import lombok.extern.slf4j.Slf4j;

import com.GDJ32.service.BoardService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
@Controller
@Slf4j
public class BoardController {
	
	@Autowired
	private BoardService boardService;

	//페이징 작업할 수 있도록  get all board 수정본
	@GetMapping(value="/board", produces = "application/json; charset=UTF-8") // @RequestMapping(Method=RequestMethod.GET)
	public ResponseEntity<Map<String, Object>> getAllBoards(
			@RequestParam(value = "p_num", defaultValue = "1") int p_num,
			@RequestParam(value = "objCnt", defaultValue = "10") int objCnt, 
			@RequestParam(value = "pageCnt", defaultValue = "10") int pageCnt){
		log.info("### getAllBoards");
		log.info("p_num :" + p_num);

		return boardService.getPagingBoard(p_num, objCnt, pageCnt);
	}
	
	// create board
	@PostMapping("/board")
	public Board createBoard(@RequestBody Board board) {
		
		log.info(board.toString());
		Date now = new Date();
		board.setId("admin");
		board.setCreatedDay(now);
		board.setViewCnt(0);
		
		return boardService.createBoard(board);
	}
	
	// get board
	@GetMapping("/board/{idx}")
	public ResponseEntity<Board> getBoardByIdx(@PathVariable Integer idx){
		log.info("index");
		
		return boardService.getBoard(idx);
	}
	
	// update board
	@PutMapping("/board/{idx}")
	public ResponseEntity<Board> updateBoardByIdx(
		@PathVariable("idx") Integer idx, @RequestBody Board board){
		
		log.info("#####################################");
		log.info("index : " + idx);
		log.info("board : " + board.toString());
		
		return boardService.updateBoard(idx, board);
	}
	
	// delete board
	@DeleteMapping("/board/{idx}")
	public ResponseEntity<Map<String, Boolean>> deleteBoardByIdx( @PathVariable Integer idx) {
		return boardService.deleteBoard(idx);
	}
}
	
	
	
