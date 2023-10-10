import * as Yup from 'yup'

const signUpSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(6).required('Required'),
    confirm_password: Yup.string()
        .required("Required")
        .oneOf([Yup.ref('password'), null], "Password don't match"),
    // agreeToTerms: Yup.boolean().oneOf([true], 'You must agree to the terms')
});

const signInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
});

export {signUpSchema, signInSchema};