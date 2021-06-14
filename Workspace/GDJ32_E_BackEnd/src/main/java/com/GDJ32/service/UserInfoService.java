package com.GDJ32.service;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface UserInfoService {

	UserDetails loadUserByUsername(String id) throws UsernameNotFoundException;

}
