import { useApiData } from './useApiData'
import { fetchProfile } from '@/services/api'
import { profile as fallbackProfile } from '@/data/profile'

export function useProfile() {
  return useApiData(fetchProfile, fallbackProfile)
}
