import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./EditUser.css";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: "", last_name: "", email: "" });

  useEffect(() => {
    axios.get(`https://reqres.in/api/users/${id}`).then((response) => {
      setUser(response.data.data);
    });
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`https://reqres.in/api/users/${id}`, user);
      alert("User updated successfully!");
      navigate("/users");
    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit User</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" className="form-control mb-2" value={user.first_name} onChange={(e) => setUser({...user, first_name: e.target.value})} />
        <input type="text" className="form-control mb-2" value={user.last_name} onChange={(e) => setUser({...user, last_name: e.target.value})} />
        <input type="email" className="form-control mb-2" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})} />
        <button type="submit" className="btn btn-primary">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
