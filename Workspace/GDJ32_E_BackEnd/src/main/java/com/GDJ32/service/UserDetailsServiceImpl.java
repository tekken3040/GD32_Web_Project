package com.GDJ32.service;

import java.util.HashSet;
import java.util.Set;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.GDJ32.repository.UserRepository;
import com.GDJ32.vo.RoleDTO;
import com.GDJ32.vo.User;

import jdk.internal.org.jline.utils.Log;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
 
	@Autowired
    private UserRepository userRepository;
 
	@Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
        User user = userRepository.findById(username);
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        
        // for (RoleDTO role : user.getRoles()) {
        grantedAuthorities.add(new SimpleGrantedAuthority(username));
        // }
 
        return new org.springframework.security.core.userdetails.User(user.getId(), 
                                                                      user.getPassword(),
                                                                      grantedAuthorities);
    }
}