import { motion } from 'framer-motion';
import { useState } from 'react';
import { ANIMATION_VARIANTS, CONTACT_INFO, SOCIAL_LINKS } from '@lib/constants';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://formspree.io/f/xjkeqeed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formState)
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={ANIMATION_VARIANTS.staggerContainer}
    >
      <section className="container py-12 md:py-20">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            variants={ANIMATION_VARIANTS.slideUp}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Get In Touch
          </motion.h1>
          
          <motion.p
            variants={ANIMATION_VARIANTS.slideUp}
            className="text-lg text-slate-300 mb-12"
          >
            Have a project in mind or just want to connect? I'd love to hear from you!
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div variants={ANIMATION_VARIANTS.slideUp} className="space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                
                <div className="space-y-4">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
                  >
                    <span className="text-2xl">📧</span>
                    <div>
                      <p className="font-semibold text-slate-200">Email</p>
                      <p className="text-sm text-slate-400">{CONTACT_INFO.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
                  >
                    <span className="text-2xl">📱</span>
                    <div>
                      <p className="font-semibold text-slate-200">Phone</p>
                      <p className="text-sm text-slate-400">{CONTACT_INFO.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-3 rounded-lg hover:bg-slate-700/30 transition-colors"
                  >
                    <span className="text-2xl">💬</span>
                    <div>
                      <p className="font-semibold text-slate-200">WhatsApp</p>
                      <p className="text-sm text-slate-400">{CONTACT_INFO.whatsapp}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-3">
                    <span className="text-2xl">📍</span>
                    <div>
                      <p className="font-semibold text-slate-200">Location</p>
                      <p className="text-sm text-slate-400">{CONTACT_INFO.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="text-xl font-bold mb-4">Connect on Social Media</h3>
                <div className="flex gap-4">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-3xl hover:scale-110 transition-transform"
                      aria-label={social.ariaLabel}
                      title={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={ANIMATION_VARIANTS.slideUp}>
              <form onSubmit={handleSubmit} className="card p-6 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm text-center">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center">
                    ✗ Failed to send message. Please try again or email me directly.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
