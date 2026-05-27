package com.careerforge.backend.dto;

import java.util.List;

public class ResumeAnalysisResponse {
    private int score;
    private List<String> keywords;
    private List<String> missing;
    private List<String> suggestions;
    private List<EnhancementTip> enhancementTips;

    public ResumeAnalysisResponse() {}

    public ResumeAnalysisResponse(int score, List<String> keywords, List<String> missing, List<String> suggestions, List<EnhancementTip> enhancementTips) {
        this.score = score;
        this.keywords = keywords;
        this.missing = missing;
        this.suggestions = suggestions;
        this.enhancementTips = enhancementTips;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<String> getKeywords() {
        return keywords;
    }

    public void setKeywords(List<String> keywords) {
        this.keywords = keywords;
    }

    public List<String> getMissing() {
        return missing;
    }

    public void setMissing(List<String> missing) {
        this.missing = missing;
    }

    public List<String> getSuggestions() {
        return suggestions;
    }

    public void setSuggestions(List<String> suggestions) {
        this.suggestions = suggestions;
    }

    public List<EnhancementTip> getEnhancementTips() {
        return enhancementTips;
    }

    public void setEnhancementTips(List<EnhancementTip> enhancementTips) {
        this.enhancementTips = enhancementTips;
    }

    public static class EnhancementTip {
        private String category;
        private String tip;

        public EnhancementTip() {}

        public EnhancementTip(String category, String tip) {
            this.category = category;
            this.tip = tip;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public String getTip() {
            return tip;
        }

        public void setTip(String tip) {
            this.tip = tip;
        }
    }
}
