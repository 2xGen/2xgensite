import PageShell from '@/components/PageShell';
import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import { getMessages } from '@/i18n/messages';

export const metadata = {
  title: 'Contact | 2xGen',
  description:
    'Get in touch with 2xGen. A short note about your acquisition — no long sales pitch.',
  alternates: { canonical: '/en/contact', languages: { nl: '/contact', en: '/en/contact' } },
};

export default function EnContactPage() {
  const t = getMessages('en').pages.contact;

  return (
    <PageShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="rounded-3xl bg-[#09294c] text-white p-8 sm:p-10 relative overflow-hidden flex flex-col justify-center">
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[#3d8fd1]" />
            <p className="text-[#3d8fd1] font-semibold mb-3">{t.label}</p>
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">{t.h1}</h1>
            <p className="text-white/65 leading-relaxed max-w-md">{t.body}</p>
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
                  <p className="text-sm text-gray-400">{t.email}</p>
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
                  <p className="text-sm text-gray-400">{t.whatsapp}</p>
                  <p className="font-semibold text-[#09294c]">+297 566 8844</p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#3d8fd1]" />
            </a>
            <a
              href="/en/acquisition-check"
              className="xgen-card p-5 sm:p-6 flex items-center justify-between gap-4 group"
            >
              <div>
                <p className="text-sm text-gray-400">{t.or}</p>
                <p className="font-semibold text-[#09294c]">{t.check}</p>
              </div>
              <ArrowUpRight className="w-5 h-5 text-[#3d8fd1]" />
            </a>
          </div>
        </div>
      </div>
    </PageShell>
  );
}
