package com.careerforge.backend.service;

import com.careerforge.backend.dto.AuthResponse;
import com.careerforge.backend.entity.User;
import com.careerforge.backend.repository.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final WebClient webClient;
    private final ObjectMapper objectMapper;
    private final SecretKey key;

    @Value("${jwt.expiration}")
    private long jwtExpiration;

    public AuthService(UserRepository userRepository, @Value("${jwt.secret}") String jwtSecret) {
        this.userRepository = userRepository;
        this.webClient = WebClient.builder().baseUrl("https://www.googleapis.com/oauth2/v3/userinfo").build();
        this.objectMapper = new ObjectMapper();
        this.key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
    }

    public AuthResponse authenticateWithGoogle(String accessToken) {
        try {
            // 1. Fetch user profile from Google using the access token
            String userInfoResponse = webClient.get()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + accessToken)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode rootNode = objectMapper.readTree(userInfoResponse);
            String email = rootNode.path("email").asText();
            String name = rootNode.path("name").asText();

            if (email == null || email.isEmpty()) {
                throw new RuntimeException("Invalid token: Email not found");
            }

            // 2. Find or Create User
            User user = userRepository.findByEmail(email).orElseGet(() -> {
                User newUser = new User(name, email, UUID.randomUUID().toString(), "USER");
                return userRepository.save(newUser);
            });

            // 3. Generate JWT
            String token = generateToken(user);

            return new AuthResponse(token, user.getName(), user.getEmail());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to authenticate with Google");
        }
    }

    private String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .claim("id", user.getId())
                .claim("role", user.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + jwtExpiration))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
