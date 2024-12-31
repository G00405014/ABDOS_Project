import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How accurate is the AI detection?",
      answer: "Our AI model has achieved a 98% accuracy rate in detecting common skin conditions..."
    },
    {
      question: "Is my data secure?",
      answer: "All images are encrypted and automatically deleted after analysis..."
    }
    // Add more FAQs
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="faq-item"
          onClick={() => setActiveIndex(activeIndex === index ? null : index)}
        >
          <div className="faq-question">
            <h3>{faq.question}</h3>
            <span>{activeIndex === index ? '−' : '+'}</span>
          </div>
          {activeIndex === index && (
            <div className="faq-answer">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FAQ; 