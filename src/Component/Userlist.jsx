import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteUser, getuser } from "../Api/Api";

const Userlist = () => {
  const history = useNavigate();

  const [user, setUser] = useState([]);

  const getAllUser = async () => {
    const response = await getuser();
    // console.log(response.data);
    setUser(response.data);
  };

  const removeUser = async (id) => {
    await deleteUser(id);
    getAllUser();
  };

  const editHandle = () => {
    history("/update-user");
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Password</th>
            <th>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {user.map((value) => {
            const { name, email, phone, address, id } = value;
            return (
              <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{address}</td>
                <td>
                  <Link to={`/update-user/${id}`}>edit</Link>
                </td>
                <td>
                  <button onClick={() => removeUser(id)}>remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Userlist;
