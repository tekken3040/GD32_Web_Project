package com.GDJ32.vo;

import lombok.Data;

// DB 테이블 정보를 저장해서 테스트 하기 위한 클래스
@Data
public class MemberVO {
	private Integer index;
    private String id;
	private String password;
	private String name;
    private String zipcode;
    private String address;
	private String address_detail;
    private String phone;
    private String email;
    private String birthday;
    private int enabled;
	
}
