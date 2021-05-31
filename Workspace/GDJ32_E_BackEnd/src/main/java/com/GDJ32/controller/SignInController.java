package com.GDJ32.controller;

import com.GDJ32.service.SignInService;
import com.GDJ32.vo.MemberDTOForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class SignInController {
    @Autowired
    private SignInService signInService;

    @GetMapping("/login")
    public String createUserForm(Model model) {
        model.addAttribute("userForm", new MemberDTOForm());
        return "user/login/register";
    }

    @PostMapping("/signup")
    public String createUser(@Validated MemberDTOForm form, BindingResult result) {
        System.out.println("api connect");
        if (result.hasErrors()) {
            return "user/login/register";
        }

        signInService.createMember(form);

        return "redirect:/";
    }
}