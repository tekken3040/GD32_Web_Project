package com.GDJ32.controller;

import com.GDJ32.vo.CustomUser;
import com.GDJ32.vo.MemberDTOForm;

import lombok.extern.slf4j.Slf4j;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
//@Controller
@RequestMapping("/")
@Slf4j
public class SignInController {
//    @Autowired
//    private SignInService signInService;

//    @GetMapping("/login")
//    public String createUserForm(Model model) {
//        model.addAttribute("userForm", new MemberDTOForm());
//        return "user/login/register";
//    }

//    @PostMapping("/login")
//    public String createUser(@Validated MemberDTOForm form, BindingResult result) {
//        if (result.hasErrors()) {
//            return "/register";
//        }
//
//        signInService.createMember(form);
//
//        return "redirect:/";
//    }
	
	@RequestMapping("/")
	@ResponseBody
	public String home() {
		log.info("home");
		
		Object principal = SecurityContextHolder.getContext()
				.getAuthentication()
				.getPrincipal();

		CustomUser user = null;
		
		if (principal instanceof CustomUser) {
			user = ((CustomUser)principal);
		}
		
		log.info("user : "+user);
		
		return user.toString();
	}
	
	@RequestMapping("/login")
	public String login() {
		
		log.info("login");
		
		return "redirect:/";
	}
    
 	// 로그인 실패시
    @RequestMapping(value="/loginError")
    public String loginError(Model model, String username ){
  	  
    	model.addAttribute("error", "패쓰워드가 잘못되었습니다.");
    	model.addAttribute("username", username);
  	
    	return "/auth/login";
    }
    
    // 권한없는 페이지를 들어갔을때 
    @RequestMapping("/403")
    public String access(){
      return "/err/access";
    }
    
    @RequestMapping(value="/logoutProc", method = RequestMethod.GET)
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
    
}