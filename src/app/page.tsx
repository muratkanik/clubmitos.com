import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/Header';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          <Image
            src="https://d64gsuwffb70l.cloudfront.net/69182fda1b8b8c653c1d3f2f_1763192996568_3c3d3b7b.webp"
            alt="Hero"
            fill
            className="object-cover opacity-40"
          />
          <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
            <h1 className="text-6xl md:text-8xl font-serif text-[#d4af37] mb-6">Join the Elite</h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8">Exclusive membership for extraordinary individuals</p>
            <Link href="/login" className="inline-block px-12 py-4 bg-[#d4af37] text-[#0f172a] font-semibold text-lg rounded-lg hover:bg-[#f0c857] transition-all">
              Request Invitation
            </Link>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-24 px-4 bg-[#0f172a]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-serif text-center text-[#d4af37] mb-16">Member Benefits</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: 'Exclusive Network', desc: 'Connect with industry leaders and visionaries' },
                { title: 'Premium Events', desc: 'Access invitation-only gatherings worldwide' },
                { title: 'Elite Access', desc: 'Unlock opportunities reserved for members' },
              ].map((item, i) => (
                <div key={i} className="p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-[#d4af37]/20 hover:border-[#d4af37]/40 transition-all">
                  <h3 className="text-2xl font-serif text-[#d4af37] mb-4">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
