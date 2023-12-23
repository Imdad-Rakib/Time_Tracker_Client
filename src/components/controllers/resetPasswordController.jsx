/* eslint-disable no-unused-vars */
import { useFormik } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
// internal imports
import ResetPassword from "../views/resetPassword";
export default function ResetPasswordController() {
    const initialValues = {
        password: '',
        confirm_password: '',
    }
    const navigate = useNavigate();
    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: Yup.object().shape({
            password: Yup.string().min(6).required('Required'),
            confirm_password: Yup.string()
                .required("Required")
                .oneOf([Yup.ref('password'), null], "Password don't match"),
        }),
        onSubmit: async () => {
            try {
                let reqBody = {
                    email: localStorage.getItem('email'),
                    password: values.password,
                }
                let response = await fetch('https://time-tracker-api-6mlb.onrender.com/auth/changePass',
                    {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(reqBody),
                    })
                response = await response.json();
                if(response.error){
                    alert(response.error);
                }
                else{
                    localStorage.removeItem('email');
                    navigate('/login');
                }

            }
            catch (err) {
                alert('An error occured. Please try again');
            }

        },
    });
    return(
        localStorage.getItem('email') ? 
            (<ResetPassword
                handleSubmit={handleSubmit}
                values={values}
                handleChange={handleChange}
                handleBlur={handleBlur}
                errors={errors}
            />)
            :
            <Navigate to = '/signup'/>
    )
}