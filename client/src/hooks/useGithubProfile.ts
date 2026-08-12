import { useEffect, useState } from 'react'

export interface GithubProfile {
  publicRepos: number
  followers: number
  following: number
  avatarUrl: string
  bio: string | null
  htmlUrl: string
}

export interface GithubRepo {
  name: string
  htmlUrl: string
  description: string | null
  language: string | null
  stars: number
  updatedAt: string
}

interface GithubActivityState {
  profile: GithubProfile | null
  repos: GithubRepo[]
  activity: number[]
  status: 'loading' | 'success' | 'error'
}

export function useGithubProfile(username: string) {
  const [state, setState] = useState<GithubActivityState>({
    profile: null,
    repos: [],
    activity: [],
    status: 'loading',
  })

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
          fetch(`https://api.github.com/users/${username}/events/public?per_page=100`),
        ])

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API request failed')

        const user = await userRes.json()
        const repos = await reposRes.json()
        const events = eventsRes.ok ? await eventsRes.json() : []

        const activityBuckets = new Array(28).fill(0)
        const now = Date.now()
        if (Array.isArray(events)) {
          for (const event of events) {
            const created = new Date(event.created_at).getTime()
            const daysAgo = Math.floor((now - created) / (1000 * 60 * 60 * 24))
            if (daysAgo >= 0 && daysAgo < 28) {
              activityBuckets[27 - daysAgo] += 1
            }
          }
        }

        if (cancelled) return

        setState({
          profile: {
            publicRepos: user.public_repos ?? 0,
            followers: user.followers ?? 0,
            following: user.following ?? 0,
            avatarUrl: user.avatar_url ?? '',
            bio: user.bio ?? null,
            htmlUrl: user.html_url ?? `https://github.com/${username}`,
          },
          repos: Array.isArray(repos)
            ? repos.map((r) => ({
                name: r.name,
                htmlUrl: r.html_url,
                description: r.description,
                language: r.language,
                stars: r.stargazers_count ?? 0,
                updatedAt: r.updated_at,
              }))
            : [],
          activity: activityBuckets,
          status: 'success',
        })
      } catch {
        if (!cancelled) setState((s) => ({ ...s, status: 'error' }))
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [username])

  return state
}
