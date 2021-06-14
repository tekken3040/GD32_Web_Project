package com.GDJ32.service.jwt;

import java.util.Base64;
import java.util.Date;
import java.util.List;

import javax.annotation.PostConstruct;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import com.GDJ32.controller.SignInController;
import com.GDJ32.service.CustomProvider;
import com.GDJ32.vo.CustomUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jdk.internal.org.jline.utils.Log;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class JwtTokenProvider {

	@Value("${jwt.secret}")
	private String secretKey;
	
	@Value("${jwt.token-validity-in-seconds}") // 1시간
	private int jwtTokenValidityInSeconds;

	private final UserDetailsService userDetailsService;

//	public JwtTokenProvider(@Qualifier("userUserDetailsService") UserDetailsService userDetailsService) {
//		this.userDetailsService = userDetailsService;
//	}

	@PostConstruct
	protected void init() {
		secretKey = Base64.getEncoder().encodeToString(secretKey.getBytes());
	}

	// Jwt Token 생성-1
	public String createToken(String userPk, List<String> roles) {
		
		Claims claims = Jwts.claims().setSubject(userPk);
		claims.put("roles", roles);
		Date now = new Date();
		
		return Jwts.builder()
				   .setClaims(claims) // 데이터
				   .setIssuedAt(now) // 토큰 발행 일자
				   .setExpiration(new Date(now.getTime() + jwtTokenValidityInSeconds)) // 만료 기간(expired time)
				   .signWith(SignatureAlgorithm.HS512, secretKey) // 암호화 알고리즘, secret 값
				   .compact(); // Token 생성
	}
	
	// Jwt Token 생성-2
	public String generateToken(Authentication authentication) {
		
		log.info("authentication.getPrincipal() : " + authentication.getPrincipal());
		
		// CustomUser customUser = (CustomUser) authentication.getPrincipal();
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		
		
		Date now = new Date(); 

		return Jwts.builder()
				   // .setSubject(Long.toString(userPrincipal.getId()))
				   .setSubject(userPrincipal.getUsername())
				   .setIssuedAt(new Date()) 
				   .setExpiration(new Date(now.getTime() + jwtTokenValidityInSeconds))
				   .signWith(SignatureAlgorithm.HS512, secretKey)
				   .compact();
	}
	
	// 인증 성공시 SecurityContextHolder에 저장할 Authentication 객체 생성
	public Authentication getAuthentication(String token) {
		UserDetails userDetails = userDetailsService.loadUserByUsername(this.getUserPk(token));
		log.info("userDetails : "+userDetails);
		return new UsernamePasswordAuthenticationToken(userDetails, "", userDetails.getAuthorities());
	}

	// Jwt Token에서 User PK 추출
	public String getUserPk(String token) {
	
		// brefore version(deprecated)
		// return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token).getBody().getSubject();
		
		return Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody().getSubject();
	}
	
	public String resolveToken(HttpServletRequest req) {
		return req.getHeader("X-AUTH-TOKEN");
	}

	// Jwt Token의 유효성 및 만료 기간 검사
	public boolean validateToken(String jwtToken) {
		
		try {
			// before version(deprecated)
			// Jws<Claims> claims = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
			Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(jwtToken);
			return !claims.getBody().getExpiration().before(new Date());
			
		} catch (Exception e) {
			return false;
		} //
		
	} //

}