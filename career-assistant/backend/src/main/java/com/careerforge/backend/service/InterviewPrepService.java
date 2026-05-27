package com.careerforge.backend.service;

import com.careerforge.backend.dto.AskQuestionRequest;
import com.careerforge.backend.dto.AskQuestionResponse;
import com.careerforge.backend.dto.InterviewQuestion;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class InterviewPrepService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public InterviewPrepService() {
        this.webClient = WebClient.builder().baseUrl("https://api.groq.com/openai/v1/chat/completions").build();
        this.objectMapper = new ObjectMapper();
    }

    public List<InterviewQuestion> generateQuestions(String role, String difficulty) {
        String prompt = "You are an expert technical interviewer. Generate exactly 20 interview questions for a " + difficulty + " " + role + " position. " +
                "Include a mix of Theoretical, Behavioral, and Coding/Technical exercises. " +
                "Respond ONLY with a valid JSON array of objects, where each object has exactly three fields: " +
                "\"type\" (string e.g., Technical, Behavioral, Coding), \"q\" (the question string), and \"a\" (the detailed answer string). " +
                "Do not include markdown blocks like ```json outside the array. Return just the raw JSON array.";

        String escapedPrompt = prompt.replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
        String requestBody = "{\"model\": \"llama-3.3-70b-versatile\", \"messages\": [{\"role\": \"user\", \"content\": \"" + escapedPrompt + "\"}]}";

        String response = webClient.post()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + groqApiKey)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return parseQuestionsResponse(response);
    }

    public AskQuestionResponse answerCustomQuestion(AskQuestionRequest request) {
        String prompt = "You are an expert technical mentor and interviewer for a " + request.getDifficulty() + " " + request.getRole() + ". " +
                "The user is asking you a question. Provide a highly accurate, detailed, and clear answer. " +
                "If the question implies code or is asking for an implementation, provide well-formatted code snippets using markdown (e.g. ```java ... ```). " +
                "The user's question: " + request.getQuestion();

        String escapedPrompt = prompt.replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
        String requestBody = "{\"model\": \"llama-3.3-70b-versatile\", \"messages\": [{\"role\": \"user\", \"content\": \"" + escapedPrompt + "\"}]}";

        String response = webClient.post()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + groqApiKey)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        return new AskQuestionResponse(parseCustomAnswerResponse(response));
    }

    private List<InterviewQuestion> parseQuestionsResponse(String jsonResponse) {
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            String aiText = rootNode.path("choices").get(0).path("message").path("content").asText();

            aiText = aiText.trim();
            if (aiText.startsWith("```json")) {
                aiText = aiText.substring(7);
            } else if (aiText.startsWith("```")) {
                aiText = aiText.substring(3);
            }
            if (aiText.endsWith("```")) {
                aiText = aiText.substring(0, aiText.length() - 3);
            }
            aiText = aiText.trim();

            return objectMapper.readValue(aiText, new TypeReference<List<InterviewQuestion>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            List<InterviewQuestion> errorList = new ArrayList<>();
            errorList.add(new InterviewQuestion("Error", "Failed to generate questions. Please try again.", e.getMessage()));
            return errorList;
        }
    }

    public AskQuestionResponse answerCustomHrQuestion(String question) {
        String prompt = "You are an expert Human Resources (HR) Manager and corporate behavioral coach. " +
                "The user is asking an HR interview question or raising a doubt about a behavioral scenario. " +
                "Provide a highly professional, strategic, and detailed answer explaining: " +
                "1. The core intent behind this question (what the interviewer is actually looking for). " +
                "2. A structured guide on how to answer it using the STAR method (Situation, Task, Action, Result). " +
                "3. A premium, realistic exemplar answer that the user can adapt. " +
                "4. Critical pitfalls or red flags to avoid.\n\n" +
                "User's question/doubt: " + question;

        String escapedPrompt = prompt.replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
        String requestBody = "{\"model\": \"llama-3.3-70b-versatile\", \"messages\": [{\"role\": \"user\", \"content\": \"" + escapedPrompt + "\"}]}";

        try {
            String response = webClient.post()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + groqApiKey)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return new AskQuestionResponse(parseCustomAnswerResponse(response));
        } catch (Exception e) {
            e.printStackTrace();
            return new AskQuestionResponse("Sorry, I couldn't generate an answer at this time. Please check your network and try again.");
        }
    }

    private String parseCustomAnswerResponse(String jsonResponse) {
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            return rootNode.path("choices").get(0).path("message").path("content").asText();
        } catch (Exception e) {
            e.printStackTrace();
            return "Sorry, I couldn't generate an answer at this time. Please try again.";
        }
    }
}
