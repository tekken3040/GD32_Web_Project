package com.GDJ32.mapper;

import java.util.List;

import com.GDJ32.vo.TestVo;
import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface TestMapper {
	List<TestVo> selectTest();
}
