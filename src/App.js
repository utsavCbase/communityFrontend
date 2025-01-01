import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import HomePage from './components/home/homePage';
import BlogList from './components/blog/blogList';
import Post from './components/blog/addBlog';
import EnrollInCommunity from './components/blog/enrollCommunity';
import BlogPage from './components/blog/blog';

import Notification from './components/notification/notification';
import { AuthProvider } from './context/authContext';


function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/create-post" element={<Post />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/enroll" element={<EnrollInCommunity />} />
          <Route path="/blogs/:id" element={<BlogPage />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
