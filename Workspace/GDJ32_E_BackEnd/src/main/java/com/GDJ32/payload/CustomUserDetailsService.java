package com.GDJ32.payload;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.GDJ32.repository.RoleRepository;
import com.GDJ32.repository.UserRepository;
import com.GDJ32.service.jwt.UserPrincipal;
import com.GDJ32.vo.CustomUser;
import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.RoleDTO;
import com.GDJ32.vo.RoleVO;
import com.GDJ32.vo.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired
	RoleRepository roleRepository;

	@Override
	@Transactional
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		 Let people login with either username or email
//		MemberDTO user = userRepository.findById(username).orElseThrow(
//				() -> new UsernameNotFoundException("User not found with username : " + username));
		
		log.info("loadUserByUsername : " + username);
		
		User user = null; 
		RoleVO role = null;
		
		try {
			user = userRepository.findById(username);
			role = roleRepository.findById(username);
			log.info("##### user : " + user);
			log.info("##### role : " + role);
		} catch (UsernameNotFoundException e) {
			log.error("User not found with username : " + username);
		}
		
		return UserPrincipal.create(user, role);
	}

	// This method is used by JWTAuthenticationFilter
//	@Transactional
//	public UserDetails loadUserById(String username) {
//		MemberDTO user = userRepository.findById(username)
//				.orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
//
//		return UserPrincipal.create(user);
//	}
	
	// This method is used by JWTAuthenticationFilter
//		@Transactional
//		public UserDetails loadUserById(String username) {
//			MemberDTO user = userRepository.findById(username)
//					.orElseThrow(() -> new UsernameNotFoundException("User not found with id : " + id));
	//
//			return UserPrincipal.create(user);
//		}
	
}