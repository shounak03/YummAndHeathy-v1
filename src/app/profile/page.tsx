"use client";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button';
import { fetchUserCityAndState } from '@/lib/location';
import { toast } from 'sonner';
import { createClient } from '@/lib/supabase/server';
import { LoaderCircle } from 'lucide-react';

interface ProfileData {
  // Basic Information
  name: string
  age: number | null
  gender: string
  currrent_weight: number | null
  target_weight: number | null
  location: {
    city: string
    state: string
  }
  // Dietary Preferences
  dietary_restrictions: string[]
  allergies: string[]
  dislikes: string[]
  // Health Goals
  primary_goal: string
  calorie_intake: number | null
  macronutrient_preferences: {
    protein: number
    carbs: number
    fats: number
  }
  // Cooking Habits
  cooking_skill_level: string
  time_availability: string
  kitchen_tools: string[]
  // Meal Preferences
  meal_types: string[]
  cuisine_preferences: string[]
  portion_size: string
  // Lifestyle and Habits
  activity_level: string
  eating_out_frequency: string
  food_budget: string
  // Additional Preferences
  spice_tolerance: string
  meal_variety: string
  sustainability: string[]
}

export default function ProfilePage() {
  const router = useRouter()
  const [currentSection, setCurrentSection] = useState(1)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [profile, setProfile] = useState<ProfileData>({
    name: '',
    age: null,
    gender: '',
    currrent_weight: null,
    target_weight: null,
    location: { city: '', state: '' },
    dietary_restrictions: [],
    allergies: [],
    dislikes: [],
    primary_goal: '',
    calorie_intake: null,
    macronutrient_preferences: {
      protein: 30,
      carbs: 40,
      fats: 30,
    },
    cooking_skill_level: '',
    time_availability: '',
    kitchen_tools: [],
    meal_types: [],
    cuisine_preferences: [],
    portion_size: '',
    activity_level: '',
    eating_out_frequency: '',
    food_budget: '',
    spice_tolerance: '',
    meal_variety: '',
    sustainability: [],
  })

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const supabase = createClientComponentClient()
  //       const { data: { user } } = await supabase.auth.getUser()

  //       if (user) {
  //         const response = await fetch(`/api/profile?userId=${user.id}`)
  //         const data = await response.json()
  //         if (data.data) {
  //           setProfile(data.data)
  //         }
  //       }
  //     } catch (err) {
  //       setError('Failed to load profile')
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchProfile()
  // }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    console.log("profile = ", profile);
    // const supabase = await createClient()
    // const { data: { user } } = await supabase.auth.getUser()
    // const userId = user?.id
    // console.log("userId = ", userId);


    try {

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // userId: user?.id,
          ...profile,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save profile')
      }

      toast.success('Profile updated successfully')
      router.push('/dashboard')
    } catch (err) {
      console.log("error = ", err);
      setError(err instanceof Error ? err.message : 'Failed to save profile')
      toast.error('Failed to save profile')
    } finally {
      setSaving(false)
    }
  }
  const [inputValue, setInputValue] = useState<string>('');

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const findlocation = async () => {
    const locationData = await fetchUserCityAndState();

    if (!locationData || locationData.city === undefined || locationData.state === undefined) {
      return toast.error("Unable to fetch location, enter manually")
    }
    setProfile({ ...profile, location: { city: locationData.city, state: locationData.state } });
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const [city, state] = inputValue.split(',').map((part) => part.trim());
      setProfile({
        ...profile,
        location: { city, state },
      }); // Clear the input after saving
    }
  };

  const sections = [
    { id: 1, title: 'Basic Information' },
    { id: 2, title: 'Dietary Preferences' },
    { id: 3, title: 'Health Goals' },
    { id: 4, title: 'Cooking Habits' },
    { id: 5, title: 'Meal Preferences' },
    { id: 6, title: 'Lifestyle and Habits' },
    { id: 7, title: 'Additional Preferences' },
  ]

  const renderSection = () => {
    switch (currentSection) {
      case 1:
        return (
          <section className="border-b border-orange-100 pb-6">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Basic Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  className="text-black mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 placeholder:text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Age</label>
                <input
                  type="number"
                  value={profile.age || ''}
                  onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || null })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 text-black focus:ring-orange-500 placeholder:text-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Gender</label>
                <select
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div >
                <label className="block text-sm font-medium text-gray-700">Location</label>

                <div className='flex items-center gap-2'>

                  {profile.location.city !== '' && profile.location.state !== '' ?

                    <h1 className='text-lg text-gray-900' >{profile.location.city}, {profile.location.state}</h1> :


                    <input type="text"
                      onKeyDown={handleKeyDown}
                      onChange={handleInputChange}
                      placeholder='Enter city, state'
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 text-black focus:ring-orange-500 placeholder:text-gray-500 placeholder:text-sm'
                    />
                  }

                  <Button type='button' className='bg-orange-500 text-white rounded-md cursor-pointer' size="sm" onClick={findlocation}
                  >
                    Find Location
                  </Button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">current weight</label>
                <input
                  type="number"
                  value={profile.currrent_weight || ''}
                  placeholder='in kg'
                  onChange={(e) => setProfile({ ...profile, currrent_weight: parseInt(e.target.value) || null })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 text-black focus:ring-orange-500 placeholder:text-gray-500 placeholder:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">target weight</label>
                <input
                  type="number"
                  value={profile.target_weight || ''}
                  placeholder='in kg'
                  onChange={(e) => setProfile({ ...profile, target_weight: parseInt(e.target.value) || null })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 text-black focus:ring-orange-500 placeholder:text-gray-500 placeholder:text-sm"
                />
              </div>

            </div>
          </section>
        )
      case 2:
        return (
          <section className="border-b border-orange-100 pb-6">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Dietary Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
                <select
                  multiple
                  value={profile.dietary_restrictions}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value)
                    setProfile({ ...profile, dietary_restrictions: values })
                  }}
                  className="mt-1 text-black block w-full rounded-md border-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Allergies</label>
                <input
                  type="text"
                  value={profile.allergies.join(', ')}
                  onChange={(e) => setProfile({ ...profile, allergies: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="Enter allergies separated by commas"
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 placeholder:text-gray-500 placeholder:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dislikes</label>
                <input
                  type="text"
                  value={profile.dislikes.join(', ')}
                  onChange={(e) => setProfile({ ...profile, dislikes: e.target.value.split(',').map(s => s.trim()) })}
                  placeholder="Enter disliked foods separated by commas"
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 placeholder:text-gray-500 placeholder:text-sm"
                />
              </div>
            </div>
          </section>
        )
      case 3:
        return (
          <section className="border-b border-orange-100 pb-6">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Health Goals</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Primary Goal</label>
                <select
                  value={profile.primary_goal}
                  onChange={(e) => setProfile({ ...profile, primary_goal: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 placeholder:text-gray-500 placeholder:text-sm"
                >
                  <option value="" className='text-gray-500'>Select primary goal</option>
                  <option value="weight_loss">Weight Loss</option>
                  <option value="muscle_gain">Muscle Gain</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="energy">Energy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Daily Calorie Intake</label>
                <input
                  type="number"
                  value={profile.calorie_intake || ''}
                  onChange={(e) => setProfile({ ...profile, calorie_intake: parseInt(e.target.value) || null })}
                  className="mt-1 block w-full text-black rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Macronutrient Preferences</label>
                <div className="grid grid-cols-3 gap-4 mt-2">
                  <div>
                    <label className="block text-xs text-gray-500">Protein (%)</label>
                    <input
                      type="number"
                      value={profile.macronutrient_preferences.protein}
                      onChange={(e) => setProfile({
                        ...profile,
                        macronutrient_preferences: {
                          ...profile.macronutrient_preferences,
                          protein: parseInt(e.target.value)
                        }
                      })}
                      className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Carbs (%)</label>
                    <input
                      type="number"
                      value={profile.macronutrient_preferences.carbs}
                      onChange={(e) => setProfile({
                        ...profile,
                        macronutrient_preferences: {
                          ...profile.macronutrient_preferences,
                          carbs: parseInt(e.target.value)
                        }
                      })}
                      className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500">Fats (%)</label>
                    <input
                      type="number"
                      value={profile.macronutrient_preferences.fats}
                      onChange={(e) => setProfile({
                        ...profile,
                        macronutrient_preferences: {
                          ...profile.macronutrient_preferences,
                          fats: parseInt(e.target.value)
                        }
                      })}
                      className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
      case 4:
        return (
          <section className="border-b border-orange-100 pb-6">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Cooking Habits</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Cooking Skill Level</label>
                <select
                  value={profile.cooking_skill_level}
                  onChange={(e) => setProfile({ ...profile, cooking_skill_level: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select skill level</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Time Availability</label>
                <select
                  value={profile.time_availability}
                  onChange={(e) => setProfile({ ...profile, time_availability: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select time availability</option>
                  <option value="15_min">15 minutes or less</option>
                  <option value="30_min">30 minutes or less</option>
                  <option value="1_hour">1 hour or less</option>
                  <option value="more">More than 1 hour</option>
                </select>
              </div>
              {/* <div>
                <label className="block text-sm font-medium text-gray-700">Kitchen Tools</label>
                <select
                  multiple
                  value={profile.kitchen_tools}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value)
                    setProfile({ ...profile, kitchen_tools: values })
                  }}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="basic">Basic (pots, pans, knives)</option>
                  <option value="blender">Blender</option>
                  <option value="food_processor">Food Processor</option>
                  <option value="slow_cooker">Slow Cooker</option>
                  <option value="air_fryer">Air Fryer</option>
                  <option value="instant_pot">Instant Pot</option>
                </select>
              </div> */}
            </div>
          </section>
        )
      case 5:
        return (
          <section className="border-b border-orange-100 pb-6">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Meal Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block  text-sm font-medium text-gray-700">Meal Types</label>
                <span className="text-xs text-gray-500">{"Hold down the Ctrl (windows) or Command (Mac) button to select multiple options."}</span>
                <select
                  multiple
                  value={profile.meal_types}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value)
                    setProfile({ ...profile, meal_types: values })
                  }}
                  className="mt-1 text-black block w-full rounded-md border-gray-900 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snacks">Snacks</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cuisine Preferences</label>
                <select
                  multiple
                  value={profile.cuisine_preferences}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value)
                    setProfile({ ...profile, cuisine_preferences: values })
                  }}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="italian">Italian</option>
                  <option value="mexican">Mexican</option>
                  <option value="chinese">Chinese</option>
                  <option value="indian">Indian</option>
                  <option value="mediterranean">Mediterranean</option>
                  <option value="american">American</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Portion Size</label>
                <select
                  value={profile.portion_size}
                  onChange={(e) => setProfile({ ...profile, portion_size: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select portion size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>
            </div>
          </section>
        )
      case 6:
        return (
          <section className="border-b border-orange-100 pb-6">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Lifestyle and Habits</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                <select
                  value={profile.activity_level}
                  onChange={(e) => setProfile({ ...profile, activity_level: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="very">Very Active</option>
                  <option value="extra">Extra Active</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Eating Out Frequency</label>
                <select
                  value={profile.eating_out_frequency}
                  onChange={(e) => setProfile({ ...profile, eating_out_frequency: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select frequency</option>
                  <option value="rarely">Rarely</option>
                  <option value="weekly">1-2 times per week</option>
                  <option value="frequent">3-4 times per week</option>
                  <option value="daily">Daily</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Food Budget</label>
                <select
                  value={profile.food_budget}
                  onChange={(e) => setProfile({ ...profile, food_budget: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select budget range</option>
                  <option value="budget">Budget-friendly</option>
                  <option value="moderate">Moderate</option>
                  <option value="premium">Premium</option>
                </select>
              </div>
            </div>
          </section>
        )
      case 7:
        return (
          <section className="border-b border-orange-100 pb-6">
            <h2 className="text-xl font-semibold text-orange-700 mb-4">Additional Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Spice Tolerance</label>
                <select
                  value={profile.spice_tolerance}
                  onChange={(e) => setProfile({ ...profile, spice_tolerance: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select spice tolerance</option>
                  <option value="mild">Mild</option>
                  <option value="medium">Medium</option>
                  <option value="spicy">Spicy</option>
                  <option value="very_spicy">Very Spicy</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meal Variety</label>
                <select
                  value={profile.meal_variety}
                  onChange={(e) => setProfile({ ...profile, meal_variety: e.target.value })}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="">Select meal variety preference</option>
                  <option value="consistent">I prefer consistency</option>
                  <option value="balanced">I like a good balance</option>
                  <option value="varied">I enjoy lots of variety</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Sustainability Preferences</label>
                <select
                  multiple
                  value={profile.sustainability}
                  onChange={(e) => {
                    const values = Array.from(e.target.selectedOptions, option => option.value)
                    setProfile({ ...profile, sustainability: values })
                  }}
                  className="mt-1 text-black block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                >
                  <option value="organic">Organic ingredients</option>
                  <option value="local">Local produce</option>
                  <option value="seasonal">Seasonal ingredients</option>
                  <option value="sustainable">Sustainable seafood</option>
                  <option value="plant_based">Plant-based options</option>
                </select>
              </div>
            </div>
          </section>
        )
    }
  }


  return (
    <div className="min-h-screen bg-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-orange-600 mb-8">Your Profile</h1>

          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={`flex-1 text-center ${section.id === currentSection ? 'text-orange-600 font-semibold' : 'text-gray-500'
                    }`}
                >
                  {/* {section.title} */}
                </div>
              ))}
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-full bg-orange-600 rounded-full transition-all duration-300"
                style={{ width: `${(currentSection / sections.length) * 100}%` }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {renderSection()}

            {error && (
              <div className="text-red-600 text-sm">{error}</div>
            )}

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setCurrentSection(prev => Math.max(1, prev - 1))}
                disabled={currentSection === 1}
                className="inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
              >
                Previous
              </button>
              {currentSection === sections.length ? (
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50"
                >
                  {saving ? <LoaderCircle className='animate-spin' /> : 'Save Profile'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentSection(prev => Math.min(sections.length, prev + 1));
                  }}
                  className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Next
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}