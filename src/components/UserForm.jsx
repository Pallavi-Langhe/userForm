import React, { useState } from "react";
import * as Yup from "yup";
import "../App.css";

const UserForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interest: [],
    birthDate: "",
  });

  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object({
    firstName: Yup.string().required("first Name is required"),
    lastName: Yup.string().required("last Name is required"),
    email: Yup.string().email("Invalid email").required("email is required"),
    phoneNumber: Yup.string()
      .required()
      .matches(/^\d{10}$/, "phone number must be 10 digits"),
    password: Yup.string()
      .required("password is required")
      .min(8, "pass must be more than 8 char")
      .matches(/[0-9]/, "muct contain digit")
      .matches(/[a-z]/, "must contain lowercaes letter")
      .matches(/[A-Z]/, "must contain uppercase letter"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "pass must match")
      .required("confirmpass is required"),
    age: Yup.number()
      .required()
      .typeError("age must be a number")
      .min(18, "must be min 18")
      .max(100, "must be max 100"),
    gender: Yup.string().required(),
    interest: Yup.array().min(1, "select atleast 1").required(),
    birthDate: Yup.date().required(),
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("data submitted");
    } catch (error) {
      const newErrors = {};

      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterest = [...formData.interest];

    if (checked) {
      updatedInterest.push(name);
    } else {
      updatedInterest = updatedInterest.filter((interest) => interest !== name);
    }
    setFormData({
      ...formData,
      interest: updatedInterest,
    });
  };

  return (
    <form className="form" onSubmit={handlesubmit}>
      <div>
        <label>First Name: </label>
        <input
          type="txet"
          name="firstName"
          value={formData.firstName}
          placeholder="Enter your first name"
          onChange={handleChange}
        />
        {errors.firstName && (
          <div className="error" style={{ color: "red" }}>
            {errors.firstName}
          </div>
        )}
      </div>

      <div>
        <label>Last Name: </label>
        <input
          type="txet"
          name="lastName"
          value={formData.lastName}
          placeholder="Enter your last name"
          onChange={handleChange}
        />
        {errors.LastName && (
          <div className="error" style={{ color: "red" }}>
            {errors.LastName}
          </div>
        )}
      </div>

      <div>
        <label>Email: </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your Email"
          onChange={handleChange}
        />
        {errors.email && (
          <div className="error" style={{ color: "red" }}>
            {errors.email}
          </div>
        )}
      </div>

      <div>
        <label>Phone Number: </label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          placeholder="Enter your Phone Number"
          onChange={handleChange}
        />
        {errors.phoneNumber && (
          <div className="error" style={{ color: "red" }}>
            {errors.phoneNumber}
          </div>
        )}
      </div>

      <div>
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter your Password"
          onChange={handleChange}
        />
        {errors.password && (
          <div className="error" style={{ color: "red" }}>
            {errors.password}
          </div>
        )}
      </div>

      <div>
        <label>Confirm Password: </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          placeholder="Enter your Confirm Password"
          onChange={handleChange}
        />
        {errors.confirmPassword && (
          <div className="error" style={{ color: "red" }}>
            {errors.confirmPassword}
          </div>
        )}
      </div>

      <div>
        <label>Age: </label>
        <input
          type="number"
          name="age"
          value={formData.age}
          placeholder="Enter your age"
          onChange={handleChange}
        />
        {errors.age && (
          <div className="error" style={{ color: "red" }}>
            {errors.age}
          </div>
        )}
      </div>

      <div>
        <label>Gender: </label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        {errors.gender && (
          <div className="error" style={{ color: "red" }}>
            {errors.gender}
          </div>
        )}
      </div>

      <div>
        <label>Interests: </label>
        <label>
          <input
            type="checkbox"
            name="reading"
            checked={formData.interest.includes("reading")}
            onChange={handleCheckboxChange}
          />
          Reading
        </label>
        <label>
          <input
            type="checkbox"
            name="coding"
            checked={formData.interest.includes("coding")}
            onChange={handleCheckboxChange}
          />
          Coding
        </label>
        <label>
          <input
            type="checkbox"
            name="sports"
            checked={formData.interest.includes("sports")}
            onChange={handleCheckboxChange}
          />
          sports
        </label>
        {errors.interest && (
          <div className="error" style={{ color: "red" }}>
            {errors.interest}
          </div>
        )}
      </div>

      <div>
        <label>Date of birth: </label>
        <input
          type="date"
          name="birthDate"
          value={formData.birthDate}
          placeholder="Enter your Birth date"
          onChange={handleChange}
        />
        {errors.birthDate && (
          <div className="error" style={{ color: "red" }}>
            {errors.birthDate}
          </div>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
