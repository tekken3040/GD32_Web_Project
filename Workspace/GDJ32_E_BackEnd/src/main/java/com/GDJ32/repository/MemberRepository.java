/**
 * 
 */
package com.GDJ32.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GDJ32.vo.UserInfo;

public interface MemberRepository extends JpaRepository<UserInfo, Integer>{
	
	public UserInfo findById(String id);
	
}