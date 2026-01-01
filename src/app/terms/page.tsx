import { Container } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service | Infoverse Digital-Ed',
  description: 'Terms of Service for Infoverse Digital-Ed educational platform',
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-5 md:px-16 py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-semibold text-base text-primary mb-4">Legal</p>
            <h1 className="font-serif font-bold text-4xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight text-gray-900 mb-6">
              Terms of Service
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
                &ldquo;The foundation of every state is the education of its youth.&rdquo;
              </blockquote>
              <p className="text-gray-500 font-medium">— Diogenes of Sinope</p>
            </div>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Infoverse Digital-Ed (&quot;the Service&quot;), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              Infoverse Digital-Ed provides an online educational platform offering curriculum-aligned lessons, quizzes, and learning resources for students at various key stages. Our content is designed to support UK national curriculum standards.
            </p>

            <h2>3. User Accounts</h2>
            <p>
              To access certain features of the Service, you may be required to create an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information during registration</li>
              <li>Updating your information to keep it current</li>
            </ul>

            <h2>4. User Conduct</h2>
            <p>You agree not to:</p>
            <ul>
              <li>Use the Service for any unlawful purpose</li>
              <li>Share your account credentials with others</li>
              <li>Attempt to gain unauthorized access to any part of the Service</li>
              <li>Copy, distribute, or modify any content without permission</li>
              <li>Use automated systems to access the Service</li>
              <li>Interfere with or disrupt the Service</li>
            </ul>

            <h2>5. Intellectual Property</h2>
            <p>
              All content on the Service, including but not limited to text, graphics, logos, images, audio, video, and software, is the property of Infoverse Digital-Ed or its content suppliers and is protected by intellectual property laws.
            </p>

            <h2>6. Payment Terms</h2>
            <p>
              Certain features of our Service may require payment. By subscribing to a paid plan, you agree to pay all applicable fees. Payments are non-refundable except as required by law or as explicitly stated in our refund policy.
            </p>

            <h2>7. Privacy</h2>
            <p>
              Your use of the Service is also governed by our <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>. Please review our Privacy Policy to understand how we collect, use, and protect your information.
            </p>

            <h2>8. Disclaimer of Warranties</h2>
            <p>
              The Service is provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that the Service will be uninterrupted, error-free, or secure.
            </p>

            <h2>9. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Infoverse Digital-Ed shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service.
            </p>

            <h2>10. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify users of significant changes by posting a notice on our website or sending an email. Continued use of the Service after changes constitutes acceptance of the new Terms.
            </p>

            <h2>11. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions.
            </p>

            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <ul>
              <li>Email: <a href="mailto:legal@infoverseducation.com" className="text-primary hover:underline">legal@infoverseducation.com</a></li>
              <li>Address: Lagos, Nigeria</li>
            </ul>

            <div className="not-prose mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                By using Infoverse Digital-Ed, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
