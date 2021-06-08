package com.GDJ32.controller;

import java.util.List;

import com.GDJ32.mapper.UserMapper;
import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.TestVo;
import com.GDJ32.vo.UserInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/users")
public class SignInController {

    private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    
    // private final PasswordEncoder passwordEncoder;
// 
    // public SignInController(PasswordEncoder passwordEncoder)
    // {
    //     this.passwordEncoder = passwordEncoder;
    // }

    @Autowired
    UserMapper userMapper;

    // @GetMapping("/updateUserId")
    public List<MemberDTO> userList() {
        // System.out.println(userMapper.userList());
        System.out.println("유저출력 성공");

        return userMapper.userList();
    }

    @GetMapping("/updateUserId")
    void updateUserId() {
        List<MemberDTO> tempList = userMapper.userList();
        
        for (int i = 0; i < tempList.size(); i++)
        {
            TestVo testVo = new TestVo();
            testVo.setMember_index(userMapper.selectUserByID(tempList.get(i).getId()));
            testVo.setId(tempList.get(i).getId());
            userMapper.updateUserId(testVo);
        }
    }

    @PostMapping("/signup")
    void insertUser(@RequestBody MemberDTO user) {
        user.setPassWord(passwordEncoder.encode(user.getPassword()));
        userMapper.insertUser(user);
        System.out.println("유저 저장 성공");
        userMapper.insertUserDetail(userMapper.selectUserByID(user.getId()));
    }

    @PostMapping("/login")
    void loginUser(@RequestBody UserInfo user) {
        System.out.println(user.getMember_index());
        System.out.println(user.getId());
        System.out.println(user.getPassword());
        System.out.println("유저 로그인 들어옴");
    }

    @GetMapping("/{id}")
    public MemberDTO fetchUserByID(@PathVariable int id) {
        System.out.println(userMapper.fetchUserByID(id));
        MemberDTO fetchUser = userMapper.fetchUserByID(id);
        return fetchUser;
    }

    @PutMapping("/{id}")
    public void updateUser(@PathVariable int id, @RequestBody MemberDTO user) {
        MemberDTO updateUser = user;
        System.out.println("업데이트 유저 => " + updateUser);

        updateUser.setPassWord(user.getPassword());
        updateUser.setName(user.getName());
        updateUser.setZipcode(user.getZipcode());
        updateUser.setAddress(user.getAddress());
        updateUser.setAddress_detail(user.getAddress_detail());
        updateUser.setPhone(user.getPhone());
        updateUser.setEmail(user.getEmail());
        updateUser.setBirthday(user.getBirthday());

        userMapper.updateUser(updateUser);
    }

    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable int id) {
        userMapper.deleteUser(id);
        System.out.println("유저 삭제 성공");
    }
}