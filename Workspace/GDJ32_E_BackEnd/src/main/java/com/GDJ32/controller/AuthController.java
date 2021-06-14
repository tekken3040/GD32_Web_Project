package com.GDJ32.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.GDJ32.payload.JwtAuthenticationResponse;
import com.GDJ32.payload.LoginRequest;
import com.GDJ32.payload.SignUpRequest;
import com.GDJ32.repository.MemberRepository;
import com.GDJ32.repository.RoleRepository;
import com.GDJ32.repository.UserRepository;
import com.GDJ32.service.jwt.JwtTokenProvider;
import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.MemberVO;
import com.GDJ32.vo.TestVo;
import com.GDJ32.vo.UserInfo;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;

@Slf4j
@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class AuthController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder passwordEncoder;

	@Autowired
	JwtTokenProvider tokenProvider;
	
	@Autowired
	MemberRepository memberRepository;
	
	
	@PostMapping("/auth2")
	public ResponseEntity<?> authenticateUser2(@RequestBody LoginRequest loginReqeust) {
		
//		log.info("auth username : " + username);
//		log.info("auth password : " + password);
		log.info("Login :" + loginReqeust);
		
		return null;
	}
	
	
	@PostMapping("/auth")
	// public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
	public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
	// public ResponseEntity<?> authenticateUser(@RequestParam("username") String username, 
	// 										  @RequestParam("password") String password) {
		
//		log.info("auth username : " + username);
//		log.info("auth password : " + password);
		log.info("login : " + loginRequest);
		
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);
		
		log.info("authentication : " + authentication);
		
		String jwt = tokenProvider.generateToken(authentication);
		log.info("jwt :" + jwt);
		
		log.info("username : " + loginRequest.getUsername());
		UserInfo member = memberRepository.findById(loginRequest.getUsername());
		
		member.setToken(jwt);
		log.info(member.toString());
		return ResponseEntity.ok(member);
	}
	
	@RequestMapping(value="/logout", method = RequestMethod.POST)
    public String logout(ModelMap model,
    					 HttpServletRequest request,
    					 HttpServletResponse response) {
    	
    	log.info("logout");
    	
	    Authentication auth 
		    	= SecurityContextHolder.getContext()
		    						   .getAuthentication();
	    
	    log.info("auth : "+auth);
	    
	    // logout !
	    if (auth != null) {    
	        new SecurityContextLogoutHandler().logout(request, response, auth);
	    }

	    return "/auth/logout";
    } //

//	@PostMapping("/signup")
//	public ResponseEntity<?> registerUser(@Valid @RequestBody SignUpRequest signUpRequest) {
//		if (userRepository.existsByUsername(signUpRequest.getUsername())) {
//			return new ResponseEntity(new ApiResponse(false, "Username is already taken!"), HttpStatus.BAD_REQUEST);
//		}
//
//		if (userRepository.existsByEmail(signUpRequest.getEmail())) {
//			return new ResponseEntity(new ApiResponse(false, "Email Address already in use!"), HttpStatus.BAD_REQUEST);
//		}
//
//		// Creating user's account
//		User user = new User(signUpRequest.getName(), signUpRequest.getUsername(), signUpRequest.getEmail(),
//				signUpRequest.getPassword());
//
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//		Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
//				.orElseThrow(() -> new AppException("User Role not set."));
//
//		user.setRoles(Collections.singleton(userRole));
//
//		User result = userRepository.save(user);
//
//		URI location = ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/users/{username}")
//				.buildAndExpand(result.getUsername()).toUri();
//
//		return ResponseEntity.created(location).body(new ApiResponse(true, "User registered successfully"));
//	}
}