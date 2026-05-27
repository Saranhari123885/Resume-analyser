package com.careerforge.backend.controller;

import com.careerforge.backend.dto.RoadmapResponse;
import com.careerforge.backend.service.RoadmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/roadmap")
public class RoadmapController {

    private final RoadmapService roadmapService;

    @Autowired
    public RoadmapController(RoadmapService roadmapService) {
        this.roadmapService = roadmapService;
    }

    @GetMapping("/generate")
    public ResponseEntity<RoadmapResponse> generateRoadmap(@RequestParam("domain") String domain) {
        if (domain == null || domain.trim().isEmpty()) {
            return ResponseEntity.badRequest().build();
        }
        
        RoadmapResponse response = roadmapService.generateRoadmap(domain);
        return ResponseEntity.ok(response);
    }
}
