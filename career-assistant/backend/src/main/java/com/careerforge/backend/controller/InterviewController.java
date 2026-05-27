package com.careerforge.backend.controller;

import com.careerforge.backend.dto.AskQuestionRequest;
import com.careerforge.backend.dto.AskQuestionResponse;
import com.careerforge.backend.dto.InterviewQuestion;
import com.careerforge.backend.service.InterviewPrepService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/interview")
public class InterviewController {

    private final InterviewPrepService interviewPrepService;

    @Autowired
    public InterviewController(InterviewPrepService interviewPrepService) {
        this.interviewPrepService = interviewPrepService;
    }

    @GetMapping("/generate")
    public ResponseEntity<List<InterviewQuestion>> generateQuestions(
            @RequestParam("role") String role,
            @RequestParam("difficulty") String difficulty) {
        
        List<InterviewQuestion> questions = interviewPrepService.generateQuestions(role, difficulty);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/ask")
    public ResponseEntity<AskQuestionResponse> askCustomQuestion(@RequestBody AskQuestionRequest request) {
        if (request.getQuestion() == null || request.getQuestion().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        AskQuestionResponse response = interviewPrepService.answerCustomQuestion(request);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/ask-hr")
    public ResponseEntity<AskQuestionResponse> askCustomHrQuestion(@RequestBody AskQuestionRequest request) {
        if (request.getQuestion() == null || request.getQuestion().trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        AskQuestionResponse response = interviewPrepService.answerCustomHrQuestion(request.getQuestion());
        return ResponseEntity.ok(response);
    }
}
