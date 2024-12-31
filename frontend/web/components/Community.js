import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import io from 'socket.io-client';

const Community = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('discussions');

  const tabs = {
    discussions: 'Support Group Discussions',
    stories: 'Success Stories',
    experts: 'Expert Q&A',
    webinars: 'Upcoming Webinars'
  };

  const createPost = async () => {
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now(),
      content: newPost,
      author: session.user.name,
      avatar: session.user.image,
      date: new Date(),
      likes: 0,
      comments: []
    };

    setPosts(prev => [post, ...prev]);
    setNewPost('');
  };

  return (
    <div style={styles.container}>
      <div style={styles.tabs}>
        {Object.entries(tabs).map(([key, value]) => (
          <button
            key={key}
            style={{
              ...styles.tab,
              ...(activeTab === key && styles.activeTab)
            }}
            onClick={() => setActiveTab(key)}
          >
            {value}
          </button>
        ))}
      </div>

      <div style={styles.content}>
        {activeTab === 'discussions' && (
          <div style={styles.discussions}>
            <div style={styles.newPost}>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="Share your experience..."
                style={styles.textarea}
              />
              <button onClick={createPost} style={styles.button}>
                Post
              </button>
            </div>
            
            <div style={styles.posts}>
              {posts.map(post => (
                <div key={post.id} style={styles.post}>
                  <img src={post.avatar} style={styles.avatar} />
                  <div style={styles.postContent}>
                    <h4>{post.author}</h4>
                    <p>{post.content}</p>
                    <div style={styles.postActions}>
                      <button>Like ({post.likes})</button>
                      <button>Comment ({post.comments.length})</button>
                      <button>Share</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'webinars' && (
          <div style={styles.webinars}>
            <h3>Upcoming Webinars</h3>
            {/* Add webinar listings */}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  // ... styles
};

export default Community; 