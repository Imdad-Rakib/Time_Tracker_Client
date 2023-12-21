// external imports
import { Navigate, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

// internal imports
import { signInSchema } from '../schemas/formValidation';
import Login from '../views/login';


export default function LoginController() {

    const initialValues = {
        email: '',
        password: '',
    }
    const navigate = useNavigate();
    const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signInSchema,
        onSubmit: async () => {
            try {
                let response = await fetch('http://localhost:8000/auth/login', 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(values),
                    credentials: 'include'
                }) 
                response = await response.json();
                if(response.error)
                    alert(response.error);
                else{
                    localStorage.setItem('id', response.id);
                    navigate('/');
                }
            }
            catch (err) {
                alert('An error occured. Please try again');
            }

        },
    });
    return (
        (localStorage.getItem('id') === null ?        
            <Login
                handleSubmit = {handleSubmit}
                values = {values}
                handleChange = {handleChange}
                handleBlur = {handleBlur}
                errors = {errors}
            />
            :
            <Navigate to = '/'/>
        )
    );
}
