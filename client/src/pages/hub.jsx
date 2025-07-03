// import React, { useState } from 'react';
// import { Routes, Route, Navigate } from 'react-router-dom';
// import Chat from './components/Chat';
// import AudioPlayer from './components/AudioPlayer';
// import FormationDesigner from './components/FormationDesigner';
// import Login from './pages/log-in';
// import SignUp from './pages/sign-in';
// import Home from './pages/home';
// import './App.css';
//
// function Hub() {
//     const [currentUser, setCurrentUser] = useState(null);
//     const [currentRoom] = useState('MainRoom');
//     const [activeTab, setActiveTab] = useState('chat');
//
//     const handleLogin = (userData) => {
//         setCurrentUser(userData);
//     };
//
//     const handleLogout = () => {
//         setCurrentUser(null);
//     };
//
//     // Protected Route Component
//     const ProtectedContent = () => {
//         if (!currentUser) {
//             return <Navigate to="/login" />;
//         }
//
//         return (
//             <div className="app">
//                 <div className="sidebar">
//                     <div className="user-info">
//                         <span>Welcome, {currentUser.pref_name}!</span>
//                     </div>
//                     <button
//                         className={`tab-button ${activeTab === 'chat' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('chat')}
//                     >
//                         Chat
//                     </button>
//                     <button
//                         className={`tab-button ${activeTab === 'formation' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('formation')}
//                     >
//                         Formation
//                     </button>
//                     <button
//                         className={`tab-button ${activeTab === 'audio' ? 'active' : ''}`}
//                         onClick={() => setActiveTab('audio')}
//                     >
//                         Audio
//                     </button>
//                     <button
//                         className="tab-button logout"
//                         onClick={handleLogout}
//                     >
//                         Logout
//                     </button>
//                 </div>
//
//                 <div className="main-content">
//                     {activeTab === 'chat' && (
//                         <Chat currentUser={currentUser} currentRoom={currentRoom} />
//                     )}
//                     {activeTab === 'formation' && (
//                         <FormationDesigner />
//                     )}
//                     {activeTab === 'audio' && (
//                         <AudioPlayer audioFile="example.mp3" />
//                     )}
//                 </div>
//             </div>
//         );
//     };
//
//     return (
//         <Routes>
//             <Route path="/login" element={
//                 currentUser ? <Navigate to="/" /> : <Login onLogin={handleLogin} />
//             } />
//             <Route path="/signup" element={
//                 currentUser ? <Navigate to="/" /> : <SignUp />
//             } />
//             <Route path="/home" element={<Home />} />
//             <Route path="/" element={<ProtectedContent />} />
//         </Routes>
//     );
// }
//
// export default Hub;
