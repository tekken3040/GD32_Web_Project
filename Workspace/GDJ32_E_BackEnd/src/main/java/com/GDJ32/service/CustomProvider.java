package com.GDJ32.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.GDJ32.vo.CustomUser;
import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.RoleDTO;

import lombok.extern.java.Log;

@Service
@Log
public class CustomProvider 
		implements AuthenticationProvider, UserDetailsService {
	
	// legacy project 에서 wiring 문제 발생 !
	 // @Autowired
	 private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	private JdbcTemplate jdbcTemplate;
	
    @Autowired
	public void setDataSource(DataSource dataSource) {
		this.jdbcTemplate = new JdbcTemplate(dataSource);
	}
	
    @SuppressWarnings("deprecation")
	@Override
	public CustomUser loadUserByUsername(String id) {
    	
    	log.info("loadUserByUsername");
    	CustomUser customUser = new CustomUser();
    	MemberDTO memberDTO = new MemberDTO();
    	
    	try {
    		memberDTO = (MemberDTO)jdbcTemplate.queryForObject(
	    			 "SELECT * FROM gdj_member WHERE id=?", 
				     new Object[]{ id },
				     new BeanPropertyRowMapper<MemberDTO>(MemberDTO.class));
    		
    		customUser.setUsername(memberDTO.getId());
    		customUser.setPassword(memberDTO.getPassword());
    		customUser.setEnabled(memberDTO.getEnabled()==1 ? true : false);
    		
	    } catch (EmptyResultDataAccessException e) {
	    	log.info("error1");
	    	return null;
	    }
    	
    	return customUser;
    }
	
	@SuppressWarnings("deprecation")
	private RoleDTO loadUserRole(String id) {
		
		log.info("loadUserRole");
		RoleDTO roleDTO = new RoleDTO();
    	int manager;
		
		try {
			manager = jdbcTemplate.queryForObject(
	   			 	"SELECT manager "
	   			 	+ "FROM gdj_member_detail "
	   			 	+ "WHERE member_index = ( "
	   			 	+ "SELECT member_index "
	   			 	+ "FROM gdj_member "
	   			 	+ "WHERE id=?) ", 
				     new Object[]{ id },
				     new BeanPropertyRowMapper<Integer>(Integer.class));
		
			roleDTO.setUsername(id);
			roleDTO.setRole(manager==1 ? "ROLE_ADMIN" : "ROLE_USER");
			
		} catch (EmptyResultDataAccessException e) {
			log.info("error2");
	    	return null;
	    }
		return roleDTO;
	}
	
	@Override
	public Authentication authenticate(Authentication authentication) 
				throws AuthenticationException {
		
		log.info("################++++++authenticate" + authentication.toString());
		
		String username = authentication.getName();
        String password = (String) authentication.getCredentials();
		log.info("#################################  username : " + username);
		log.info("#################################  password : " + password);

        CustomUser user = null;
        Collection<? extends GrantedAuthority> authorities = null;
        
        try {
	        	user = this.loadUserByUsername(username);
	            RoleDTO role = this.loadUserRole(username);
	            
	            List<RoleDTO> roles = new ArrayList<RoleDTO>();
	            roles.add(role);		
	            user.setAuthorities(roles);
	            
//	            BCryptPasswordEncoder passwordEncoder 
//					= new BCryptPasswordEncoder();
	            
	            if (passwordEncoder.matches(password, user.getPassword())) 
	            	log.info("비밀번호 일치 !");	
	            else 
	            	throw new BadCredentialsException("비밀번호가 일치하지 않습니다.");
	            
	            authorities = user.getAuthorities();
            
        } catch(UsernameNotFoundException e) {
            log.info(e.toString());
            throw new UsernameNotFoundException(e.getMessage());
        } catch(BadCredentialsException e) {
            log.info(e.toString());
            throw new BadCredentialsException(e.getMessage());
        } catch(Exception e) {
            log.info(e.toString());
            e.printStackTrace();
        }

        return new UsernamePasswordAuthenticationToken(user, password, authorities);
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return true;
	}

} //