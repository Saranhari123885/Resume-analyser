package com.careerforge.backend.dto;

import java.util.List;

public class RoadmapResponse {
    private List<WeekBlock> weeks;
    private List<String> platforms;
    private String guidance;

    public RoadmapResponse() {}

    public RoadmapResponse(List<WeekBlock> weeks, List<String> platforms, String guidance) {
        this.weeks = weeks;
        this.platforms = platforms;
        this.guidance = guidance;
    }

    public List<WeekBlock> getWeeks() { return weeks; }
    public void setWeeks(List<WeekBlock> weeks) { this.weeks = weeks; }

    public List<String> getPlatforms() { return platforms; }
    public void setPlatforms(List<String> platforms) { this.platforms = platforms; }

    public String getGuidance() { return guidance; }
    public void setGuidance(String guidance) { this.guidance = guidance; }

    public static class WeekBlock {
        private String title;
        private List<String> topics;

        public WeekBlock() {}

        public WeekBlock(String title, List<String> topics) {
            this.title = title;
            this.topics = topics;
        }

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public List<String> getTopics() { return topics; }
        public void setTopics(List<String> topics) { this.topics = topics; }
    }
}
