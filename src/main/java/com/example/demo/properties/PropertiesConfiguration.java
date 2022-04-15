package com.example.demo.properties;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;

@Configuration
@EnableConfigurationProperties({
        ApiKeyProperties.class
})
@PropertySource("classpath:properties/apikey.properties")
public class PropertiesConfiguration {
}