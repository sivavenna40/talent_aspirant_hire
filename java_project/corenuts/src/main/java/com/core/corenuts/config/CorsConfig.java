package com.core.corenuts.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
//                .allowedOrigins("http:/localhost/:4200")
                .allowedOrigins("http:/54.64.6.102/:4200") // Replace with your Angular application's origin
                .allowedMethods("GET", "POST", "PUT", "DELETE");
    }
}
