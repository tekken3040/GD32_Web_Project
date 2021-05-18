package com.GDJ32.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.GDJ32.service.TestService;
import com.GDJ32.vo.TestVo;

//@RestController
//@RequestMapping("/api")
public class TestController {
	
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
