import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Create = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const navigate = useNavigate();

  const calculateNextId = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      const users = response.data;
      const maxId = users.length > 0 ? Math.max(...users.map(user => user.id)) : 0;
      return maxId + 1;
    } catch (error) {
      console.error('Error calculating next ID', error);
      return 1; // Default to 1 if there's an error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextId = await calculateNextId();
    const StringId = nextId.toString();
    axios
      .post('http://localhost:8000/users', { ...values, id: StringId })
      .then((response) => {
        console.log(response);
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="my-home d-flex flex-column justify-content-center align-items-center gap-4 mt-3">
      <div className="w-75 p-4 shadow rounded-5">
        <h1>Users Information</h1>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            name="username"
            placeholder="Enter Username"
            className="mb-2 p-2"
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            className="mb-2 p-2"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Phone"
            className="mb-2 p-2"
            onChange={(e) => setValues({ ...values, phone: e.target.value })}
          />

          <div>
            <button className="btn btn-primary me-2" type="submit">
              Submit
            </button>
            <Link to="/" className="btn btn-primary">
              Back
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
