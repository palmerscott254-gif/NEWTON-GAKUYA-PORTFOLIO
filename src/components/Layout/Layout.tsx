import Header from './Header';
import Footer from './Footer';
import WhatsAppButton from '@components/WhatsAppButton';
import { DarkForestBackground } from '@components/Background';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <DarkForestBackground />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
