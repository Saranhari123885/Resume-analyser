package com.careerforge.backend.service;

import com.careerforge.backend.dto.RoadmapResponse;
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
public class RoadmapService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public RoadmapService() {
        this.webClient = WebClient.builder().baseUrl("https://api.groq.com/openai/v1/chat/completions").build();
        this.objectMapper = new ObjectMapper();
    }

    public RoadmapResponse generateRoadmap(String domain) {
        String prompt = "You are an expert career counselor and senior software engineering architect. " +
                "Generate a highly detailed, comprehensive, structured 8-week learning roadmap for the technical domain: " + domain + ". " +
                "Respond ONLY with a valid JSON object matching the following structure: " +
                "{ \"weeks\": [ " +
                "  { \"title\": \"Week 1-2: [Core Theme]\", \"topics\": [\"topic1\", \"topic2\", \"topic3\", \"topic4\"] }, " +
                "  { \"title\": \"Week 3-4: [Core Theme]\", \"topics\": [\"topic1\", \"topic2\", \"topic3\"] }, " +
                "  { \"title\": \"Week 5-6: [Core Theme]\", \"topics\": [\"topic1\", \"topic2\", \"topic3\"] }, " +
                "  { \"title\": \"Week 7-8: [Core Theme]\", \"topics\": [\"topic1\", \"topic2\", \"topic3\"] } " +
                "], " +
                "\"platforms\": [\"Platform 1\", \"Platform 2\", \"Platform 3\"], " +
                "\"guidance\": \"Detailed, actionable career guidance and project-focused suggestions for mastering this domain.\" } " +
                "Return ONLY the raw JSON object, without any markdown code fences like ```json or ```. Return just the JSON structure.";

        String requestBody;
        try {
            java.util.Map<String, Object> message = java.util.Map.of("role", "user", "content", prompt);
            java.util.Map<String, Object> requestMap = java.util.Map.of(
                "model", "llama-3.3-70b-versatile",
                "messages", java.util.List.of(message)
            );
            requestBody = objectMapper.writeValueAsString(requestMap);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to serialize request prompt to JSON", e);
        }

        try {
            String response = webClient.post()
                    .header(HttpHeaders.AUTHORIZATION, "Bearer " + groqApiKey)
                    .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            return parseRoadmapResponse(response);
        } catch (Exception e) {
            e.printStackTrace();
            return createFallbackRoadmap(domain, e.getMessage());
        }
    }

    private RoadmapResponse parseRoadmapResponse(String jsonResponse) {
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

            return objectMapper.readValue(aiText, RoadmapResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to parse roadmap from AI response: " + e.getMessage(), e);
        }
    }

    private RoadmapResponse createFallbackRoadmap(String domain, String errorMessage) {
        // Safe programmatic fallback in case Groq or network encounters issues
        List<RoadmapResponse.WeekBlock> weeks = new ArrayList<>();
        weeks.add(new RoadmapResponse.WeekBlock("Week 1-2: Core Foundations for " + domain, 
                List.of("Basic syntax and configurations", "Environment setup", "Key development toolchains")));
        weeks.add(new RoadmapResponse.WeekBlock("Week 3-4: Intermediate Libraries", 
                List.of("Data integration methods", "Framework modules", "Building simple components")));
        weeks.add(new RoadmapResponse.WeekBlock("Week 5-6: System API & Relational Control", 
                List.of("Database management", "Security parameters", "Writing unit validations")));
        weeks.add(new RoadmapResponse.WeekBlock("Week 7-8: Production & Cloud Deployment", 
                List.of("Container configurations", "Deployment platforms", "Continuous delivery workflows")));

        List<String> platforms = List.of("LeetCode", "HackerRank", "GitHub Learning Path");
        String guidance = "Note: The live AI engine experienced a temporary load issue (" + errorMessage + "). " +
                "Please make sure your internet connection and API keys are verified. " +
                "Focus on building localized project components and utilizing version control tools frequently.";

        return new RoadmapResponse(weeks, platforms, guidance);
    }
}
