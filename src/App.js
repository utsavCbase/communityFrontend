import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/auth/login';
import Signup from './components/auth/signup';
import HomePage from './components/home/homePage';
import BlogList from './components/blog/blogList';
import AddBlog from './components/blog/addBlog';
import { AuthProvider } from './context/authContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/add-blog" element={<AddBlog />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
