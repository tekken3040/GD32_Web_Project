package com.GDJ32.mapper;

import java.util.List;

import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.TestVo;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface UserMapper {
    List<MemberDTO> userList();

    MemberDTO fetchUserByID(int id);

    void updateUser(MemberDTO user);

    void insertUser(MemberDTO user);

    void insertUserDetail(int member_index);

    int selectUserByID(String id);

    void updateUserId(TestVo test);

    void deleteUser(int id);
}
