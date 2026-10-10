import { createContext, useContext, useState, useEffect, useRef } from 'react'
import { users as initialUsers, clients as initialClients, posts as initialPosts } from '../data/mockData'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

const DataContext = createContext(null)

let idCounter = 100
const nextId = (prefix) => `${prefix}${idCounter++}`

const AVATAR_COLORS = ['#2563EB', '#DB2777', '#7C3AED', '#059669', '#EA580C', '#0EA5E9']

export function DataProvider({ children }) {
  const [teamMembers, setTeamMembers] = useState(initialUsers)
  const [clients, setClients] = useState(initialClients)
  const [posts, setPosts] = useState(initialPosts)

  // Refs so the realtime callbacks (set up once) always see the latest state
  // instead of the stale values captured when the effect first ran.
  const teamMembersRef = useRef(teamMembers)
  const clientsRef = useRef(clients)
  const postsRef = useRef(posts)
  useEffect(() => { teamMembersRef.current = teamMembers }, [teamMembers])
  useEffect(() => { clientsRef.current = clients }, [clients])
  useEffect(() => { postsRef.current = posts }, [posts])

  const findUserIdByName = (name) =>
    teamMembersRef.current.find((m) => m.name === name)?.id || null

  // ================= CLIENTS =================
  useEffect(() => {
    if (!isSupabaseConfigured) return

    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select(`*, packages(*)`)

      if (error) {
        console.error('Error fetching clients:', error)
        return
      }

      if (data && data.length > 0) {
        const transformedClients = data.map((c) => {
          const pkg = c.packages?.[0] || {}
          return {
            id: c.id,
            companyName: c.company_name,
            clientName: c.client_name,
            phone: c.phone,
            email: c.email,
            website: c.website,
            instagram: c.instagram_url,
            facebook: c.facebook_url,
            facebookUsername: c.facebook_username,
            facebookPassword: c.facebook_password,
            instagramUsername: c.instagram_username,
            instagramPassword: c.instagram_password,
            accessWith: c.access_with,
            packageName: pkg.package_name || 'Standard',
            totalMonthlyPosts: pkg.total_monthly_posts || 12,
            startDate: pkg.start_date,
            endDate: pkg.end_date,
            assignedDesigner: c.assigned_designer_id || '—',
            assignedMarketer: c.assigned_marketer_id || '—',
            logo: '🏢',
            brandColor: c.brand_color || '#2563EB',
            usedPosts: 0,
            status: 'Active'
          }
        })
        setClients(transformedClients)
      }
    }

    fetchClients()

    const channel = supabase
      .channel('clients-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'clients' }, () => fetchClients())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // ================= TEAM MEMBERS (users table) =================
  useEffect(() => {
    if (!isSupabaseConfigured) return

    const fetchTeamMembers = async () => {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .order('created_at', { ascending: true })

      if (error) {
        console.error('Error fetching team members:', error)
        return
      }

      if (data && data.length > 0) {
        const transformed = data.map((u, idx) => ({
          id: u.id,
          name: u.name,
          role: u.role,
          email: u.email,
          username: u.username,
          password: u.password,
          avatarColor: AVATAR_COLORS[idx % AVATAR_COLORS.length]
        }))
        setTeamMembers(transformed)
      }
    }

    fetchTeamMembers()

    const channel = supabase
      .channel('users-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, () => fetchTeamMembers())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // ================= POSTS (calendar) =================
  useEffect(() => {
    if (!isSupabaseConfigured) return

    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`*, clients(company_name)`)

      if (error) {
        console.error('Error fetching posts:', error)
        return
      }

      if (data && data.length > 0) {
        const teamById = Object.fromEntries(teamMembersRef.current.map((m) => [m.id, m.name]))
        const transformed = data.map((p) => ({
          id: p.id,
          clientId: p.client_id,
          clientName: p.clients?.company_name || '',
          title: p.title,
          platform: p.platform,
          type: p.post_type,
          date: p.scheduled_date,
          status: p.status,
          designer: teamById[p.designer_id] || '—',
          marketer: teamById[p.marketer_id] || '—'
        }))
        setPosts(transformed)
      }
    }

    fetchPosts()

    const channel = supabase
      .channel('posts-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, () => fetchPosts())
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  // ================= TEAM MEMBER CRUD =================
  const addTeamMember = async (member) => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('users')
          .insert({
            name: member.name,
            email: member.email,
            role: 'Graphic Designer',
            username: member.username,
            password: member.password
          })
          .select()
          .single()

        if (error) throw error

        const newMember = {
          id: data.id,
          name: data.name,
          role: data.role,
          email: data.email,
          username: data.username,
          password: data.password,
          avatarColor: AVATAR_COLORS[teamMembers.length % AVATAR_COLORS.length]
        }
        setTeamMembers((prev) => [...prev, newMember])
        return newMember
      } catch (error) {
        console.error('Error adding team member to Supabase:', error)
      }
    }

    // Fallback: local-only add
    const newMember = {
      id: nextId('u'),
      name: member.name,
      role: 'Graphic Designer',
      email: member.email,
      username: member.username,
      password: member.password,
      avatarColor: AVATAR_COLORS[teamMembers.length % AVATAR_COLORS.length]
    }
    setTeamMembers((prev) => [...prev, newMember])
    return newMember
  }

  const removeTeamMember = async (id) => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('users').delete().eq('id', id)
        if (error) throw error
      } catch (error) {
        console.error('Error removing team member from Supabase:', error)
      }
    }
    setTeamMembers((prev) => prev.filter((m) => m.id !== id))
  }

  const addClient = async (client) => {
    if (isSupabaseConfigured) {
      try {
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .insert({
            company_name: client.companyName,
            client_name: client.clientName,
            phone: client.phone,
            email: client.email,
            website: client.website,
            instagram_url: client.instagram,
            facebook_url: client.facebook,
            facebook_username: client.facebookUsername,
            facebook_password: client.facebookPassword,
            instagram_username: client.instagramUsername,
            instagram_password: client.instagramPassword,
            access_with: client.accessWith,
            brand_color: '#2563EB'
          })
          .select()
          .single()

        if (clientError) throw clientError

        const { error: packageError } = await supabase
          .from('packages')
          .insert({
            client_id: clientData.id,
            package_name: client.packageName,
            total_monthly_posts: client.totalMonthlyPosts,
            start_date: client.startDate,
            end_date: client.endDate
          })

        if (packageError) throw packageError

        const newClient = {
          id: clientData.id,
          companyName: clientData.company_name,
          clientName: clientData.client_name,
          phone: clientData.phone,
          email: clientData.email,
          website: clientData.website,
          instagram: clientData.instagram_url,
          facebook: clientData.facebook_url,
          facebookUsername: clientData.facebook_username,
          facebookPassword: clientData.facebook_password,
          packageName: client.packageName,
          totalMonthlyPosts: client.totalMonthlyPosts,
          startDate: client.startDate,
          endDate: client.endDate,
          assignedDesigner: client.assignedDesigner,
          assignedMarketer: client.assignedMarketer,
          logo: '🏢',
          brandColor: clientData.brand_color || '#2563EB',
          usedPosts: 0,
          status: 'Active'
        }
        setClients((prev) => [newClient, ...prev])
        return newClient
      } catch (error) {
        console.error('Error adding client to Supabase:', error)
      }
    }

    const newClient = {
      id: nextId('c'),
      logo: client.logo || '🏢',
      usedPosts: 0,
      status: 'Active',
      brandColor: '#2563EB',
      assignedDesigner: '—',
      assignedMarketer: '—',
      ...client
    }
    setClients((prev) => [newClient, ...prev])
    return newClient
  }

  const updateClient = async (id, clientData) => {
    if (isSupabaseConfigured) {
      try {
        const { error: clientError } = await supabase
          .from('clients')
          .update({
            company_name: clientData.companyName,
            client_name: clientData.clientName,
            phone: clientData.phone,
            email: clientData.email,
            website: clientData.website,
            instagram_url: clientData.instagram,
            facebook_url: clientData.facebook,
            facebook_username: clientData.facebookUsername,
            facebook_password: clientData.facebookPassword,
            instagram_username: clientData.instagramUsername,
            instagram_password: clientData.instagramPassword,
            access_with: clientData.accessWith
          })
          .eq('id', id)

        if (clientError) throw clientError

        const { error: packageError } = await supabase
          .from('packages')
          .update({
            package_name: clientData.packageName,
            total_monthly_posts: clientData.totalMonthlyPosts,
            start_date: clientData.startDate,
            end_date: clientData.endDate
          })
          .eq('client_id', id)

        if (packageError) throw packageError

        setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...clientData } : c)))
      } catch (error) {
        console.error('Error updating client in Supabase:', error)
        setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...clientData } : c)))
      }
    } else {
      setClients((prev) => prev.map((c) => (c.id === id ? { ...c, ...clientData } : c)))
    }
  }

  const deleteClient = async (id) => {
    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('clients').delete().eq('id', id)
        if (error) throw error
        setClients((prev) => prev.filter((c) => c.id !== id))
      } catch (error) {
        console.error('Error deleting client from Supabase:', error)
        setClients((prev) => prev.filter((c) => c.id !== id))
      }
    } else {
      setClients((prev) => prev.filter((c) => c.id !== id))
    }
  }

  // Assign a designer and/or marketer to a client
  const assignClientStaff = (clientId, { designerName, marketerName }) => {
    setClients((prev) =>
      prev.map((c) =>
        c.id === clientId
          ? {
              ...c,
              ...(designerName !== undefined ? { assignedDesigner: designerName } : {}),
              ...(marketerName !== undefined ? { assignedMarketer: marketerName } : {})
            }
          : c
      )
    )
  }

  // ================= POSTS / CALENDAR CRUD =================
  const togglePostDone = async (postId) => {
    const current = postsRef.current.find((p) => p.id === postId)
    if (!current) return
    const newStatus = current.status === 'Uploaded' ? 'Design Pending' : 'Uploaded'

    if (isSupabaseConfigured) {
      try {
        const { error } = await supabase.from('posts').update({ status: newStatus }).eq('id', postId)
        if (error) throw error
      } catch (error) {
        console.error('Error updating post status in Supabase:', error)
      }
    }
    setPosts((prev) => prev.map((p) => (p.id === postId ? { ...p, status: newStatus } : p)))
  }

  // Bulk-mark a whole date range as posted for one client.
  const bulkMarkPosted = async (clientId, { startDate, endDate, platform = 'Instagram', type = 'Post' }) => {
    const client = clientsRef.current.find((c) => c.id === clientId)
    if (!client) return

    const start = new Date(startDate)
    const end = new Date(endDate)
    const dateList = []
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dateList.push(new Date(d).toISOString().slice(0, 10))
    }

    if (isSupabaseConfigured) {
      try {
        for (const dateStr of dateList) {
          const existing = postsRef.current.find((p) => p.clientId === clientId && p.date === dateStr)
          if (existing) {
            const { error } = await supabase.from('posts').update({ status: 'Uploaded' }).eq('id', existing.id)
            if (error) throw error
          } else {
            const { error } = await supabase.from('posts').insert({
              client_id: clientId,
              title: `${client.companyName} daily post`,
              platform,
              post_type: type,
              scheduled_date: dateStr,
              status: 'Uploaded',
              designer_id: findUserIdByName(client.assignedDesigner),
              marketer_id: findUserIdByName(client.assignedMarketer)
            })
            if (error) throw error
          }
        }
      } catch (error) {
        console.error('Error bulk marking posts in Supabase:', error)
      }
    }

    // Update local state either way so the UI feels instant;
    // the realtime subscription will reconcile with server data shortly after.
    setPosts((prev) => {
      let next = [...prev]
      dateList.forEach((dateStr) => {
        const idx = next.findIndex((p) => p.clientId === clientId && p.date === dateStr)
        if (idx >= 0) {
          next[idx] = { ...next[idx], status: 'Uploaded' }
        } else {
          next.push({
            id: nextId('p'),
            clientId,
            clientName: client.companyName,
            title: `${client.companyName} daily post`,
            platform,
            type,
            date: dateStr,
            status: 'Uploaded',
            designer: client.assignedDesigner,
            marketer: client.assignedMarketer
          })
        }
      })
      return next
    })
  }

  // Toggle (or create) a single day's post for a client — used by calendar day checkboxes.
  const togglePostForDay = async (clientId, dateStr, { platform = 'Instagram', type = 'Post' } = {}) => {
    const client = clientsRef.current.find((c) => c.id === clientId)
    if (!client) return

    const existing = postsRef.current.find((p) => p.clientId === clientId && p.date === dateStr)
    const newStatus = existing ? (existing.status === 'Uploaded' ? 'Design Pending' : 'Uploaded') : 'Uploaded'

    if (isSupabaseConfigured) {
      try {
        if (existing) {
          const { error } = await supabase.from('posts').update({ status: newStatus }).eq('id', existing.id)
          if (error) throw error
        } else {
          const { error } = await supabase.from('posts').insert({
            client_id: clientId,
            title: `${client.companyName} daily post`,
            platform,
            post_type: type,
            scheduled_date: dateStr,
            status: 'Uploaded',
            designer_id: findUserIdByName(client.assignedDesigner),
            marketer_id: findUserIdByName(client.assignedMarketer)
          })
          if (error) throw error
        }
      } catch (error) {
        console.error('Error toggling post in Supabase:', error)
      }
    }

    setPosts((prev) => {
      const idx = prev.findIndex((p) => p.clientId === clientId && p.date === dateStr)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], status: newStatus }
        return next
      }
      return [
        ...prev,
        {
          id: nextId('p'),
          clientId,
          clientName: client.companyName,
          title: `${client.companyName} daily post`,
          platform,
          type,
          date: dateStr,
          status: 'Uploaded',
          designer: client.assignedDesigner,
          marketer: client.assignedMarketer
        }
      ]
    })
  }

  return (
    <DataContext.Provider
      value={{
        teamMembers, addTeamMember, removeTeamMember,
        clients, addClient, updateClient, deleteClient, assignClientStaff,
        posts, togglePostDone, bulkMarkPosted, togglePostForDay
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within DataProvider')
  return ctx
}
