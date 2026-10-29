import { SkillsSection } from '@/components/sections';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Skills & Technologies | Ayush Kamboj',
  description: 'Core technologies, frameworks, and developer tools used by Ayush Kamboj',
};

export default function SkillsPage() {
  return (
    <div className="py-8 sm:py-12">
      <SkillsSection />
    </div>
  );
}

