package com.GDJ32;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

import com.GDJ32.service.BoardService;
import com.GDJ32.vo.Board;

import lombok.extern.slf4j.Slf4j;

@SpringBootTest
@WebAppConfiguration
@Slf4j
public class ListTest {
	
	@Autowired
	BoardService bs;
	
	@Test
	public void test() {
//		log.info("#### " + bs.getPagingBoard(1).toString());
		 List<Board> list = (List<Board>)bs.getPagingBoard(104).getBody().get("list");
		 
		log.info("!!!!!!! " + list.size());
		
		for(Board b : list) {
			log.info("board " + b);
		}
		
	}
	

}
