import Link from 'next/link';
import { Globe, Mail, ExternalLink, Code, BookOpen } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaDev, FaMedium, FaStackOverflow } from 'react-icons/fa';
import { Container } from '@/components/ui/container';
import { getPersonalInfo, getSocialLinks, getFilteredNavigation, getSiteConfig } from '@/lib/profile';

export function Footer() {
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();
  const navigation = getFilteredNavigation();
  const siteConfig = getSiteConfig();

  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* About */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">{personalInfo.name}</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                {personalInfo.tagline}
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Connect</h3>
              <div className="flex flex-wrap gap-4">
                {socialLinks.map((link) => {
                  // Map icon names to Lucide React components
                  const getIcon = (iconName: string) => {
                    const iconMap: Record<string, any> = {
                      'github': FaGithub,
                      'linkedin': FaLinkedin,
                      'twitter': FaTwitter,
                      'facebook': FaFacebook,
                      'instagram': FaInstagram,
                      'youtube': FaYoutube,
                      'dev': FaDev,
                      'medium': FaMedium,
                      'stackoverflow': FaStackOverflow,
                      'email': Mail,
                      'website': Globe,
                    };
                    return iconMap[iconName.toLowerCase()] || ExternalLink;
                  };
                  
                  const Icon = getIcon(link.icon || '');
                  
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={link.platform}
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  );
                })}
              </div>
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </p>
                {personalInfo.phone && (
                  <p className="text-sm text-muted-foreground">
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="hover:text-foreground transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-sm text-muted-foreground">
                {siteConfig.footer.copyright}
              </p>
              {siteConfig.footer.links.length > 0 && (
                <div className="flex gap-6">
                  {siteConfig.footer.links.map((link: { label: string; href: string }) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
