import React, { useState, useCallback, useMemo } from 'react';

function Contactform() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });
  const [responseMessage, setResponseMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formDataToSend = {
      access_key: 'a2e738e2-9fcd-4e02-900e-a5534457416e',
      ...formData,
    };

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(formDataToSend)
      });

      const result = await res.json();
      if (result.success) {
        setResponseMessage("Message sent successfully!");
        setFormData({ fullName: '', email: '', message: '' });
      } else {
        setResponseMessage("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setResponseMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const styles = useMemo(() => ({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#262626',
      fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
    },
    form: {
      width: '100%',
      maxWidth: '400px',
      padding: '2rem',
      backgroundColor: '#404040',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
    },
    title: {
      textAlign: 'center',
      marginBottom: '1.5rem',
      color: '#f5f5f5',
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    inputGroup: {
      marginBottom: '1rem',
    },
    label: {
      display: 'block',
      marginBottom: '0.5rem',
      fontWeight: '500',
      color: '#d4d4d4',
      fontSize: '0.875rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #525252', // border-neutral-600
        borderRadius: '4px',
        fontSize: '1rem',
        backgroundColor: '#262626', // bg-neutral-800
        color: '#f5f5f5', // text-neutral-100
        transition: 'border-color 0.2s ease',
    },
    textarea: {
      minHeight: '100px',
      resize: 'vertical',
    },
    button: {
      width: '100%',
      padding: '0.75rem',
      backgroundColor: '#ef4444',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '1rem',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease, transform 0.1s ease',
      '&:hover': {
        backgroundColor: '#3182ce',
      },
      '&:active': {
        transform: 'scale(0.98)',
      },
    },
    responseMessage: {
      textAlign: 'center',
      marginBottom: '1rem',
      fontWeight: '500',
    },
  }), []);

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Contact Us</h2>
        
        {responseMessage && (
          <p style={{
            ...styles.responseMessage,
            color: responseMessage.includes("success") ? "#48bb78" : "#e53e3e"
          }}>
            {responseMessage}
          </p>
        )}
        
        <div style={styles.inputGroup}>
          <label htmlFor="fullName" style={styles.label}>Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Enter your full name"
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
            placeholder="Enter your Email Address"
          />
        </div>
        
        <div style={styles.inputGroup}>
          <label htmlFor="message" style={styles.label}>Your Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            style={{...styles.input, ...styles.textarea}}
            placeholder="Type your message here..."
          ></textarea>
        </div>
        
        <button
          type="submit"
          style={{
            ...styles.button,
            opacity: isSubmitting ? 0.7 : 1,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}

export default Contactform;