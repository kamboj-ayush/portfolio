import { ImageResponse } from 'next/og';
import { getPersonalInfo } from '@/lib/profile';

export const runtime = 'edge';
export const alt = 'Pawan Tripathi - Senior Software Engineer';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  const personalInfo = getPersonalInfo();

  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0a0a0a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1a1a1a 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1a1a1a 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Main Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
            borderRadius: '24px',
            border: '2px solid rgba(99, 102, 241, 0.3)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #6366f1, #a855f7)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '16px',
              letterSpacing: '-0.02em',
            }}
          >
            {personalInfo.name}
          </div>

          {/* Role */}
          <div
            style={{
              fontSize: '36px',
              color: '#e5e7eb',
              marginBottom: '32px',
              fontWeight: '500',
            }}
          >
            {personalInfo.role}
          </div>

          {/* Company & Experience */}
          <div
            style={{
              display: 'flex',
              gap: '32px',
              marginBottom: '24px',
            }}
          >
            {personalInfo.currentCompany && (
              <div
                style={{
                  fontSize: '24px',
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <span style={{ color: '#6366f1' }}>@</span>
                {personalInfo.currentCompany}
              </div>
            )}
            <div
              style={{
                fontSize: '24px',
                color: '#9ca3af',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span style={{ color: '#a855f7' }}>•</span>
              {personalInfo.yearsOfExperience}+ Years Experience
            </div>
          </div>

          {/* Email */}
          <div
            style={{
              fontSize: '22px',
              color: '#6b7280',
              marginBottom: '32px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <span style={{ color: '#6366f1' }}>✉</span>
            {personalInfo.email}
          </div>

          {/* Tagline */}
          <div
            style={{
              fontSize: '20px',
              color: '#9ca3af',
              textAlign: 'center',
              maxWidth: '900px',
              lineHeight: 1.4,
            }}
          >
            {personalInfo.tagline}
          </div>
        </div>

        {/* Footer Badge */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            right: '40px',
            fontSize: '18px',
            color: '#6b7280',
            background: 'rgba(99, 102, 241, 0.1)',
            padding: '12px 24px',
            borderRadius: '12px',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          Portfolio • 2024
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
