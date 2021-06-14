package com.GDJ32;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.convert.threeten.Jsr310JpaConverters;

@SpringBootApplication
@EntityScan(basePackageClasses = { Gdj32EBackEndApplication.class, Jsr310JpaConverters.class })
public class Gdj32EBackEndApplication {

	public static void main(String[] args) {
		SpringApplication.run(Gdj32EBackEndApplication.class, args);
	}

}
