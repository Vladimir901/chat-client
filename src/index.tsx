import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFoundPage from './components/NotFoundPage/NotFoundPage';
import ChatPage from './components/ChatPage/ChatPage';
import AuthPage from './components/AuthPage/AuthPage';
import { store } from './store'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App/>}/>
        <Route path="/auth" element={<AuthPage/>}/>
        <Route path="/chat" element={<ChatPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </BrowserRouter>
  </Provider>
);
