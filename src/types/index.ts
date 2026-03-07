// ============================================
// Entity Types — HanaVeg
// ============================================

/** Hero slider slide data */
export interface HeroSlide {
    label: string;
    title: string;
    titleAccent: string;
    desc: string;
    img: string;
}

/** Gallery image item */
export interface GalleryImage {
    src: string;
    alt: string;
    aspect: string;
}

/** Booking form request payload */
export interface BookingRequest {
    name: string;
    phone: string;
    persons: string;
    time: string;
    date: string;
    note: string;
}

/** Menu item from Supabase */
export interface MenuItem {
    id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    is_available: boolean;
    created_at: string;
}

/** Blog post from Supabase */
export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    cover_image: string;
    author: string;
    published_at: string;
    created_at: string;
}

/** User roles for RBAC */
export type UserRole = 'admin' | 'staff';

/** Auth user profile */
export interface UserProfile {
    id: string;
    email: string;
    role: UserRole;
    full_name: string;
}
