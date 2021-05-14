package com.GDJ32;

import javax.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 리액트에서 받은 요청을 처리 및 반환하는 함수
*/
@RestController
@RequestMapping("/api")
public class TestController 
{
	@PostMapping("/ip")
	public ResponseEntity<String> ip (HttpServletRequest request)
	{
		// 요청받은 클라이언트 응답 반환
		return ResponseEntity.ok(request.getRemoteAddr());
	}
}
