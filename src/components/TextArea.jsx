import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './TextArea.css';

const modules = {
  toolbar: {
    container: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['bold', 'italic', 'underline'],
      ['link'],
      [{ 'align': [] }],
      ['clean']
    ],
  },
};

const formats = [
  'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'link', 'image', 'align'
];



export default function MyComponent() {
  



  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const saveNote = async () => {
    try {
      const response = await axios.post('https://textimagesaver.vercel.app/api/message/send', { message: value });
      const { id } = response.data;

      navigate(`/${id}`);
    } catch (error) {
      console.error("Error saving the note", error);
    }
  };
  

  
  return (
    <>
      <h2>TextSaver</h2>
      <p>Automatically will be deleted in 2 days</p>
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        modules={modules}
        formats={formats}
        placeholder="Write your note here..."
      />
      <button onClick={saveNote} className='saveBtn'>Save Note</button>
    </>
  );
}
