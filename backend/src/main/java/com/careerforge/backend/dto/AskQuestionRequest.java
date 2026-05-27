package com.careerforge.backend.dto;

public class AskQuestionRequest {
    private String question;
    private String role;
    private String difficulty;

    public AskQuestionRequest() {}

    public AskQuestionRequest(String question, String role, String difficulty) {
        this.question = question;
        this.role = role;
        this.difficulty = difficulty;
    }

    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }
}
