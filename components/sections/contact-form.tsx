'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle, Mail, Phone, User, MessageSquare } from 'lucide-react';
import { ContactFormConfig } from '@/types/profile';

interface ContactFormProps {
  config: ContactFormConfig;
}

interface FormData {
  [key: string]: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message?: string;
}

export default function ContactForm({ config }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({});
  const [status, setStatus] = useState<FormStatus>({ type: 'idle' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: 'loading' });

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: config.web3FormsAccessKey,
          email: config.email,
          ...formData,
          subject: `New Contact Form Submission from ${formData.name || 'Website'}`,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus({
          type: 'success',
          message: config.successMessage || 'Thank you for contacting me! I\'ll get back to you soon.',
        });
        setFormData({});
        // Reset form after 5 seconds
        setTimeout(() => setStatus({ type: 'idle' }), 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: config.errorMessage || 'Oops! Something went wrong. Please try again.',
      });
      setTimeout(() => setStatus({ type: 'idle' }), 5000);
    }
  };

  const getFieldIcon = (fieldName: string) => {
    switch (fieldName) {
      case 'name':
        return <User className="h-5 w-5" />;
      case 'email':
        return <Mail className="h-5 w-5" />;
      case 'phone':
        return <Phone className="h-5 w-5" />;
      case 'message':
        return <MessageSquare className="h-5 w-5" />;
      default:
        return null;
    }
  };

  if (!config.enabled) {
    return null;
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? I'd love to hear from you!
            </p>
          </div>

          <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 border border-border">
            {status.type === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-muted-foreground">{status.message}</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {config.fields.map((field, index) => (
                  <motion.div
                    key={field.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <label htmlFor={field.name} className="block text-sm font-medium mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    
                    <div className="relative">
                      <div className="absolute left-4 top-4 text-muted-foreground">
                        {getFieldIcon(field.name)}
                      </div>
                      
                      {field.type === 'textarea' ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          required={field.required}
                          placeholder={field.placeholder}
                          rows={5}
                          className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                        />
                      ) : (
                        <input
                          type={field.type}
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ''}
                          onChange={handleChange}
                          required={field.required}
                          placeholder={field.placeholder}
                          className="w-full pl-12 pr-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}

                {status.type === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500"
                  >
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                    <p className="text-sm">{status.message}</p>
                  </motion.div>
                )}

                <motion.button
                  type="submit"
                  disabled={status.type === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status.type === 'loading' ? (
                    <>
                      <span className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              You can also reach me directly at{' '}
              <a
                href={`mailto:${config.email}`}
                className="text-primary hover:underline font-medium"
              >
                {config.email}
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
