package com.GDJ32.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.GDJ32.vo.Board;
import com.GDJ32.service.BoardService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class BoardController {
	
	@Autowired
	private BoardService boardService;

	// get all board 
	@GetMapping("/board")
	public List<Board> getAllBoards() {
		System.out.println(boardService.getAllBoard().get(0));
		return boardService.getAllBoard();
	}
}