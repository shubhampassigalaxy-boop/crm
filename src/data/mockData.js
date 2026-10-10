// Mock data layer — shaped to mirror the Supabase tables in supabase/schema.sql.
// Swap these for real Supabase queries once the project is connected (see src/lib/supabaseClient.js).

export const STATUS = {
  DESIGN_PENDING: 'Design Pending',
  READY_FOR_REVIEW: 'Ready for Review',
  APPROVED: 'Approved',
  UPLOADED: 'Uploaded',
  MISSED: 'Missed'
}

export const STATUS_COLORS = {
  [STATUS.DESIGN_PENDING]: { bg: '#FEF9C3', text: '#854D0E', dot: '#FACC15' },
  [STATUS.READY_FOR_REVIEW]: { bg: '#DBEAFE', text: '#1D4ED8', dot: '#3B82F6' },
  [STATUS.APPROVED]: { bg: '#DCFCE7', text: '#15803D', dot: '#22C55E' },
  [STATUS.UPLOADED]: { bg: '#DCFCE7', text: '#166534', dot: '#16A34A' },
  [STATUS.MISSED]: { bg: '#FEE2E2', text: '#B91C1C', dot: '#EF4444' }
}

export const users = [
  { id: 'u1', name: 'Shubham Rathi', role: 'Admin', email: 'shubham@anrasolutions.com', avatarColor: '#2563EB', username: 'admin', password: 'Hello@1785' },
  { id: 'u2', name: 'Priya Sharma', role: 'Graphic Designer', email: 'priya@anrasolutions.com', avatarColor: '#DB2777', username: 'priya', password: 'priya123' },
  { id: 'u3', name: 'Rohan Mehta', role: 'Graphic Designer', email: 'rohan@anrasolutions.com', avatarColor: '#7C3AED', username: 'rohan', password: 'rohan123' },
  { id: 'u4', name: 'Ananya Gupta', role: 'Social Media Marketer', email: 'ananya@anrasolutions.com', avatarColor: '#059669', username: 'ananya', password: 'ananya123' },
  { id: 'u5', name: 'Vikram Nair', role: 'Manager', email: 'vikram@anrasolutions.com', avatarColor: '#EA580C', username: 'vikram', password: 'vikram123' }
]

export const clients = [
  {
    id: 'c1',
    companyName: 'Widgets Cafe',
    clientName: 'Suresh Kumar',
    logo: '🔧',
    phone: '+91 98110 22334',
    email: 'suresh@widgetscafe.in',
    website: 'widgetscafe.in',
    instagram: 'instagram.com/widgetscafe',
    facebook: 'facebook.com/widgetscafe',
    facebookUsername: 'widgetscafe.page',
    facebookPassword: 'Wc@Insta2026',
    packageName: 'Growth Pro',
    totalMonthlyPosts: 20,
    stories: 12,
    reels: 8,
    ads: 4,
    usedPosts: 14,
    startDate: '2026-06-01',
    endDate: '2026-08-28',
    assignedDesigner: 'Priya Sharma',
    assignedMarketer: 'Ananya Gupta',
    brandColor: '#F59E0B',
    status: 'Active'
  },
  {
    id: 'c2',
    companyName: 'Snolite Safety Signage',
    clientName: 'Manoj Verma',
    logo: '🛑',
    phone: '+91 98730 44521',
    email: 'manoj@snolite.com',
    website: 'snolite.com',
    instagram: 'instagram.com/snolite',
    facebook: 'facebook.com/snolite',
    facebookUsername: 'snolite.signage',
    facebookPassword: 'Snolite@123',
    packageName: 'Standard',
    totalMonthlyPosts: 12,
    stories: 8,
    reels: 4,
    ads: 2,
    usedPosts: 11,
    startDate: '2026-05-10',
    endDate: '2026-07-24',
    assignedDesigner: 'Rohan Mehta',
    assignedMarketer: 'Ananya Gupta',
    brandColor: '#DC2626',
    status: 'Expiring Soon'
  },
  {
    id: 'c3',
    companyName: 'Photo Mistri',
    clientName: 'Aarav Chawla',
    logo: '📷',
    phone: '+91 99537 66210',
    email: 'aarav@photomistri.in',
    website: 'photomistri.in',
    instagram: 'instagram.com/photomistri',
    facebook: 'facebook.com/photomistri',
    facebookUsername: 'photomistri.studio',
    facebookPassword: 'PM_studio@26',
    packageName: 'Growth Pro',
    totalMonthlyPosts: 24,
    stories: 16,
    reels: 6,
    ads: 2,
    usedPosts: 9,
    startDate: '2026-07-01',
    endDate: '2026-09-30',
    assignedDesigner: 'Priya Sharma',
    assignedMarketer: 'Ananya Gupta',
    brandColor: '#0EA5E9',
    status: 'Active'
  },
  {
    id: 'c4',
    companyName: 'RV Industries',
    clientName: 'Devendra Rathi',
    logo: '⚙️',
    phone: '+91 98100 55671',
    email: 'devendra@rvindustries.com',
    website: 'rvindustries.com',
    instagram: 'instagram.com/rvindustries',
    facebook: 'facebook.com/rvindustries',
    facebookUsername: 'rv.industries',
    facebookPassword: 'RVInd#2026',
    packageName: 'Starter',
    totalMonthlyPosts: 8,
    stories: 4,
    reels: 2,
    ads: 2,
    usedPosts: 8,
    startDate: '2026-06-15',
    endDate: '2026-07-25',
    assignedDesigner: 'Rohan Mehta',
    assignedMarketer: 'Ananya Gupta',
    brandColor: '#334155',
    status: 'Expiring Soon'
  }
]

export const posts = [
  { id: 'p1', clientId: 'c1', clientName: 'Widgets Cafe', title: 'Monsoon Offer Reel', platform: 'Instagram', type: 'Reel', date: '2026-07-20', status: STATUS.DESIGN_PENDING, designer: 'Priya Sharma', marketer: 'Ananya Gupta' },
  { id: 'p2', clientId: 'c1', clientName: 'Widgets Cafe', title: 'Student Testimonial Post', platform: 'Facebook', type: 'Post', date: '2026-07-20', status: STATUS.READY_FOR_REVIEW, designer: 'Priya Sharma', marketer: 'Ananya Gupta' },
  { id: 'p3', clientId: 'c2', clientName: 'Snolite Safety Signage', title: 'New Sign Board Range', platform: 'Instagram', type: 'Post', date: '2026-07-20', status: STATUS.APPROVED, designer: 'Rohan Mehta', marketer: 'Ananya Gupta' },
  { id: 'p4', clientId: 'c3', clientName: 'Photo Mistri', title: 'Pre-Wedding Highlight', platform: 'Instagram', type: 'Reel', date: '2026-07-20', status: STATUS.UPLOADED, designer: 'Priya Sharma', marketer: 'Ananya Gupta' },
  { id: 'p5', clientId: 'c4', clientName: 'RV Industries', title: 'Testing Equipment Spotlight', platform: 'LinkedIn', type: 'Post', date: '2026-07-19', status: STATUS.MISSED, designer: 'Rohan Mehta', marketer: 'Ananya Gupta' },
  { id: 'p6', clientId: 'c1', clientName: 'Widgets Cafe', title: 'Course Enrollment CTA', platform: 'Instagram', type: 'Story', date: '2026-07-21', status: STATUS.DESIGN_PENDING, designer: 'Priya Sharma', marketer: 'Ananya Gupta' },
  { id: 'p7', clientId: 'c2', clientName: 'Snolite Safety Signage', title: 'Fire Safety Awareness', platform: 'Facebook', type: 'Post', date: '2026-07-22', status: STATUS.READY_FOR_REVIEW, designer: 'Rohan Mehta', marketer: 'Ananya Gupta' },
  { id: 'p8', clientId: 'c3', clientName: 'Photo Mistri', title: 'Client Review Carousel', platform: 'Instagram', type: 'Post', date: '2026-07-23', status: STATUS.APPROVED, designer: 'Priya Sharma', marketer: 'Ananya Gupta' }
]

export const notifications = [
  { id: 'n1', type: 'expiry', message: 'Snolite Safety Signage package expires in 4 days', time: '2h ago', unread: true },
  { id: 'n2', type: 'expiry', message: 'RV Industries package expires in 5 days', time: '3h ago', unread: true },
  { id: 'n3', type: 'pending', message: '2 designs pending for today — Widgets Cafe', time: '5h ago', unread: true },
  { id: 'n4', type: 'approval', message: 'Ananya requested approval for Snolite post', time: '1d ago', unread: false },
  { id: 'n5', type: 'overdue', message: 'RV Industries post from 19 Jul is overdue', time: '1d ago', unread: false }
]

export const auditLogs = [
  { id: 'a1', client: 'Photo Mistri', post: 'Pre-Wedding Highlight', designer: 'Priya Sharma', marketer: 'Ananya Gupta', approvedBy: 'Vikram Nair', createdAt: '2026-07-18 10:12', modifiedAt: '2026-07-19 16:40', completedAt: '2026-07-20 09:05' },
  { id: 'a2', client: 'Snolite Safety Signage', post: 'New Sign Board Range', designer: 'Rohan Mehta', marketer: 'Ananya Gupta', approvedBy: 'Vikram Nair', createdAt: '2026-07-17 11:00', modifiedAt: '2026-07-18 14:22', completedAt: '—' },
  { id: 'a3', client: 'RV Industries', post: 'Testing Equipment Spotlight', designer: 'Rohan Mehta', marketer: 'Ananya Gupta', approvedBy: '—', createdAt: '2026-07-16 09:30', modifiedAt: '2026-07-19 08:15', completedAt: '—' }
]

export const mediaLibrary = [
  { id: 'm1', client: 'Widgets Cafe', type: 'Logo', name: 'widgetscafe_logo.png', size: '240 KB', uploadedAt: '2026-06-01' },
  { id: 'm2', client: 'Photo Mistri', type: 'Brand Kit', name: 'photomistri_brandkit.zip', size: '4.1 MB', uploadedAt: '2026-07-01' },
  { id: 'm3', client: 'Snolite Safety Signage', type: 'Video', name: 'signage_demo_reel.mp4', size: '18.4 MB', uploadedAt: '2026-07-10' },
  { id: 'm4', client: 'RV Industries', type: 'Document', name: 'rv_spec_sheet.pdf', size: '1.2 MB', uploadedAt: '2026-06-20' }
]

export function daysUntil(dateStr) {
  const today = new Date('2026-07-20')
  const target = new Date(dateStr)
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24))
  return diff
}
