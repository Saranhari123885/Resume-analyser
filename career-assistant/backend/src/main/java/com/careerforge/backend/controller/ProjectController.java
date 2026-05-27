package com.careerforge.backend.controller;

import com.careerforge.backend.dto.ProjectResponse;
import com.careerforge.backend.service.ProjectGeneratorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/project")
public class ProjectController {

    private final ProjectGeneratorService projectGeneratorService;

    @Autowired
    public ProjectController(ProjectGeneratorService projectGeneratorService) {
        this.projectGeneratorService = projectGeneratorService;
    }

    @PostMapping("/generate")
    public ResponseEntity<ProjectResponse> generateProject(
            @RequestParam("title") String title,
            @RequestParam("domain") String domain,
            @RequestParam("projectType") String projectType,
            @RequestParam("techStack") String techStack,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        ProjectResponse response = projectGeneratorService.generateProject(title, domain, projectType, techStack, file);
        return ResponseEntity.ok(response);
    }
}
