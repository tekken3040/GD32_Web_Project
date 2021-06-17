package com.GDJ32;

//import org.mockito.InjectMocks;
//import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.mock.web.MockHttpServletResponse;
//import org.springframework.mock.web.MockHttpSession;
//import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;  
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;  
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.view;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.redirectedUrl;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.forwardedUrl;

//spring security
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.*;
// import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.security.test.web.servlet.response.SecurityMockMvcResultMatchers.authenticated;
// import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestBuilders.formLogin;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@WebAppConfiguration
public class MemberViewTest {
	
	@Autowired  
    private WebApplicationContext wac;  
	
	@Autowired
    private FilterChainProxy springSecurityFilterChain;
	
    private MockMvc mockMvc;
    
    private String memberId;
    private String memberPw;
   
    
    @BeforeEach
    public void setUp() {
    	
    	log.info("before setup");  
    	
        memberId = "admin";
        memberPw = "11111111"; 

    	mockMvc = MockMvcBuilders.webAppContextSetup(wac)
    							 .addFilters(springSecurityFilterChain)
        						 // .apply(springSecurity(springSecurityFilterChain)) // 위와 동일한 표현 OK !
        						 .build();  
        
    }
    
    // @Test  
    // @WithMockUser(username = "javajava", password = "@Abcd1234", roles = "USER") // ???
    public void mockTest() throws Exception {  

        log.info("############### MemberController Test ###############");  
        
        // 로그인
        mockMvc.perform(get("/login").with(httpBasic(memberId, memberPw)))      
               .andDo(print())
        	   .andExpect(status().isOk());

        
//        // 개별 회원정보 조회
//        mockMvc.perform(get("/member/member_view.do")
//        				.with(httpBasic(memberId, memberPw)) // 없으면 302 에러 유발 !
//        				.param("memberId", memberId))
//        	   .andDo(print())        	   
//        	   .andExpect(status().isOk())
//        	   .andExpect(view().name("/member/member_view"))
//        	   .andExpect(forwardedUrl("/WEB-INF/views//member/member_view.jsp"))
//        	   .andExpect(authenticated().withUsername(memberId));
        
    } //

}
