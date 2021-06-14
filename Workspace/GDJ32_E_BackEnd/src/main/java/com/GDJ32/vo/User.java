package com.GDJ32.vo;

import java.math.BigDecimal;
/**
 * @author javateam
 *
 */
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import lombok.Data;
 
@Entity
@Table(name="gdj_member") // 참고) oracle에서는 "user" 이름으로 테이블명 생성 불가 !
@Data
//@NoArgsConstructor
//@AllArgsConstructor
public class User {
	
    @Id
    // @GeneratedValue(strategy = GenerationType.AUTO) // h2 db
    // private Long id; // h2 db
//    @GeneratedValue(strategy = GenerationType.AUTO) // oracle
    @Column(name = "member_index") 
    // @Column(name="user_id", nullable=false, columnDefinition = "number(19,0)")
//    private BigDecimal userId; // oracle
	private int memberIndex;
    
    @Column(name = "id") 
    private String id;
    
    @Column(name = "password")
    private String password;
  
    // @ManyToMany(cascade=CascadeType.ALL)
//    @ManyToMany(cascade=CascadeType.ALL, fetch = FetchType.EAGER)
//    @JoinTable(name = "gdj_member_detail",
//               joinColumns = @JoinColumn(name = "member_index"),
//               inverseJoinColumns = @JoinColumn(name = "manager"))
    //private Set<RoleDTO> roles;

}
