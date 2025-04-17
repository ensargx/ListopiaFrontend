import React from 'react';
import ReactDOM from 'react-dom/client';
// main.tsx
import { App } from './routes';

import '@/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
