import Link from 'next/link';
import PageShell from '@/components/PageShell';

export const metadata = {
  title: 'Terms of Service | 2xGen',
  description:
    'Terms of Service for 2xGen LLC — managed Google acquisition sites for tour operators, ownership, billing, affiliates, and use of 2xgen.com.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <PageShell>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="accent-bar mb-4" />
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-2">Terms of Service</h1>
        <p className="text-sm text-gray-500 mb-8">Last updated: August 23, 2026</p>

        <div className="space-y-6 text-gray-600 leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">1. Agreement</h2>
            <p>
              These Terms of Service (“Terms”) govern your use of 2xgen.com and related services offered by 2xGen
              LLC (“2xGen,” “we,” “us”). By creating an account, completing onboarding, or paying for a subscription,
              you agree to these Terms. Account creation and checkout require affirmative acceptance of these Terms
              (and, where shown, the Privacy Policy). If you do not agree, do not use the service or subscribe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">2. Who we are</h2>
            <p>
              2xGen LLC is registered in Albuquerque, New Mexico, USA. General contact:{' '}
              <a href="mailto:hello@2xgen.com" className="text-[#1a5f9e] hover:underline">
                hello@2xgen.com
              </a>
              . Legal notices:{' '}
              <a href="mailto:legal@2xgen.com" className="text-[#1a5f9e] hover:underline">
                legal@2xgen.com
              </a>
              . Billing:{' '}
              <a href="mailto:billing@2xgen.com" className="text-[#1a5f9e] hover:underline">
                billing@2xgen.com
              </a>
              . Support:{' '}
              <a href="mailto:support@2xgen.com" className="text-[#1a5f9e] hover:underline">
                support@2xgen.com
              </a>
              .
            </p>
            <p className="mt-3">
              We are an independent company. We are <strong className="text-[#09294c]">not</strong> employed by,
              endorsed by, or acting on behalf of Viator, GetYourGuide, or Google. We cannot improve your ranking or
              visibility <em>inside</em> those marketplaces; our work is limited to the Google-facing sites we operate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">3. The service</h2>
            <p className="mb-3">
              You are not buying a website you own. You are buying access to a{' '}
              <strong className="text-[#09294c]">managed Google acquisition channel</strong> for your tour business:
              a site that 2xGen owns and operates, featuring your tour listings and aiming to attract travelers via
              search. Checkout stays on Viator or GetYourGuide (as you choose during onboarding).
            </p>
            <p className="mb-3">
              We use reasonable efforts to optimize the site for search visibility.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                The service is standardized and managed by 2xGen; it is not a custom web-design engagement. We design
                and build each site the way we judge best for the tour type and destination. Delivery is{' '}
                <strong className="text-[#09294c]">as-is</strong>: there are no revision rounds, redesign requests, or
                custom creative approval loops included in the subscription.
              </li>
              <li>
                Sites are independent tourism pages in our network — we do not copy your brand identity or present
                2xGen as the tour operator.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">4. Ownership — domain, site, and operation</h2>
            <p className="mb-3">
              By subscribing, you acknowledge that <strong className="text-[#09294c]">2xGen owns</strong> the domain
              name and the website (including design, structure, code, and content we create or assemble). 2xGen
              controls the operation, content, links, and traffic-routing of the site. You do{' '}
              <strong className="text-[#09294c]">not</strong> own the site, the domain, or the intellectual property
              in the site.
            </p>
            <p className="mb-3">
              Nothing in these Terms transfers to 2xGen any rights you may have in your marketplace account or in
              materials you provide to us.
            </p>
            <p>
              If a subscription expires or is not renewed, 2xGen keeps full rights to change the site and links in any
              way we choose, including replacing or removing booking links and using different booking destinations
              where we decide that is appropriate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">5. Marketplace data and affiliate links</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                We may use publicly available Viator or GetYourGuide listing data, images, and descriptions as
                permitted under our affiliate (or similar) agreements with those platforms.
              </li>
              <li>
                We are not responsible for the accuracy, completeness, legality, or continued availability of
                third-party marketplace content.
              </li>
              <li>
                Booking links on the site may or may not be our affiliate links. We may or may not earn affiliate
                commissions from bookings. That does not add any cost to you or to the traveler beyond what the
                marketplace already charges.
              </li>
              <li>
                You are not entitled to any affiliate commissions earned by 2xGen.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">6. Marketplace listings and availability</h2>
            <p className="mb-3">
              2xGen does not create, manage, edit, maintain, or control your Viator or GetYourGuide listings. You are
              solely responsible for maintaining those listings and ensuring that the tours, activities, prices,
              availability, descriptions, and other information shown on those platforms are accurate and active. If
              you cancel, discontinue, remove, or otherwise make a linked tour unavailable, or if Viator or
              GetYourGuide removes, changes, suspends, or otherwise makes a listing unavailable, links from the 2xGen
              website may lead to a “tour not found,” unavailable, expired, or otherwise inaccessible page on the
              relevant marketplace. 2xGen is not responsible for such outcomes and does not guarantee that any
              marketplace listing or booking link will remain active or available.
            </p>
            <p>
              <strong className="text-[#09294c]">Marketplace enforcement and operator accounts.</strong> 2xGen does
              not control the policies, enforcement decisions, or account actions of Viator, GetYourGuide, or any
              other marketplace. If Viator, GetYourGuide, or another marketplace suspends, restricts, removes,
              terminates, or otherwise takes action against your listing, account, or participation in its
              marketplace, including as a result of or allegedly related to a 2xGen website, content, links, traffic,
              SEO activity, or other aspect of the service, 2xGen is not responsible for any resulting loss, damage,
              lost revenue, lost bookings, lost commissions, loss of rankings, loss of traffic, reputational harm,
              account suspension, account termination, or other consequence, to the maximum extent permitted by law.
              2xGen may immediately modify, redirect, suspend, or take down the relevant website without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">7. Accounts and information you provide</h2>
            <p className="mb-3">
              You may create an account using Google sign-in. You are responsible for activity under your account and
              for keeping access to your Google account secure.
            </p>
            <p>
              You are responsible for the accuracy, legality, and authorization of information, claims, images,
              trademarks, and other materials you provide to 2xGen (including during onboarding). You authorize 2xGen
              to use, reproduce, adapt, format, and publish such information, claims, images, trademarks, and other
              materials as reasonably necessary to provide the service. You must have rights to operate the tours and
              maintain valid Viator / GetYourGuide listings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">8. Service communications</h2>
            <p>
              By creating an account and completing the onboarding form, you agree that 2xGen may contact you
              regarding your account, onboarding, subscription, payment status, and the service, including if you
              start but do not complete a subscription or payment. These communications may be sent by email.
              Examples include incomplete onboarding or subscription, payment failures, clarification about your
              tour, site readiness, renewal notices, and suspension notices. These are operational service messages,
              not marketing promotions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">9. Fees, renewal, cancellation, and no refunds</h2>
            <p className="mb-3">
              Paid plans are billed annually at <strong className="text-[#09294c]">$249 USD per year</strong> unless a
              different price is stated at checkout. Payments are processed by Stripe. By subscribing you authorize the
              charge for that term and agree to these Terms.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Subscriptions <strong className="text-[#09294c]">automatically renew</strong> for successive one-year
                periods unless you cancel before the renewal date.
              </li>
              <li>
                Cancelling stops the <em>next</em> charge. It does not take the website down immediately. You retain
                access to the subscribed service through the end of the already-paid period.
              </li>
              <li>
                <strong className="text-[#09294c]">Cancellation is not a refund.</strong> All sales are final. There
                are no refunds and no prorated refunds for unused time, except where mandatory law requires otherwise.
              </li>
              <li>You can manage or cancel renewal through the Stripe customer portal linked from your dashboard.</li>
              <li>
                We may change pricing with notice for future renewal periods; the price at checkout applies to that
                term.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">10. No ranking or booking guarantees</h2>
            <p className="mb-3">
              We sell access to a managed acquisition channel and related tools (such as tracked booking links). We do{' '}
              <strong className="text-[#09294c]">not</strong> guarantee Google or other search rankings, traffic, or
              additional bookings. Results depend on destination, competition, seasonality, your listings, and
              continuous changes by search engines and marketplaces — all outside our control.
            </p>
            <p>
              2xGen does not guarantee that any linked Viator or GetYourGuide listing will remain active, bookable,
              available, or unchanged. If a listing is cancelled, removed, or otherwise unavailable on the
              marketplace, visitors may reach a “tour not found” or similar page. That is not a failure of the
              acquisition service; it is a consequence of the operator or marketplace listing no longer being
              available.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">11. Your responsibilities</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>You must not use the service for unlawful content or misleading claims about tours.</li>
              <li>
                Marketplace terms (Viator, GetYourGuide, Stripe, Google) apply separately between you and those
                providers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">12. Acceptable use</h2>
            <p>
              Do not abuse the site, attempt unauthorized access, scrape in a way that harms the service, interfere
              with other users, or misuse tracked redirect links. We may suspend accounts that violate these Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">13. Intellectual property</h2>
            <p>
              2xGen retains all rights in our branding, software, templates, network domains, site code, compiled
              content, and know-how used for the managed product. You do not acquire ownership of the site or its
              intellectual property by paying for the subscription. You retain rights only in materials you
              personally supply that you already owned. Feedback you send may be used to improve the service without
              obligation to you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">14. Third-party services</h2>
            <p>
              The service relies on third parties including Google (sign-in and search), Supabase (data/auth), Stripe
              (payments), and travel marketplaces. Their outages or policy changes may affect the service. We are not
              responsible for third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">15. Disputes and suspension</h2>
            <p>
              If a dispute, claim, chargeback, legal proceeding, investigation, complaint, request, order, threat of
              legal action, or other disagreement arises between you and 2xGen, or involves any third party, platform,
              regulator, government authority, court, or other entity in connection with the service, 2xGen may, in
              its reasonable judgment and without prior notice, suspend access to, disable, redirect, modify, or take
              down any website operated by 2xGen for you. Such action does not limit any other rights or remedies
              available to 2xGen under these Terms or applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">16. Disclaimers</h2>
            <p>
              THE SERVICE IS PROVIDED “AS IS” AND “AS AVAILABLE.” TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM
              WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">17. Limitation of liability</h2>
            <p className="mb-3">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, 2xGEN’S TOTAL LIABILITY FOR CLAIMS ARISING OUT OF THESE TERMS OR
              THE SERVICE IS LIMITED TO THE AMOUNTS YOU PAID US IN THE TWELVE (12) MONTHS BEFORE THE CLAIM. WE ARE NOT
              LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR LOST PROFITS DAMAGES.
            </p>
            <p>
              Without limiting the foregoing, 2xGen is not liable for any loss or damage arising from or related to
              any action, decision, suspension, restriction, removal, termination, investigation, or policy
              enforcement by Viator, GetYourGuide, Google, Stripe, or any other third-party platform or service,
              including where such action is allegedly or actually related to a 2xGen website, content, link, traffic
              source, SEO activity, or other aspect of the service, to the maximum extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">18. Termination, expiration, and non-renewal</h2>
            <p className="mb-3">
              You may cancel renewal as described in billing. We may suspend or terminate access for breach,
              non-payment, misuse, or under Section 15 (Disputes and suspension). After the paid term ends without
              renewal — or after termination — 2xGen may take the site offline, keep it online, change content, or
              change booking links at our sole discretion. We are not obligated to transfer the domain, site files, or
              content to you unless we agree in writing.
            </p>
            <p>
              Following expiration or termination, 2xGen has no obligation to preserve rankings, traffic, backlinks,
              listings, booking links, redirects, or other benefits previously generated by the service for you.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">19. Privacy</h2>
            <p>
              How we handle personal data is described in our{' '}
              <Link href="/privacy" className="text-[#1a5f9e] hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">20. Changes</h2>
            <p>
              We may update these Terms. The “Last updated” date will change when we do. Continued use after changes
              means you accept the updated Terms for ongoing use of the service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">21. Governing law</h2>
            <p>
              These Terms are governed by the laws of the State of New Mexico, USA, without regard to conflict-of-law
              rules, except where mandatory consumer protections in your jurisdiction apply.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[#09294c] mb-2">22. Contact</h2>
            <p>
              Questions about these Terms:{' '}
              <a href="mailto:matthijs@2xgen.com" className="text-[#1a5f9e] hover:underline">
                matthijs@2xgen.com
              </a>
              .
            </p>
          </section>

          <p className="pt-4 text-sm text-gray-500">
            This page is provided for transparency and product use (including Google OAuth). It is not personalized
            legal advice. Consider having counsel review if you need a formal opinion.
          </p>

          <p className="pt-2">
            <Link href="/" className="text-sm font-semibold text-[#1a5f9e] hover:underline">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </PageShell>
  );
}
