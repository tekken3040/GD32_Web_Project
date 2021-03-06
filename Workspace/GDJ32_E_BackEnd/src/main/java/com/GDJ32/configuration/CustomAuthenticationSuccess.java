/**
 * 
 */
package com.GDJ32.configuration;

/**
 * @author javateam
 *
 */

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
 
import org.springframework.security.core.Authentication;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class CustomAuthenticationSuccess implements AuthenticationSuccessHandler{
  private RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();
  
  @Override
  public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
      Authentication authentication) throws IOException, ServletException {
	  
	  log.info("로그인 성공");
    
	  redirectStrategy.sendRedirect(request, response, "/login");
  }
} 