package com.careerforge.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public class ProjectResponse {
    @JsonProperty("abstract")
    private String abstractText;
    
    private List<String> features;
    private String architecture;
    private String readme;
    private List<QuestionAnswer> questions;

    public ProjectResponse() {}

    public ProjectResponse(String abstractText, List<String> features, String architecture, String readme, List<QuestionAnswer> questions) {
        this.abstractText = abstractText;
        this.features = features;
        this.architecture = architecture;
        this.readme = readme;
        this.questions = questions;
    }

    public String getAbstractText() { return abstractText; }
    public void setAbstractText(String abstractText) { this.abstractText = abstractText; }

    public List<String> getFeatures() { return features; }
    public void setFeatures(List<String> features) { this.features = features; }

    public String getArchitecture() { return architecture; }
    public void setArchitecture(String architecture) { this.architecture = architecture; }

    public String getReadme() { return readme; }
    public void setReadme(String readme) { this.readme = readme; }

    public List<QuestionAnswer> getQuestions() { return questions; }
    public void setQuestions(List<QuestionAnswer> questions) { this.questions = questions; }

    public static class QuestionAnswer {
        private String q;
        private String a;

        public QuestionAnswer() {}

        public QuestionAnswer(String q, String a) {
            this.q = q;
            this.a = a;
        }

        public String getQ() { return q; }
        public void setQ(String q) { this.q = q; }

        public String getA() { return a; }
        public void setA(String a) { this.a = a; }
    }
}
