import React, { useRef, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { AuthErrorCodes } from 'firebase/auth'; // Import Firebase Auth error codes

function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, signup, googleSignIn} = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  if (currentUser) {
    return <Navigate to="/" />;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate('/');
    } catch (error) {
      switch (error.code) {
        case AuthErrorCodes.EMAIL_EXISTS:
          setError('Email address is already in use');
          break;
        case AuthErrorCodes.WEAK_PASSWORD:
          setError('Password should be at least 6 characters long');
          break;
        default:
          setError('Failed to create an account');
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
      setError('Failed to sign up with Google');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
        <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign Up</h2>
            {error && <p className="mt-2 text-center text-sm text-red-600">{error}</p>}
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input type="email" id="email" ref={emailRef} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">Password</label>
            <input type="password" id="password" ref={passwordRef} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-4">
            <label htmlFor="password-confirm" className="block text-gray-700">Confirm Password</label>
            <input type="password" id="password-confirm" ref={passwordConfirmRef} required className="w-full px-3 py-2 border rounded" />
            </div>
            <button type="submit" disabled={loading} className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Sign Up
            </button>
        </form>
        <div className="text-center">
            Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
            <p>OR</p>
        </div>
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Sign Up with Google
          </button>
        </div>
        </div>
    </div>
  );
}

export default Signup;
