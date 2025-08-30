import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdOutlineEdit } from "react-icons/md";
import styles from "./UsersList.module.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  image: string;
};

export default function UsersList() {
  const navigate = useNavigate();
  let [users, setUsers] = useState<User[]>([]);
  const [show, setShow] = useState(false);
  let [userfirstName, setuserfirstName] = useState<string>("");
  const handleClose = () => setShow(false);
  const handleShow = (user: User) => {
    setShow(true);
    setuserfirstName(user.firstName);
    setUserId(user.id);
  };
  let [userId, setUserId] = useState<number | null>(null);

  let deleteUser = async () => {
    try {
      await axios.delete(`https://dummyjson.com/users/${userId}`);
      handleClose();
      toast.success("User deleted successfully");
      getUsers();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  let getUsers = async () => {
    try {
      let response = await axios.get("https://dummyjson.com/users");
      setUsers(response?.data?.users);
    } catch (error) {
      console.error(error);
    }
  };
  let moveToAdd = () => {
    navigate("/dashboard/add-user");
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3>Users List</h3>
        <button className={styles.addBtn} onClick={moveToAdd}>
          ADD NEW USER
        </button>
      </div>
      <hr />

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Profile</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <img src={user.image} alt="user" className={styles.avatar} />
                </td>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td className={styles.actions}>
                  <MdOutlineEdit
                    size={30}
                    color="#FEAF00"
                    onClick={() =>
                      navigate("/dashboard/add-user", {
                        state: { user, isUpdate: true },
                      })
                    }
                  />

                  <FaRegTrashAlt
                    size={20}
                    color="red"
                    onClick={() => handleShow(user)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* modal */}

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body> Do you want to delete {userfirstName}? </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="danger" onClick={() => deleteUser()}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
