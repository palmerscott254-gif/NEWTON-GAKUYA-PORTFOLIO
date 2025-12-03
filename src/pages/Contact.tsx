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
      <section className="container py-20 md:py-32">
        <div className="max-w-5xl mx-auto">
          <motion.h1
            variants={ANIMATION_VARIANTS.slideUp}
            className="section-heading mb-6"
          >
            Get In Touch
          </motion.h1>
          
          <motion.p
            variants={ANIMATION_VARIANTS.slideUp}
            className="section-subheading mb-16"
          >
            Have a project in mind or just want to connect? I'd love to hear from you!
          </motion.p>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div variants={ANIMATION_VARIANTS.slideUp} className="space-y-8">
              <div className="glass-card p-8">
                <h3 className="text-2xl font-black mb-8 text-cyan-400">Contact Information</h3>
                
                <div className="space-y-6">
                  <a
                    href={`mailto:${CONTACT_INFO.email}`}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white mb-1">Email</p>
                      <p className="text-sm text-slate-300">{CONTACT_INFO.email}</p>
                    </div>
                  </a>

                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-cyan-500/20 transition-colors">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white mb-1">Phone</p>
                      <p className="text-sm text-slate-300">{CONTACT_INFO.phone}</p>
                    </div>
                  </a>

                  <a
                    href={`https://wa.me/${CONTACT_INFO.whatsapp.replace(/\+/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-green-500/20 transition-colors">
                      <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white mb-1">WhatsApp</p>
                      <p className="text-sm text-slate-300">{CONTACT_INFO.whatsapp}</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-4 rounded-xl">
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-white mb-1">Location</p>
                      <p className="text-sm text-slate-300">{CONTACT_INFO.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="glass-card p-8">
                <h3 className="text-2xl font-black mb-6 text-cyan-400">Connect on Social Media</h3>
                <div className="flex gap-6">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target={social.url.startsWith('http') ? '_blank' : undefined}
                      rel={social.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-4xl hover:scale-125 transition-all duration-300 hover:text-cyan-400"
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
              <form onSubmit={handleSubmit} className="glass-card p-8 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-bold mb-3 text-slate-200">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 transition-all outline-none text-white placeholder:text-slate-500"
                    placeholder="N.Scott"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-bold mb-3 text-slate-200">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-4 bg-white/5 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 transition-all outline-none text-white placeholder:text-slate-500"
                    placeholder="scott@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-bold mb-3 text-slate-200">
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-5 py-4 bg-white/5 border border-slate-600/50 rounded-xl focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400/50 transition-all outline-none resize-none text-white placeholder:text-slate-500"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full inline-flex items-center justify-center rounded-xl px-8 py-4 text-lg font-bold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${isSubmitting ? 'bg-gradient-to-r from-blue-400 to-cyan-400 animate-pulse' : 'bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 hover:shadow-glow hover:scale-105 active:scale-95'}`}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-3">
                      <svg className="w-5 h-5 animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-3">
                      Send Message
                      <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </svg>
                    </span>
                  )}
                </button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm text-center font-semibold">
                    ✓ Message sent successfully! I'll get back to you soon.
                  </p>
                )}

                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center font-semibold">
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
