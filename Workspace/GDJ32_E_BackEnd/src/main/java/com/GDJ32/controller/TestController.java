package com.GDJ32.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.GDJ32.service.TestService;
import com.GDJ32.vo.TestVo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("/api")	// /api로 도메인 매핑
public class TestController {

	@Autowired
	TestService testService;

	@PostMapping("/test")	// /test로 도메인 Post형식 매핑
	public String ip(HttpServletRequest request) throws JsonProcessingException {
		// 요청받은 클라이언트 응답 반환
		List<TestVo> testList = testService.selectTest();	// 받아온 db데이터를 담을 리스트
		
		System.out.println(testList);
		System.out.println(testList.get(0));
		ObjectMapper mapper = new ObjectMapper();	// JSON을 변환하기 위한 매퍼 객체
		
		String jsonStr = mapper.writeValueAsString(testList);	// 받아온 db데이터(JSON형식)을 스트링형식으로 변환
		System.out.println(jsonStr);
		return jsonStr;
	}
}
