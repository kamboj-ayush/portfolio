import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Calendar, Users, CheckCircle } from 'lucide-react';
import { FaGithub, FaGooglePlay, FaAppStore } from 'react-icons/fa';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { getProjectBySlug, getProjects } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  const hasEndDate = 'endDate' in project && project.endDate;
  const endDateStr = hasEndDate ? project.endDate as string : null;
  const teamSize = 'teamSize' in project ? project.teamSize as number | undefined : undefined;
  const role = 'role' in project ? project.role as string | undefined : undefined;
  const problemStatement = 'problemStatement' in project ? project.problemStatement as string | undefined : undefined;
  const challenges = 'challenges' in project ? project.challenges as string[] | undefined : undefined;
  const solution = 'solution' in project ? project.solution as string | undefined : undefined;
  const architecture = 'architecture' in project ? project.architecture as string | undefined : undefined;
  const results = 'results' in project ? project.results as any[] | undefined : undefined;
  const githubUrl = 'githubUrl' in project ? project.githubUrl as string | undefined : undefined;
  const githubLink = 'githubLink' in project ? project.githubLink as string | undefined : undefined;
  const isLiveOnPlayStore = 'isLiveOnPlayStore' in project ? project.isLiveOnPlayStore as boolean | undefined : undefined;
  const playStoreLink = 'playStoreLink' in project ? project.playStoreLink as string | undefined : undefined;
  const isLiveOnAppStore = 'isLiveOnAppStore' in project ? project.isLiveOnAppStore as boolean | undefined : undefined;
  const appStoreLink = 'appStoreLink' in project ? project.appStoreLink as string | undefined : undefined;

  return (
    <div className="py-16 sm:py-24">
      <Container>
        {/* Back Button */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>

        {/* Project Header */}
        <div className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            {project.featured && (
              <Badge variant="default" className="bg-yellow-500 text-yellow-950">
                Featured
              </Badge>
            )}
            <Badge variant="secondary">{project.category}</Badge>
            <Badge variant="outline" className="capitalize">{project.status}</Badge>
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4">
            {project.name}
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl">
            {project.shortDescription}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap gap-6 mt-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>
                {formatDate(project.startDate)}
                {endDateStr && ` - ${formatDate(endDateStr)}`}
              </span>
            </div>
            {teamSize && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Team of {teamSize}</span>
              </div>
            )}
            {role && (
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                <span>{role}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-8">
            {(githubLink || githubUrl) && (
              <a
                href={(githubLink || githubUrl) as string}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-6"
              >
                <FaGithub className="h-5 w-5" />
                <span>Code</span>
              </a>
            )}
            {isLiveOnPlayStore && playStoreLink && (
              <a
                href={playStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border border-green-500/50 bg-green-500/10 hover:bg-green-500/20 text-green-600 h-11 px-6"
              >
                <FaGooglePlay className="h-4 w-4" />
                <span>Play Store</span>
              </a>
            )}
            {isLiveOnAppStore && appStoreLink && (
              <a
                href={appStoreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 h-11 px-6"
              >
                <FaAppStore className="h-4 w-4" />
                <span>App Store</span>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6"
              >
                <ExternalLink className="h-5 w-5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Project Image */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-muted mb-12">
          <Image
            src={project.thumbnailImage}
            alt={project.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Project Content */}
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-12">
            {/* Overview */}
            <section>
              <h2 className="text-3xl font-bold mb-4">Overview</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {project.fullDescription}
              </p>
            </section>

            {/* Problem Statement */}
            {problemStatement && (
              <section>
                <h2 className="text-3xl font-bold mb-4">Problem Statement</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {problemStatement}
                </p>
              </section>
            )}

            {/* Challenges */}
            {challenges && challenges.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-4">Challenges</h2>
                <ul className="space-y-3">
                  {challenges.map((challenge, index) => (
                    <li key={index} className="flex gap-3">
                      <span className="text-primary font-bold mt-1">•</span>
                      <span className="text-lg text-muted-foreground">{challenge}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Solution */}
            {solution && (
              <section>
                <h2 className="text-3xl font-bold mb-4">Solution</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {solution}
                </p>
              </section>
            )}

            {/* Architecture */}
            {architecture && (
              <section>
                <h2 className="text-3xl font-bold mb-4">Architecture</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {architecture}
                </p>
              </section>
            )}

            {/* Results */}
            {results && results.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-4">Results & Impact</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {results.map((result, index) => (
                    <div key={index} className="p-6 rounded-lg border border-border bg-card">
                      <div className="text-3xl font-bold text-primary mb-2">
                        {result.value}
                      </div>
                      <div className="font-semibold mb-1">{result.metric}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.description}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Image Gallery */}
            {project.images && project.images.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold mb-6">Gallery</h2>
                <div className="grid sm:grid-cols-2 gap-6">
                  {project.images.map((image, index) => (
                    <div
                      key={index}
                      className="relative aspect-video rounded-lg overflow-hidden bg-muted"
                    >
                      <Image
                        src={image}
                        alt={`${project.name} screenshot ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Technologies */}
            <section>
              <h3 className="text-xl font-bold mb-4">Technologies Used</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Tags */}
            <section>
              <h3 className="text-xl font-bold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Links */}
            <section>
              <h3 className="text-xl font-bold mb-4">Links</h3>
              <div className="space-y-2">
                {githubUrl && (
                  <a
                    href={githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <FaGithub className="h-4 w-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Website</span>
                  </a>
                )}
              </div>
            </section>
          </div>
        </div>

        {/* Navigation to other projects */}
        <div className="mt-16 pt-16 border-t border-border">
          <h2 className="text-2xl font-bold mb-6">More Projects</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {getProjects()
              .filter((p) => p.slug !== params.slug)
              .slice(0, 3)
              .map((otherProject) => (
                <Link
                  key={otherProject.id}
                  href={`/projects/${otherProject.slug}`}
                  className="group rounded-xl border border-border bg-card overflow-hidden hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden bg-muted">
                    <Image
                      src={otherProject.thumbnailImage}
                      alt={otherProject.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold mb-1">{otherProject.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {otherProject.shortDescription}
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
