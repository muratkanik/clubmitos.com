import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative w-12 h-12 bg-[#0f172a] rounded-lg p-1">
        <img
          src="https://d64gsuwffb70l.cloudfront.net/69182fda1b8b8c653c1d3f2f_1763192995705_f9b13027.webp"
          alt="Mitos Logo"
          className="w-full h-full object-contain transition-transform group-hover:scale-110"
        />
      </div>
      <span className="text-2xl font-serif text-[#d4af37] tracking-wide">
        Mitos
      </span>
    </Link>
  );
}
