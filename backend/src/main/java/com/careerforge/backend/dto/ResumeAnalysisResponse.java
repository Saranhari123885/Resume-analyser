package com.careerforge.backend.dto;

import java.util.List;

public class ResumeAnalysisResponse {
    private int score;
    private List<String> keywords;
    private List<String> missing;
    private List<String> suggestions;
    private List<EnhancementTip> enhancementTips;
    private List<ImprovementSuggestion> improvements;

    public ResumeAnalysisResponse() {}

    public ResumeAnalysisResponse(int score, List<String> keywords, List<String> missing, List<String> suggestions, List<EnhancementTip> enhancementTips) {
        this.score = score;
        this.keywords = keywords;
        this.missing = missing;
        this.suggestions = suggestions;
        this.enhancementTips = enhancementTips;
    }

    public ResumeAnalysisResponse(int score, List<String> keywords, List<String> missing, List<String> suggestions, List<EnhancementTip> enhancementTips, List<ImprovementSuggestion> improvements) {
        this.score = score;
        this.keywords = keywords;
        this.missing = missing;
        this.suggestions = suggestions;
        this.enhancementTips = enhancementTips;
        this.improvements = improvements;
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

    public List<ImprovementSuggestion> getImprovements() {
        return improvements;
    }

    public void setImprovements(List<ImprovementSuggestion> improvements) {
        this.improvements = improvements;
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

    public static class ImprovementSuggestion {
        private String priority;
        private String category;
        private String weakness;
        private String suggestion;
        private String explanation;
        private int scoreIncrease;

        public ImprovementSuggestion() {}

        public ImprovementSuggestion(String priority, String category, String weakness, String suggestion, String explanation, int scoreIncrease) {
            this.priority = priority;
            this.category = category;
            this.weakness = weakness;
            this.suggestion = suggestion;
            this.explanation = explanation;
            this.scoreIncrease = scoreIncrease;
        }

        public String getPriority() {
            return priority;
        }

        public void setPriority(String priority) {
            this.priority = priority;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public String getWeakness() {
            return weakness;
        }

        public void setWeakness(String weakness) {
            this.weakness = weakness;
        }

        public String getSuggestion() {
            return suggestion;
        }

        public void setSuggestion(String suggestion) {
            this.suggestion = suggestion;
        }

        public String getExplanation() {
            return explanation;
        }

        public void setExplanation(String explanation) {
            this.explanation = explanation;
        }

        public int getScoreIncrease() {
            return scoreIncrease;
        }

        public void setScoreIncrease(int scoreIncrease) {
            this.scoreIncrease = scoreIncrease;
        }
    }
}
