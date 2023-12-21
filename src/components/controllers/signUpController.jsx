/* eslint-disable react/prop-types */
// external imports
import { useFormik } from 'formik';
import {useState} from 'react'

//internal imports
import {signUpSchema} from '../schemas/formValidation'
import SignUp from '../views/signUp';

export default function SignUpController({getFormData}){   
    
    const [isLoading, setIsLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm_password: '',
    }
    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues ,
        validationSchema: signUpSchema,
        onSubmit: async () => {
            getFormData(values);
            setIsLoading(true);
            try{
                let response = await fetch('http://localhost:8000/signUp/validateEmail', {
                    method: 'POST',
                    headers:{
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values)
                })
                response = await response.json();
                setIsLoading(false);
                if(response.error){
                    alert(response.error);
                }
                else{
                    setEmailSent(true);
                }
            }
            catch(err){
                alert('An error occurd. Please try again.')
                setIsLoading(false);
            }
            
        },
    });
    return(
        <SignUp
            values = {values}
            errors = {errors}
            handleChange = {handleChange}
            hanleBlur = {handleBlur}
            handleSubmit = {handleSubmit}
            emailSent = {emailSent}
            isLoading = {isLoading}
        />
    )
}