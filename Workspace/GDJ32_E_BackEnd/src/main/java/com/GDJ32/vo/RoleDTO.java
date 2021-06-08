package com.GDJ32.vo;

import org.springframework.security.core.GrantedAuthority;

import lombok.Data;

@Data
public class RoleDTO implements GrantedAuthority {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String username;
	private String role;

	@Override
	public String getAuthority() {
		return this.role;
	}

}
