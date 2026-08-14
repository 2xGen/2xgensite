import PageShell from '@/components/PageShell';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';

export const metadata = {
  title: 'Contact | 2xGen',
  description: 'Neem contact op met 2xGen. Kort bericht over je acquisitie — geen ellenlange salespitch.',
  alternates: { canonical: '/nl/contact', languages: { nl: '/nl/contact', en: '/contact' } },
};

export default function ContactPage() {
  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl bg-[#09294c] text-white p-8 sm:p-10 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#3d8fd1]" />
            <p className="text-[#3d8fd1] font-semibold mb-3">Contact</p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
              Laten we kijken waar de ruimte zit.
            </h1>
            <p className="text-white/65 leading-relaxed max-w-md">
              Stuur een bericht over je acquisitie — we denken mee zonder ellenlange salespitch. Geen formulier met veertien velden.
            </p>
          </div>

          <div className="space-y-3">
            <a
              href="mailto:matthijs@2xgen.com"
              className="xgen-card p-5 sm:p-6 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f1f8] flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#09294c]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">E-mail</p>
                  <p className="font-semibold text-[#09294c]">matthijs@2xgen.com</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#3d8fd1]" />
            </a>
            <a
              href="https://wa.me/2975668844"
              target="_blank"
              rel="noopener noreferrer"
              className="xgen-card p-5 sm:p-6 flex items-center justify-between gap-4 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-[#e8f1f8] flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-[#09294c]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">WhatsApp</p>
                  <p className="font-semibold text-[#09294c]">+297 566 8844</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#3d8fd1]" />
            </a>
            <a
              href="/nl/acquisitiecheck"
              className="xgen-card p-5 sm:p-6 flex items-center justify-between gap-4 group"
            >
              <div>
                <p className="text-sm text-gray-400">Liever eerst oriënteren?</p>
                <p className="font-semibold text-[#09294c]">Doe de gratis acquisitiecheck</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#3d8fd1]" />
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
