package com.GDJ32.vo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;

// DB 테이블 정보를 저장해서 테스트 하기 위한 클래스
@Entity
@Table(name = "gdj_member_detail")
@Data
public class TestVo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_index")
	private Integer member_index;

	@Column(name = "id")
	private String id;

	public Integer getMember_index() {
		return member_index;
	}
	public void setMember_index(Integer member_index) {
		this.member_index = member_index;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
}
