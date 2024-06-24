import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServerStatus = () => {
    const [status, setStatus] = useState('');

    useEffect(() => {
        axios.get('/server-status/')
            .then(response => {
                setStatus(response.data.status);
            })
            .catch(error => {
                setStatus('Error fetching server status');
                console.error('There was an error fetching the server status!', error);
            });
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold mb-4">Server Status</h1>
                <p className="text-gray-700">{status}</p>
            </div>
        </div>
    );
}

export default ServerStatus;
