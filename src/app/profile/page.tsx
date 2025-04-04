"use client";
import { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from 'sonner'
import { fetchUser } from '../auth/action'
import { supabase } from '@/lib/supabase/client'

interface Profile {
  id: string
  name: string
  email: string
  dietary_restrictions: string[]
  calorie_intake: number
  macronutrient_preferences: {
    protein: number
    carbs: number
    fat: number
  }
  cooking_skill_level: string
  kitchen_equipment: string[]
  budget_preference: string
  sustainability_preference: string
  time_availability: string
}

type SelectValueType = 'beginner' | 'intermediate' | 'advanced' | 'budget' | 'moderate' | 'premium' | 'low' | 'medium' | 'high' | 'quick' | 'moderate' | 'extended'

export default function ProfilePage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      const userResponse = await fetchUser()
      if (!userResponse?.data?.user) {
        setError('Authentication required')
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userResponse.data.user.id)
        .single()

      if (error) throw error
      setProfile(data)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setError('Failed to load profile')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!profile) return

    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', profile.id)

      if (error) throw error

      toast.success('Profile updated successfully')
      setIsEditing(false)
    } catch (err) {
      console.error('Error updating profile:', err)
      toast.error('Failed to update profile')
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-4xl py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Profile Settings</CardTitle>
          <CardDescription>Manage your nutrition preferences and profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={profile?.name || ''}
                  onChange={(e) => setProfile({ ...profile!, name: e.target.value })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={profile?.email || ''}
                  disabled
                  className="bg-gray-100"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="calorie_intake">Daily Calorie Intake</Label>
                <Input
                  id="calorie_intake"
                  type="number"
                  value={profile?.calorie_intake || ''}
                  onChange={(e) => setProfile({ ...profile!, calorie_intake: Number(e.target.value) })}
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label>Macronutrient Preferences (%)</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="protein">Protein</Label>
                    <Input
                      id="protein"
                      type="number"
                      value={profile?.macronutrient_preferences?.protein || ''}
                      onChange={(e) => setProfile({
                        ...profile!,
                        macronutrient_preferences: {
                          ...profile!.macronutrient_preferences,
                          protein: Number(e.target.value)
                        }
                      })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="carbs">Carbs</Label>
                    <Input
                      id="carbs"
                      type="number"
                      value={profile?.macronutrient_preferences?.carbs || ''}
                      onChange={(e) => setProfile({
                        ...profile!,
                        macronutrient_preferences: {
                          ...profile!.macronutrient_preferences,
                          carbs: Number(e.target.value)
                        }
                      })}
                      disabled={!isEditing}
                    />
                  </div>
                  <div>
                    <Label htmlFor="fat">Fat</Label>
                    <Input
                      id="fat"
                      type="number"
                      value={profile?.macronutrient_preferences?.fat || ''}
                      onChange={(e) => setProfile({
                        ...profile!,
                        macronutrient_preferences: {
                          ...profile!.macronutrient_preferences,
                          fat: Number(e.target.value)
                        }
                      })}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cooking_skill_level">Cooking Skill Level</Label>
                <Select
                  value={profile?.cooking_skill_level}
                  onValueChange={(value: SelectValueType) => setProfile({ ...profile!, cooking_skill_level: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select skill level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget_preference">Budget Preference</Label>
                <Select
                  value={profile?.budget_preference}
                  onValueChange={(value: SelectValueType) => setProfile({ ...profile!, budget_preference: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="budget">Budget-friendly</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sustainability_preference">Sustainability Preference</Label>
                <Select
                  value={profile?.sustainability_preference}
                  onValueChange={(value: SelectValueType) => setProfile({ ...profile!, sustainability_preference: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sustainability preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="time_availability">Time Availability</Label>
                <Select
                  value={profile?.time_availability}
                  onValueChange={(value: SelectValueType) => setProfile({ ...profile!, time_availability: value })}
                  disabled={!isEditing}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select time availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quick">Quick meals (15-30 mins)</SelectItem>
                    <SelectItem value="moderate">Moderate (30-60 mins)</SelectItem>
                    <SelectItem value="extended">Extended (60+ mins)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-end gap-4">
              {isEditing ? (
                <>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false)
                      fetchProfile()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Save Changes</Button>
                </>
              ) : (
                <Button type="button" onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}