package com.GDJ32.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.GDJ32.vo.RoleVO;
import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<RoleVO, Integer> {
    
	Optional<RoleVO> findByUserRole(String roleName);
    
    public RoleVO findById(String id);
}