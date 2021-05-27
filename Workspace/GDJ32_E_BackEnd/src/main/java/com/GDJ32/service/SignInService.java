package com.GDJ32.service;

import com.GDJ32.repository.SignInRepository;
import com.GDJ32.vo.MemberDTO;
import com.GDJ32.vo.MemberDTOForm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class SignInService {
    @Autowired
    private SignInRepository signInRepository;

    @Transactional
    public Integer createMember(MemberDTOForm memberDTOForm) {
        MemberDTO memberDTO = memberDTOForm.toEntity();
        signInRepository.save(memberDTO);
        return memberDTO.getIndex();
    }
}
