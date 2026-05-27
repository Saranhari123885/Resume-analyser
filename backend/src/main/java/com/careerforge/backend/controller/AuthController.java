package com.careerforge.backend.controller;

import com.careerforge.backend.dto.AuthResponse;
import com.careerforge.backend.dto.GoogleAuthRequest;
import com.careerforge.backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/google")
    public ResponseEntity<AuthResponse> googleAuth(@RequestBody GoogleAuthRequest request) {
        AuthResponse response = authService.authenticateWithGoogle(request.getCredential());
        return ResponseEntity.ok(response);
    }
}
