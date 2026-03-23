import { createClient } from '@sanity/client';

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || 'placeholder',
  dataset: process.env.SANITY_DATASET || 'production',
  useCdn: true,
  apiVersion: '2024-01-01',
});

export interface LinkHubClient {
  _id: string;
  slug: string;
  name: string;
  tagline?: string;
  logo?: string;
  avatar?: string;
  colors: {
    background: string;
    text: string;
    card: string;
    cardHover: string;
    accent: string;
  };
  links: {
    _key: string;
    title: string;
    url: string;
    icon?: string;
    active: boolean;
  }[];
  socials: {
    platform: string;
    url: string;
  }[];
  backgroundImage?: string;
  footerText?: string;
}

export async function getClient(slug: string): Promise<LinkHubClient | null> {
  try { return await client.fetch(
    `*[_type == "linkHub" && slug.current == $slug && active == true][0]{
      _id,
      "slug": slug.current,
      name,
      tagline,
      "logo": coalesce(logo.asset->url, externalLogo),
      "avatar": coalesce(avatar.asset->url, externalAvatar),
      "backgroundImage": coalesce(backgroundImage.asset->url, externalBgImage),
      colors,
      links[active == true] | order(order asc),
      socials,
      footerText
    }`,
    { slug }
  ); } catch { return null; }
}

export async function getAllClients(): Promise<{ slug: string; name: string }[]> {
  try {
    return await client.fetch(
      `*[_type == "linkHub" && active == true]{ "slug": slug.current, name }`
    );
  } catch {
    return [];
  }
}
