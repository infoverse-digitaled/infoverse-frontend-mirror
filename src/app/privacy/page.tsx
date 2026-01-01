import { Container } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | Infoverse Digital-Ed',
  description: 'Privacy Policy for Infoverse Digital-Ed educational platform',
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-5 md:px-16 py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-semibold text-base text-primary mb-4">Legal</p>
            <h1 className="font-serif font-bold text-4xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight text-gray-900 mb-6">
              Privacy Policy
            </h1>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
              Last updated: December 2024
            </p>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <section className="px-5 md:px-16 py-16 md:py-24">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto prose prose-lg">
            {/* Quote */}
            <div className="not-prose mb-12 p-8 bg-gray-50 rounded-2xl border border-gray-100">
              <blockquote className="font-serif text-xl md:text-2xl text-gray-700 italic mb-4">
                &ldquo;Privacy is not something that I'm merely entitled to, it's an absolute prerequisite.&rdquo;
              </blockquote>
              <p className="text-gray-500 font-medium">— Marlon Brando</p>
            </div>

            <h2>1. Introduction</h2>
            <p>
              At Infoverse Digital-Ed, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our educational platform.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide, including:</p>
            <ul>
              <li>Name and email address</li>
              <li>Account credentials</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Educational preferences and learning history</li>
              <li>Communication preferences</li>
            </ul>

            <h3>Automatically Collected Information</h3>
            <p>When you use our Service, we may automatically collect:</p>
            <ul>
              <li>Device information (type, operating system, browser)</li>
              <li>IP address and location data</li>
              <li>Usage data and learning analytics</li>
              <li>Cookies and similar technologies (see our <Link href="/cookies" className="text-primary hover:underline">Cookie Policy</Link>)</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our educational services</li>
              <li>Personalize your learning experience</li>
              <li>Process payments and manage subscriptions</li>
              <li>Communicate with you about updates and offers</li>
              <li>Analyze usage patterns to improve our Service</li>
              <li>Ensure the security of our platform</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third parties who help us operate our platform</li>
              <li><strong>Payment Processors:</strong> Secure payment handling services</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with mergers or acquisitions</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to provide our services and fulfill the purposes described in this policy. You may request deletion of your account and associated data at any time.
            </p>

            <h2>7. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Delete your personal information</li>
              <li>Restrict or object to processing</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>

            <h2>8. Children&apos;s Privacy</h2>
            <p>
              Our Service is designed for educational purposes and may be used by children under parental supervision. We require parental consent for children under 13 years of age. Parents can review, modify, or delete their child&apos;s information by contacting us.
            </p>

            <h2>9. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this Privacy Policy.
            </p>

            <h2>10. Third-Party Links</h2>
            <p>
              Our Service may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
            </p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
            </p>
            <ul>
              <li>Email: <a href="mailto:privacy@infoverseducation.com" className="text-primary hover:underline">privacy@infoverseducation.com</a></li>
              <li>Address: Lagos, Nigeria</li>
            </ul>

            <div className="not-prose mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                By using Infoverse Digital-Ed, you acknowledge that you have read and understood this Privacy Policy.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
