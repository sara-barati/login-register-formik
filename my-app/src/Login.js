import React from 'react';
import { Formik } from 'formik';
import {useState ,useContext} from 'react';
import axios from "axios";
import {valueContext} from "./ContextUser";

export default function Login() {
    const {setLoggedInUsers ,setIsSignin} = useContext(valueContext);
  return (
    <div>
    <h3 className="text-center"> خوش آمدید</h3>
     <Formik
       initialValues={{ email: '', password: '' }}
       validate={values => {
         const errors = {};
         if (!values.email) {
           errors.email = 'Required';
         } else if (
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
         ) {
           errors.email = 'Invalid email address';
         }
         if (!values.password) {
            errors.password = 'Required';
          } else if (
            values.password.length<6
          ) {
            errors.email = 'password in too short';
          }
         return errors;
       }}
       onSubmit={(values, { setSubmitting }) => {
         setTimeout(() => {
           alert(JSON.stringify(values, null, 2));
           setSubmitting(false);
         }, 3000);
         axios.get(" http://localhost:3000/profile").then((res) => {
            res.data.map((data) => {
                if (data.email === values.email && data.password === values.password) {
    
                    setLoggedInUsers((preveState) => [...preveState, data]);
                    setIsSignin(true);
                }
            });
         });
       }}
  
     >
       {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
         /* and other goodies */
       }) => (
         <form onSubmit={handleSubmit}>
           <input
             type="email"
             name="email"
             placeholder="پست الکترونیک"
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.email}
           />
           {errors.email && touched.email && errors.email}
           <input
             type="password"
             name="password"
             placeholder="کلمه عبور" 
             onChange={handleChange}
             onBlur={handleBlur}
             value={values.password}
           />
           {errors.password && touched.password && errors.password}
           <a href="#" className="mb-3 ">  فراموش کردید؟</a>
           <button type="submit" disabled={isSubmitting}>
           ورود
           </button>
         </form>
       )}
     </Formik>
   </div>
 );
  
}
