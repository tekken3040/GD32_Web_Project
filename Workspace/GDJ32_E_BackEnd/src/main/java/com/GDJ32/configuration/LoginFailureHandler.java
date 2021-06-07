package com.GDJ32.configuration;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;

public class LoginFailureHandler implements AuthenticationFailureHandler {
    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
            AuthenticationException exception) throws IOException, ServletException {
        System.out.println("ID : " + request.getParameter("id"));
        System.out.println("PASSWORD : " + request.getParameter("password"));
        
        //로그인 실패시 필요한 작업 추가
       
        response.sendRedirect("/secure/login.do?error=500");
    }
}
