package com.GDJ32.service.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.GDJ32.payload.CustomUserDetailsService;
import com.GDJ32.service.CustomProvider;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	
	@Autowired 
	private JwtTokenProvider tokenProvider; 
	
	@Autowired 
	//private CustomUserDetailsService customUserDetailsService;
	private CustomProvider customProvider;

	@Override
	protected void doFilterInternal(HttpServletRequest request, 
									HttpServletResponse response, 
									FilterChain filterChain)
			throws ServletException, IOException {
			
			log.info("dofilter : " + request.getParameter("username"));
			log.info("dofilter : " + request.getParameter("password"));
		try { 
			
			String jwt = getJwtFromRequest(request);
			
			if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) { 
				
				// Long userId = tokenProvider.getUserIdFromJWT(jwt); 
				// Long userId = tokenProvider.getUserIdFromJWT(jwt);
				String username = tokenProvider.getUserPk(jwt); 
				// UserDetails userDetails = customProvider.loadUserByUsername(userId); 
				UserDetails userDetails = customProvider.loadUserByUsername(username);
				
				UsernamePasswordAuthenticationToken authentication 
					= new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities()); 
				
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				
				SecurityContextHolder.getContext().setAuthentication(authentication); 
			}
			
		} catch (Exception ex) { 
			log.error("Could not set user authentication in security context", ex); 
	
		}
		
		filterChain.doFilter(request, response); 
	} //

	
	private String getJwtFromRequest(HttpServletRequest request) { 
		String bearerToken = request.getHeader("Authorization"); 
		
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) { 
			return bearerToken.substring(7, bearerToken.length()); 
		} 
		return null; 
	} //

} //