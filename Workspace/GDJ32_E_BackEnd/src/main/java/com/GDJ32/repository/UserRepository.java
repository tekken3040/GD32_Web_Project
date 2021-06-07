package com.GDJ32.repository;

import java.util.Optional;

import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.UserInfo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findById(String id);
    // MemberDTO findById(String id);
}
