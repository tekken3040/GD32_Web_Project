package com.GDJ32.mapper;

import java.util.List;

import com.GDJ32.vo.TestVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface TestMapper {	// 매퍼 인터페이스
	List<TestVo> selectTest();
}
