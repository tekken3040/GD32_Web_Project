package com.GDJ32.repository;

import com.GDJ32.vo.MemberDTO;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SignInRepository extends JpaRepository<MemberDTO, Integer>{
    
}
