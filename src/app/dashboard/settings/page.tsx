"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { Profile } from '@/types/database'
import SubscriptionSettings from '@/components/SubscriptionSettings'

export default function SettingsPage() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null)
  
  const [profileData, setProfileData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })
  
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  })
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    if (user) {
      loadProfile()
    }
  }, [user])

  const loadProfile = async () => {
    if (!user) return

    try {
      let { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()

      // If profile doesn't exist, create it
      if (error && (error.code === 'PGRST116' || error.message?.includes('No rows'))) {
        const { data: newProfile, error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            first_name: user.user_metadata?.first_name || null,
            last_name: user.user_metadata?.last_name || null,
          })
          .select()
          .single()

        if (insertError) throw insertError
        data = newProfile
      } else if (error) {
        throw error
      }

      setProfile(data)
      setProfileData({
        first_name: data?.first_name || '',
        last_name: data?.last_name || '',
        email: user.email || '',
      })
      setError(null)
    } catch (error: any) {
      console.error('Error loading profile:', error)
      // Don't show error if it's just missing profile - we'll create it
      if (error.code !== 'PGRST116' && !error.message?.includes('No rows')) {
        setError(error.message || 'Failed to load profile')
      } else {
        // If profile doesn't exist, initialize with empty data but show email
        setProfileData({
          first_name: '',
          last_name: '',
          email: user.email || '',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleSaveProfile = async () => {
    if (!user) return

    setError(null)
    setSuccess(null)
    setSaving(true)

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profileData.first_name,
          last_name: profileData.last_name,
        })
        .eq('id', user.id)

      if (error) throw error

      setSuccess('Profile updated successfully')
      loadProfile()
    } catch (error: any) {
      setError(error.message || 'Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleUpdatePassword = async () => {
    if (!user) return

    if (!passwordData.newPassword || !passwordData.confirmPassword) {
      setPasswordError('Please fill in all password fields')
      setPasswordSuccess(null)
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError('New passwords do not match')
      setPasswordSuccess(null)
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordError('Password must be at least 6 characters')
      setPasswordSuccess(null)
      return
    }

    setPasswordError(null)
    setPasswordSuccess(null)
    setSaving(true)

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword,
      })

      if (error) throw error

      setPasswordSuccess('Password updated successfully')
      setPasswordData({
        newPassword: '',
        confirmPassword: '',
      })
    } catch (error: any) {
      setPasswordError(error.message || 'Failed to update password')
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteAccount = async () => {
    if (!user) return

    setError(null)
    setSaving(true)

    try {
      // Delete all user's products first
      await supabase
        .from('products')
        .delete()
        .eq('user_id', user.id)

      // Delete profile
      await supabase
        .from('profiles')
        .delete()
        .eq('id', user.id)

      // Sign out (user will need to contact support for full account deletion)
      await signOut()
      router.push('/auth')
    } catch (error: any) {
      console.error('Error deleting account:', error)
      setError('Failed to delete account. Please contact support.')
      setSaving(false)
      setShowDeleteModal(false)
    }
  }

  const handleExportData = async () => {
    if (!user) return

    try {
      // Fetch user data
      const [profileResult, productsResult] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('products').select('*').eq('user_id', user.id),
      ])

      const exportData = {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
        },
        profile: profileResult.data || null,
        products: productsResult.data || [],
        exported_at: new Date().toISOString(),
      }

      // Create and download JSON file
      const dataStr = JSON.stringify(exportData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = `sellable-export-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)

      setSuccess('Data exported successfully')
    } catch (error: any) {
      console.error('Error exporting data:', error)
      setError('Failed to export data')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-black rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Profile Settings</h2>
                <p className="text-sm text-gray-600">Manage your account information</p>
              </div>
              <div className="p-6 space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {error}
                  </div>
                )}
                {success && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    {success}
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profileData.first_name}
                      onChange={(e) => setProfileData({ ...profileData, first_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profileData.last_name}
                      onChange={(e) => setProfileData({ ...profileData, last_name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl bg-gray-100 text-gray-500 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                </div>
                  <div>
                    <button
                      onClick={handleSaveProfile}
                      disabled={saving}
                      className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
              </div>
            </div>

            <SubscriptionSettings />

            <div className="bg-white rounded-2xl shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Password</h2>
                <p className="text-sm text-gray-600">Update your password</p>
              </div>
              <div className="p-6 space-y-6">
                {passwordError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {passwordError}
                  </div>
                )}
                {passwordSuccess && (
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
                    {passwordSuccess}
                  </div>
                )}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>
                  <div>
                    <button
                      onClick={handleUpdatePassword}
                      disabled={saving}
                      className="bg-black text-white px-4 py-2 rounded-2xl hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {saving ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
              </div>
            </div>


            <div className="bg-white rounded-2xl shadow border border-red-200">
              <div className="px-6 py-4 border-b border-red-200">
                <h2 className="text-lg font-medium text-red-900">Danger Zone</h2>
                <p className="text-sm text-red-600">Irreversible actions</p>
              </div>
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Export Data</h3>
                    <p className="text-sm text-gray-600">Download all your data in JSON format</p>
                  </div>
                  <button
                    onClick={handleExportData}
                    className="bg-gray-600 text-white px-4 py-2 rounded-2xl hover:bg-gray-700 transition-colors"
                  >
                    Export Data
                  </button>
                </div>
                <div className="border-t border-red-200 pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Delete Account</h3>
                      <p className="text-sm text-gray-600">Permanently delete your account and all data</p>
                    </div>
                    <button
                      onClick={() => setShowDeleteModal(true)}
                      disabled={saving}
                      className="bg-red-600 text-white px-4 py-2 rounded-2xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sign Out Section */}
            <div className="bg-white rounded-2xl shadow">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Sign Out</h3>
                    <p className="text-sm text-gray-600">Sign out of your account</p>
                  </div>
                  <button
                    onClick={async () => {
                      await signOut()
                      router.push('/auth')
                    }}
                    className="bg-gray-900 text-white px-6 py-2 rounded-2xl hover:bg-gray-800 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 text-center mb-2">Delete Account</h3>
            <p className="text-sm text-gray-600 text-center mb-6">
              Are you sure you want to delete your account? This action cannot be undone. All your products and data will be permanently deleted.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={saving}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-2xl text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={saving}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {saving ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
