'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Globe, Mail, ExternalLink, Code, BookOpen, Download, ArrowRight, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook, FaInstagram, FaYoutube, FaDev, FaMedium, FaStackOverflow } from 'react-icons/fa';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { getPersonalInfo, getSocialLinks } from '@/lib/profile';
import { ANIMATION_VARIANTS } from '@/constants';

export function HeroSection() {
  const personalInfo = getPersonalInfo();
  const socialLinks = getSocialLinks();

  return (
    <section className="relative pt-20 pb-20 sm:pt-24 sm:pb-28 lg:pt-28 lg:pb-36 overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[600px] w-[600px] rounded-full bg-primary/10 blur-[100px]" />
        <div className="absolute right-0 top-0 -z-10 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-[100px]" />
        
        {/* Floating Decorative Elements */}
        <motion.div
          className="absolute top-20 left-10 h-16 w-16 rounded-full bg-primary/5 blur-xl"
          animate={{ 
            y: [0, 30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 h-24 w-24 rounded-full bg-purple-500/5 blur-xl"
          animate={{ 
            y: [0, -40, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 h-20 w-20 rounded-full bg-pink-500/5 blur-xl"
          animate={{ 
            y: [0, 20, 0],
            x: [0, 15, 0]
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <Container>
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS.staggerContainer}
            className="space-y-8 relative z-10"
          >
            {/* Badge */}
            <motion.div variants={ANIMATION_VARIANTS.slideUp}>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium">
                <Sparkles className="h-4 w-4 text-primary" />
                {personalInfo.availability === 'available' ? 'Available for opportunities' : 'Currently working'}
              </span>
            </motion.div>

            <motion.div variants={ANIMATION_VARIANTS.slideUp} className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl leading-tight">
                Hi, I'm{' '}
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    {personalInfo.name.split(' ')[0]}
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 right-0 h-3 bg-gradient-to-r from-primary/30 via-purple-500/30 to-pink-500/30 -z-10"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
              </h1>
              <h2 className="text-3xl font-semibold text-foreground/90 sm:text-4xl lg:text-5xl">
                {personalInfo.role}
              </h2>
              <p className="text-xl text-muted-foreground sm:text-2xl max-w-2xl leading-relaxed">
                {personalInfo.tagline}
              </p>
            </motion.div>

            <motion.div
              variants={ANIMATION_VARIANTS.slideUp}
              className="flex flex-wrap gap-4"
            >
              <Link 
                href="/contact"
                className="group inline-flex items-center gap-2 justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 hover:scale-105 h-14 px-8 text-lg"
              >
                Get In Touch
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={personalInfo.resumeUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 border-2 border-primary/20 bg-background hover:bg-primary/5 hover:border-primary/40 hover:scale-105 h-14 px-8 text-lg"
              >
                <Download className="h-5 w-5 group-hover:-translate-y-0.5 transition-transform" />
                Download Resume
              </a>
            </motion.div>

            {/* Social Links with enhanced design */}
            <motion.div
              variants={ANIMATION_VARIANTS.slideUp}
              className="flex items-center gap-3 pt-4"
            >
              <span className="text-sm font-medium text-muted-foreground">Connect:</span>
              {socialLinks.map((link, index) => {
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
                  <motion.a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center justify-center h-12 w-12 rounded-xl border-2 border-border bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-primary-foreground hover:border-primary hover:scale-110 transition-all duration-300 group"
                    aria-label={link.platform}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {link.platform}
                    </span>
                  </motion.a>
                );
              })}
            </motion.div>

            {/* Enhanced Stats Cards */}
            <motion.div
              variants={ANIMATION_VARIANTS.slideUp}
              className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8"
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative space-y-2 p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-sm hover:border-primary/50 transition-all duration-300">
                  <p className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">{personalInfo.yearsOfExperience}+</p>
                  <p className="text-sm text-muted-foreground font-medium">Years Experience</p>
                </div>
              </div>
              
              {personalInfo.currentCompany && (
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                  <div className="relative space-y-2 p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
                    <p className="text-4xl font-bold">✓</p>
                    <p className="text-sm text-muted-foreground font-medium">
                      @ {personalInfo.currentCompany}
                    </p>
                  </div>
                </div>
              )}
              
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
                <div className="relative space-y-2 p-6 rounded-2xl border border-border bg-background/80 backdrop-blur-sm hover:border-green-500/50 transition-all duration-300">
                  <div className="flex items-center gap-2">
                    <motion.div 
                      className="h-3 w-3 rounded-full bg-green-500"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="text-lg font-bold text-green-500">Available</p>
                  </div>
                  <p className="text-sm text-muted-foreground font-medium">For new projects</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="relative order-first lg:order-last"
          >
            <div className="relative aspect-square max-w-md mx-auto lg:max-w-none">
              {/* Animated Gradient Rings */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-primary via-purple-500 to-pink-500 blur-3xl opacity-40"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360]
                }}
                transition={{ 
                  duration: 20, 
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-primary/20 blur-2xl"
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              <motion.div
                className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-purple-500/20 blur-2xl"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 5, repeat: Infinity, delay: 1 }}
              />
              
              {/* Profile Image Container */}
              <div className="relative h-full w-full rounded-3xl border-4 border-border/50 overflow-hidden bg-gradient-to-br from-muted to-muted/50 shadow-2xl">
                <Image
                  src={personalInfo.profileImage}
                  alt={personalInfo.name}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              
              {/* Floating Badge */}
              <motion.div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full bg-background/95 backdrop-blur-md border-2 border-primary/20 shadow-xl"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                <p className="text-sm font-semibold whitespace-nowrap">
                  <span className="text-primary">🚀</span> {personalInfo.location}
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
