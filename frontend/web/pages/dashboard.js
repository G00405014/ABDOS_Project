import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/Layout';
import Link from 'next/link'; // Import Link for navigation

function MyProfilePage() {
  const { user, setUser, getToken } = useAuth();
  
  // State for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user?.name || '');
  const [isSaving, setIsSaving] = useState(false);
  const [editError, setEditError] = useState(null);
  const [editSuccess, setEditSuccess] = useState(null);
  
  // State for history
  const [history, setHistory] = useState([]);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState(null);
  
  // Update editName if user context changes (e.g., after initial load)
  useEffect(() => {
     if (user?.name) {
         setEditName(user.name);
     }
  }, [user?.name]);

  // Fetch History Effect
  useEffect(() => {
    const fetchHistory = async () => {
      const token = getToken();
      if (user?.id && token) {
        setIsLoadingHistory(true);
        setHistoryError(null);
        try {
          const response = await fetch(`http://localhost:5000/history/${user.id}`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          if (!response.ok) {
            const errorData = await response.json();
            if (response.status === 401) {
              throw new Error("Session invalid. Please log in again.");
            }
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
          }
          
          const data = await response.json();
          setHistory(data);
        } catch (error) {
          console.error("Error fetching history:", error);
          setHistoryError(error.message);
        } finally {
          setIsLoadingHistory(false);
        }
      } else if (!token && user?.id) {
        setHistoryError("Authentication token missing. Please log in again.");
        setIsLoadingHistory(false);
      }
    };

    fetchHistory();
  }, [user, getToken]);
  
  // Handle Profile Update
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setEditError(null);
    setEditSuccess(null);
    const token = getToken();
    
    if (!token) {
      setEditError("Authentication token missing. Please log in again.");
      setIsSaving(false);
      return;
    }
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: editName })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }
      
      // Update user state in context with new data
      if (data.user) {
        setUser(data.user);
      }
      setEditSuccess('Profile updated successfully!');
      setIsEditing(false); // Exit editing mode on success
      
    } catch (error) {
      console.error("Error updating profile:", error);
      setEditError(error.message);
    } finally {
      setIsSaving(false);
    }
  };
  
  // Handle Cancel Edit
  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(user?.name || ''); // Reset edit field
    setEditError(null);
    setEditSuccess(null);
  };

  return (
    <ProtectedRoute>
      <Layout title="My Profile | ABDOS">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl font-bold mb-8 dark:text-white">My Profile</h1>
          
          {/* User Information Card */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6 mb-8">
            <form onSubmit={handleUpdateProfile}> 
              <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold dark:text-white">Your Information</h2>
                  {!isEditing && (
                    <button 
                        type="button" 
                        onClick={() => setIsEditing(true)} 
                        className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                     >
                        Edit
                    </button>
                  )}
              </div>

              {/* Display Success/Error Messages */} 
              {editSuccess && <p className="text-green-600 mb-4 text-sm">{editSuccess}</p>}
              {editError && <p className="text-red-600 mb-4 text-sm">Error: {editError}</p>}

              <div className="space-y-4">
                   <div>
                        <label htmlFor="profile-name" className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Name</label>
                        {isEditing ? (
                            <input 
                                id="profile-name"
                                type="text"
                                value={editName}
                                onChange={(e) => setEditName(e.target.value)}
                                className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-gray-900 dark:text-white"
                                required
                            />
                        ) : (
                            <p className="text-gray-800 dark:text-gray-200">{user?.name || 'N/A'}</p>
                        )}
                   </div>
                   <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Email</label>
                        <p className="text-gray-800 dark:text-gray-200">{user?.email || 'N/A'}</p> 
                        {/* Email typically not editable */} 
                   </div>
                   {/* Add password change fields here if implementing */} 
              </div>
              
              {/* Edit Mode Buttons */} 
              {isEditing && (
                <div className="mt-6 flex gap-4">
                    <button 
                        type="submit"
                        disabled={isSaving}
                        className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 flex items-center"
                     >
                         {isSaving && (
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                         )}
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button 
                        type="button" 
                        onClick={handleCancelEdit} 
                        disabled={isSaving}
                        className="px-4 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm font-medium rounded-md hover:bg-gray-300 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                </div>
              )}
            </form> 
          </div>

          {/* Analysis History Card (Delete functionality not added yet) */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 dark:text-white">Analysis History</h2>
            {isLoadingHistory && <p className="text-gray-600 dark:text-gray-400">Loading history...</p>}
            {historyError && <p className="text-red-500">Error loading history: {historyError}</p>}
            {!isLoadingHistory && !historyError && (
              history.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">You haven't performed any analyses yet.</p>
              ) : (
                <ul className="space-y-4">
                  {history.map((item, index) => (
                    <li key={item._id || index} className="border-b border-gray-200 dark:border-gray-700 pb-4 flex justify-between items-start">
                       <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Date: {new Date(item.timestamp).toLocaleString()}</p>
                            <p className="font-medium text-gray-800 dark:text-gray-200">Result: {item.label} ({item.confidence}%)</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">Image: {item.image_name}</p>
                       </div>
                       {/* Placeholder for Delete Button */}
                       <button disabled className="text-xs text-red-500 hover:text-red-700 disabled:opacity-50 ml-4 mt-1">
                           Delete (Soon)
                       </button>
                    </li>
                  ))}
                </ul>
              )
            )}
            <div className="mt-6">
                <Link href="/analysis" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    Perform New Analysis
                </Link>
            </div>
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

export default MyProfilePage; 