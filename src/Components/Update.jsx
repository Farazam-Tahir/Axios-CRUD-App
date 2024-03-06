import React, { useState,useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';


const Update = () => {
    // const [data, setData] = useState([]);
    const {id} = useParams();
    const [values, setValues] = useState({
        name: '',
        email: '',
        phone: ''
      });
      const navigate = useNavigate();

    useEffect(()=>{
    axios.get('http://localhost:8000/users/' + id)
      .then(response => {
        setValues(response.data)
    })
      .catch(err => console.log(err))
    }, [])

    const updateData =(e)=>{
        e.preventDefault();
        axios.put('http://localhost:8000/users/' + id, values)
        .then((response)=>{
            // console.log(response);
            navigate('/');
        })
        .catch((err)=> console.log(err))
    }
  return (
    <div className="my-home d-flex flex-column justify-content-center align-items-center gap-4 mt-3">
    <div className="w-75 p-4 shadow rounded-5">
      <h1>Users Information</h1>
      <form className="d-flex flex-column" onSubmit={updateData}>
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          name="username"
          className="mb-2 p-2"
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />

        <label htmlFor="email">Email</label>
        <input
          type="text"
          name="email"
          className="mb-2 p-2"
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />

        <label htmlFor="phone">Phone</label>
        <input
          type="text"
          name="phone"
          className="mb-2 p-2"
          value={values.phone}
          onChange={(e) => setValues({ ...values, phone: e.target.value })}

        />

        <div>
          <button className="btn btn-primary me-2" type="submit">
            Update
          </button>
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Update
