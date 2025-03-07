"use client"; // Required in Next.js 13+ for client-side components

import React, { useState, useEffect } from "react";
import "./globals.css";

export default function CyberSecurityPage() {
  // State variables
  const [tip, setTip] = useState("");
  const [quizResult, setQuizResult] = useState("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [darkMode, setDarkMode] = useState(true);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);

  // Cyber Security Threats
  const threats = [
    "Phishing Attacks",
    "Malware & Ransomware",
    "Denial of Service (DoS) Attacks",
    "Man-in-the-Middle (MITM) Attacks",
    "Weak Password Attacks"
  ];

  // Cyber Security Tips
  const tips = [
    "Use strong and unique passwords.",
    "Enable two-factor authentication (2FA).",
    "Do not click on suspicious links.",
    "Keep your software and antivirus updated.",
    "Use a VPN on public Wi-Fi.",
    "Back up your data frequently."
  ];

  // Function to get a random cyber security tip
  const showTip = () => {
    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    setTip(randomTip);
  };

  // Function to check quiz answer
  const checkAnswer = (answer) => {
    if (answer === "c") {
      setQuizResult("✅ Correct! Always use a strong, unique password.");
      setScore(score + 10); // Increase score
      updateLeaderboard(score + 10);
    } else {
      setQuizResult("❌ Incorrect. Try again!");
    }
  };

  // Update leaderboard in local storage
  const updateLeaderboard = (newScore) => {
    const newLeaderboard = [...leaderboard, { score: newScore, date: new Date().toLocaleString() }];
    newLeaderboard.sort((a, b) => b.score - a.score);
    setLeaderboard(newLeaderboard.slice(0, 5)); // Keep top 5 scores
    localStorage.setItem("leaderboard", JSON.stringify(newLeaderboard.slice(0, 5)));
  };

  // Load leaderboard from local storage on mount
  useEffect(() => {
    const savedLeaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setLeaderboard(savedLeaderboard);
  }, []);

  // Real-time clock effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Toggle Dark/Light Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div style={{ ...styles.container, backgroundColor: darkMode ? "#121212" : "#f5f5f5", color: darkMode ? "white" : "black" }}>
      <header style={styles.header}>
        Cyber Security Awareness
        <div style={styles.clock}>{time}</div>
        <button style={styles.toggleButton} onClick={toggleDarkMode}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <section style={styles.card}>
        <h2>What is Cyber Security?</h2>
        <p>Cyber security protects systems, networks, and data from cyber threats such as hacking, phishing, and malware attacks.</p>
      </section>

      <section style={styles.card}>
        <h2>Common Cyber Threats</h2>
        <ul>
          {threats.map((threat, index) => (
            <li key={index}>{threat}</li>
          ))}
        </ul>
      </section>

      <section style={styles.card}>
        <h2>Cyber Security Tips</h2>
        <p>Click the button below to get a random cyber security tip!</p>
        <button style={styles.button} onClick={showTip}>Get a Tip</button>
        <p style={{ fontWeight: "bold", marginTop: "10px" }}>{tip}</p>
      </section>

      <section style={styles.card}>
        <h2>Cyber Security Quiz</h2>
        <p><strong>Question:</strong> What is the best way to protect your password?</p>
        <button style={styles.button} onClick={() => checkAnswer("a")}>A. Use the same password everywhere</button>
        <button style={styles.button} onClick={() => checkAnswer("b")}>B. Share it with a friend</button>
        <button style={styles.button} onClick={() => checkAnswer("c")}>C. Use a unique and strong password</button>
        <p style={{ fontWeight: "bold", marginTop: "10px", color: quizResult.includes("Correct") ? "green" : "red" }}>
          {quizResult}
        </p>
      </section>

      <section style={styles.card}>
        <h2>Leaderboard 🏆</h2>
        <p>Your Score: <strong>{score}</strong></p>
        <ol>
          {leaderboard.map((entry, index) => (
            <li key={index}>{entry.score} points - {entry.date}</li>
          ))}
        </ol>
      </section>

      <footer style={styles.footer}>
        <p>© 2025 Cyber Security Awareness. All rights reserved.</p>
      </footer>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    textAlign: "center",
    padding: "20px",
    minHeight: "100vh",
  },
  header: {
    background: "#0d47a1",
    padding: "20px",
    fontSize: "24px",
    fontWeight: "bold",
    position: "relative",
  },
  clock: {
    fontSize: "18px",
    fontWeight: "bold",
    marginTop: "5px",
  },
  toggleButton: {
    position: "absolute",
    right: "20px",
    top: "15px",
    padding: "8px 12px",
    borderRadius: "5px",
    cursor: "pointer",
    background: "white",
    color: "#0d47a1",
    border: "none",
    fontWeight: "bold",
  },
  card: {
    background: "#1e1e1e",
    padding: "20px",
    margin: "20px auto",
    borderRadius: "10px",
    maxWidth: "600px",
    boxShadow: "0px 0px 10px rgba(255, 255, 255, 0.2)",
  },
  button: {
    background: "#007BFF",
    color: "white",
    padding: "10px 15px",
    border: "none",
    cursor: "pointer",
    margin: "5px",
    borderRadius: "5px",
    transition: "background 0.3s ease-in-out",
  },
  footer: {
    marginTop: "30px",
    padding: "10px",
    backgroundColor: "#0d47a1",
  },
};
