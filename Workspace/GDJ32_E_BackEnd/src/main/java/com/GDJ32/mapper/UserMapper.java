package com.GDJ32.mapper;

import java.util.List;

import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.UserInfo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    List<MemberDTO> userList();

    MemberDTO fetchUserByID(String id);

    void updateUser(UserInfo user);

    void insertUser(MemberDTO user);

    void insertUserDetail(MemberDTO member_index);

    int selectUserByID(String id);

    void deleteUser(int id);
}
