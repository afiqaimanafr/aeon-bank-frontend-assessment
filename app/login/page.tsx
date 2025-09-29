'use client'; 

import { useState } from 'react';
import { sha256 } from 'js-sha256';
import { useAuth } from '../context/AuthContext'; 

const AEON_PINK = 'bg-pink-500';
const AEON_LIGHT_PINK = 'bg-pink-100';
const AEON_DARK_ACCENT = 'text-gray-900';
const TEXT_WHITE = 'text-white';
const BORDER_PINK = 'border-pink-500';

const ALPHANUMERIC_REGEX = /^[a-zA-Z0-9]+$/;

export default function LoginFlow() {
  const { login } = useAuth(); 

  const [step, setStep] = useState(1); 
  const [isRedirecting, setIsRedirecting] = useState(false); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [secureWord, setSecureWord] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleRedirect = () => {
    setIsRedirecting(true); 
    setTimeout(() => { 
        window.location.href = '/'; 
    }, 100); 
  };

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedUsername = username.trim();

    if (!trimmedUsername) {
        setStatusMessage('Username cannot be empty.');
        return;
    }

    if (!ALPHANUMERIC_REGEX.test(trimmedUsername)) {
        setStatusMessage('Username must contain only letters and numbers.');
        setUsername(''); 
        return;
    }

    setLoading(true);
    setStatusMessage('Checking username...');
    
    try {
      const response = await fetch('/api/getSecureWord', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: trimmedUsername }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSecureWord(data.secureWord); 
        setStep(2);
      } else {
        setStatusMessage('Error fetching secure word.');
      }
    } catch (error) {
      console.error('API Error:', error);
      setStatusMessage('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleFinalLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setLoading(true);
    setStatusMessage('Attempting login...');
    
    const encryptedPassword = sha256.hex(password); 
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, encryptedPassword }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setStatusMessage(data.message); 
        login(); 
        setStep(4);
      } else {
        setStatusMessage('Login failed. Please check your password.');
        setStep(4);
      }
    } catch (error) {
      console.error('API Error:', error);
      setStatusMessage('Network error during final login.');
      setStep(4);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <form onSubmit={handleUsernameSubmit} className="space-y-6">
            <h2 className="text-2xl font-semibold">Step 1: Enter Username</h2>
            <p className="text-gray-600">Username must contain only letters and numbers.</p>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="e.g., aeoncustomer123"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${BORDER_PINK}`}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !username.trim()}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : `${AEON_PINK} ${TEXT_WHITE} hover:bg-pink-600`}`}
            >
              {loading ? 'Processing...' : 'Submit Username'}
            </button>
          </form>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Step 2: Security Check</h2>
            <p className="text-gray-600">Please confirm the secure word below.</p>
            
            <div className={`p-4 rounded-lg border-2 border-dashed ${BORDER_PINK} ${AEON_LIGHT_PINK}`}>
                <p className="text-sm font-medium text-gray-700">Your Secure Word:</p>
                <p className={`text-2xl font-bold ${AEON_DARK_ACCENT}`}>{secureWord}</p>
            </div>
            
            <button
              onClick={() => { setStep(3); setStatusMessage(''); }} 
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${AEON_PINK} ${TEXT_WHITE} hover:bg-pink-600`}
            >
              Next
            </button>
          </div>
        );

      case 3:
        return (
          <form onSubmit={handleFinalLogin} className="space-y-6">
            <h2 className="text-2xl font-semibold">Step 3: Enter Password</h2>
            <p className="text-gray-600">Your password will be hashed before submission.</p>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 ${BORDER_PINK}`}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !password.trim()}
              className={`w-full py-2 px-4 rounded-lg font-semibold transition-colors ${loading ? 'bg-gray-400 cursor-not-allowed' : `${AEON_PINK} ${TEXT_WHITE} hover:bg-pink-600`}`}
            >
              {loading ? 'Encrypting...' : 'Final Login (Secure Submit)'}
            </button>
          </form>
        );
      
      case 4:
        return (
            <div className={`p-8 rounded-lg shadow-xl text-center space-y-4 ${statusMessage.includes('successful') ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}>
                <h2 className="text-3xl font-bold">Login Status</h2>
                <p className="text-xl">{statusMessage}</p>
                
                {statusMessage.includes('successful') && (
                    <>
                        <p className="text-lg">Thank you for banking with AEON.</p>
                        <button
                            onClick={handleRedirect}
                            disabled={isRedirecting}
                            className={`mt-4 py-2 px-6 rounded-full font-semibold transition-colors 
                                ${isRedirecting ? 'bg-gray-400 cursor-wait' : 'bg-white text-green-500 hover:bg-gray-100'}`}
                        >
                            {isRedirecting ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"></path>
                                    </svg>
                                    Loading...
                                </span>
                            ) : (
                                'Go to Dashboard'
                            )}
                        </button>
                    </>
                )}
                {!statusMessage.includes('successful') && (
                    <button
                        onClick={() => { setStep(1); setPassword(''); setStatusMessage(''); }} 
                        className="mt-4 py-2 px-6 rounded-full font-semibold bg-white text-red-500 hover:bg-gray-100 transition-colors"
                    >
                        Try Again
                    </button>
                )}
            </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`flex justify-center items-center min-h-[calc(100vh-64px)] ${AEON_LIGHT_PINK}`}>
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-2xl">
        <div className="text-center mb-6">
          <h1 className={`text-4xl font-extrabold ${AEON_DARK_ACCENT}`}>AEON Login</h1>
          <div className="mt-2 text-sm text-pink-600 font-medium">
            Step {step} of 3 (excluding final status)
          </div>
        </div>
        
        {renderStepContent()}

        {statusMessage && step < 4 && (
          <div className={`mt-4 text-center p-3 rounded-lg text-sm ${statusMessage.includes('must contain') || statusMessage.includes('Error') ? 'bg-red-100 text-red-800' : (loading ? 'bg-yellow-100 text-yellow-800' : 'bg-pink-100 text-pink-600')}`}>
            {statusMessage}
          </div>
        )}
      </div>
    </div>
  );
}