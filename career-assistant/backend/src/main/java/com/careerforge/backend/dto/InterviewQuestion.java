package com.careerforge.backend.dto;

public class InterviewQuestion {
    private String type;
    private String q;
    private String a;

    public InterviewQuestion() {}

    public InterviewQuestion(String type, String q, String a) {
        this.type = type;
        this.q = q;
        this.a = a;
    }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }
    public String getQ() { return q; }
    public void setQ(String q) { this.q = q; }
    public String getA() { return a; }
    public void setA(String a) { this.a = a; }
}
