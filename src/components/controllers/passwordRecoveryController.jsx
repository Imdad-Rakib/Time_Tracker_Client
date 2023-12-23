/* eslint-disable no-unused-vars */
import PasswordRecovery from "../views/passwordRecovery";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PasswordRecoveryController(){
    
    const [isFound, setIsFound] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    let navigate = useNavigate();
    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: {
            email: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Invalid email').required('Required'),
        }),
        onSubmit: async () => {
            localStorage.setItem('email', values.email);
            setIsLoading(true);
            try {
                let response = await fetch('https://time-tracker-api-6mlb.onrender.com/auth/forgotPass',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values),
                    })
                response = await response.json();
                setIsLoading(false);
                if(response.success){
                    setIsEmailSent(true);
                }
                else if(response.error){
                    setIsFound(false);
                    alert(response.error);
                }
                // else alert('Internal Server Error. Please try again')
            }
            catch (err) {
                setIsLoading(false);
                setIsEmailSent(false);
                alert('An error occured. Please try again');
            }

        },
    });
    useEffect(() =>{
        setIsFound(true);
        setIsEmailSent(false);
    }, [values.email])
    return(
        <PasswordRecovery
            handleSubmit={handleSubmit}
            values={values}
            handleChange={handleChange}
            handleBlur={handleBlur}
            errors={errors}
            isFound={isFound}
            isLoading={isLoading}
            isEmailSent={isEmailSent}
        />
    )
}