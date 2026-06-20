'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, FileText, Briefcase, Award, Code, ExternalLink } from 'lucide-react';
import { getProjects, getExperiences, getCertifications, getSiteConfig } from '@/lib/profile';
import type { Certification } from '@/types/profile';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  category: string;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = useMemo(() => {
    const items: CommandItem[] = [];
    const siteConfig = getSiteConfig();

    // Navigation items
    siteConfig.navigation.forEach((nav) => {
      items.push({
        id: `nav-${nav.href}`,
        title: nav.label,
        description: `Navigate to ${nav.label}`,
        icon: <FileText className="h-4 w-4" />,
        action: () => {
          router.push(nav.href);
          onClose();
        },
        category: 'Navigation',
      });
    });

    // Projects
    const projects = getProjects();
    projects.forEach((project) => {
      items.push({
        id: `project-${project.slug}`,
        title: project.name,
        description: project.shortDescription,
        icon: <Code className="h-4 w-4" />,
        action: () => {
          router.push(`/projects/${project.slug}`);
          onClose();
        },
        category: 'Projects',
      });

      if (project.liveUrl) {
        items.push({
          id: `project-live-${project.slug}`,
          title: `${project.name} - Live Demo`,
          description: project.liveUrl,
          icon: <ExternalLink className="h-4 w-4" />,
          action: () => {
            window.open(project.liveUrl, '_blank');
            onClose();
          },
          category: 'External Links',
        });
      }
    });

    // Experience
    const experience = getExperiences();
    experience.forEach((exp) => {
      items.push({
        id: `exp-${exp.id}`,
        title: `${exp.role} at ${exp.company}`,
        description: exp.description,
        icon: <Briefcase className="h-4 w-4" />,
        action: () => {
          router.push('/experience');
          onClose();
        },
        category: 'Experience',
      });
    });

    // Certifications
    const certifications = getCertifications();
    certifications.forEach((cert: Certification) => {
      items.push({
        id: `cert-${cert.id}`,
        title: cert.name,
        description: `Issued by ${cert.issuer}`,
        icon: <Award className="h-4 w-4" />,
        action: () => {
          router.push('/certifications');
          onClose();
        },
        category: 'Certifications',
      });
    });

    return items;
  }, [router, onClose]);

  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    
    const searchQuery = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(searchQuery) ||
        cmd.description?.toLowerCase().includes(searchQuery) ||
        cmd.category.toLowerCase().includes(searchQuery)
    );
  }, [query, commands]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        e.preventDefault();
        filteredCommands[selectedIndex]?.action();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, selectedIndex, filteredCommands]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Reset state when opening/closing
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Group commands by category
  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) {
      acc[cmd.category] = [];
    }
    acc[cmd.category].push(cmd);
    return acc;
  }, {} as Record<string, CommandItem[]>);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Command Palette */}
      <div className="relative w-full max-w-2xl bg-background rounded-lg border border-border shadow-2xl overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for projects, pages, or commands..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {filteredCommands.length === 0 ? (
            <div className="px-4 py-8 text-center text-muted-foreground">
              No results found for "{query}"
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, items]) => (
              <div key={category} className="py-2">
                <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {category}
                </div>
                {items.map((cmd, index) => {
                  const globalIndex = filteredCommands.indexOf(cmd);
                  const isSelected = globalIndex === selectedIndex;
                  
                  return (
                    <button
                      key={cmd.id}
                      onClick={cmd.action}
                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? 'bg-accent text-accent-foreground'
                          : 'hover:bg-accent/50'
                      }`}
                    >
                      <div className="flex-shrink-0 text-muted-foreground">
                        {cmd.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate">{cmd.title}</div>
                        {cmd.description && (
                          <div className="text-sm text-muted-foreground truncate">
                            {cmd.description}
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-muted-foreground bg-muted rounded">
                          ↵
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 border-t border-border bg-muted/50 flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-background rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-background rounded">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-background rounded">↵</kbd>
              Select
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-background rounded">ESC</kbd>
              Close
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
