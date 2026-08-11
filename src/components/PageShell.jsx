import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PageShell({ children, className = 'pattern-dots' }) {
  return (
    <>
      <Navbar />
      <main className={`min-h-screen pt-24 pb-20 ${className}`}>{children}</main>
      <Footer />
    </>
  );
}
