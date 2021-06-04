package com.GDJ32;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.GDJ32.configuration.CustomAuthenticationFailure;
import com.GDJ32.configuration.CustomAuthenticationSuccess;
import com.GDJ32.service.CustomProvider;
import com.GDJ32.service.UserDetailsService;

/**
 * 스프링 시큐리티 컨피그 파일
 */

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	CustomProvider customProvider;

	// since spring boot 2.0 over
	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private DataSource dataSource; // 추가

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	// since sapring boot 2.0 over
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		// auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
		auth.authenticationProvider(customProvider);
		// 주의사항) 아래의 코드 부류들을 삽입/대체시 지속적 Stackoverflow error !!!
		// auth.parentAuthenticationManager(authenticationManagerBean());
		// auth.userDetailsService(userDetailsService()).passwordEncoder(bCryptPasswordEncoder());
		// auth.userDetailsService(userDetailsService()).passwordEncoder(bCryptPasswordEncoder());
		// // 추가??
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {

//		http.cors().and();
//        http.httpBasic().disable();
//        http.csrf().disable();
		http.cors().and();
		
		http.authorizeRequests()
			.antMatchers("/**").permitAll()
//			.antMatchers("/webjars/**").permitAll()
//			.antMatchers("/join").permitAll()
//			.antMatchers("/joinAction").permitAll()
//		    .antMatchers("/resources/**","/loginError").permitAll()
//		    .anyRequest().authenticated()
//			// admin 폴더에 경우 admin 권한이 있는 사용자에게만 허용
//			.antMatchers("/admin/**").hasAuthority("ROLE_ADMIN")
//			// user 폴더에 경우 user 권한이 있는 사용자에게만 허용
//			.antMatchers("/secured/**").hasAuthority("ROLE_USER")
			.anyRequest().authenticated();

		http.formLogin()
				.loginPage("/auth/login")
				.successHandler(new CustomAuthenticationSuccess()) // 로그인 성공 핸들러
				.failureHandler(new CustomAuthenticationFailure()) // 로그인 실패 핸들러
				.permitAll()
			.and().logout().permitAll()
			.and().exceptionHandling().accessDeniedPage("/403"); // 권한이 없을경우

	}

	@Override
	public void configure(WebSecurity web) throws Exception {
		web.ignoring()
				// Spring Security should completely ignore URLs starting with /resources/
				.antMatchers("/resources/**");
	}

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		// auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
		auth.authenticationProvider(customProvider);
	}
}
