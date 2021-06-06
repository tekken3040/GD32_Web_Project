package com.GDJ32.vo;

import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Getter
@Table(name = "gdj_member")
public class UserInfo implements UserDetails {
    @Id
    // @Column(name = "member_index")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int member_index;

    @Column(name = "id")
    private String id;

    @Column(name = "password")
    private String password;

    @Column(name = "enabled")
    private String auth;

    @Builder
    public UserInfo(int member_index, String id, String password)
    {
        System.out.println("index : " + member_index);
        System.out.println("id : " + id);
        System.out.println("pass : " + password);
        this.member_index = member_index;
        this.id = id;
        this.password = password;
    }

    // 사용자의 권한을 콜렉션 형태로 반환
    // 단, 클래스 자료형은 GrantedAuthority를 구현해야함
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // TODO Auto-generated method stub
        Set<GrantedAuthority> roles = new HashSet<>();
        // for(String role : auth.split)
        return roles;
    }

    // 사용자의 password를 반환
    @Override
    public String getPassword() {
        // TODO Auto-generated method stub
        return password;
    }

    // 사용자의 id를 반환
    @Override
    public String getUsername() {
        // TODO Auto-generated method stub
        return id;
    }

    // 계정 만료 여부 반환
    @Override
    public boolean isAccountNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    // 계정 잠금 여부 반환
    @Override
    public boolean isAccountNonLocked() {
        // TODO Auto-generated method stub
        return true;
    }

    // password의 만료 여부 반환
    @Override
    public boolean isCredentialsNonExpired() {
        // TODO Auto-generated method stub
        return true;
    }

    // 계정 사용 가능 여부 반환
    @Override
    public boolean isEnabled() {
        // TODO Auto-generated method stub
        // return이 true 일경우 사용 가능
        return true;
    }
    
}
