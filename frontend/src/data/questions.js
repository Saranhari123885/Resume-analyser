export const interviewQuestionsData = {
  'Java Full Stack Developer': {
    'Easy (Fresher)': [
      { type: 'Technical', q: 'What are the main features of OOP in Java?' },
      { type: 'Technical', q: 'Explain the difference between JDK, JRE, and JVM.' },
      { type: 'Technical', q: 'What is a constructor in Java? Can it be overloaded?' },
      { type: 'Technical', q: 'Explain the difference between final, finally, and finalize.' },
      { type: 'Technical', q: 'What is the purpose of the static keyword?' },
      { type: 'Technical', q: 'Explain the MVC architecture.' },
      { type: 'Technical', q: 'What are React Hooks? Give examples.' },
      { type: 'Technical', q: 'What is the Virtual DOM?' },
      { type: 'Technical', q: 'Explain the difference between == and === in JavaScript.' },
      { type: 'Technical', q: 'What is dependency injection in Spring Boot?' },
      { type: 'Technical', q: 'How do you connect a Spring Boot application to a database?' },
      { type: 'Technical', q: 'What is the difference between GET and POST HTTP methods?' },
      { type: 'Technical', q: 'What is a REST API?' },
      { type: 'Technical', q: 'How do you handle exceptions in Java?' },
      { type: 'System Design', q: 'Draw a high-level diagram for a basic web application.' }
    ],
    'Medium (1-3 Yrs)': [
      { type: 'Technical', q: 'Explain the Java Memory Model and Garbage Collection.' },
      { type: 'Technical', q: 'What is the difference between ArrayList and LinkedList?' },
      { type: 'Technical', q: 'How do Java Streams work under the hood?' },
      { type: 'Technical', q: 'Explain the concept of Bean Scopes in Spring.' },
      { type: 'Technical', q: 'What is the difference between @Controller and @RestController?' },
      { type: 'Technical', q: 'How does Spring Security handle authentication vs authorization?' },
      { type: 'Technical', q: 'Explain React Context API vs Redux.' },
      { type: 'Technical', q: 'What are Pure Components in React?' },
      { type: 'Technical', q: 'How does the Event Loop work in JavaScript?' },
      { type: 'Technical', q: 'Explain the N+1 select problem in Hibernate and how to solve it.' },
      { type: 'Technical', q: 'What is the difference between inner join and outer join?' },
      { type: 'Technical', q: 'Explain indexing in a database.' },
      { type: 'System Design', q: 'How would you design a rate limiter for an API?' },
      { type: 'System Design', q: 'Explain horizontal vs vertical scaling.' },
      { type: 'System Design', q: 'Design the database schema for a shopping cart.' }
    ],
    'Hard (Senior)': [
      { type: 'Technical', q: 'How do you tune the JVM for a high-throughput application?' },
      { type: 'Technical', q: 'Explain the internal working of ConcurrentHashMap.' },
      { type: 'Technical', q: 'How do you handle distributed transactions in microservices?' },
      { type: 'Technical', q: 'Explain the Saga pattern and CQRS.' },
      { type: 'Technical', q: 'How do you optimize a slow-running SQL query with millions of rows?' },
      { type: 'Technical', q: 'Explain React Fiber architecture.' },
      { type: 'Technical', q: 'How do you implement Server-Side Rendering (SSR) in React?' },
      { type: 'Technical', q: 'Explain the concept of Closure in JavaScript with a complex use case.' },
      { type: 'Technical', q: 'How do you secure a microservices architecture?' },
      { type: 'Technical', q: 'What are the trade-offs of using NoSQL over SQL?' },
      { type: 'System Design', q: 'Design a scalable real-time chat application like WhatsApp.' },
      { type: 'System Design', q: 'Design an architecture for a system processing 10,000 events per second.' },
      { type: 'System Design', q: 'How would you design a distributed caching system?' },
      { type: 'System Design', q: 'Explain your approach to designing a globally distributed database.' },
      { type: 'System Design', q: 'How do you handle idempotency in API design?' }
    ]
  },
  'Cybersecurity Analyst': {
    'Easy (Fresher)': [
      { type: 'Technical', q: 'What is the CIA triad?' },
      { type: 'Technical', q: 'Explain the difference between symmetric and asymmetric encryption.' },
      { type: 'Technical', q: 'What is a firewall and how does it work?' },
      { type: 'Technical', q: 'What is Phishing?' },
      { type: 'Technical', q: 'Explain the OSI Model.' },
      { type: 'Technical', q: 'What is the difference between TCP and UDP?' },
      { type: 'Technical', q: 'What is VPN?' },
      { type: 'Technical', q: 'What are the common ports for HTTP, HTTPS, SSH, and FTP?' }
    ],
    'Medium (1-3 Yrs)': [
      { type: 'Technical', q: 'Explain Cross-Site Scripting (XSS) and how to prevent it.' },
      { type: 'Technical', q: 'What is SQL Injection and how do you mitigate it?' },
      { type: 'Technical', q: 'What is the difference between a Vulnerability Scan and Penetration Testing?' },
      { type: 'Technical', q: 'Explain how OAuth 2.0 works.' },
      { type: 'Technical', q: 'What is a SIEM system?' },
      { type: 'Technical', q: 'How do you perform a packet analysis using Wireshark?' },
      { type: 'Scenario', q: 'You detect unusual outbound traffic from a server. What are your steps?' },
      { type: 'System Design', q: 'Design a secure network architecture for a small office.' }
    ],
    'Hard (Senior)': [
      { type: 'Technical', q: 'How do you reverse engineer malware?' },
      { type: 'Technical', q: 'Explain advanced persistent threats (APTs).' },
      { type: 'Technical', q: 'How do you secure an AWS or Azure cloud environment?' },
      { type: 'Technical', q: 'Explain zero-trust architecture.' },
      { type: 'Technical', q: 'How do you implement secure CI/CD pipelines (DevSecOps)?' },
      { type: 'Scenario', q: 'Describe how you would handle a company-wide ransomware attack.' },
      { type: 'System Design', q: 'Design an enterprise-level identity and access management (IAM) system.' },
      { type: 'System Design', q: 'Architect a highly resilient incident response framework.' }
    ]
  },
  'AI/ML Engineer': {
    'Easy (Fresher)': [
      { type: 'Technical', q: 'What is the difference between supervised and unsupervised learning?' },
      { type: 'Technical', q: 'Explain Overfitting and Underfitting.' },
      { type: 'Technical', q: 'What is a confusion matrix?' },
      { type: 'Technical', q: 'What is the difference between classification and regression?' },
      { type: 'Technical', q: 'Explain the concept of cross-validation.' },
      { type: 'Technical', q: 'What is a neural network?' },
      { type: 'Technical', q: 'What is the purpose of an activation function?' },
      { type: 'Technical', q: 'Explain gradient descent.' }
    ],
    'Medium (1-3 Yrs)': [
      { type: 'Technical', q: 'Explain the Bias-Variance tradeoff.' },
      { type: 'Technical', q: 'How do you handle imbalanced datasets?' },
      { type: 'Technical', q: 'What is the vanishing gradient problem and how do you fix it?' },
      { type: 'Technical', q: 'Explain the difference between Bagging and Boosting.' },
      { type: 'Technical', q: 'How do Convolutional Neural Networks (CNNs) work?' },
      { type: 'Technical', q: 'What is word2vec?' },
      { type: 'Scenario', q: 'Your model is performing well on training data but poorly on test data. What do you do?' },
      { type: 'System Design', q: 'Design a basic recommendation system for an e-commerce site.' }
    ],
    'Hard (Senior)': [
      { type: 'Technical', q: 'Explain the architecture of a Transformer model.' },
      { type: 'Technical', q: 'How does self-attention work mathematically?' },
      { type: 'Technical', q: 'Explain the differences between BERT and GPT architectures.' },
      { type: 'Technical', q: 'How do you optimize deep learning models for inference speed on edge devices?' },
      { type: 'Technical', q: 'What are GANs and how do you stabilize their training?' },
      { type: 'Scenario', q: 'How do you monitor and handle concept drift in production models?' },
      { type: 'System Design', q: 'Design a distributed training system for a multi-billion parameter LLM.' },
      { type: 'System Design', q: 'Design an architecture for real-time fraud detection processing millions of transactions.' }
    ]
  },
  'Frontend Developer': {
    'Easy (Fresher)': [
      { type: 'Technical', q: 'What is the DOM?' },
      { type: 'Technical', q: 'Explain the CSS Box Model.' },
      { type: 'Technical', q: 'What is the difference between let, const, and var?' },
      { type: 'Technical', q: 'What are React props and state?' },
      { type: 'Technical', q: 'What is semantic HTML?' },
      { type: 'Technical', q: 'How do you center a div using CSS?' }
    ],
    'Medium (1-3 Yrs)': [
      { type: 'Technical', q: 'Explain event delegation in JavaScript.' },
      { type: 'Technical', q: 'How does the Virtual DOM work in React?' },
      { type: 'Technical', q: 'Explain CSS Grid vs Flexbox.' },
      { type: 'Technical', q: 'What is Webpack and what does it do?' },
      { type: 'Technical', q: 'How do you optimize the performance of a React application?' },
      { type: 'System Design', q: 'Design a scalable frontend architecture for a dashboard.' }
    ],
    'Hard (Senior)': [
      { type: 'Technical', q: 'Explain the micro-frontend architecture.' },
      { type: 'Technical', q: 'How does React Fiber work under the hood?' },
      { type: 'Technical', q: 'How do you implement complex animations at 60fps?' },
      { type: 'Technical', q: 'Explain Service Workers and offline caching.' },
      { type: 'System Design', q: 'Design the frontend architecture for Google Docs.' }
    ]
  },
  'Backend Developer': {
    'Easy (Fresher)': [
      { type: 'Technical', q: 'What is a REST API?' },
      { type: 'Technical', q: 'Explain HTTP status codes 200, 400, 401, 403, 404, 500.' },
      { type: 'Technical', q: 'What is a primary key and a foreign key?' },
      { type: 'Technical', q: 'What is MVC?' },
      { type: 'Technical', q: 'Explain basic CRUD operations.' }
    ],
    'Medium (1-3 Yrs)': [
      { type: 'Technical', q: 'What is an index in a database and how does it work?' },
      { type: 'Technical', q: 'Explain ORM (Object Relational Mapping).' },
      { type: 'Technical', q: 'What are WebSockets?' },
      { type: 'Technical', q: 'How do you handle authentication using JWT?' },
      { type: 'System Design', q: 'Design a basic URL shortener.' }
    ],
    'Hard (Senior)': [
      { type: 'Technical', q: 'How do you handle distributed transactions?' },
      { type: 'Technical', q: 'Explain the CAP theorem.' },
      { type: 'Technical', q: 'How do you scale a database horizontally?' },
      { type: 'Technical', q: 'What is event sourcing?' },
      { type: 'System Design', q: 'Design a ride-sharing backend like Uber.' }
    ]
  }
};
