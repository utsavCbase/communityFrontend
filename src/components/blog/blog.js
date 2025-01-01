import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_BASE_URL, IMAGE_PATH } from '../../config';
import './blog.css';
import Header from '../header/header';
import Footer from '../footer/footer';

const BlogPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        // Retrieve the token from localStorage or any secure storage
        const token = localStorage.getItem('token'); 
        
        // Add Authorization header with Bearer token
        const response = await axios.get(`${API_BASE_URL}/blogs/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add the token here
          },
        });

        console.log(response.data);
        setBlog(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div>
      <Header />
      <div className="blog-page-container">
        {blog ? (
          <div className="blog-container">
            <div className="blog-header">
              <img 
                src={`${IMAGE_PATH}${blog.image}`} 
                alt={blog.title} 
                className="blog-image" 
              />
              <h1 className="blog-title">{blog.title}</h1>
              <p className="blog-date">Created on: {blog.created_at}</p>
              <p className="blog-author">Written by: {blog.created_by}</p>
              <p className="blog-community">Community: {blog.community}</p>
            </div>
            <div className="blog-content">
              <p>{blog.content}</p>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;
