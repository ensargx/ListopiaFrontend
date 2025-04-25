import React from 'react';
import ReactDOM from 'react-dom/client';
// main.tsx
import App from './routes';

import '@/styles/index.css';
import { AuthProvider } from './AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
