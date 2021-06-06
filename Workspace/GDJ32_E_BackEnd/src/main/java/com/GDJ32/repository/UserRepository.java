package com.GDJ32.repository;

import java.util.Optional;

import com.GDJ32.vo.UserInfo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<UserInfo, Long> {
    Optional<UserInfo> findById(String id);
}
