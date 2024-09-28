import axios from 'axios';
import React, { useState } from 'react'

const ChatBot = () => {
  const YOUR_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');

    async function generateAnswer() {
        setAnswer("Generating...");
        try {
          const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${YOUR_KEY}`,
            {
              contents: [{ parts: [{ text: question }] }],
            }
          );
          if (response.data && response.data.candidates && response.data.candidates[0].content) {
            setAnswer(response.data.candidates[0].content.parts[0].text);
          } else {
            setAnswer("Error: Unable to generate a response.");
          }
        } catch (error) {
          setAnswer("Error: Something went wrong. Please try again later.");
        }
      }
    


  return (
    
        <div style={styles.container}>
      <h1 style={styles.title}>Chat AI</h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Type your question here..."
        style={styles.textarea}
      ></textarea>
      <button onClick={generateAnswer} style={styles.button}>
        Generate Answer
      </button>
      <div style={styles.answerContainer}>
        <p style={styles.answer}>{answer}</p>
      </div>
    </div>
   
  )
}
const styles = {
    container: {
      maxWidth: '600px',
      margin: '50px auto',
      padding: '20px',
      borderRadius: '10px',
      backgroundColor: '#f7f9fc',
      boxSizing: 'border-box', // Ensures padding and borders are included in width
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
    },
    title: {
      color: '#333',
      fontSize: '2.5rem',
      textAlign: 'center',
      marginBottom: '20px',
      fontWeight: 'bold',
    },
    textarea: {
      width: '100%',
      maxWidth: '100%', // Prevents the textarea from exceeding the container width
      padding: '15px',
      fontSize: '1rem',
      borderRadius: '8px',
      border: '2px solid #ddd',
      marginBottom: '20px',
      outline: 'none',
      resize: 'vertical',
      boxSizing: 'border-box', // Ensures padding and borders are included in width
    },
    button: {
      width: '100%',
      backgroundColor: '#4A90E2',
      color: '#fff',
      padding: '15px',
      fontSize: '1.25rem',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    answerContainer: {
      marginTop: '20px',
      padding: '15px',
      backgroundColor: '#fff',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    answer: {
      fontSize: '1.2rem',
      color: '#555',
      lineHeight: '1.6',
      padding: '10px',
      backgroundColor: '#f0f4f8',
      borderRadius: '8px',
      whiteSpace: 'pre-wrap',
    },
  };

export default ChatBot