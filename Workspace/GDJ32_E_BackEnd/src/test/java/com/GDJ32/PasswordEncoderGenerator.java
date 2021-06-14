package com.GDJ32;

import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class PasswordEncoderGenerator {

	@Test
	public void test() {

		log.info("test");
		int i = 0;
		while (i < 10) {
			String password = "11111111";
			
			BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
			String hashedPassword = passwordEncoder.encode(password);
	
			log.info("hashedpassword : "+hashedPassword);
			i++;
		}
	} //

} //
