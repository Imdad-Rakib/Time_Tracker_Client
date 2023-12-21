/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import {useState, useEffect} from 'react';
import {Navigate, useNavigate} from 'react-router-dom'
import EmailValidation from '../views/emailValidation';

export default function EmailValidationController({userData}){
    
    const [OTP, setOTP] = useState('')
    const [count, setCount] = useState(60);
    const [otpError, setOtpError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    useEffect(() => {
        const timer = setInterval(() => {
            if (count > 0) {
                setCount(count - 1);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [count]);
    function handleChange(e){
        setOTP(e.target.value);
    }
    async function requestOTP() {
        try {
            setCount(0);
            setIsLoading(true);
            let response = await fetch('http://localhost:5000/users/validateEmail', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            response = await response.json();
            setIsLoading(false);
            if (response.error){
                alert(response.error);
            }
            else {
                setCount(60);
            }
        }
        catch (err) {
            setIsLoading(false);
            alert('An error occured. Please try again');
        }
    }
    async function sendOTP(){
        try{
            let response = await fetch('http://localhost:5000/users/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    OTP,
                })
            })
            response = await response.json();
            if(response.success) 
                navigate('/');
            else{
                setOtpError(response.error);
            }
        }
        catch(err){
            alert('An error occured. Please try again');
        }

    }
    
    if (Object.keys(userData).length === 0) {
        return <Navigate to = '/signup'/>;
    }
    else{
        return (
            <EmailValidation
                OTP={OTP}
                sendOTP={sendOTP}
                count={count}
                otpError={otpError}
                requestOTP={requestOTP}
                handleChange={handleChange}
                isLoading={isLoading}
            />
        )
    }
}