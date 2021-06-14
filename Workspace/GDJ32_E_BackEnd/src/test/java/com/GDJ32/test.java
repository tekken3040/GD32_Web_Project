package com.GDJ32;

import javax.sql.DataSource;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.GDJ32.service.CustomProvider;
import com.GDJ32.vo.CustomUser;
import com.GDJ32.vo.MemberDTO;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@SpringBootTest
public class test {

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;
	
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
	@Test
	public void test() {
		
		CustomUser customUser = new CustomUser();
    	MemberDTO memberDTO = new MemberDTO();
		try {
    		memberDTO = (MemberDTO)jdbcTemplate.queryForObject(
	    			 "SELECT * FROM gdj_member WHERE id=?", 
				     new Object[]{ "admin" },
				     new BeanPropertyRowMapper<MemberDTO>(MemberDTO.class));
    		
    		log.info(memberDTO.toString());
    		
    		customUser.setUsername(memberDTO.getId());
    		customUser.setPassword(memberDTO.getPassword());
    		customUser.setEnabled(memberDTO.getEnabled()==1 ? true : false);
    		
	    } catch (EmptyResultDataAccessException e) {
	    	log.info("error1");
	    }
	} //

} //
