package com.GDJ32.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.GDJ32.vo.Board;

public interface BoardRepository extends JpaRepository<Board, Integer> {

}