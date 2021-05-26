package com.GDJ32.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GDJ32.vo.Board;
import com.GDJ32.repository.BoardRepository;

@Service
public class BoardService {
	@Autowired
	private BoardRepository boardRepository;
	
	// get boards data
	public List<Board> getAllBoard() {
		return boardRepository.findAll();
	}
}