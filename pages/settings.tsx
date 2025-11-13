// pages/settings.tsx
import React, { useState } from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/router'

export default function Settings() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('account')

  const tabs = ['Account', 'Playback', 'Parental Controls', 'Notifications']

  return (
    <main className="min-h-screen bg-black text-white p-6 pl-24">
      {/* Header with back button */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-white transition"
        >
          <ArrowLeftIcon className="w-6 h-6 mr-2" />
          Back
        </button>
      </div>

      <h1 className="text-4xl font-bold mb-8">Settings</h1>

      {/* Tabs */}
      <div className="flex border-b border-gray-700 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab.toLowerCase().replace(' ', '-'))}
            className={`pb-3 px-4 font-semibold transition-all ${
              activeTab === tab.toLowerCase().replace(' ', '-')
                ? 'text-white border-b-2 border-red-600'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Account Settings */}
      {activeTab === 'account' && (
        <div className="space-y-6 max-w-2xl">
          <SettingsSection title="Email & Password">
            <SettingItem label="Email Address" value="user@example.com" editable />
            <SettingItem label="Password" value="••••••••" editable />
          </SettingsSection>

          <SettingsSection title="Membership">
            <SettingItem label="Plan" value="Premium" />
            <SettingItem label="Renewal Date" value="Dec 15, 2025" />
            <button className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 rounded transition">
              Change Plan
            </button>
          </SettingsSection>

          <SettingsSection title="Devices">
            <SettingItem label="Current Device" value="Chrome on Windows" />
            <button className="mt-4 px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded transition">
              Log Out of All Devices
            </button>
          </SettingsSection>
        </div>
      )}

      {/* Playback Settings */}
      {activeTab === 'playback' && (
        <div className="space-y-6 max-w-2xl">
          <SettingsSection title="Playback Options">
            <ToggleSetting
              label="Autoplay next episode"
              defaultChecked={true}
            />
            <ToggleSetting
              label="Autoplay previews while browsing"
              defaultChecked={true}
            />
          </SettingsSection>

          <SettingsSection title="Video Quality">
            <SelectSetting
              label="Preferred Video Quality"
              options={['Auto', 'High', 'Medium', 'Low', 'Data Saver']}
              defaultValue="Auto"
            />
          </SettingsSection>

          <SettingsSection title="Language & Subtitles">
            <SelectSetting
              label="Subtitle Language"
              options={['English', 'Spanish', 'French', 'German', 'Italian']}
              defaultValue="English"
            />
            <SelectSetting
              label="Audio Language"
              options={['English', 'Spanish', 'French', 'German', 'Italian']}
              defaultValue="English"
            />
          </SettingsSection>
        </div>
      )}

      {/* Parental Controls */}
      {activeTab === 'parental-controls' && (
        <div className="space-y-6 max-w-2xl">
          <SettingsSection title="Content Restrictions">
            <SelectSetting
              label="Maturity Level"
              options={['All', 'Teen (13+)', 'PG (7+)', 'G (All)']}
              defaultValue="All"
            />
            <ToggleSetting
              label="Require PIN for mature content"
              defaultChecked={false}
            />
          </SettingsSection>
        </div>
      )}

      {/* Notifications */}
      {activeTab === 'notifications' && (
        <div className="space-y-6 max-w-2xl">
          <SettingsSection title="Email Notifications">
            <ToggleSetting
              label="New releases and recommendations"
              defaultChecked={true}
            />
            <ToggleSetting
              label="Account updates and security"
              defaultChecked={true}
            />
          </SettingsSection>

          <SettingsSection title="Push Notifications">
            <ToggleSetting
              label="Enable push notifications"
              defaultChecked={false}
            />
          </SettingsSection>
        </div>
      )}
    </main>
  )
}

// Reusable Components

interface SettingsSectionProps {
  title: string
  children: React.ReactNode
}

function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <div className="bg-gray-900 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="space-y-4">{children}</div>
    </div>
  )
}

interface SettingItemProps {
  label: string
  value: string
  editable?: boolean
}

function SettingItem({ label, value, editable }: SettingItemProps) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700">
      <span className="text-gray-300">{label}</span>
      <div className="flex items-center gap-3">
        <span className="text-white font-semibold">{value}</span>
        {editable && (
          <button className="text-red-600 hover:text-red-500 transition font-semibold">
            Change
          </button>
        )}
      </div>
    </div>
  )
}

interface ToggleSettingProps {
  label: string
  defaultChecked?: boolean
}

function ToggleSetting({ label, defaultChecked }: ToggleSettingProps) {
  const [checked, setChecked] = React.useState(defaultChecked || false)

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700">
      <span className="text-gray-300">{label}</span>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="w-5 h-5 cursor-pointer"
      />
    </div>
  )
}

interface SelectSettingProps {
  label: string
  options: string[]
  defaultValue: string
}

function SelectSetting({ label, options, defaultValue }: SelectSettingProps) {
  const [value, setValue] = React.useState(defaultValue)

  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-700">
      <span className="text-gray-300">{label}</span>
      <select
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="bg-gray-800 text-white px-4 py-2 rounded border border-gray-700 focus:border-red-600 transition"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
