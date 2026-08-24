import { Mail, ArrowUpRight } from 'lucide-react';
import { CONTACT, mailto } from '@/lib/contacts';

const DEFAULT_ITEMS = [
  { email: CONTACT.hello, label: 'General' },
  { email: CONTACT.support, label: 'Support' },
  { email: CONTACT.billing, label: 'Billing' },
  { email: CONTACT.legal, label: 'Legal' },
];

/** Compact list of public 2xGen email aliases. */
export default function ContactEmailCards({ items = DEFAULT_ITEMS, className = 'space-y-3' }) {
  return (
    <div className={className}>
      {items.map(({ email, label }) => (
        <a
          key={email}
          href={mailto(email)}
          className="xgen-card p-5 sm:p-6 flex items-center justify-between gap-4 group"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#e8f1f8] flex items-center justify-center">
              <Mail className="w-5 h-5 text-[#09294c]" />
            </div>
            <div>
              <p className="text-sm text-gray-400">{label}</p>
              <p className="font-semibold text-[#09294c]">{email}</p>
            </div>
          </div>
          <ArrowUpRight className="w-5 h-5 text-[#3d8fd1] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </a>
      ))}
    </div>
  );
}
