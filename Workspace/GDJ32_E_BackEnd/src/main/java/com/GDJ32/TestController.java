package com.GDJ32;

import java.io.Console;
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

import ch.qos.logback.classic.Logger;
import lombok.extern.java.Log;
import lombok.extern.slf4j.Slf4j;

/**
 * 리액트에서 받은 요청을 처리 및 반환하는 함수
*/
@Log
@Slf4j
@RestController
@RequestMapping("/api")
public class TestController 
{
	@PostMapping("/ip")
	public ResponseEntity<String> ip (HttpServletRequest request)
	{
		// 요청받은 클라이언트 응답 반환
		return ResponseEntity.ok(request.getRemoteAddr());
	}
	
	@Autowired
	TestService testService;
	
	@PostMapping("/test")
	public ModelAndView test() throws Exception
	{
		ModelAndView mav = new ModelAndView("test");
		
		List<TestVo> testList = testService.selectTest();
		mav.addObject("list", testList);
		
		return mav;
	}
}
