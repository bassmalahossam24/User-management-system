import  { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext';

export default function Profile() {
  const { userData }:any = useContext(AuthContext);

  interface formData {
    firstName: string;
    lastName: string;
    age?: number;
    email: string;
    phone: string;
    birthDate: string;
    image: string;
  }

  const { register, reset } = useForm<formData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      age: undefined,
      email: "",
      phone: "",
      birthDate: "",
      image: ""
    }
  });

  useEffect(() => {
    if (userData) {
      reset({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        age: userData.age || "21",
        email: userData.email || "",
        phone: userData.phone || "+201234567890",
        birthDate: userData.birthDate || "1990-01-01",
        image: userData.image || ""
      });
    }
  }, [userData, reset]);

  return (
    <div className="container-fluid mt-5 px-3 px-md-5 align-content-center">
      <div className="mb-4 text-center">
        <h3>Profile</h3>
      </div>

      <hr />

      <div className="text-center mb-4">
        <img
          src={userData?.image || "https://via.placeholder.com/150"}
          alt="profile"
          className="rounded-circle border border-2 border-warning"
          style={{ width: "150px", height: "150px", objectFit: "cover" }}
        />
      </div>

      <form className="shadow-lg rounded-4 p-5 mt-3">
        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input type="text" className="form-control" id="firstName" {...register("firstName")} readOnly />
          </div>
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input type="text" className="form-control" id="lastName" {...register("lastName")} readOnly />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control" id="email" {...register("email")} readOnly />
          </div>
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="age" className="form-label">Age</label>
            <input type="number" className="form-control" id="age" {...register("age")} readOnly />
          </div>
        </div>

        <div className="row">
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input type="text" className="form-control" id="phone" {...register("phone")} readOnly />
          </div>
          <div className="col-12 col-md-6 p-2">
            <label htmlFor="birthDate" className="form-label">Birth Date</label>
            <input type="text" className="form-control" id="birthDate" {...register("birthDate")} readOnly />
          </div>
        </div>
      </form>
    </div>
  );
}
