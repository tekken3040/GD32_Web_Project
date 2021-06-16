package com.GDJ32.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import lombok.Data;
 
@Entity
@Table(name="gdj_member") // 참고) oracle에서는 "user" 이름으로 테이블명 생성 불가 !
@Data
public class UserInfo {
	
    @Id
    @GeneratedValue
    @Column(name = "member_index")
    private int memberIndex;
    
	@Column(name = "id")
	private String id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "zipcode")
    private String zipcode;
    
    @Column(name = "address")
    private String address;
    
    @Column(name = "address_detail")
	private String address_detail;
	
	@Column(name = "phone")
    private String phone;
    
    @Column(name = "email")
    private String email;
    
    @Column(name = "birthday")
    private String birthday;
    
    @Column(name = "enabled")
    private int enabled;

    @Transient
    private String token;
    
    public UserInfo(String id, String name, String zipcode, 
    				String address, String address_detail, 
    				String phone, String email, String birthday) {
    	this.id = id;
    	this.name = name;
    	this.zipcode = zipcode;
    	this.address = address;
    	this.address_detail = address_detail;
    	this.phone = phone;
    	this.email = email;
    	this.birthday = birthday;
    }
}
