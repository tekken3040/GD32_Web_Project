//package com.GDJ32.vo;
//
//import org.hibernate.annotations.NaturalId;
//import javax.persistence.*;
//
//@Entity
//@Table(name = "roles")
//public class RoleJwt {
//	@Id
//	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	private Long id;
//
//	@Enumerated(EnumType.STRING)
//	@NaturalId
//	@Column(length = 60)
//	private String name; // ROLE_USER ROLE_ADMIN
//
//	public RoleJwt() {
//
//	}
//
//	public RoleJwt(String name) {
//		this.name = name;
//	}
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public RoleName getName() {
//		return name;
//	}
//
//	public void setName(RoleName name) {
//		this.name = name;
//	}
//}