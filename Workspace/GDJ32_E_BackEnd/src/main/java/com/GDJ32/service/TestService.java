package com.GDJ32.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.GDJ32.mapper.TestMapper;
import com.GDJ32.vo.TestVo;

@Service
public class TestService {
	
	@Autowired
	public TestMapper mapper;
	
	public List<TestVo> selectTest()	//	받아온 db데이터를 리스트로 반환
	{
		return mapper.selectTest();
	}
}
