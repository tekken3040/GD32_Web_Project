package com.GDJ32.vo;

import java.util.Comparator;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.springframework.security.core.Transient;

@Entity
//@Table(name = "board")
@Table(name = "gdj_board")
@DynamicInsert
@DynamicUpdate
public class Board implements Comparable<Board>{

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer idx;
	
	@Column(name = "title")
	private String title;
	
	@Column(name = "content")
	private String content;
	
	@Column(name = "category")
	private Integer category;
	
	@Column(name = "id")
	private String id;
	
	@Column(name = "created_day")
	private Date created_day;
	
	@Column(name = "view_cnt")
	private Integer viewCnt;
	
	@Column(name = "reply_cnt")
	private Integer replyCnt;
	
	@Column(name = "likes")
	private Integer likes;
	
	@Column(name = "account_type")
	private Integer accountType;

	@Column(name = "deleted")
	private Integer deleted;

	public Integer getIdx() {
		return idx;
	}

	public void setIndex(Integer idx) {
		this.idx = idx;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getCategory() {
		return category;
	}

	public void setCategory(Integer category) {
		this.category = category;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Date getCreatetDay() {
		return created_day;
	}

	public void setCreatedDay(Date createdDay) {
		this.created_day = createdDay;
	}

	public Integer getViewCnt() {
		return viewCnt;
	}

	public void setViewCnt(Integer viewCnt) {
		this.viewCnt = viewCnt;
	}

	public Integer getReplyCnt() {
		return replyCnt;
	}

	public void setReplyCnt(Integer replyCnt) {
		this.replyCnt = replyCnt;
	}

	public Integer getLikes() {
		return likes;
	}

	public void setLikes(Integer likes) {
		this.likes = likes;
	}

	public Integer getAccountType() {
		return accountType;
	}

	public void setAccountType(Integer accountType) {
		this.accountType = accountType;
	}

	public Integer getDeleted() {
		return deleted;
	}

	public void setDeleted(Integer deleted) {
		this.deleted = deleted;
	}
	@Override
	public String toString() {
		return "Board [index=" + idx + ", title=" + title + ", content=" + content + ", category=" + category
				+ ", id=" + id + ", createdDay=" + created_day + ", viewCnt=" + viewCnt + ", replyCnt=" + replyCnt
				+ ", likes=" + likes + "]";
	}

	@Override
	public int compareTo(Board o) {

		return o.getIdx().compareTo(this.getIdx());
	}
}