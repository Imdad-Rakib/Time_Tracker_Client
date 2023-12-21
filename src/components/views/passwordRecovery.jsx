/* eslint-disable react/prop-types */
import Spinner from "./cssAnimation/spinner";
export default function PasswordRecovery({handleSubmit, values, handleChange, handleBlur, errors, isFound, isLoading,isEmailSent }){
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Password Recovery</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="xyz@gmail.com"
                            className="mt-1 p-2 w-full rounded-md border border-gray-300 focus:ring focus:ring-blue-200 focus:outline-none"
                        />
                        {errors.email && <p className='text-red-600'>{errors.email}</p>}
                        {!isFound && <p className='text-red-600'>No such Email</p>}
                    </div>
                    {isEmailSent ?
                        <h3 className='text-green-600'>A password reset link sent to your email</h3>
                        :
                        ( isLoading ?
                            <Spinner/>
                            :
                            <button
                            type="submit"
                            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none">
                            Submit
                            </button>
                        )
                    }
                </form>
            </div>
        </div>
    );
}