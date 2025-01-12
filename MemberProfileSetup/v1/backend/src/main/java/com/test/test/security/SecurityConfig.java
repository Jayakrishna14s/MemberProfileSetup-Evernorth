package com.test.test.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import static org.springframework.security.config.Customizer.withDefaults;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // Password encoder bean to hash user passwords
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }


    // Security filter chain configuration
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Enable CORS and disable CSRF (since you’re using JWT or other auth mechanisms)
                .cors(withDefaults())
                .csrf(AbstractHttpConfigurer::disable)

                // Handle authorization and permit paths based on roles
                .authorizeHttpRequests(auth -> auth
                        // Allow unauthenticated access to authentication-related endpoints
                        .requestMatchers("/api/auth/**").permitAll()
                        // Restrict specific paths based on roles
                        .requestMatchers("/api/students/**", "/api/claims/**", "/api/users/**").hasAnyRole("USER", "AGENT", "ADMIN")
                        // All other paths must be authenticated
                        .anyRequest().authenticated()
                )
                // Enable HTTP Basic authentication (or use JWT if required)
                .httpBasic(withDefaults());

        return http.build();
    }

    // CORS filter configuration
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(Arrays.asList(System.getenv("FRONTEND_URL"))); // Frontend origin
        corsConfiguration.setAllowedHeaders(Arrays.asList("*")); // Allow all headers
        corsConfiguration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE")); // HTTP methods allowed
        corsConfiguration.setAllowCredentials(true); // Allow credentials (e.g., cookies, authorization headers)

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(source);
    }

    // Custom web security ignoring paths, for example static assets
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring().requestMatchers(HttpMethod.OPTIONS, "/**");
    }
}
