'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Container, Badge } from '@/components/ui';
import { getCertifications } from '@/lib/profile';
import { formatDate } from '@/lib/utils';
import { ANIMATION_VARIANTS } from '@/constants';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import type { Certification } from '@/types/profile';

export default function CertificationsPage() {
  const certifications = getCertifications();

  return (
    <div className="py-16 sm:py-24">
      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={ANIMATION_VARIANTS.staggerContainer}
        >
          {/* Header */}
          <motion.div variants={ANIMATION_VARIANTS.slideUp} className="mb-12">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-4">
              Certifications
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">
              Professional certifications and credentials
            </p>
          </motion.div>

          {/* Certifications Grid */}
          <motion.div
            variants={ANIMATION_VARIANTS.staggerContainer}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {certifications.map((cert: Certification) => (
              <motion.div
                key={cert.id}
                variants={ANIMATION_VARIANTS.scale}
                className="rounded-xl border border-border bg-card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="space-y-4">
                  {/* Certification Badge/Icon */}
                  <div className="flex items-center justify-center h-16 w-16 rounded-lg bg-primary/10">
                    <Award className="h-8 w-8 text-primary" />
                  </div>

                  {/* Title & Issuer */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>

                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>Issued {formatDate(cert.issueDate)}</span>
                  </div>

                  {/* Expiry */}
                  {cert.expiryDate && (
                    <p className="text-xs text-muted-foreground">
                      Expires: {formatDate(cert.expiryDate)}
                    </p>
                  )}

                  {/* Credential ID */}
                  {cert.credentialId && (
                    <p className="text-xs text-muted-foreground">
                      ID: {cert.credentialId}
                    </p>
                  )}

                  {/* Skills */}
                  {cert.skills && cert.skills.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Verification Link */}
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Verify Certification
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </div>
  );
}
