import React, { useState, useEffect ,useRef} from 'react';
import Modal from 'react-modal';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditBlogModal = ({ isOpen, onClose, blog, onSave }) => {
  const [editedBlog, setEditedBlog] = useState(blog);
  const navigate = useNavigate();
  const params = useParams();
  const [id, setId] = useState('');
  const [creatorName, setCreatorName] = useState('');
  const editor = useRef(null);
  
  useEffect(() => {
    if (params?.slug) {
      fetchBlogDetails();
    } else if (blog) {
      setEditedBlog(blog);
    }
  }, [params?.slug, blog, isOpen]);

  const fetchBlogDetails = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:9999/api/v1/blog/getblog/${params.slug}`
      );
      setEditedBlog(data?.blog);
      setId(data?.blog._id);
      setCreatorName(data?.creatorName);
    } catch (error) {
      console.error('Error fetching blog details:', error);
    }
  };

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedBlog((prevBlog) => ({
      ...prevBlog,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put(`http://localhost:9999/api/v1/blog/updateblog/${id}`, editedBlog, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate("/recentblogs")
      console.log('Blog updated successfully:', res.data);
      onSave(editedBlog);
      onClose();
    } catch (error) {
      console.error('Error updating blog:', error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="modal-overlay fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg"
    >
      <div className="modal-content bg-white w-full max-w-lg p-4 rounded-lg shadow-lg overflow-y-auto max-h-screen">
        <h2 className="text-xl font-bold mb-4">Edit Blog</h2>
        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold" htmlFor="author">
            Author Name
          </label>
          <input
            id="author"
            name="author"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={editedBlog.author || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={editedBlog.title || ''}
            onChange={handleInputChange}
            className="mt-1 flex h-12 p-2 w-full border-gray-300 rounded-md shadow-sm border-2"
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 text-lg font-semibold" htmlFor="category">
            Category
          </label>
          <input
            id="category"
            name="category"
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            value={editedBlog.category || ''}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <ReactQuill
            ref={editor}
            modules={modules}
            theme="snow"
            value={editedBlog.content || ''}
            onChange={(value) => setEditedBlog((prevBlog) => ({ ...prevBlog, content: value }))}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditBlogModal;
