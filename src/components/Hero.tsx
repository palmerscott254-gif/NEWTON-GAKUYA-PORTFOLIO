import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="container py-20">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-extrabold tracking-tight"
      >
        Newton Gakuya — Django, Python & React Developer
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.6 }}
        className="mt-4 max-w-2xl text-slate-300"
      >
        Bachelor of Commerce student at DKUT. Building robust, scalable applications with modern web technologies and business insight.
      </motion.p>
    </section>
  );
}
