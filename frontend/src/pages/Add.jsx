import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Add() {
  const [book, setBook]=useState({
    title:"",
    desc:"",
    price:"null",
    cover:"",
  });

  const navigate = useNavigate()

  const handleChange = (e)=>{
    setBook(prev=>({...prev,[e.target.name]: e.target.value}));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setBook((prev) => ({ ...prev, cover: file }));
    upload(file);
  };

  console.log(book )
  const handleClick = async (e)=>{
    e.preventDefault()
    try {
      await axios.post("http://localhost:8000/books",book)
      navigate('/')
    } catch (err) {
      console.log(err)
    }
  }

  const upload=async ()=>{
    try {
      const formData= new FormData();
      formData.append('file',book.cover)
      const res = await axios.post ("/upload",formData);
      console.log(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="form">
      <h1>Add New Book</h1>
      <input type="text" placeholder='title'  onChange={handleChange} name='title'/>
      <input type="text" placeholder='desc' onChange={handleChange} name='desc' />
      <input type="number" placeholder='price'  onChange={handleChange} name='price' />
      <input type="file" onChange={handleFileChange} name="cover" />
    <button onClick={handleClick}>Add</button>
    </div>
  )
}

export default Add