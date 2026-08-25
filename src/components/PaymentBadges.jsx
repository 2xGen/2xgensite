'use client';

/** Secure payment trust marks for the dark footer (Stripe + cards). */
export default function PaymentBadges({ className = '' }) {
  return (
    <div className={className}>
      <p className="text-xs font-semibold uppercase tracking-wide text-white/40 mb-3">
        Secure payments
      </p>
      <div className="flex flex-wrap items-center gap-2">
        <span
          title="Powered by Stripe"
          className="inline-flex items-center gap-1.5 h-9 px-3 rounded-lg bg-white text-[#635bff] shadow-sm"
        >
          <LockIcon className="w-3.5 h-3.5 text-[#0a2540]/65" />
          <span className="text-[13px] font-semibold tracking-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
            stripe
          </span>
        </span>

        <CardBadge label="Visa">
          <svg viewBox="0 0 48 32" className="h-5 w-auto" aria-hidden>
            <rect width="48" height="32" rx="4" fill="#1A1F71" />
            <text
              x="24"
              y="21"
              textAnchor="middle"
              fill="#fff"
              fontSize="12"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="700"
              fontStyle="italic"
            >
              VISA
            </text>
          </svg>
        </CardBadge>

        <CardBadge label="Mastercard">
          <svg viewBox="0 0 48 32" className="h-5 w-auto" aria-hidden>
            <rect width="48" height="32" rx="4" fill="#fff" />
            <circle cx="19" cy="16" r="8" fill="#EB001B" />
            <circle cx="29" cy="16" r="8" fill="#F79E1B" />
            <path d="M24 9.5a8 8 0 0 1 0 13 8 8 0 0 1 0-13z" fill="#FF5F00" />
          </svg>
        </CardBadge>

        <CardBadge label="American Express">
          <svg viewBox="0 0 48 32" className="h-5 w-auto" aria-hidden>
            <rect width="48" height="32" rx="4" fill="#2E77BC" />
            <text
              x="24"
              y="20"
              textAnchor="middle"
              fill="#fff"
              fontSize="9"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="700"
            >
              AMEX
            </text>
          </svg>
        </CardBadge>

        <CardBadge label="Discover">
          <svg viewBox="0 0 48 32" className="h-5 w-auto" aria-hidden>
            <rect width="48" height="32" rx="4" fill="#fff" stroke="#E5E7EB" />
            <circle cx="36" cy="16" r="7" fill="#F47216" />
            <text
              x="16"
              y="20"
              textAnchor="middle"
              fill="#1a1a1a"
              fontSize="7"
              fontFamily="Arial, Helvetica, sans-serif"
              fontWeight="700"
            >
              DISC
            </text>
          </svg>
        </CardBadge>
      </div>
      <p className="text-[11px] text-white/35 mt-2.5 leading-relaxed max-w-sm">
        Card payments are processed securely by Stripe. We never store your full card number.
      </p>
    </div>
  );
}

function CardBadge({ label, children }) {
  return (
    <span title={label} aria-label={label} className="inline-flex rounded-lg shadow-sm overflow-hidden">
      {children}
    </span>
  );
}

function LockIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M7 11V8a5 5 0 0 1 10 0v3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
