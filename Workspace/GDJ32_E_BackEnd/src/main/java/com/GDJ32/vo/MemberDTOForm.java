package com.GDJ32.vo;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class MemberDTOForm {
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

    @Builder
    public MemberDTOForm(Integer index, String id, String password, String name, String zipcode, String address, String address_detail,
            String phone, String email, String birthday) {
        this.index = index;
        this.id = id;
        this.password = password;
        this.name = name;
        this.zipcode = zipcode;
        this.address = address;
        this.address_detail = address_detail;
        this.phone = phone;
        this.email = email;
        this.birthday = birthday;
    }

    public MemberDTO toEntity() {
        return MemberDTO.builder()
        .index(index)
        .id(id)
        .password(new BCryptPasswordEncoder().encode(password))
        .name(name)
        .zipcode(zipcode)
        .address(address)
        .address_detail(address_detail)
        .phone(phone)
        .email(email)
        .birthday(birthday)
        .build();
    }
}
