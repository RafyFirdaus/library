import { Outlet, NavLink } from 'react-router-dom';
import Player from './Player';
import { useState } from 'react';

export default function Layout({ currentSong, onNext, onPrevious }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-br from-gray-900 via-spotify-black to-gray-900">
      {/* Hamburger Menu Button (visible on mobile) */}
      <button 
        className={`md:hidden fixed top-4 z-50 text-white p-2 rounded-md bg-black bg-opacity-70 transition-all duration-300 ${
          sidebarOpen ? 'left-[240px]' : 'left-4'
        }`}
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={
            sidebarOpen 
              ? "M6 18L18 6M6 6l12 12" // X icon when open
              : "M4 6h16M4 12h16M4 18h16" // Hamburger icon when closed
          } />
        </svg>
      </button>

      {/* Sidebar - transforms on mobile, static on desktop */}
      <div 
        className={`fixed md:static md:w-72 bg-black bg-opacity-50 backdrop-blur-lg p-6 flex flex-col border-r border-gray-800 h-full z-40 transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center space-x-3 mb-10">
          <div className="w-10 h-10 bg-spotify-green rounded-lg flex items-center justify-center">
            <span className="text-2xl font-bold text-spotify-black">B</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-spotify-green to-green-400 text-transparent bg-clip-text">
            Beatify
          </h1>
        </div>

        <nav className="space-y-4 mb-8">
          <NavLink 
            to="/library"
            className={({ isActive }) =>
              `w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 text-white
              ${isActive ? 'bg-spotify-dark' : 'hover:bg-opacity-70'}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="text-spotify-green">🎵</span>
            <span>Library</span>
          </NavLink>
          <NavLink 
            to="/add-music"
            className={({ isActive }) =>
              `w-full text-left px-4 py-3 rounded-lg transition-all flex items-center space-x-3 text-white
              ${isActive ? 'bg-spotify-dark' : 'hover:bg-opacity-70'}`
            }
            onClick={() => setSidebarOpen(false)}
          >
            <span className="text-spotify-green">➕</span>
            <span>Add Music</span>
          </NavLink>
        </nav>

        <div className="mt-auto mb-24 p-4 bg-gradient-to-r from-spotify-green/10 to-transparent rounded-lg">
          <p className="text-sm text-gray-300">
            Created by [MHD Rafy Firdaus]<br/>
            Final Project - 2024
          </p>
        </div>
      </div>

      {/* Overlay to close sidebar when clicking outside (mobile only) */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 overflow-auto md:overflow-y-auto pt-14 md:pt-0">
        <Outlet />
      </div>

      {/* Player */}
      {currentSong && (
        <div className="fixed bottom-0 left-0 right-0 bg-black bg-opacity-90 backdrop-blur-lg border-t border-gray-800">
          <Player 
            song={currentSong} 
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </div>
      )}
    </div>
  );
} 