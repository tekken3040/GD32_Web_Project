package com.GDJ32.service;

import java.util.ArrayList;
import java.util.Collections;
//import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.GDJ32.vo.Board;
import lombok.extern.slf4j.Slf4j;

import com.GDJ32.exception.ResourceNotFoundException;
import com.GDJ32.repository.BoardRepository;
import com.GDJ32.util.BoardPagingUtil;

// 리액트와 boardservice와 서로 연결
@Service
@Slf4j
public class BoardService {
	
	@Autowired
	private BoardRepository boardRepository;
	
	public int findAllCount() {
		return (int) boardRepository.count();
	}
	
	// get paging boards data
	public ResponseEntity<Map<String, Object>> getPagingBoard(int p_num, int objCnt, int pageCnt) {

		log.info("getPagingBoard(int p_num)");
		Map<String, Object> result = null;

		BoardPagingUtil pu = new BoardPagingUtil(p_num, objCnt, pageCnt);
		log.info("pu : " + pu);
		log.info("pu {} ,{} , {} : ", pu.getObjectStartNum(), pu.getCurrentPageNum(), pu.getObjectCountPerPage());
		//		List<Board> list = boardRepository.findFromTo(pu.getObjectStartNum(), pu.getObjectCountPerPage());
		//		Pageable pageable = PageRequest.of(pu.getObjectStartNum(), pu.getObjectCountPerPage());
		
		Pageable pageable = PageRequest.of(pu.getCurrentPageNum() - 1, pu.getObjectCountPerPage(), Sort.by(Sort.Direction.DESC, "idx"));
		List<Board> list = new ArrayList<>();
		List<Board> tempList = boardRepository.findAll(pageable).getContent();
		for (int i = 0; i < tempList.size(); i++)
			list.add(tempList.get(i));

		log.info("게시글 총수 : " + findAllCount());
		pu.setObjectCountTotal(findAllCount());
		//		pu.setObjectCountTotal((int) boardRepository.count());
		pu.setCalcForPaging();

		log.info("p_num : " + p_num);
		log.info(pu.toString());

		for (int i = 0; i < list.size(); i++)
			System.out.println("================================" + list.get(i).getIdx());
		Collections.sort(list);
		for (int i = 0; i < list.size(); i++)
			System.out.println("================================" + list.get(i).getIdx());
		result = new HashMap<>();
		result.put("pagingData", pu);
		result.put("list", list);

		return ResponseEntity.ok(result);
	}
	
	// get boards data
	public List<Board> getAllBoard() {
		return (List<Board>)boardRepository.findAll();
	}
	
	// create board
	public Board createBoard(Board board) {
		return boardRepository.save(board);
	}
	
	// get board one by id
//	public ResponseEntity<Board> getBoard(Integer index){
//		Board board = boardRepository.findById(index).orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by index : ["+index+"]"));
//		HttpHeaders responseHeaders = new HttpHeaders();
//		responseHeaders.add("Content-Type", "application/json; charset=UTF-8");
//
//		return new ResponseEntity<Board>(board,responseHeaders,HttpStatus.OK);
//	}
	
	public ResponseEntity<Board> getBoard(Integer idx){
		Board board = boardRepository.findById(idx).orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by index : ["+idx+"]"));
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.add("Content-Type", "application/json; charset=UTF-8");

		return new ResponseEntity<Board>(board,responseHeaders,HttpStatus.OK);
	}
	
	// update board
//	public ResponseEntity<Board> updateBoard(Integer index, Board updatedBoard){
//		Board board = boardRepository.findById(index).orElseThrow(()->new ResourceNotFoundException("Not exist Board Data by index : ["+index+"]"));
//		
//		board.setCategory(updatedBoard.getCategory());
//		board.setTitle(updatedBoard.getTitle());
//		board.setContent(updatedBoard.getContent());
//		
//		System.out.println(board.getTitle());
//		
//		Board endUpdatedBoard = boardRepository.save(board);
//		System.out.println(endUpdatedBoard.toString());
//		return ResponseEntity.ok(endUpdatedBoard);
//	}
	
	public ResponseEntity<Board> updateBoard(Integer idx, Board updatedBoard){
		Board board = boardRepository.findById(idx).orElseThrow(()->new ResourceNotFoundException("Not exist Board Data by index : ["+idx+"]"));
		
		board.setCategory(updatedBoard.getCategory());
		board.setTitle(updatedBoard.getTitle());
		board.setContent(updatedBoard.getContent());
		
		System.out.println(board.getTitle());
		
		Board endUpdatedBoard = boardRepository.save(board);
		System.out.println(endUpdatedBoard.toString());
		return ResponseEntity.ok(endUpdatedBoard);
	}
	
	// delete board
//	public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer index) {
//		Board board = boardRepository.findById(index).orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by index : ["+index+"]"));
//		
//		boardRepository.delete(board);
//		Map<String, Boolean> response = new HashMap<>();
//		response.put("Deleted Board Data by id : ["+index+"]", Boolean.TRUE);
//		return ResponseEntity.ok(response);
//	}
	
	public ResponseEntity<Map<String, Boolean>> deleteBoard(Integer idx) {
		Board board = boardRepository.findById(idx).orElseThrow(() -> new ResourceNotFoundException("Not exist Board Data by index : ["+idx+"]"));
		
		boardRepository.delete(board);
		Map<String, Boolean> response = new HashMap<>();
		response.put("Deleted Board Data by id : ["+idx+"]", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
}