package com.GDJ32.mapper;

import java.util.List;

import com.GDJ32.vo.MemberDTO;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    List<MemberDTO> userList();

    MemberDTO fetchUserByID(String id);

    void updateUser(MemberDTO user);

    void insertUser(MemberDTO user);

    void insertUserDetail(MemberDTO member_index);

    int selectUserByID(String id);

    void deleteUser(int id);
}
