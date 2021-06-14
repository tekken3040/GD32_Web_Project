/**
 * 
 */
package com.GDJ32.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.GDJ32.vo.User;

public interface UserRepository extends JpaRepository<User, Integer>{
	
	public User findById(String id);
	
}