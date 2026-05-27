package com.careerforge.backend.service;

import com.careerforge.backend.dto.ProjectResponse;
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
import java.util.ArrayList;
import java.util.List;

@Service
public class ProjectGeneratorService {

    @Value("${groq.api.key}")
    private String groqApiKey;

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public ProjectGeneratorService() {
        this.webClient = WebClient.builder().baseUrl("https://api.groq.com/openai/v1/chat/completions").build();
        this.objectMapper = new ObjectMapper();
    }

    public ProjectResponse generateProject(String title, String domain, String projectType, String techStack, MultipartFile file) {
        String fileText = "";
        if (file != null && !file.isEmpty()) {
            try {
                fileText = extractTextFromPdf(file);
            } catch (IOException e) {
                e.printStackTrace();
                fileText = "Error reading uploaded file: " + e.getMessage();
            }
        }

        String prompt = "You are an expert software engineer and systems architect. " +
                "Generate a highly detailed, premium project blueprint for: \n" +
                "Title: " + title + "\n" +
                "Domain/Industry: " + domain + "\n" +
                "Project Type: " + projectType + "\n" +
                "Tech Stack: " + techStack + "\n" +
                (fileText.isEmpty() ? "" : "Specifications parsed from uploaded brief document:\n" + fileText + "\n") +
                "Respond ONLY with a valid JSON object matching exactly this schema: " +
                "{\n" +
                "  \"abstract\": \"A detailed abstract explanation...\",\n" +
                "  \"features\": [\"Feature 1 description\", \"Feature 2 description\", \"Feature 3 description\", \"Feature 4 description\", \"Feature 5 description\"],\n" +
                "  \"architecture\": \"Decoupled Tier-3 Architecture explanation...\",\n" +
                "  \"readme\": \"# GitHub README.md markdown content...\",\n" +
                "  \"questions\": [\n" +
                "    { \"q\": \"Explain the system architecture of \\\"" + title + "\\\" and why you chose this design.\", \"a\": \"Detailed answer...\" },\n" +
                "    { \"q\": \"Question 2?\", \"a\": \"Answer 2...\" }\n" +
                "  ]\n" +
                "}\n" +
                "Generate exactly 8-10 customized, high-quality interview Q&A pairs relevant to this specific tech stack and project. " +
                "Do not include markdown code fences (```json or ```) or any other conversational text in your response. Return just the JSON structure.";

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

            return parseProjectResponse(response);
        } catch (Exception e) {
            e.printStackTrace();
            return createFallbackProject(title, domain, projectType, techStack, e.getMessage());
        }
    }

    private String extractTextFromPdf(MultipartFile file) throws IOException {
        try (PDDocument document = PDDocument.load(file.getInputStream())) {
            PDFTextStripper stripper = new PDFTextStripper();
            return stripper.getText(document);
        }
    }

    private ProjectResponse parseProjectResponse(String jsonResponse) {
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

            return objectMapper.readValue(aiText, ProjectResponse.class);
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Failed to parse project from AI response: " + e.getMessage(), e);
        }
    }

    private ProjectResponse createFallbackProject(String title, String domain, String projectType, String techStack, String errorMsg) {
        String abstractText = "An innovative, scalable " + projectType.toLowerCase() + " engineered for the " + domain + " sector. " +
                "Leveraging a robust configuration of " + techStack + ", the project implements dynamic data models, " +
                "granular access controls, and highly responsive components tailored specifically for enterprise deployment.";

        List<String> features = List.of(
                "Responsive user interface designed for high-conversion styling workflow.",
                "Robust microservices / REST API controllers with full lifecycle operations.",
                "Enterprise database integrations mapped utilizing standard relational models.",
                "Granular security filters enforcing endpoint authentication and cross-site scripting preventions.",
                "Automated validation scripts and continuous delivery deployment configurations."
        );

        String architecture = "The application follows a clean, decoupled Three-Tier Architecture:\n" +
                "1. Client Presentation Layer: React/Vite responsive components for dynamic view rendering.\n" +
                "2. Server API Layer: Backend logic parsing business instructions and security permissions.\n" +
                "3. Database / Storage Layer: Relational tables utilizing standard schema designs and indices.";

        String readme = "# 🚀 " + (title == null || title.isEmpty() ? "AI CareerForge Generated Project" : title) + "\n\n" +
                "A premium, highly secure " + projectType.toLowerCase() + " built for the **" + domain + "** sector using **" + techStack + "**.\n\n" +
                "## 🛠️ Getting Started\n" +
                "1. Clone the codebase.\n" +
                "2. Configure credentials in the database configuration parameters.\n" +
                "3. Launch client and server development instances.\n\n" +
                "Note: A temporary API load issue was encountered (" + errorMsg + "). This baseline fallback readme is dynamically generated.";

        List<ProjectResponse.QuestionAnswer> questions = new ArrayList<>();
        questions.add(new ProjectResponse.QuestionAnswer(
                "Explain the system architecture of \"" + title + "\" and why you chose this design.",
                "This project is designed as a decoupled Three-Tier architecture. We chose this pattern to enforce separation of concerns, allow horizontal scaling of frontend and backend separately, and reduce database locking constraints."
        ));
        questions.add(new ProjectResponse.QuestionAnswer(
                "How did you make this " + projectType.toLowerCase() + " secure?",
                "Security is implemented across multiple layers including transport security (HTTPS), stateless session management using JWT Bearer authentication, and comprehensive input validation to prevent SQLi and XSS."
        ));

        return new ProjectResponse(abstractText, features, architecture, readme, questions);
    }
}
