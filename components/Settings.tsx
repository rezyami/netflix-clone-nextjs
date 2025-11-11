import React, { useState } from 'react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <h2 className="text-3xl font-bold mb-6">Settings</h2>
      <div className="flex border-b mb-6">
        <button onClick={() => setActiveTab('profile')} className={`mr-4 pb-2 ${activeTab === 'profile' ? 'border-b-2 border-red-500' : ''}`}>Profile</button>
        <button onClick={() => setActiveTab('playback')} className={`mr-4 pb-2 ${activeTab === 'playback' ? 'border-b-2 border-red-500' : ''}`}>Playback</button>
        <button onClick={() => setActiveTab('parental')} className={`mr-4 pb-2 ${activeTab === 'parental' ? 'border-b-2 border-red-500' : ''}`}>Parental</button>
        <button onClick={() => setActiveTab('notifications')} className={`pb-2 ${activeTab === 'notifications' ? 'border-b-2 border-red-500' : ''}`}>Notifications</button>
      </div>

      {activeTab === 'profile' && (
        <div className="card p-4 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">User Profile</h3>
          {/* Avatar, Name, Email, Password edit, etc. */}
          <button className="bg-red-500 text-white px-4 py-2 rounded">Change Password</button>
        </div>
      )}
      {activeTab === 'playback' && (
        <div className="card p-4 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">Playback Settings</h3>
          <label className="flex items-center mb-2">
            <input type="checkbox" className="mr-2" /> Autoplay next episode
          </label>
          <label className="flex items-center mb-2">
            Video Quality:
            <select className="ml-2 bg-gray-200 px-2 py-1 rounded">
              <option>Auto</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </label>
          <label className="flex items-center mb-2">
            Subtitles Language:
            <select className="ml-2 bg-gray-200 px-2 py-1 rounded">
              <option>English</option>
              <option>Spanish</option>
            </select>
          </label>
        </div>
      )}
      {activeTab === 'parental' && (
        <div className="card p-4 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">Parental Controls</h3>
          <label>Maturity Level:
            <select className="ml-2 bg-gray-200 px-2 py-1 rounded">
              <option>All</option>
              <option>Teen</option>
              <option>Adult</option>
            </select>
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" /> Require PIN to access mature content
          </label>
        </div>
      )}
      {activeTab === 'notifications' && (
        <div className="card p-4 shadow mb-6">
          <h3 className="text-xl font-semibold mb-2">Notifications</h3>
          <label className="flex items-center">
            <input type="checkbox" className="mr-2" /> Email notifications
          </label>
          <label className="flex items-center mt-2">
            <input type="checkbox" className="mr-2" /> Push notifications
          </label>
        </div>
      )}
    </div>
  )
}
