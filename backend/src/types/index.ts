export interface Course {
  id: string;
  title: string;
  slug: string;
  phase: number;
  ageGroup: string;
  duration: string;
  classFrequency: string;
  level: string;
  description: string;
  primaryOutcome: string;
  skillsDeveloped: string[];
}

export interface ParentReview {
  id: string;
  reviewerName: string;
  role: string;
  location: string;
  rating: number;
  comment: string;
  verified: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readTime: string;
}

export interface CourseRegistration {
  id: string;
  studentName: string;
  parentName: string;
  phone: string;
  email?: string;
  courseSlug: string;
  message?: string;
  status: "new";
  createdAt: string;
}

export interface LeadInquiry {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: "new";
  createdAt: string;
}

export interface TrialBooking {
  id: string;
  parentName: string;
  studentName: string;
  studentAge: number;
  email: string;
  phone: string;
  courseSlug: string;
  preferredDate: string;
  preferredTime: string;
  timezone: string;
  message?: string;
  status: "pending";
  createdAt: string;
}
