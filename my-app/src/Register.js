import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
// import CustomSelect from './CustomSelect'

import axios from "axios";
// import "./register.css"

const options = [
  { value: 1, label: " دیپلم" },
  { value: 2, label: "لیسانس" },
  { value: 3, label: "فوق لیسانس" },
  { value: 4, label: "دکتری" },
];
const validate = (values) => {
  const errors = {};
  if (!values.firstName) {
    errors.firstName = "Required";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less";
  }

  if (!values.lastName) {
    errors.lastName = "Required";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (
    values.option === ""
      ? " "
      : (errors.option = (
          <input type="text" placeholder="محل تحصیل" className="mt-3" />
        ))
  )
    return errors;
};

const Register = () => {
  const [Data, setData] = useState("");
   let [states, setStates] = useState("");
  useEffect(() => {
    axios.get("/city.json").then((res) => setData(res.data));
  }, []);
  // Pass the useFormik() hook initial form values, a validate function that will be called when
  // form values change or fields are blurred, and a submit function that will
  // be called when the form is submitted
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      education: "",
      mahaltahsil: "",
      province:"",
      city:""
    },
    //  validate,
    onSubmit: (values) => {
        axios.post("http://localhost:3000/profile", {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        });
        alert(JSON.stringify(values, null, 2));
      },
    });

 

  return (
    <form onSubmit={formik.handleSubmit}>
      <h3 className="text-center"> ثبت نام</h3>
      <label htmlFor="firstName">:نام</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.firstName}
      />
      {formik.errors.firstName ? <div>{formik.errors.firstName}</div> : null}

      <label htmlFor="lastName"> :نام خانوادگی </label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />
      {formik.errors.lastName ? <div>{formik.errors.lastName}</div> : null}

      <label htmlFor="email">پست الکترونیک</label>
      <input
        id="email"
        name="email"
        type="email"
        placeholder="پست الکترونیک"
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.email}
      />
      {formik.errors.email ? <div>{formik.errors.email}</div> : null}

      <label htmlFor="‌password">کلمه عبور</label>
      <input
        id="password"
        type="password"
        name="password"
        placeholder="کلمه عبور"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      <select
        name="education"
        onChange={formik.handleChange}
        className="form-select select-size"
        type="email"
        placeholder="میزان تحصیلات"
      >
        <option value="" disabled selected hidden>
          میزان تحصیلات
        </option>

        <option value="CONSTANCY">سیکل</option>
        <option value="diploma">دیپلم</option>
        <option value="COMPLEMENT">فوق دیپلم</option>
        <option value="COMPLEMENT">لیسانس</option>
        <option value="COMPLEMENT">فوق لیسانس</option>
        <option value="COMPLEMENT">دکترا</option>
      </select>
      {/* <div style={{display:"flex"}}> 
       <label htmlFor="option">تحصیلات </label>
         <CustomSelect
           id="option"
        className='input'
        onChange={value=>formik.setFieldValue('job',value.value)}
        value={formik.values.job}
        options={options}
        />
      {formik.errors.job ? <div className='error'>{formik.errors.job}</div> : null}

      </div> */}

      {formik.values.education === "" ? (
        " "
      ) : (
        <input
          type="text"
          name="mahaltahsil"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.mahaltahsil}
          placeholder="محل تحصیل"
          className="mt-3"
        />
      )}
       <select
            className="select"
            onChange={formik.handleChange}
            value={formik.values.province}
            name="province"
            style={{ display: "block" }}
          >
            <option hidden>استان</option>
            {Object.keys(Data).map((State) => {
              return <option>{State}</option>;
            })}
          </select>
          <select 
                        name = 'city'
                        className='register selectEducation' 
                        as="select"
                        onChange={formik.handleChange}
                        value={formik.values.city}
                    >
                        <option value={'notchooseCity'}>شهرستان</option>
                        {Data[formik.values.province] !== undefined && Data[formik.values.province].map(item => (
                            <option value={item}>{item}</option>
                        ))}
                    </select>

      <button type="submit" disabled={formik.isSubmitting}>
        ورود
      </button>
    </form>
  );
};
export default Register;
