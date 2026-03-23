import { getClient } from '@/lib/sanity';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getClient(slug);
  if (!data) return {};
  return {
    title: data.name,
    description: data.tagline || `Links for ${data.name}`,
    openGraph: {
      title: data.name,
      description: data.tagline || `Links for ${data.name}`,
      ...(data.logo ? { images: [data.logo] } : {}),
    },
  };
}

const SOCIAL_ICONS: Record<string, string> = {
  instagram: '📷', facebook: '👤', youtube: '▶️', tiktok: '🎵',
  twitter: '🐦', linkedin: '💼', website: '🌐', email: '✉️',
  phone: '📞', whatsapp: '💬', spotify: '🎧', pinterest: '📌',
  strava: '🏃', github: '💻',
};

export default async function LinkHubPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getClient(slug);
  if (!data) notFound();

  const bg = data.colors?.background || '#0f0f0f';
  const text = data.colors?.text || '#ffffff';
  const card = data.colors?.card || 'rgba(255,255,255,0.08)';
  const accent = data.colors?.accent || '#4FD1C5';

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-12" style={{ backgroundColor: bg, color: text }}>
      <div className="w-full max-w-md mx-auto flex flex-col items-center gap-6">

        {/* Avatar / Logo */}
        {(data.avatar || data.logo) && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-2" style={{ borderColor: accent }}>
            <img src={data.avatar || data.logo} alt={data.name} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Name */}
        <div className="text-center">
          <h1 className="text-2xl font-bold tracking-tight">{data.name}</h1>
          {data.tagline && <p className="text-sm mt-1 opacity-70">{data.tagline}</p>}
        </div>

        {/* Links */}
        <div className="w-full flex flex-col gap-3 mt-2">
          {data.links?.map((link) => (
            <a
              key={link._key}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3.5 px-6 rounded-xl font-medium text-sm transition-all duration-200 hover:opacity-80 hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: card, color: text }}
            >
              {link.icon && <span className="mr-2">{link.icon}</span>}
              {link.title}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        {data.socials && data.socials.length > 0 && (
          <div className="flex gap-4 mt-4">
            {data.socials.map((social, i) => (
              <a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl opacity-60 hover:opacity-100 transition-opacity"
                title={social.platform}
              >
                {SOCIAL_ICONS[social.platform.toLowerCase()] || '🔗'}
              </a>
            ))}
          </div>
        )}

        {/* Footer */}
        {data.footerText && (
          <p className="text-xs opacity-30 mt-8">{data.footerText}</p>
        )}
      </div>
    </div>
  );
}
