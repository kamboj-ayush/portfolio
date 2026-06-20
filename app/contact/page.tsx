import { Metadata } from 'next';
import { Mail, MapPin, Phone } from 'lucide-react';
import ContactForm from '@/components/sections/contact-form';
import { getContactFormConfig, getPersonalInfo, getSocialLinks } from '@/lib/profile';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with me for collaborations, projects, or just to say hello!',
};

export default function ContactPage() {
  const contactConfig = getContactFormConfig();
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'github':
        return <FaGithub className="h-6 w-6" />;
      case 'linkedin':
        return <FaLinkedin className="h-6 w-6" />;
      case 'twitter':
        return <FaTwitter className="h-6 w-6" />;
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen">
      {/* Contact Form Section */}
      {contactConfig && <ContactForm config={contactConfig} />}

      {/* Contact Information */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Email */}
            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Phone */}
            {personalInfo.phone && (
              <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href={`tel:${personalInfo.phone}`}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Location */}
            <div className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <MapPin className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Location</h3>
                  <p className="text-sm text-muted-foreground">{personalInfo.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 bg-card rounded-xl border border-border hover:border-primary hover:shadow-lg transition-all group"
                  aria-label={link.platform}
                >
                  <div className="text-muted-foreground group-hover:text-primary transition-colors">
                    {getSocialIcon(link.platform)}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
