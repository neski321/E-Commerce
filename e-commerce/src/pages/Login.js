import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthErrorCodes } from 'firebase/auth';

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { currentUser, login, googleSignIn } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      console.log(error.code);
      // Handle errors
      switch (error.code) {
        case AuthErrorCodes.INVALID_LOGIN_CREDENTIALS:
          setError('The password and email address do not match please try again or Create an account.');
          break;
        default:
          setError('Failed to Log in');
          break;
      }
    }

    setLoading(false);
  }

  async function handleGoogleSignIn() {
    try {
      setError('');
      setLoading(true);
      await googleSignIn();
      navigate('/');
    } catch {
      setError('Failed to log in with Google');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Log In</h2>
            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700">Email</label>
                    <input type="email" id="email" ref={emailRef} required className="w-full px-3 py-2 border rounded" />
                    </div>
                    <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700">Password</label>
                    <input type="password" id="password" ref={passwordRef} required className="w-full px-3 py-2 border rounded" />
                    </div>
                <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Log In
                </button>
            </form>
            <div className="text-center">
                Need an account? <Link to="/signup" className="text-blue-500 hover:underline">Sign Up</Link>
                <p>OR</p>
            </div>
            <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
