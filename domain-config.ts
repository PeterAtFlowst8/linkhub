/**
 * Domain → slug mapping for LinkHub
 * Add an entry here whenever a client gets their own custom domain.
 * Then add the domain in Vercel + CNAME in the client's DNS.
 */
const DOMAIN_MAP: Record<string, string> = {
  // S2S
  'links.s2s.at': 's2s',
  'links.s2s-shop.com': 's2s',
  // WET Tirol
  'links.wet-tirol.at': 'wet-tirol',
  // Free Rivers
  'links.freerivers.org': 'freerivers',
  // FlyFishing Experience
  'links.flyfishingexperience.de': 'flyfishing',
  // Packraft Oetz
  'links.packraft-oetz.com': 'packraft-oetz',
  // Add more clients here...
};

export function getSlugFromHostname(hostname: string): string | null {
  // Strip www. prefix if present
  const clean = hostname.replace(/^www\./, '');
  return DOMAIN_MAP[clean] || null;
}
