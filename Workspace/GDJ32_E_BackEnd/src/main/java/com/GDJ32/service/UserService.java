package com.GDJ32.service;

import java.util.HashSet;
import java.util.Set;

import com.GDJ32.repository.UserRepository;
import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.UserInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

// @RequiredArgsConstructor
@Service("userDetailsService")
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository repo) {
        this.userRepository = repo;
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        System.out.println("income id : " + id);
        // String id = "admin";
        UserInfo userInfo = userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException(id));
        // MemberDTO memberDTO = userRepository.findById(id);
        
        Set<GrantedAuthority> grantedAuthorities = new HashSet<>();
        grantedAuthorities.add(new SimpleGrantedAuthority("ROLE_ADMIN"));

        return new UserInfo(userInfo.getMember_index(), userInfo.getId(), userInfo.getPassword());
    }
    /**
     * Spring Sequrity 필수 메소드 구현
     * 
     * @param id
     * @return UserDetails
     * @throws UsernameNotFoundException 유저가 없을 때 예외 발생
     */
    // @Override   // 기본적인 반환 타입은 UserDetails. UserDetails를 상속받은 UserInfo로 반환 타입 지정 (자동으로 다운 캐스팅됨)
    // public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
    //     System.out.println(id);
    //     // 시큐리티에서 지정한 서비스이기 때문에 이 메소드를 필수로 구현
    //     return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException((id)));
    // }
}
