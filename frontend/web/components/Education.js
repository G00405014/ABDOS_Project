import { useState } from 'react';
import { Line } from 'react-chartjs-2';

const Education = () => {
  const [activeModule, setActiveModule] = useState(0);

  const modules = [
    {
      title: 'Understanding Skin Cancer',
      content: [
        { type: 'video', url: '/videos/intro.mp4' },
        { type: 'text', content: 'Skin cancer is one of the most common...' },
        { type: 'quiz', questions: [/* quiz questions */] }
      ]
    },
    {
      title: 'Prevention & Detection',
      content: [/* ... */]
    },
    // More modules
  ];

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        {modules.map((module, index) => (
          <button
            key={index}
            onClick={() => setActiveModule(index)}
            style={{
              ...styles.moduleButton,
              ...(activeModule === index && styles.activeModule)
            }}
          >
            {module.title}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {modules[activeModule].content.map((item, index) => (
          <div key={index} style={styles.contentItem}>
            {item.type === 'video' && (
              <video controls src={item.url} style={styles.video} />
            )}
            {item.type === 'text' && (
              <p style={styles.text}>{item.content}</p>
            )}
            {item.type === 'quiz' && (
              <div style={styles.quiz}>
                {/* Quiz implementation */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Education; 