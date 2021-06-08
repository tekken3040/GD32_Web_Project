/**
 * 
 */
package com.GDJ32.vo;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
 
@Entity
@Table(name="gdj_member_detail")
@Data // 참고 : https://projectlombok.org/features/all (lombok API)
public class RoleVO {
	
	 @Id
    // @GeneratedValue(strategy = GenerationType.AUTO) // h2 db
    // private Long id; // h2 db
    @GeneratedValue(strategy = GenerationType.AUTO) // oracle
	// @Column(name="user_id", nullable=false, columnDefinition = "number(19,0)")
    @Column(name = "member_index", precision=19, scale=0) // oracle
    private BigDecimal userId; // oracle
	
//	@Column(name = "user_name")
//	private String userName;
    
}
