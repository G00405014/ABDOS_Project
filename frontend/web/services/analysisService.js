import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Save analysis result to database
export const saveAnalysisResult = async (imageData, result) => {
  try {
    // Check for token - use both possible names
    const token = localStorage.getItem('accessToken') || localStorage.getItem('token');
    
    if (!token) {
      console.warn('No authentication token found. User must be logged in to save results.');
      throw new Error('Authentication required. Please log in to save your analysis results.');
    }
    
    console.log('Sending analysis result with token:', `Bearer ${token.substring(0, 10)}...`);
    
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
    // More user-friendly error handling
    console.error('Error saving analysis result:', error);
    
    // Format error message based on response
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      if (error.response.status === 401) {
        throw new Error('Your session has expired. Please log in again to save results.');
      } else {
        throw new Error(error.response.data?.message || 'Failed to save your analysis results.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request
      throw error;
    }
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