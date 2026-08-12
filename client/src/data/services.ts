import type { Service } from '@/types'

const rawServices: Omit<Service, 'id' | 'order'>[] = [
  { title: 'Full-Stack Web Development', description: 'End-to-end web applications with React, TypeScript, and Node.js — from UI to database.', icon: 'layout-grid' },
  { title: 'Flutter Mobile App Development', description: 'Cross-platform mobile apps for iOS and Android from a single Flutter/Dart codebase.', icon: 'smartphone' },
  { title: 'Backend & REST API Development', description: 'Secure, well-structured REST APIs built with Express and TypeScript.', icon: 'server' },
  { title: 'Database Design', description: 'Relational and NoSQL schema design optimized for scalability and data integrity.', icon: 'database' },
  { title: 'Firebase Development', description: 'Authentication, Firestore, Cloud Functions, and real-time data sync.', icon: 'flame' },
  { title: 'Admin Dashboards & ERP Systems', description: 'Internal tools and ERP systems for inventory, sales, and operations management.', icon: 'layout-dashboard' },
  { title: 'API Integration', description: 'Connecting third-party services, payment gateways, and external APIs into your product.', icon: 'plug' },
  { title: 'Bug Fixing & Performance Optimization', description: 'Diagnosing production issues and optimizing performance across the stack.', icon: 'gauge' },
]

export const services: Service[] = rawServices.map((s, i) => ({
  ...s,
  id: s.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
  order: i,
}))
