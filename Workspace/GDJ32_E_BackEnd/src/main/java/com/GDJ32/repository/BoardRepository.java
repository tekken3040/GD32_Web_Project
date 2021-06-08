package com.GDJ32.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.GDJ32.vo.Board;

//public interface BoardRepository extends JpaRepository<Board, Integer> {
public interface BoardRepository extends PagingAndSortingRepository<Board, Integer> {

////	List<Board> findFromTo(Integer objectStartNum, Integer objectCountPerPage);
//	List<Board> findAllByTo(Integer objectStartNum, Integer objectCountPerPage);
//	List<Board> findAllByIndexAndTitle()
	
	Iterable<Board> findAll();
	
	
	Page<Board> findAll(Pageable pageable);

}