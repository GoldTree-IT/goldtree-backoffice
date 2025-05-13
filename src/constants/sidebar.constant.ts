import {
  Briefcase,
  FlagTriangleRight,
  LayoutDashboard,
  Tags,
  Users,
} from 'lucide-react';

export const sidebar = {
  user: {
    name: 'Admin User',
    email: 'admin@goldjob.com',
    avatar: '/avatars/admin.jpg',
  },
  teams: [
    {
      name: 'GoldTree Admin Panel',
      logo: null,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: null,
      plan: 'Startup',
    },
    {
      name: 'Evil Corp.',
      logo: null,
      plan: 'Free',
    },
  ],
  navMain: [
    {
      title: 'Dashboard Overview',
      url: '/dashboard',
      icon: LayoutDashboard,
      children: [
        { title: 'Total Jobs Posted', url: '/dashboard/total-jobs' },
        { title: 'User Statistics', url: '/dashboard/user-stats' },
        { title: 'Active vs Inactive Users', url: '/dashboard/user-status' },
        { title: 'Recent Activity Logs', url: '/dashboard/activity-logs' },
      ],
    },
    {
      title: 'User Management',
      url: '/users',
      icon: Users,
      children: [
        { title: 'All Users', url: '/users/all' },
        { title: 'User Approval', url: '/users/approval' },
        { title: 'Account Actions', url: '/users/actions' },
        { title: 'User Profiles', url: '/users/profiles' },
      ],
    },
    {
      title: 'Job Post Management',
      url: '/jobs',
      icon: Briefcase,
      children: [
        { title: 'All Job Listings', url: '/jobs/listings' },
        { title: 'Job Approval', url: '/jobs/approval' },
        { title: 'Expired Jobs', url: '/jobs/expired' },
        { title: 'Job Moderation', url: '/jobs/moderation' },
      ],
    },
    {
      title: 'Categories & Skills',
      url: '/categories',
      icon: Tags,
      children: [
        { title: 'Job Categories', url: '/categories/job' },
        { title: 'Skills & Tags', url: '/categories/skills' },
      ],
    },
    {
      title: 'Reports & Flags',
      url: '/reports',
      icon: FlagTriangleRight,
      children: [
        { title: 'Reported Users', url: '/reports/users' },
        { title: 'Spam Detection', url: '/reports/spam' },
        { title: 'Moderation Actions', url: '/reports/actions' },
      ],
    },
  ],
};
