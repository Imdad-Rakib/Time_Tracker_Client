/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function ResetPassword({ handleSubmit, values, handleChange, handleBlur, errors}){
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="bg-white p-8 shadow-md rounded-md w-80">
                <h1 className="text-2xl font-semibold text-center mb-4">Password Reset</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new_assword"
                            name="password"
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className='text-red-600'>{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm_Password"
                            name="confirm_password"
                            className="w-full mt-1 p-2 border rounded-md focus:outline-none focus:ring focus:border-blue-300"
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="••••••••"
                        />
                        {errors.confirm_password && <p className='text-red-600'>{errors.confirm_password}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}