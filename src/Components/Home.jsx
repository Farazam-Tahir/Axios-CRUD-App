import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';


const Home = () => {
    const [data, setData] = useState([]);
    const navigate = useNavigate()

  useEffect(()=>{
    axios.get('http://localhost:8000/users')
      .then(response => setData(response.data))
      .catch(err => console.log(err))
    }, [])

const handleDelete = (id)=>{
  const confirm = window.confirm('Do you really want to delete id' + id)
  if (confirm) {
    axios.delete('http://localhost:8000/users/' + id)
      .then(response => {
        window.location.reload();
      })
      .catch(err => console.log(err))

  }
}
  return (
    <div className='my-home d-flex flex-column justify-content-center align-items-center gap-4 mt-3'>
      <h1>Users Information</h1>
      <div className='w-75 p-4 shadow rounded-5'>
        <div className='d-flex justify-content-end'>
            <Link to='/create' className='btn btn-success'>Add+</Link>
        </div>
        <table className='table'>
            <thead>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>PHONE</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map((data, index)=>
                <tr key={index}>
                <td>{data.id}</td>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td>
                    <Link to={`/update/${data.id}`} className='btn btn-sm btn-primary me-2'>Edit</Link>
                    <button className='btn btn-sm btn-danger' onClick={(e)=>handleDelete(data.id)}>Delete</button>
                </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Home
