'use client'; 

import React from 'react';
import Navbar from './Navbar';
import { AuthProvider } from '../context/AuthContext'; 

export default function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
    return (
        <AuthProvider> 
            <Navbar /> 
            <main className="pt-16">
                {children}
            </main>
        </AuthProvider>
    );
}