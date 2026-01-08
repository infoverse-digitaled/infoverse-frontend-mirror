import Link from 'next/link';
import Image from 'next/image';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gradient-to-br from-[#F3F3F3] to-[#E8E8E8]">
      {/* Mobile Header - Back to Home */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-gradient-to-r from-[#33A1CD] to-primary">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
            <Image
              src="/LOGO.jpg"
              alt="Infoverse Digital-Ed Logo"
              width={36}
              height={36}
              className="rounded-full object-cover"
              priority
            />
          </div>
          <span className="text-white font-semibold text-sm">Infoverse Digital-Ed</span>
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1 text-white/90 hover:text-white text-sm font-medium transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </Link>
      </div>

      {/* Left Panel - Blue Background */}
      <div className="hidden lg:flex lg:w-2/5 bg-gradient-to-br from-[#33A1CD] via-primary to-primary-dark rounded-[30px] m-8 relative overflow-hidden shadow-2xl">
        {/* Animated background blobs */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary rounded-full filter blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <Link
          href="/"
          className="absolute top-8 left-8 z-20 w-[115px] h-[115px] bg-white rounded-[56px] flex items-center justify-center shadow-2xl hover:shadow-3xl transition-all cursor-pointer hover:scale-105 p-2"
        >
          <Image
            src="/LOGO.jpg"
            alt="Infoverse Digital-Ed Logo - Click to go home"
            width={100}
            height={100}
            className="rounded-full object-cover pointer-events-none"
            priority
          />
        </Link>

        <div className="flex flex-col items-center justify-center w-full relative z-10 px-12">
          <div className="text-center">
            <h2 className="text-4xl text-white font-bold mb-4 drop-shadow-lg">
              Welcome to Infoverse Digital-Ed
            </h2>
            <p className="text-xl text-white/90 leading-relaxed drop-shadow-md">
              Your gateway to quality education
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Area */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-[754px]">{children}</div>
      </div>

    </div>
  );
}
