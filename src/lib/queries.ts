import { createClient } from "@/lib/supabase/server";
import type {
  Achievement,
  AlumniEntry,
  Disclosure,
  GalleryImage,
  HeroSlide,
  Notification,
  Milestone,
  ResultDoc,
  SchoolEvent,
  SiteSettings,
  StaffMember,
  StatCounter,
  StudentTopper,
  Testimonial,
} from "@/types/content";

export const DEFAULT_SETTINGS: SiteSettings = {
  school_name: "SRM Welkin",
  tagline: "Higher Secondary School, Sopore",
  logo_url: "/images/welkin-logo.svg",
  phone: "+91 1800 890 1866",
  email: "info@srmwelkin.com",
  address: "Near Dak Bunglow, Opposite Sub-District Hospital, Sopore",
  facebook_url: "#",
  linkedin_url: "#",
  twitter_url: "#",
  hero_heading: "Shaping Bright Futures at SRM Welkin",
  hero_subheading:
    "A legacy of academic excellence, strong values and holistic growth in the heart of Sopore.",
  chairman_message_heading: "Welcome Message From the Chairman, SRM Welkin",
  chairman_message_body:
    "At Welkin everyone is encouraged to get involved to his maximum capacity and to do his best. The experiences that every student will have during his lifetime will equip him for life in the present demanding and fast-changing world.",
  chairman_photo_url: "/images/welkin-chairman.svg",
  about_why_welkin:
    "Welkin is about 55 km away from the capital city Srinagar, commonly known as North Kashmir, Apple town Sopore situated at the banks of the River Jhelum. The institution primarily was established to spread the power of knowledge, information, and enlightenment to the inhabitants of the town. As of now, the institution covers 58 kanals of land, with seven giant spacious elegant, and splendid structures. The library of this institution is properly digitalized and serves as the treasure of knowledge, quenching the thirst of thousand odd knowledge thirsty aspirants, with thousands of books on varied subjects. Besides this the institution has a multipurpose hall, a separate kindergarten activity room, three vast playgrounds, one basketball court, one play zone, an elegant botanical garden and a cafeteria for staff and students in Ahad block.",
  about_team:
    "The institution has a huge staff comprising of teaching and non-teaching faculties. The whole team is administered and guided by the able and competent administration of the institution — Chairman, Vice-Chairperson, Principal, Academic Head, HODs, and supervisors.",
  about_accreditation:
    "Maintaining the educational setup and standards, SRM Welkin Higher Secondary School got its accreditation right at its onset by CBSE. It has approvals from the Fire and Emergency Department, Chemicals Department, and R&B for its functioning.",
  admissions_heading: "Thank you for considering joining our community!",
  admissions_body:
    "We are excited to welcome individuals who share our passion and vision. By becoming a member, you will have the opportunity to engage with like-minded individuals, contribute to meaningful discussions, and be a part of initiatives that drive positive change.",
};

export const DEFAULT_STATS: StatCounter[] = [
  { id: "default-1", label: "Well Qualified & Experienced Teachers", start_value: 1, end_value: 200, suffix: "+", sort_order: 1 },
  { id: "default-2", label: "Students Enrolled", start_value: 1, end_value: 5916, suffix: "+", sort_order: 2 },
  { id: "default-3", label: "Best Results in Academics & Co-Curricular Activities", start_value: 1, end_value: 100, suffix: "%", sort_order: 3 },
  { id: "default-4", label: "Kanals of Beautiful Campus", start_value: 1, end_value: 58, suffix: "", sort_order: 4 },
  { id: "default-5", label: "Years of Excellence", start_value: 1, end_value: 20, suffix: "+", sort_order: 5 },
];

const SUPABASE_CONFIGURED = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!SUPABASE_CONFIGURED) return DEFAULT_SETTINGS;
  const supabase = await createClient();
  const { data } = await supabase.from("site_settings").select("key, value");
  if (!data) return DEFAULT_SETTINGS;
  const settings: SiteSettings = { ...DEFAULT_SETTINGS };
  for (const row of data) settings[row.key] = row.value;
  return settings;
}

export async function getHeroSlides(): Promise<HeroSlide[]> {
  if (!SUPABASE_CONFIGURED) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("hero_slides")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getNotifications(limit = 10): Promise<Notification[]> {
  if (!SUPABASE_CONFIGURED) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("notifications")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false })
    .limit(limit);
  return data ?? [];
}

export async function getStatCounters(): Promise<StatCounter[]> {
  if (!SUPABASE_CONFIGURED) return DEFAULT_STATS;
  const supabase = await createClient();
  const { data } = await supabase
    .from("stat_counters")
    .select("*")
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export const DEFAULT_STAFF: StaffMember[] = [
  { id: "default-t1", name: "Dr. Mehraj Ud Din", designation: "Principal", photo_url: "", bio: "25+ years in academic leadership and CBSE curriculum design.", sort_order: 1, is_published: true },
  { id: "default-t2", name: "Farah Bashir", designation: "Vice Principal", photo_url: "", bio: "Oversees academic quality across all senior secondary streams.", sort_order: 2, is_published: true },
  { id: "default-t3", name: "Aabid Hussain", designation: "Academic Head — Sciences", photo_url: "", bio: "Leads the Physics, Chemistry and Biology departments.", sort_order: 3, is_published: true },
  { id: "default-t4", name: "Sana Parveen", designation: "Head — Kindergarten Wing", photo_url: "", bio: "Specialist in early-years and foundational learning.", sort_order: 4, is_published: true },
];

export async function getStaffMembers(): Promise<StaffMember[]> {
  if (!SUPABASE_CONFIGURED) return DEFAULT_STAFF;
  const supabase = await createClient();
  const { data } = await supabase
    .from("staff_members")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export const DEFAULT_STUDENT_TOPPERS: StudentTopper[] = [
  { id: "default-s1", name: "Aarohi Sharma", class_name: "Class XII", photo_url: "", achievement: "School Topper — Science Stream", score: 98.6, sort_order: 1, is_published: true },
  { id: "default-s2", name: "Zain Malik", class_name: "Class XII", photo_url: "", achievement: "School Topper — Commerce Stream", score: 97.2, sort_order: 2, is_published: true },
  { id: "default-s3", name: "Iqra Nazir", class_name: "Class X", photo_url: "", achievement: "Board Topper", score: 98.0, sort_order: 3, is_published: true },
  { id: "default-s4", name: "Danish Rather", class_name: "Class XI", photo_url: "", achievement: "District Rank 1 — Mathematics Olympiad", score: 96.4, sort_order: 4, is_published: true },
];

export async function getStudentToppers(): Promise<StudentTopper[]> {
  if (!SUPABASE_CONFIGURED) return DEFAULT_STUDENT_TOPPERS;
  const supabase = await createClient();
  const { data } = await supabase
    .from("students")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getAchievements(): Promise<Achievement[]> {
  if (!SUPABASE_CONFIGURED) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("achievements")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!SUPABASE_CONFIGURED) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("gallery_images")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getResults(): Promise<ResultDoc[]> {
  if (!SUPABASE_CONFIGURED) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("results")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}

export async function getDisclosures(): Promise<Disclosure[]> {
  if (!SUPABASE_CONFIGURED) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("disclosures")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export const DEFAULT_EVENTS: SchoolEvent[] = [
  { id: "default-e1", title: "Annual Sports Day", description: "A full day of athletics, team games and prize distribution for all classes.", event_date: new Date(Date.now() + 20 * 86400000).toISOString().slice(0, 10), event_time: "9:00 AM", location: "Main Playground", is_published: true },
  { id: "default-e2", title: "Parent-Teacher Meeting", description: "Term progress discussion for Classes I–XII.", event_date: new Date(Date.now() + 10 * 86400000).toISOString().slice(0, 10), event_time: "10:00 AM – 1:00 PM", location: "Respective Classrooms", is_published: true },
  { id: "default-e3", title: "Annual Day Celebration", description: "Cultural performances, awards and the annual school showcase.", event_date: new Date(Date.now() + 45 * 86400000).toISOString().slice(0, 10), event_time: "4:00 PM", location: "Multipurpose Hall", is_published: true },
];

export async function getEvents(): Promise<SchoolEvent[]> {
  if (!SUPABASE_CONFIGURED) return DEFAULT_EVENTS;
  const supabase = await createClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("is_published", true)
    .gte("event_date", new Date().toISOString().slice(0, 10))
    .order("event_date", { ascending: true });
  return data ?? [];
}

export const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { id: "default-te1", name: "Bilal Ahmad", role: "Parent, Class VIII", quote: "The individual attention my daughter gets here is remarkable. The teachers genuinely care about every child's progress.", photo_url: "", sort_order: 1, is_published: true },
  { id: "default-te2", name: "Rukhsana Jan", role: "Parent, Class V", quote: "A perfect balance of academics and values. My son looks forward to school every single day.", photo_url: "", sort_order: 2, is_published: true },
  { id: "default-te3", name: "Owais Mattoo", role: "Alumnus, Batch of 2019", quote: "SRM Welkin gave me the foundation and confidence to pursue engineering. Forever grateful to my teachers here.", photo_url: "", sort_order: 3, is_published: true },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!SUPABASE_CONFIGURED) return DEFAULT_TESTIMONIALS;
  const supabase = await createClient();
  const { data } = await supabase
    .from("testimonials")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export const DEFAULT_MILESTONES: Milestone[] = [
  { id: "default-m1", year: "2005", title: "Foundation Laid", description: "SRM Welkin was established to bring quality education to Sopore.", sort_order: 1, is_published: true },
  { id: "default-m2", year: "2010", title: "Campus Expansion", description: "Growth to seven spacious blocks across 58 kanals of land.", sort_order: 2, is_published: true },
  { id: "default-m3", year: "2015", title: "CBSE Accreditation", description: "Recognised by CBSE for academic excellence and infrastructure.", sort_order: 3, is_published: true },
  { id: "default-m4", year: "2020", title: "Digital Library Launched", description: "A fully digitalised library opened for students and staff.", sort_order: 4, is_published: true },
  { id: "default-m5", year: "2025", title: "5,900+ Students", description: "Grew to serve nearly six thousand students across the region.", sort_order: 5, is_published: true },
];

export async function getMilestones(): Promise<Milestone[]> {
  if (!SUPABASE_CONFIGURED) return DEFAULT_MILESTONES;
  const supabase = await createClient();
  const { data } = await supabase
    .from("milestones")
    .select("*")
    .eq("is_published", true)
    .order("sort_order", { ascending: true });
  return data ?? [];
}

export async function getAlumni(): Promise<AlumniEntry[]> {
  if (!SUPABASE_CONFIGURED) return [];
  const supabase = await createClient();
  const { data } = await supabase
    .from("alumni")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: false });
  return data ?? [];
}
