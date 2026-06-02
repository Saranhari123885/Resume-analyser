package com.careerforge.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@SpringBootApplication
public class BackendApplication {

	public static void main(String[] args) {
		loadEnv();
		SpringApplication.run(BackendApplication.class, args);
	}

	private static void loadEnv() {
		Path path = Paths.get(".env");
		if (!Files.exists(path)) {
			// Try parent directory in case we are running from backend subfolder or root
			path = Paths.get("../.env");
		}
		if (Files.exists(path)) {
			try {
				List<String> lines = Files.readAllLines(path);
				for (String line : lines) {
					line = line.trim();
					if (line.isEmpty() || line.startsWith("#")) {
						continue;
					}
					int separator = line.indexOf('=');
					if (separator > 0) {
						String key = line.substring(0, separator).trim();
						String value = line.substring(separator + 1).trim();
						// Remove potential quotes around value
						if (value.startsWith("\"") && value.endsWith("\"") && value.length() >= 2) {
							value = value.substring(1, value.length() - 1);
						} else if (value.startsWith("'") && value.endsWith("'") && value.length() >= 2) {
							value = value.substring(1, value.length() - 1);
						}
						if (System.getenv(key) == null && System.getProperty(key) == null) {
							System.setProperty(key, value);
						}
					}
				}
			} catch (IOException e) {
				System.err.println("Could not load .env file: " + e.getMessage());
			}
		}
	}

}
