import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Save analysis result to database
export const saveAnalysisResult = async (imageData, result) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await axios.post(
      `${API_URL}/analysis`, 
      { 
        image: imageData, 
        result 
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error saving analysis result:', error);
    throw error.response?.data || error;
  }
};

// Get user's analysis history
export const getAnalysisHistory = async () => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await axios.get(
      `${API_URL}/analysis`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching analysis history:', error);
    throw error.response?.data || error;
  }
};

// Get specific analysis by ID
export const getAnalysisById = async (id) => {
  try {
    const token = localStorage.getItem('accessToken');
    
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const response = await axios.get(
      `${API_URL}/analysis/${id}`,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error fetching analysis:', error);
    throw error.response?.data || error;
  }
}; 