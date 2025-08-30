import axios from 'axios';
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function AddUser() {
  interface formData  {
    firstName: string ,
    lastName: string ,
    age: number ,
    email: string ,
    phone: string ,
    birthDate: string
  }

  let navigate = useNavigate();
  let location = useLocation();
  const selectedUser = location.state?.user; // جاي من UsersList
  const isUpdate = Boolean(selectedUser);

  const { register, handleSubmit, formState:{ errors }, reset } = useForm<formData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: undefined,
      email: "",
      phone: "",
      birthDate: ""
    }
  });

 
  useEffect(() => {
    if (selectedUser) {
      reset({
        firstName: selectedUser.firstName || "",
        lastName: selectedUser.lastName || "",
        age: selectedUser.age || undefined,
        email: selectedUser.email || "",
        phone: selectedUser.phone || "",
        birthDate: selectedUser.birthDate || ""
      });
    }
  }, [selectedUser, reset]);

  const onSubmit = async (data: formData) => {
    try {
      if (isUpdate) {
        await axios.put(`https://dummyjson.com/users/${selectedUser.id}`, data);
        toast.success("User updated successfully!");
      } else {
        await axios.post("https://dummyjson.com/users/add", data);
        toast.success("User added successfully!");
      }
      navigate("/dashboard/users-list");
    } catch (error) {
      toast.error(isUpdate ? "Failed to update user" : "Failed to add user");
    }
  };

  return (
    <div className="container-fluid mt-5 px-3 px-md-5 align-content-center">
      <div className="mb-4">
        <h3 className="text-center text-md-start">
          {isUpdate ? "Update User" : "Add User"}
        </h3>
      </div>

      <hr />

      <form className="shadow-lg rounded-4 p-5 mt-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              placeholder="Enter first name"
              {...register("firstName" , { required : "First name is required" })}
            />
            {errors.firstName && <p className='text-danger'>{errors.firstName.message}</p>}
          </div>
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              placeholder="Enter last name"
              {...register("lastName" , { required : "Last name is required" })}
            />
            {errors.lastName && <p className='text-danger'>{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter Email"
              {...register("email" , { required : "Email is required" })}
            />
            {errors.email && <p className='text-danger'>{errors.email.message}</p>}
          </div>
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="age" className="form-label">Age</label>
            <input
              type="number"
              className="form-control"
              id="age"
              placeholder="Enter Age"
              {...register("age", {
                required: "Age is required",
                max: { value: 100, message: "Age cannot exceed 100" },
                min: { value: 1, message: "Age must be at least 1" }
              })}
            />
            {errors.age && <p className='text-danger'>{errors.age.message}</p>}
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="number"
              className="form-control"
              id="phone"
              placeholder="Enter Phone Number"
              {...register("phone" , { required : "Phone number is required" })}
            />
            {errors.phone && <p className='text-danger'>{errors.phone.message}</p>}
          </div>
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="birthDate" className="form-label">Birth Date</label>
            <input
              type="text"
              className="form-control"
              id="birthDate"
              placeholder="Enter Birth Date"
              {...register("birthDate" , { required : "Birth date is required" })}
            />
            {errors.birthDate && <p className='text-danger'>{errors.birthDate.message}</p>}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="btn btn-warning mt-3 w-50 text-white"
          >
            {isUpdate ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
