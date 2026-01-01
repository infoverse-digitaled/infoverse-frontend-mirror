import { Container } from '@/components/ui';
import Link from 'next/link';

export const metadata = {
  title: 'Cookie Policy | Infoverse Digital-Ed',
  description: 'Cookie Policy for Infoverse Digital-Ed educational platform',
};

export default function CookiesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="px-5 md:px-16 py-16 md:py-24 bg-gradient-to-br from-gray-50 to-white">
        <Container size="xl" className="px-0">
          <div className="max-w-3xl mx-auto text-center">
            <p className="font-semibold text-base text-primary mb-4">Legal</p>
            <h1 className="font-serif font-bold text-4xl md:text-6xl lg:text-[72px] leading-[1.1] tracking-tight text-gray-900 mb-6">
              Cookie Policy
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
                &ldquo;Technology is a useful servant but a dangerous master.&rdquo;
              </blockquote>
              <p className="text-gray-500 font-medium">— Christian Lous Lange</p>
            </div>

            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience. Cookies may be set by the website you are visiting (&quot;first-party cookies&quot;) or by third parties (&quot;third-party cookies&quot;).
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>Infoverse Digital-Ed uses cookies for the following purposes:</p>

            <h3>Essential Cookies</h3>
            <p>
              These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and account access. You cannot opt out of essential cookies.
            </p>

            <h3>Functional Cookies</h3>
            <p>
              These cookies allow us to remember your preferences and choices, such as language settings and login information. They enhance your experience by providing personalized features.
            </p>

            <h3>Analytics Cookies</h3>
            <p>
              We use analytics cookies to understand how visitors interact with our website. This helps us improve our Service and content. These cookies collect information such as:
            </p>
            <ul>
              <li>Pages visited and time spent on each page</li>
              <li>How you arrived at our website</li>
              <li>Which features you use most often</li>
              <li>Error messages you encounter</li>
            </ul>

            <h3>Marketing Cookies</h3>
            <p>
              These cookies may be set by our advertising partners to build a profile of your interests and show you relevant advertisements on other websites. If you do not allow these cookies, you will experience less targeted advertising.
            </p>

            <h2>3. Types of Cookies We Use</h2>
            <div className="not-prose overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 my-8">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cookie Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">session_id</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Maintains user session</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Session</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">auth_token</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Authentication</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 days</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">preferences</td>
                    <td className="px-6 py-4 text-sm text-gray-500">User preferences</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 year</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">_ga</td>
                    <td className="px-6 py-4 text-sm text-gray-500">Google Analytics</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 years</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h2>4. Managing Cookies</h2>
            <p>
              You can control and manage cookies in various ways. Please note that removing or blocking cookies may impact your user experience.
            </p>

            <h3>Browser Settings</h3>
            <p>
              Most web browsers allow you to control cookies through their settings. You can set your browser to:
            </p>
            <ul>
              <li>Block all cookies</li>
              <li>Accept only first-party cookies</li>
              <li>Delete cookies when you close your browser</li>
              <li>Receive a warning before a cookie is stored</li>
            </ul>

            <h3>Opt-Out Links</h3>
            <p>
              You can opt out of certain third-party cookies by visiting:
            </p>
            <ul>
              <li><a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Analytics Opt-out</a></li>
              <li><a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Digital Advertising Alliance</a></li>
            </ul>

            <h2>5. Local Storage and Similar Technologies</h2>
            <p>
              In addition to cookies, we may use local storage and similar technologies to store information on your device. These technologies work similarly to cookies but may store larger amounts of data. You can clear local storage through your browser settings.
            </p>

            <h2>6. Do Not Track</h2>
            <p>
              Some browsers have a &quot;Do Not Track&quot; feature that signals to websites that you do not want to be tracked. Currently, there is no industry standard for how websites should respond to these signals, but we respect your privacy choices.
            </p>

            <h2>7. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. Any changes will be posted on this page with an updated revision date.
            </p>

            <h2>8. Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us:
            </p>
            <ul>
              <li>Email: <a href="mailto:privacy@infoverseducation.com" className="text-primary hover:underline">privacy@infoverseducation.com</a></li>
              <li>Address: Lagos, Nigeria</li>
            </ul>

            <h2>9. Related Policies</h2>
            <p>
              For more information about how we protect your privacy, please also review our:
            </p>
            <ul>
              <li><Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-primary hover:underline">Terms of Service</Link></li>
            </ul>

            <div className="not-prose mt-12 pt-8 border-t border-gray-200">
              <p className="text-gray-500 text-sm">
                By continuing to use Infoverse Digital-Ed, you consent to our use of cookies as described in this Cookie Policy.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
