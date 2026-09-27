import React from 'react';

interface ArcaniVisualMotifProps {
  motif: string;
  primaryColor?: string;
  accentColor?: string;
  className?: string;
}

export const ArcaniVisualMotif: React.FC<ArcaniVisualMotifProps> = ({
  motif,
  primaryColor = '#FF007F',
  accentColor = '#00F0FF',
  className = 'w-full h-full'
}) => {
  switch (motif) {
    case 'fool':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cosmic vortex & cliff edge */}
          <circle cx="100" cy="120" r="85" stroke={accentColor} strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />
          <path d="M20 220 L95 160 L180 230" stroke={primaryColor} strokeWidth="2" strokeLinecap="round" />
          {/* Leaping silhouette figure of light */}
          <circle cx="100" cy="70" r="14" fill={accentColor} />
          <circle cx="100" cy="70" r="22" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Zero lemniscate & bundle */}
          <path d="M100 84 L100 130 M100 95 L135 80 M100 105 L65 125" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="140" cy="78" r="8" fill={primaryColor} />
          {/* Cyber Companion Dog / Star burst */}
          <path d="M60 170 L75 145 L85 160 Z" fill={accentColor} />
          {/* Sacred 0 Symbol */}
          <ellipse cx="100" cy="195" rx="14" ry="20" stroke={primaryColor} strokeWidth="2" fill="none" />
        </svg>
      );

    case 'magician':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Glowing Infinity Lemniscate */}
          <path d="M65 50 C50 35 30 50 45 65 C65 80 135 35 155 50 C170 65 150 80 135 65 C115 50 85 65 65 50 Z" stroke={accentColor} strokeWidth="3" fill="none" />
          {/* Alchemical Wand pointing up */}
          <line x1="100" y1="75" x2="100" y2="135" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="75" r="5" fill={primaryColor} />
          {/* Alchemical Table with 4 elemental sacred tools */}
          <rect x="40" y="145" width="120" height="45" rx="6" stroke={primaryColor} strokeWidth="1.5" fill="#130924" />
          {/* Cup */}
          <path d="M60 155 Q67 172 74 155 Z M67 172 L67 178 M62 178 L72 178" stroke={accentColor} strokeWidth="1.5" />
          {/* Sword */}
          <line x1="93" y1="154" x2="93" y2="178" stroke="#FFFFFF" strokeWidth="1.5" />
          <line x1="88" y1="160" x2="98" y2="160" stroke="#FFFFFF" strokeWidth="1.5" />
          {/* Pentacle */}
          <circle cx="120" cy="166" r="8" stroke={primaryColor} strokeWidth="1.5" />
          <polygon points="120,159 122,165 128,165 123,168 125,174 120,170 115,174 117,168 112,165 118,165" fill={primaryColor} />
          {/* Wand */}
          <line x1="140" y1="154" x2="148" y2="178" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'high_priestess':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Dual Cyber Pillars B & J */}
          <rect x="30" y="40" width="22" height="150" rx="3" stroke={primaryColor} strokeWidth="2" fill="#130924" />
          <text x="41" y="120" fill={primaryColor} fontSize="14" fontWeight="bold" textAnchor="middle">B</text>
          <rect x="148" y="40" width="22" height="150" rx="3" stroke={accentColor} strokeWidth="2" fill="#130924" />
          <text x="159" y="120" fill={accentColor} fontSize="14" fontWeight="bold" textAnchor="middle">J</text>
          {/* Pomegranate veil pattern */}
          <circle cx="100" cy="110" r="42" stroke="#8A2BE2" strokeWidth="1" strokeDasharray="3 3" />
          {/* Horned Lunar Crown & Sphere */}
          <path d="M80 60 Q100 80 120 60 Q110 50 100 52 Q90 50 80 60 Z" fill={accentColor} />
          <circle cx="100" cy="55" r="9" fill="#FFFFFF" />
          {/* Sacred Scroll TORA on lap */}
          <rect x="80" y="130" width="40" height="24" rx="4" stroke="#FFFFFF" strokeWidth="1.5" fill="#160829" />
          <text x="100" y="146" fill={accentColor} fontSize="9" fontWeight="bold" textAnchor="middle">TORA</text>
          {/* Crescent Moon at Feet */}
          <path d="M75 190 Q100 215 125 190 Q105 198 75 190 Z" fill={primaryColor} />
        </svg>
      );

    case 'empress':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* 12-Star Halo */}
          <circle cx="100" cy="70" r="38" stroke={primaryColor} strokeWidth="1" strokeDasharray="2 4" />
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30 * Math.PI) / 180;
            const x = 100 + 38 * Math.cos(angle);
            const y = 70 + 38 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="2.5" fill={accentColor} />;
          })}
          {/* Venus Shield Heart */}
          <path d="M100 135 C80 115 65 130 65 145 C65 165 100 185 100 185 C100 185 135 165 135 145 C135 130 120 115 100 135 Z" stroke={primaryColor} strokeWidth="2" fill="#1F082A" />
          <path d="M100 142 L100 162 M93 152 L107 152" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
          {/* Golden Cyber Wheat stalks */}
          <path d="M50 210 Q70 170 85 150 M150 210 Q130 170 115 150" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
          <circle cx="100" cy="70" r="16" fill={primaryColor} opacity="0.3" />
        </svg>
      );

    case 'emperor':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cubic Stone Throne */}
          <rect x="45" y="70" width="110" height="120" rx="8" stroke={primaryColor} strokeWidth="2" fill="#12061A" />
          {/* Aries Ram Skull glyphs on throne corners */}
          <path d="M55 85 Q65 75 75 85 Q70 95 60 90" stroke={accentColor} strokeWidth="2" fill="none" />
          <path d="M145 85 Q135 75 125 85 Q130 95 140 90" stroke={accentColor} strokeWidth="2" fill="none" />
          {/* Ankh Cyber Sceptre */}
          <circle cx="100" cy="115" r="12" stroke={accentColor} strokeWidth="2.5" />
          <line x1="100" y1="127" x2="100" y2="165" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="88" y1="140" x2="112" y2="140" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          {/* Imperial Orb */}
          <circle cx="135" cy="150" r="9" fill={primaryColor} />
          <line x1="135" y1="138" x2="135" y2="141" stroke="#FFFFFF" strokeWidth="2" />
          <line x1="133" y1="140" x2="137" y2="140" stroke="#FFFFFF" strokeWidth="2" />
        </svg>
      );

    case 'hierophant':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Triple Papal Cross */}
          <line x1="100" y1="40" x2="100" y2="145" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="75" y1="60" x2="125" y2="60" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="82" y1="80" x2="118" y2="80" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="88" y1="100" x2="112" y2="100" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          {/* Crossed Keys of Heaven & Earth */}
          <path d="M70 170 L130 205 M130 170 L70 205" stroke={primaryColor} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="70" cy="170" r="6" stroke={primaryColor} strokeWidth="2" />
          <circle cx="130" cy="170" r="6" stroke={primaryColor} strokeWidth="2" />
          {/* Mystic Portal Arch */}
          <path d="M40 220 L40 90 Q100 30 160 90 L160 220" stroke="#8A2BE2" strokeWidth="1.5" strokeDasharray="4 4" />
        </svg>
      );

    case 'lovers':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Radiating Angelic Sun / Raphael */}
          <circle cx="100" cy="50" r="24" fill={accentColor} opacity="0.3" />
          <circle cx="100" cy="50" r="14" fill={primaryColor} />
          {/* Dual intertwined human silhouettes of light */}
          <path d="M65 140 C65 110 85 110 85 140 L85 200 L65 200 Z" fill="#8A2BE2" opacity="0.6" />
          <circle cx="75" cy="100" r="10" fill={primaryColor} />
          <path d="M115 140 C115 110 135 110 135 140 L135 200 L115 200 Z" fill="#00F0FF" opacity="0.6" />
          <circle cx="125" cy="100" r="10" fill={accentColor} />
          {/* Laser Heart convergence */}
          <path d="M100 135 L100 165 M90 145 Q100 130 110 145 L100 160 Z" fill={primaryColor} />
          {/* Celestial Ray */}
          <line x1="100" y1="65" x2="100" y2="125" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="3 3" />
        </svg>
      );

    case 'chariot':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Celestial Canopy */}
          <path d="M50 50 L150 50 L140 85 L60 85 Z" stroke={accentColor} strokeWidth="2" fill="#130924" />
          <circle cx="85" cy="65" r="3" fill="#FFFFFF" />
          <circle cx="100" cy="65" r="3" fill={primaryColor} />
          <circle cx="115" cy="65" r="3" fill="#FFFFFF" />
          {/* Chariot Body with Winged Sun */}
          <rect x="60" y="100" width="80" height="55" rx="6" stroke={primaryColor} strokeWidth="2" fill="#1B0A2E" />
          <ellipse cx="100" cy="125" rx="12" ry="7" fill={accentColor} />
          <path d="M85 125 Q70 120 65 125 M115 125 Q130 120 135 125" stroke="#FFFFFF" strokeWidth="2" />
          {/* Dual Cyber Sphinxes */}
          <rect x="45" y="170" width="45" height="35" rx="4" stroke={primaryColor} strokeWidth="2" fill="#0C0714" />
          <text x="67" y="193" fill={primaryColor} fontSize="11" fontWeight="bold" textAnchor="middle">DARK</text>
          <rect x="110" y="170" width="45" height="35" rx="4" stroke={accentColor} strokeWidth="2" fill="#0C0714" />
          <text x="132" y="193" fill={accentColor} fontSize="11" fontWeight="bold" textAnchor="middle">LIGHT</text>
        </svg>
      );

    case 'justice':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Laser Double-Edged Sword Upright */}
          <line x1="100" y1="35" x2="100" y2="185" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <line x1="82" y1="70" x2="118" y2="70" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="35" r="4" fill={accentColor} />
          {/* Balanced Sacred Scales */}
          <line x1="60" y1="105" x2="140" y2="105" stroke={accentColor} strokeWidth="2" />
          {/* Left Pan */}
          <line x1="60" y1="105" x2="50" y2="140" stroke={accentColor} strokeWidth="1.5" />
          <line x1="60" y1="105" x2="70" y2="140" stroke={accentColor} strokeWidth="1.5" />
          <path d="M45 140 Q60 155 75 140 Z" fill={primaryColor} opacity="0.6" stroke={primaryColor} strokeWidth="1.5" />
          {/* Right Pan */}
          <line x1="140" y1="105" x2="130" y2="140" stroke={accentColor} strokeWidth="1.5" />
          <line x1="140" y1="105" x2="150" y2="140" stroke={accentColor} strokeWidth="1.5" />
          <path d="M125 140 Q140 155 155 140 Z" fill={accentColor} opacity="0.6" stroke={accentColor} strokeWidth="1.5" />
          {/* Geometric aura */}
          <circle cx="100" cy="110" r="65" stroke="#8A2BE2" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
      );

    case 'hermit':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Hexagram Lantern with glowing beam */}
          <rect x="110" y="70" width="30" height="40" rx="4" stroke={accentColor} strokeWidth="2" fill="#130924" />
          <polygon points="125,78 128,88 136,88 130,93 132,101 125,96 118,101 120,93 114,88 122,88" fill={primaryColor} />
          {/* Rays of lantern light cutting through void */}
          <path d="M140 90 L195 60 M140 90 L200 90 M140 90 L195 120" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
          {/* The Staff of Will */}
          <line x1="65" y1="50" x2="65" y2="200" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          {/* Hooded Sage Silhouette */}
          <path d="M85 80 Q105 70 115 90 Q120 130 90 190 L75 190 Z" fill="#8A2BE2" opacity="0.6" />
          {/* Mountain Ridge at Night */}
          <path d="M20 220 L75 185 L130 210 L180 180" stroke={primaryColor} strokeWidth="2" />
        </svg>
      );

    case 'wheel':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Concentric Astrological Circles */}
          <circle cx="100" cy="120" r="65" stroke={primaryColor} strokeWidth="2.5" />
          <circle cx="100" cy="120" r="48" stroke={accentColor} strokeWidth="1.5" strokeDasharray="4 4" />
          <circle cx="100" cy="120" r="20" stroke="#FFFFFF" strokeWidth="2" fill="#190A2E" />
          {/* 8 Spokes */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
            <line
              key={deg}
              x1="100"
              y1="120"
              x2={100 + 65 * Math.cos((deg * Math.PI) / 180)}
              y2={120 + 65 * Math.sin((deg * Math.PI) / 180)}
              stroke={deg % 90 === 0 ? accentColor : primaryColor}
              strokeWidth={deg % 90 === 0 ? 2 : 1}
            />
          ))}
          {/* T-A-R-O letters */}
          <text x="100" y="68" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">T</text>
          <text x="152" y="124" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">A</text>
          <text x="100" y="178" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">R</text>
          <text x="48" y="124" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">O</text>
          {/* Central Quantum Node */}
          <circle cx="100" cy="120" r="6" fill={primaryColor} />
        </svg>
      );

    case 'strength':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Infinity Lemniscate Crown */}
          <path d="M75 50 C60 40 45 52 57 65 C72 78 128 40 143 52 C155 65 140 78 128 65 C113 50 90 62 75 50 Z" stroke={primaryColor} strokeWidth="3" fill="none" />
          {/* Cyber Lion Profile */}
          <path d="M60 180 Q80 120 120 120 Q150 120 160 150 Q165 180 140 200 Q100 210 60 180 Z" stroke={accentColor} strokeWidth="2.5" fill="#160829" />
          {/* Gentle Hand of Light closing the jaws */}
          <path d="M125 110 Q145 105 155 125" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Rose garland chain */}
          <path d="M70 140 Q100 170 135 150" stroke={primaryColor} strokeWidth="2" strokeDasharray="3 4" />
          <circle cx="100" cy="155" r="4" fill={primaryColor} />
        </svg>
      );

    case 'hanged_man':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Living Cyber Gallows (Tau Cross) */}
          <line x1="30" y1="40" x2="170" y2="40" stroke={primaryColor} strokeWidth="4" strokeLinecap="round" />
          <line x1="50" y1="40" x2="50" y2="210" stroke={primaryColor} strokeWidth="3" />
          <line x1="150" y1="40" x2="150" y2="210" stroke={primaryColor} strokeWidth="3" />
          {/* Suspension cord */}
          <line x1="100" y1="40" x2="100" y2="80" stroke={accentColor} strokeWidth="2" />
          {/* Inverted figure leg forming 4 */}
          <line x1="100" y1="80" x2="100" y2="150" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M100 110 L135 110 L100 140" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          {/* Golden/Cyan Halo around head at the bottom */}
          <circle cx="100" cy="170" r="16" fill={accentColor} opacity="0.4" />
          <circle cx="100" cy="170" r="8" fill="#FFFFFF" />
        </svg>
      );

    case 'death':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Quantum Laser Scythe */}
          <path d="M50 190 L140 60 Q170 50 175 75 Q150 95 130 90" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Mystic White Cyber Rose Banner */}
          <circle cx="85" cy="100" r="22" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" fill="#130924" />
          <path d="M85 85 L90 95 L100 95 L92 101 L95 111 L85 105 L75 111 L78 101 L70 95 L80 95 Z" fill="#FFFFFF" />
          {/* Dawn Sun between Two Towers in the distance */}
          <rect x="50" y="170" width="16" height="40" fill="#1B0A2E" stroke={accentColor} strokeWidth="1" />
          <rect x="134" y="170" width="16" height="40" fill="#1B0A2E" stroke={accentColor} strokeWidth="1" />
          <circle cx="100" cy="190" r="14" fill={primaryColor} />
        </svg>
      );

    case 'temperance':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Angelic Wings */}
          <path d="M40 70 Q70 40 90 85 M160 70 Q130 40 110 85" stroke={accentColor} strokeWidth="2.5" fill="none" />
          {/* Dual Chalices */}
          <rect x="65" y="100" width="22" height="24" rx="4" stroke={primaryColor} strokeWidth="2" fill="#1F082A" />
          <rect x="115" y="140" width="22" height="24" rx="4" stroke={accentColor} strokeWidth="2" fill="#1F082A" />
          {/* Flow of liquid light between chalices */}
          <path d="M85 110 Q120 120 120 140" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <path d="M85 115 Q95 135 118 145" stroke={accentColor} strokeWidth="1.5" strokeDasharray="2 3" />
          {/* Third eye triangle forehead */}
          <polygon points="100,50 108,64 92,64" stroke={primaryColor} strokeWidth="1.5" fill="none" />
        </svg>
      );

    case 'devil':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Inverted Pentagram on forehead */}
          <polygon points="100,68 103,58 113,58 105,52 108,42 100,48 92,42 95,52 87,58 97,58" stroke={primaryColor} strokeWidth="1.5" fill="#FF0055" />
          {/* Baphomet Horns */}
          <path d="M80 65 Q60 30 45 45 Q65 65 85 75 M120 65 Q140 30 155 45 Q135 65 115 75" stroke={primaryColor} strokeWidth="2.5" fill="none" />
          {/* Magnetic Pedestal */}
          <rect x="65" y="145" width="70" height="40" rx="4" stroke={accentColor} strokeWidth="2" fill="#160824" />
          {/* Chains bound to pedestal ring */}
          <path d="M75 145 Q50 170 45 190 M125 145 Q150 170 155 190" stroke={primaryColor} strokeWidth="2" strokeDasharray="3 3" />
          <circle cx="100" cy="145" r="8" stroke={accentColor} strokeWidth="2" />
        </svg>
      );

    case 'tower':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cyber Obsidian Tower */}
          <path d="M65 210 L75 80 L125 80 L135 210 Z" stroke={accentColor} strokeWidth="2" fill="#12061A" />
          {/* Crown Blown off */}
          <path d="M70 70 L80 50 L100 60 L120 50 L130 70 Z" stroke={primaryColor} strokeWidth="2.5" fill="#1F082A" />
          {/* Cyber Lightning Bolt of Truth */}
          <path d="M110 20 L85 75 L115 85 L90 140" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Glowing Falling Sparks */}
          <circle cx="55" cy="110" r="3" fill={primaryColor} />
          <circle cx="65" cy="145" r="2.5" fill={accentColor} />
          <circle cx="145" cy="115" r="3" fill={primaryColor} />
          <circle cx="138" cy="160" r="2.5" fill={accentColor} />
        </svg>
      );

    case 'star':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Central 8-Pointed Star of Hope */}
          <polygon points="100,30 107,60 135,67 107,74 100,105 93,74 65,67 93,60" fill={accentColor} />
          <polygon points="100,42 105,62 125,67 105,72 100,92 95,72 75,67 95,62" fill="#FFFFFF" />
          {/* 7 Surrounding Stars */}
          {[40, 75, 120, 160, 50, 150, 100].map((x, idx) => (
            <circle key={idx} cx={x} cy={50 + (idx % 3) * 20} r="2.5" fill={primaryColor} />
          ))}
          {/* Dual Pitchers pouring Starlight */}
          <path d="M75 145 Q65 130 55 145 L60 170" stroke={accentColor} strokeWidth="2" />
          <path d="M125 145 Q135 130 145 145 L140 170" stroke={primaryColor} strokeWidth="2" />
          {/* Living Water Stream */}
          <path d="M55 170 Q75 190 100 185 Q130 180 150 210" stroke="#00F0FF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'moon':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cyber Crescent Moon with Sleeping Face Profile */}
          <circle cx="100" cy="70" r="32" stroke={accentColor} strokeWidth="2" fill="#130924" />
          <path d="M100 38 Q125 70 100 102 Q85 70 100 38 Z" fill={primaryColor} />
          {/* Falling drops of soma / yods */}
          {[75, 90, 110, 125].map((x, i) => (
            <circle key={i} cx={x} cy={110 + (i % 2) * 10} r="2.5" fill={accentColor} />
          ))}
          {/* Twin Pyramids / Towers */}
          <polygon points="45,190 55,140 65,190" stroke={primaryColor} strokeWidth="1.5" fill="#160824" />
          <polygon points="135,190 145,140 155,190" stroke={accentColor} strokeWidth="1.5" fill="#160824" />
          {/* Deep Lagoon & Sacred Crayfish */}
          <path d="M30 205 Q100 190 170 205" stroke={accentColor} strokeWidth="2" />
          <ellipse cx="100" cy="205" rx="14" ry="7" fill={primaryColor} />
        </svg>
      );

    case 'sun':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Blazing 16-Ray Solar Mandala */}
          <circle cx="100" cy="85" r="30" fill={primaryColor} />
          <circle cx="100" cy="85" r="22" fill="#FFD700" />
          <circle cx="100" cy="85" r="14" fill="#FFFFFF" />
          {[...Array(16)].map((_, i) => {
            const rad = (i * 22.5 * Math.PI) / 180;
            const r1 = 34;
            const r2 = 48;
            return (
              <line
                key={i}
                x1={100 + r1 * Math.cos(rad)}
                y1={85 + r1 * Math.sin(rad)}
                x2={100 + r2 * Math.cos(rad)}
                y2={85 + r2 * Math.sin(rad)}
                stroke={i % 2 === 0 ? accentColor : primaryColor}
                strokeWidth={i % 2 === 0 ? 2.5 : 1.5}
                strokeLinecap="round"
              />
            );
          })}
          {/* Twin Children of Light dancing hand-in-hand */}
          <circle cx="85" cy="165" r="8" fill="#FFFFFF" />
          <circle cx="115" cy="165" r="8" fill="#FFFFFF" />
          <line x1="93" y1="172" x2="107" y2="172" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
          {/* Stone Wall of Solar Truth */}
          <rect x="40" y="195" width="120" height="20" rx="3" stroke={primaryColor} strokeWidth="1.5" fill="#130924" />
        </svg>
      );

    case 'judgement':
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Archangel Gabriel Horn radiating soundwave shockwaves */}
          <path d="M100 40 L100 80 M95 80 L105 80 L115 105 L85 105 Z" fill={primaryColor} stroke={accentColor} strokeWidth="1.5" />
          {/* Frequency circles */}
          <circle cx="100" cy="105" r="18" stroke={accentColor} strokeWidth="1" strokeDasharray="3 3" />
          <circle cx="100" cy="105" r="32" stroke={primaryColor} strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="100" cy="105" r="48" stroke={accentColor} strokeWidth="1" strokeDasharray="5 5" />
          {/* Red Cross on White Banner */}
          <rect x="92" y="55" width="16" height="16" fill="#FFFFFF" />
          <path d="M100 55 L100 71 M92 63 L108 63" stroke="#FF0055" strokeWidth="2" />
          {/* Rebirth Crypts opening */}
          <rect x="45" y="175" width="30" height="35" rx="3" stroke={primaryColor} strokeWidth="1.5" fill="#190B2E" />
          <rect x="85" y="170" width="30" height="40" rx="3" stroke={accentColor} strokeWidth="2" fill="#190B2E" />
          <rect x="125" y="175" width="30" height="35" rx="3" stroke={primaryColor} strokeWidth="1.5" fill="#190B2E" />
          <path d="M100 160 L100 170 M92 165 L108 165" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'world':
    default:
      return (
        <svg viewBox="0 0 200 240" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Cosmic Oval Mandorla Wreath */}
          <ellipse cx="100" cy="120" rx="46" ry="68" stroke={accentColor} strokeWidth="3" />
          <ellipse cx="100" cy="120" rx="42" ry="64" stroke={primaryColor} strokeWidth="1.5" strokeDasharray="4 4" />
          {/* Central Cosmic Dancer holding two wands */}
          <line x1="100" y1="85" x2="100" y2="155" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
          <circle cx="100" cy="80" r="10" fill={primaryColor} />
          <line x1="80" y1="95" x2="80" y2="140" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
          <line x1="120" y1="95" x2="120" y2="140" stroke={accentColor} strokeWidth="2" strokeLinecap="round" />
          {/* 4 Tetramorph Corner Creatures (Angel, Eagle, Lion, Bull) */}
          <circle cx="35" cy="35" r="12" stroke={primaryColor} strokeWidth="1.5" fill="#130924" />
          <text x="35" y="39" fill={primaryColor} fontSize="10" fontWeight="bold" textAnchor="middle">A</text>
          <circle cx="165" cy="35" r="12" stroke={accentColor} strokeWidth="1.5" fill="#130924" />
          <text x="165" y="39" fill={accentColor} fontSize="10" fontWeight="bold" textAnchor="middle">E</text>
          <circle cx="35" cy="205" r="12" stroke={accentColor} strokeWidth="1.5" fill="#130924" />
          <text x="35" y="209" fill={accentColor} fontSize="10" fontWeight="bold" textAnchor="middle">B</text>
          <circle cx="165" cy="205" r="12" stroke={primaryColor} strokeWidth="1.5" fill="#130924" />
          <text x="165" y="209" fill={primaryColor} fontSize="10" fontWeight="bold" textAnchor="middle">L</text>
        </svg>
      );
  }
};
