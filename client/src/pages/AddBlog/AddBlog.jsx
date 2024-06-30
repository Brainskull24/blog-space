import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axiosConfig from '../../utils/axiosConfig';
const AddBlog = () => {
  const editor = useRef(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [excerpt, setExcerpt] = useState('');
  const navigate = useNavigate();
  
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('content', content);
    formData.append('category', category);
    formData.append('excerpt', excerpt);
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const response = axiosConfig.post('/api/v1/blog/addblog', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response:', response); // Log the response

      if (response && response.data) {
        alert(response.data.message);
        navigate('/');
      } else {
        alert('Unexpected error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error creating blog:', error);
      alert('Failed to create blog. Please check your input and try again.');
    }
  };

  return (
    <div className="flex w-full h-fit flex-col items-center justify-center px-10 py-5">
      <h1 className="flex text-2xl font-bold">Add Blog</h1>
      <div className="flex flex-col w-[70%] px-10 py-5 h-fit space-y-5">
        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold" htmlFor="author">
            Author Name
          </label>
          <input
            id="author"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold" htmlFor="title">
            Title
          </label>
          <input
            id="title"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold" htmlFor="coverImage">
            Cover Image
          </label>
          <input
            id="coverImage"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="file"
            onChange={(e) => setCoverImage(e.target.files[0])}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold" htmlFor="excerpt">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col h-60">
          <label className="mb-1 text-lg font-semibold" htmlFor="content">
            Content
          </label>
          <ReactQuill
            ref={editor}
            modules={modules}
            theme="snow"
            value={content}
            onChange={setContent}
            style={{height:"100px"}}
          />
        </div>
        <div className='flex'>

        <button
          type="submit"
          className="w-fit flex px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSubmit}
          >
          Create Blog
        </button>
          </div>
      </div>
    </div>
  );
};

export default AddBlog;
