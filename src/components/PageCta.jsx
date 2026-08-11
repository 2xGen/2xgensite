import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function PageCta({
  title = 'Laten we kijken waar de ruimte zit.',
  text = 'Vertel wat je verkoopt, wie je zoekt en waar je nu tegenaan loopt.',
}) {
  return (
    <div className="rounded-3xl bg-[#09294c] text-white p-8 sm:p-10 mt-16">
      <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white mb-3">{title}</h2>
      <p className="text-white/65 mb-6 max-w-xl">{text}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link href="/acquisitiecheck" className="xgen-btn bg-white text-[#09294c] hover:bg-[#e8f1f8]">
          Doe de acquisitiecheck
          <ArrowRight className="w-4 h-4" />
        </Link>
        <Link href="/contact" className="xgen-btn border border-white/25 text-white hover:bg-white/10">
          Contact
        </Link>
      </div>
    </div>
  );
}
