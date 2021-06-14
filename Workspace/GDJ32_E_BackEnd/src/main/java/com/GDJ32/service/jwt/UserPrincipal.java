package com.GDJ32.service.jwt;

import com.GDJ32.repository.RoleRepository;
import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.RoleVO;
import com.GDJ32.vo.User;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jdk.internal.org.jline.utils.Log;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import javax.persistence.Column;

@Slf4j
public class UserPrincipal implements UserDetails {
	
	
	private Integer index;
	
	private String id;
	
	@JsonIgnore
	private String password;
	
	private String name;
	
	@JsonIgnore
    private String zipcode;
    
	@JsonIgnore
    private String address;
    
	@JsonIgnore
	private String address_detail;
	
	@JsonIgnore
    private String phone;
	
	@JsonIgnore	
    private String email;
    
	@JsonIgnore
    private String birthday;
    
	@JsonIgnore
    private int enabled;


	private Collection<? extends GrantedAuthority> authorities;

	public UserPrincipal(String id, String password,
			 Collection<? extends GrantedAuthority> authorities) {

		this.id = id;
		this.password = password;
		this.authorities = authorities;
	}
	
	public UserPrincipal(Integer index, String id, 
						 String password, String name,
						 String zipcode, String address,
						 String address_detail, String phone,
						 String email, String birthday, int enabled,
			Collection<? extends GrantedAuthority> authorities) {
		
		this.index = index;
		this.id = id;
		this.password = password;
		this.name = name;
		this.zipcode = zipcode;
		this.address = address;
		this.address_detail = address_detail;
		this.phone = phone;
		this.email = email;
		this.birthday = birthday;
		this.enabled = enabled;
		this.authorities = authorities;
	}

	public static UserPrincipal create(User user, RoleVO role) {
		
//		List<GrantedAuthority> authorities = user.getRoles().stream()
//				.map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList());
//
//		return new UserPrincipal(user.getIndex(), user.getId(), user.getPassword(), 
//								 user.getName(), user.getZipcode(), user.getAddress(),
//								 user.getAddress_detail(), user.getPhone(), user.getEmail(),
//								 user.getBirthday(), user.getEnabled(),	authorities);
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		try {
			authorities.add(new SimpleGrantedAuthority(role.getUserRole()));
		} catch (Exception e) {
			return null;
		}
		
		
		return new UserPrincipal(user.getId(), user.getPassword(), authorities);
		
	}
	
	public Integer getindex() {
		return index;
	}
	
	@Override
	public String getUsername() {
		return id;
	}
	
	@Override
	public String getPassword() {
        return password;
    }

	public String getName() {
		return name;
	}

	public String getZipcode() {
        return zipcode;
    }

	public String getAddress() {
        return address;
    }
	
	public String getAddress_detail() {
        return address_detail;
    }

	public String getPhone() {
        return phone;
    }
	
	public String getEmail() {
        return email;
    }
	
	public String getBirthday() {
        return birthday;
    }
	
	public int getEnabled() {
        return enabled;
    }

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		UserPrincipal that = (UserPrincipal) o;
		return Objects.equals(id, that.id);
	}

	@Override
	public int hashCode() {

		return Objects.hash(id);
	}
}