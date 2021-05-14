package com.GDJ32;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * cors에러 방지를 위한 WebConfig
*/
@Configuration
public class WebConfig implements WebMvcConfigurer 
{
	@Override
	public void addCorsMappings(CorsRegistry registry)
	{
		registry.addMapping("/api/**").allowCredentials(true).allowedOrigins("http://localhost:3000");
	}
}
