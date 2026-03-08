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

/** Menu category from Supabase */
export interface MenuCategory {
    id: string;
    name: string;
    name_en: string | null;
    name_zh: string | null;
    sort_order: number;
    created_at: string;
}

/** Menu item from Supabase */
export interface MenuItem {
    id: string;
    name: string;
    name_en: string | null;
    name_zh: string | null;
    description: string | null;
    description_en: string | null;
    description_zh: string | null;
    price: number;
    image_url: string | null;
    category_id: string | null;
    is_available: boolean;
    sort_order: number;
    created_at: string;
    /** Joined category data (optional) */
    menu_categories?: MenuCategory;
}

/** Blog category from Supabase */
export interface BlogCategory {
    id: string;
    name: string;
    name_en: string | null;
    name_zh: string | null;
    slug: string;
    created_at: string;
}

/** Blog post from Supabase */
export interface BlogPost {
    id: string;
    title: string;
    title_en: string | null;
    title_zh: string | null;
    subtitle: string | null;
    subtitle_en: string | null;
    subtitle_zh: string | null;
    slug: string;
    content: string | null;
    content_en: string | null;
    content_zh: string | null;
    cover_image: string | null;
    category_id: string | null;
    author_id: string | null;
    is_published: boolean;
    published_at: string | null;
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
