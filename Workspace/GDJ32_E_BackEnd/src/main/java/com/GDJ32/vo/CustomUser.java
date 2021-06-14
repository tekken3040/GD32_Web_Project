package com.GDJ32.vo;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;


@Data
public class CustomUser implements UserDetails {

	private static final long serialVersionUID = 1L;
	
	private String username;
    private String password;
 
    /* Spring Security related fields */
    private List<RoleDTO> authorities;
    private boolean accountNonExpired = true;
    private boolean accountNonLocked = true;
    private boolean credentialsNonExpired = true;
    private boolean enabled = true;
	
//    public CustomUser(Users users) {
//		this.username = users.getUsername();
//		this.password = users.getPassword();
//		this.enabled = users.getEnabled()==1 ?  true : false;
//	}
    
  
}
