import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import SocketsProvider from './context/socket.context';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// SocketsProvider wraps App making it accessable to all components in our app.
root.render(
  <React.StrictMode>
    <SocketsProvider> 
      <App />
    </SocketsProvider>
  </React.StrictMode>
);
