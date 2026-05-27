package com.careerforge.backend.service;

import com.careerforge.backend.dto.ResumeAnalysisResponse;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import java.io.IOException;
import java.util.List;

@Service
public class ResumeAnalyzerService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public ResumeAnalyzerService() {
        this.webClient = WebClient.builder().baseUrl("https://api.groq.com/openai/v1/chat/completions").build();
        this.objectMapper = new ObjectMapper();
    }

    public ResumeAnalysisResponse analyzeResume(MultipartFile file) throws IOException {
        String resumeText = extractTextFromPdf(file);
        String aiResponse = callGroqApi(resumeText);
        return parseAiResponse(aiResponse);
    }

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private String callGroqApi(String resumeText) {
        String prompt = "You are an expert ATS (Applicant Tracking System) and senior tech recruiter. " +
                "Analyze the following resume text. Evaluate it for a tech role. " +
                "Respond ONLY with a valid JSON object matching exactly this schema: " +
                "{\"score\": 85, \"keywords\": [\"Java\", \"React\"], \"missing\": [\"Docker\"], \"suggestions\": [\"Add quantifiable metrics\"], " +
                "\"enhancementTips\": [{\"category\": \"Formatting\", \"tip\": \"Use a clean, single-column template to ensure ATS parsers can read your text correctly.\"}, {\"category\": \"Impact\", \"tip\": \"Begin bullet points with strong action verbs like 'Architected' or 'Streamlined'.\"}, {\"category\": \"Metrics\", \"tip\": \"Quantify results (e.g., 'reduced load time by 30%') to demonstrate value.\"}]}. " +
                "Provide at least 3 custom, actionable enhancement tips in the enhancementTips array. " +
                "Do not include markdown blocks, backticks, or any other text outside the JSON.\n\nResume Text:\n" + resumeText;

        // Escape JSON safely
        String escapedPrompt = prompt.replace("\"", "\\\"").replace("\n", "\\n").replace("\r", "");
        String requestBody = "{\"model\": \"llama-3.3-70b-versatile\", \"temperature\": 0.0, \"messages\": [{\"role\": \"user\", \"content\": \"" + escapedPrompt + "\"}]}";

        return webClient.post()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + groqApiKey)
                .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .bodyValue(requestBody)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    private ResumeAnalysisResponse parseAiResponse(String jsonResponse) {
        try {
            JsonNode rootNode = objectMapper.readTree(jsonResponse);
            String aiText = rootNode.path("choices").get(0).path("message").path("content").asText();
            
            // Clean up potential markdown formatting from Gemini
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
            
            return objectMapper.readValue(aiText, ResumeAnalysisResponse.class);
            
        } catch (Exception e) {
            e.printStackTrace();
            return new ResumeAnalysisResponse(0, List.of("Analysis Error"), List.of("Failed to parse response"), List.of("Please try again later."), List.of(new ResumeAnalysisResponse.EnhancementTip("General", "Please try again later.")));
        }
    }
}
