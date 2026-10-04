/**
 * Pre-defined campus image presets representing UNIROW (Universitas PGRI Ronggolawe Tuban)
 * Rendered as high-resolution SVGs encoded as Data URLs for flawless canvas slicing.
 */

export interface CampusPreset {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl: string;
  thumbnailUrl: string;
  accentColor: string;
}

// 1. Gedung Landmark & Rektorat UNIROW (Matching user uploaded images 102-UNIROW.jpg & images (1).jpg)
const svgCampusFront = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#38BDF8" />
      <stop offset="60%" stop-color="#BAE6FD" />
      <stop offset="100%" stop-color="#E0F2FE" />
    </linearGradient>
    <linearGradient id="blueFacade" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#1E40AF" />
      <stop offset="100%" stop-color="#2563EB" />
    </linearGradient>
    <linearGradient id="yellowPanel" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#EAB308" />
      <stop offset="100%" stop-color="#FACC15" />
    </linearGradient>
    <linearGradient id="pavingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#CBD5E1" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="800" fill="url(#skyGrad)" />
  
  <!-- Fluffy campus clouds -->
  <ellipse cx="200" cy="110" rx="90" ry="32" fill="#FFFFFF" opacity="0.85" />
  <ellipse cx="260" cy="95" rx="70" ry="28" fill="#FFFFFF" opacity="0.85" />
  <ellipse cx="620" cy="140" rx="110" ry="36" fill="#FFFFFF" opacity="0.8" />
  <ellipse cx="570" cy="120" rx="80" ry="30" fill="#FFFFFF" opacity="0.8" />

  <!-- Background Campus Trees & Roofline -->
  <path d="M 50 360 Q 90 280 140 360 Q 200 290 260 360 Q 320 280 380 360 Z" fill="#15803D" opacity="0.8" />
  <polygon points="260,250 560,200 590,300 260,300" fill="#334155" />

  <!-- Paved Courtyard -->
  <polygon points="0,520 800,480 800,800 0,800" fill="url(#pavingGrad)" />
  <!-- Paving texture lines -->
  <g stroke="#64748B" stroke-width="1.5" opacity="0.4">
    <line x1="100" y1="530" x2="40" y2="800" />
    <line x1="250" y1="520" x2="200" y2="800" />
    <line x1="400" y1="510" x2="380" y2="800" />
    <line x1="550" y1="500" x2="570" y2="800" />
    <line x1="700" y1="490" x2="760" y2="800" />
    <line x1="0" y1="580" x2="800" y2="540" />
    <line x1="0" y1="650" x2="800" y2="610" />
    <line x1="0" y1="730" x2="800" y2="690" />
  </g>

  <!-- Left Main Wing Building (White & Blue accents) -->
  <rect x="70" y="320" width="260" height="230" fill="#F8FAFC" stroke="#E2E8F0" stroke-width="2" />
  <!-- Blue entrance portal & frame -->
  <rect x="60" y="270" width="55" height="280" fill="url(#blueFacade)" />
  <rect x="170" y="270" width="45" height="280" fill="url(#blueFacade)" />
  <rect x="60" y="270" width="155" height="40" fill="url(#blueFacade)" />
  
  <!-- Windows on left wing -->
  <rect x="125" y="340" width="35" height="60" fill="#0284C7" stroke="#FFFFFF" stroke-width="3" />
  <rect x="235" y="340" width="40" height="50" fill="#0284C7" stroke="#FFFFFF" stroke-width="3" />
  <rect x="235" y="420" width="40" height="70" fill="#0284C7" stroke="#FFFFFF" stroke-width="3" />

  <!-- Middle Wing with Orange Columns -->
  <rect x="330" y="290" width="220" height="250" fill="#FFFFFF" />
  <rect x="330" y="350" width="45" height="180" fill="#F97316" />
  <rect x="420" y="350" width="45" height="180" fill="#F97316" />
  <rect x="340" y="370" width="25" height="60" fill="#0284C7" stroke="#FFFFFF" stroke-width="2" />
  <rect x="430" y="370" width="25" height="60" fill="#0284C7" stroke="#FFFFFF" stroke-width="2" />
  <rect x="340" y="450" width="25" height="70" fill="#0284C7" stroke="#FFFFFF" stroke-width="2" />
  <rect x="430" y="450" width="25" height="70" fill="#0284C7" stroke="#FFFFFF" stroke-width="2" />

  <!-- Right Prominent Landmark (Signature UNIROW Yellow & Blue Tower) -->
  <rect x="520" y="220" width="250" height="340" fill="url(#blueFacade)" rx="6" />
  <!-- Signature Yellow Panel -->
  <rect x="540" y="290" width="85" height="260" fill="url(#yellowPanel)" rx="4" />
  <!-- Large Bank / Campus Office Windows -->
  <rect x="645" y="390" width="115" height="160" fill="#0369A1" stroke="#FFFFFF" stroke-width="4" />
  <!-- Red banner stripe on windows -->
  <rect x="645" y="465" width="115" height="20" fill="#DC2626" />

  <!-- Prominent UNIROW Signboard on Blue Tower -->
  <rect x="560" y="240" width="200" height="65" fill="#FFFFFF" rx="4" stroke="#0284C7" stroke-width="3" />
  <text x="660" y="258" font-family="'Outfit', sans-serif" font-size="10" font-weight="700" fill="#1E40AF" text-anchor="middle" letter-spacing="1">UNIVERSITAS PGRI RONGGOLAWE</text>
  <text x="660" y="292" font-family="'Outfit', sans-serif" font-size="28" font-weight="800" fill="#1E3A8A" text-anchor="middle" letter-spacing="3">UNIROW</text>

  <!-- Indonesian Flag on Left Pole -->
  <line x1="85" y1="180" x2="85" y2="350" stroke="#94A3B8" stroke-width="3" />
  <rect x="85" y="180" width="30" height="10" fill="#EF4444" />
  <rect x="85" y="190" width="30" height="10" fill="#FFFFFF" stroke="#E2E8F0" stroke-width="0.5" />

  <!-- Ornamental Campus Shrubbery & Flower Planters -->
  <ellipse cx="230" cy="545" rx="35" ry="25" fill="#16A34A" />
  <ellipse cx="280" cy="540" rx="30" ry="22" fill="#22C55E" />
  <ellipse cx="505" cy="535" rx="32" ry="26" fill="#15803D" />
  <ellipse cx="675" cy="545" rx="36" ry="28" fill="#16A34A" />

  <!-- Welcome Banner overlay at entrance -->
  <rect x="90" y="420" width="110" height="42" fill="#F59E0B" rx="3" stroke="#D97706" stroke-width="2" />
  <text x="145" y="437" font-family="'Outfit', sans-serif" font-size="7" font-weight="700" fill="#FFFFFF" text-anchor="middle">Mahasiswa Baru 2026</text>
  <text x="145" y="452" font-family="'Outfit', sans-serif" font-size="9" font-weight="800" fill="#78350F" text-anchor="middle">KAMPUS HEBAT</text>

  <!-- Bottom Aesthetic Badge -->
  <rect x="250" y="730" width="300" height="40" fill="#0F172A" rx="20" opacity="0.9" />
  <text x="400" y="755" font-family="'Outfit', sans-serif" font-size="14" font-weight="700" fill="#F8FAFC" text-anchor="middle" letter-spacing="1">LANDMARK GEDUNG UTAMA UNIROW</text>
</svg>
`;

// 2. Lambang Resmi Universitas PGRI Ronggolawe Tuban (Matching user uploaded image png unirow.png)
const svgLogoUnirow = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <radialGradient id="emblemBg" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#0284C7" />
      <stop offset="70%" stop-color="#0369A1" />
      <stop offset="100%" stop-color="#075985" />
    </radialGradient>
    <linearGradient id="goldTrim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FBBF24" />
      <stop offset="50%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#D97706" />
    </linearGradient>
    <linearGradient id="gateRed" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#DC2626" />
      <stop offset="100%" stop-color="#991B1B" />
    </linearGradient>
  </defs>

  <!-- Clean Canvas Background -->
  <rect width="800" height="800" fill="#F8FAFC" />
  
  <!-- Outer Subtle Ring for College Aesthetics -->
  <circle cx="400" cy="400" r="380" fill="none" stroke="#E2E8F0" stroke-width="4" stroke-dasharray="8 8" />

  <!-- 5-Petal Lotus Outline (Bunga Teratai) with Gold Border -->
  <g transform="translate(400, 400)">
    <!-- Base Shape with Gold trim -->
    <path d="M 0 -360 
             C 80 -360, 160 -310, 240 -210
             C 320 -110, 360 -20, 350 90
             C 340 200, 260 290, 180 340
             C 100 390, 0 370, 0 370
             C 0 370, -100 390, -180 340
             C -260 290, -340 200, -350 90
             C -360 -20, -320 -110, -240 -210
             C -160 -310, -80 -360, 0 -360 Z"
          fill="url(#goldTrim)" />
    
    <!-- Inner Lotus Body (Cyan/Deep Blue) -->
    <path d="M 0 -345 
             C 75 -345, 150 -298, 226 -200
             C 305 -102, 342 -18, 332 85
             C 322 190, 248 275, 170 324
             C 95 372, 0 355, 0 355
             C 0 355, -95 372, -170 324
             C -248 275, -322 190, -332 85
             C -342 -18, -305 -102, -226 -200
             C -150 -298, -75 -345, 0 -345 Z"
          fill="#0EA5E9" stroke="#000000" stroke-width="7" />

    <!-- Dark Blue Ring for Lettering -->
    <circle cx="0" cy="10" r="230" fill="none" stroke="#000000" stroke-width="6" />

    <!-- Arced Text Representation: UNIVERSITAS PGRI RONGGOLAWE -->
    <!-- Center circular core -->
    <circle cx="0" cy="0" r="185" fill="#38BDF8" stroke="#000000" stroke-width="5" />

    <!-- Golden Flame Wings / Padi Kapas Leaves (Kuning Menyala) -->
    <!-- Left Flame Wings -->
    <path d="M -160 50 C -170 -10, -140 -80, -90 -120 C -110 -60, -90 -10, -60 30 Z" fill="#FACC15" stroke="#000000" stroke-width="3" />
    <path d="M -130 90 C -150 40, -130 -30, -70 -70 C -85 -20, -70 20, -40 50 Z" fill="#EAB308" stroke="#000000" stroke-width="3" />
    <path d="M -90 120 C -120 80, -90 20, -30 -10 C -45 20, -30 60, -10 90 Z" fill="#CA8A04" stroke="#000000" stroke-width="3" />

    <!-- Right Flame Wings -->
    <path d="M 160 50 C 170 -10, 140 -80, 90 -120 C 110 -60, 90 -10, 60 30 Z" fill="#FACC15" stroke="#000000" stroke-width="3" />
    <path d="M 130 90 C 150 40, 130 -30, 70 -70 C 85 -20, 70 20, 40 50 Z" fill="#EAB308" stroke="#000000" stroke-width="3" />
    <path d="M 90 120 C 120 80, 90 20, 30 -10 C 45 20, 30 60, 10 90 Z" fill="#CA8A04" stroke="#000000" stroke-width="3" />

    <!-- Red Ronggolawe Fortress Gate (Gerbang Bata Merah) -->
    <rect x="-95" y="-30" width="190" height="90" fill="url(#gateRed)" stroke="#000000" stroke-width="4" />
    <!-- Gate crenels / pillars -->
    <rect x="-95" y="-60" width="35" height="30" fill="url(#gateRed)" stroke="#000000" stroke-width="3" />
    <rect x="60" y="-60" width="35" height="30" fill="url(#gateRed)" stroke="#000000" stroke-width="3" />
    <line x1="-95" y1="0" x2="95" y2="0" stroke="#FFFFFF" stroke-width="4" />
    <line x1="-95" y1="30" x2="95" y2="30" stroke="#FFFFFF" stroke-width="3" />

    <!-- Spirited White Stallion (Kuda Putih Ronggolawe Meloncat) -->
    <g transform="translate(0, -95) scale(0.9)">
      <path d="M -40 40 
               C -50 20, -55 -10, -45 -30
               C -40 -45, -25 -70, -10 -85
               C 0 -95, 15 -85, 20 -70
               C 30 -50, 40 -40, 50 -30
               C 60 -15, 65 10, 45 25
               C 35 15, 20 20, 10 35
               C 0 50, -25 55, -40 40 Z" fill="#FFFFFF" stroke="#0284C7" stroke-width="4" />
      <!-- Mane & Head details -->
      <circle cx="-5" cy="-80" r="3" fill="#0284C7" />
      <path d="M 10 -70 Q 25 -60 20 -40" stroke="#0284C7" stroke-width="3" fill="none" />
      <!-- Forelegs leaping -->
      <path d="M -20 -30 L -45 -50 M -10 -25 L -35 -40" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" />
      <path d="M -20 -30 L -45 -50 M -10 -25 L -35 -40" stroke="#0284C7" stroke-width="3" stroke-linecap="round" />
    </g>

    <!-- White Crescent Banner below Gate -->
    <path d="M -130 90 Q 0 170 130 90 Q 0 210 -130 90 Z" fill="#FFFFFF" stroke="#000000" stroke-width="3" />
    <text x="0" y="145" font-family="'Outfit', sans-serif" font-size="24" font-weight="900" fill="#0284C7" text-anchor="middle" letter-spacing="4">UNIROW</text>

    <!-- Text: UNIVERSITAS PGRI RONGGOLAWE (curved upper representation) -->
    <text x="0" y="-250" font-family="'Outfit', sans-serif" font-size="23" font-weight="800" fill="#000000" text-anchor="middle" letter-spacing="2">UNIVERSITAS PGRI RONGGOLAWE</text>
    <text x="0" y="270" font-family="'Outfit', sans-serif" font-size="34" font-weight="900" fill="#000000" text-anchor="middle" letter-spacing="6">TUBAN</text>
  </g>
</svg>
`;

// 3. Gedung Kuliah & Koridor Kampus UNIROW (Matching user uploaded image images.jpg)
const svgCampusHallway = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="skyBlue" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#60A5FA" />
      <stop offset="100%" stop-color="#BFDBFE" />
    </linearGradient>
    <linearGradient id="pillarBrown" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#7C2D12" />
      <stop offset="50%" stop-color="#9A3412" />
      <stop offset="100%" stop-color="#C2410C" />
    </linearGradient>
    <linearGradient id="corrugatedRoof" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#F1F5F9" />
      <stop offset="100%" stop-color="#94A3B8" />
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="800" fill="url(#skyBlue)" />
  <ellipse cx="250" cy="120" rx="140" ry="40" fill="#FFFFFF" opacity="0.9" />

  <!-- Surrounding Trees -->
  <circle cx="80" cy="580" r="90" fill="#15803D" />
  <circle cx="140" cy="620" r="70" fill="#16A34A" />

  <!-- Multi-Story Campus Academic Building (Perspective from walkway) -->
  <!-- Floor 3 -->
  <polygon points="200,80 800,0 800,220 200,290" fill="#FEF3C7" stroke="#D97706" stroke-width="2" />
  <!-- Windows floor 3 -->
  <polygon points="260,110 760,40 760,160 260,210" fill="#0284C7" stroke="#FFFFFF" stroke-width="4" />

  <!-- Floor 2 (Balcony & Pillars) -->
  <polygon points="200,290 800,220 800,430 200,500" fill="#FFFBEB" stroke="#D97706" stroke-width="2" />
  <!-- Windows floor 2 -->
  <polygon points="260,320 760,250 760,370 260,420" fill="#0284C7" stroke="#FFFFFF" stroke-width="4" />
  <!-- Balcony railing floor 2 -->
  <g stroke="#FFFFFF" stroke-width="3">
    <line x1="200" y1="460" x2="800" y2="390" />
    <line x1="200" y1="485" x2="800" y2="415" />
    <!-- Railing verticals -->
    <line x1="260" y1="450" x2="260" y2="490" />
    <line x1="340" y1="440" x2="340" y2="480" />
    <line x1="420" y1="430" x2="420" y2="470" />
    <line x1="500" y1="420" x2="500" y2="460" />
    <line x1="580" y1="410" x2="580" y2="450" />
    <line x1="660" y1="400" x2="660" y2="440" />
    <line x1="740" y1="390" x2="740" y2="430" />
  </g>

  <!-- Prominent Terracotta / Mahogany Vertical Pillars -->
  <polygon points="260,80 290,75 290,520 260,525" fill="url(#pillarBrown)" />
  <polygon points="400,60 430,55 430,490 400,495" fill="url(#pillarBrown)" />
  <polygon points="560,40 590,35 590,460 560,465" fill="url(#pillarBrown)" />
  <polygon points="720,20 750,15 750,430 720,435" fill="url(#pillarBrown)" />

  <!-- Diagonal Outdoor Stairs -->
  <polygon points="320,380 430,480 400,510 290,400" fill="#E2E8F0" stroke="#475569" stroke-width="2" />
  <line x1="330" y1="370" x2="440" y2="470" stroke="#FFFFFF" stroke-width="4" />

  <!-- Ground Floor Veranda & Walkway -->
  <polygon points="0,500 800,430 800,800 0,800" fill="#334155" />

  <!-- Distinctive Corrugated Zinc Covered Canopy Roof (Foreground) -->
  <polygon points="0,750 0,550 800,720 800,800" fill="url(#corrugatedRoof)" stroke="#475569" stroke-width="2" />
  <!-- Corrugation ribs -->
  <g stroke="#64748B" stroke-width="2" opacity="0.6">
    <line x1="0" y1="560" x2="800" y2="730" />
    <line x1="0" y1="580" x2="800" y2="745" />
    <line x1="0" y1="600" x2="800" y2="760" />
    <line x1="0" y1="620" x2="800" y2="775" />
    <line x1="0" y1="640" x2="800" y2="790" />
  </g>

  <!-- Campus Caption Banner -->
  <rect x="40" y="40" width="300" height="48" fill="#1E40AF" rx="8" />
  <text x="190" y="70" font-family="'Outfit', sans-serif" font-size="16" font-weight="700" fill="#F8FAFC" text-anchor="middle" letter-spacing="1">GEDUNG KULIAH TERPADU</text>
</svg>
`;

// 4. Mahasiswa Baru UNIROW Ceria (Orientation Squad)
const svgStudentsPmb = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="bgGradPmb" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#EFF6FF" />
      <stop offset="50%" stop-color="#DBEAFE" />
      <stop offset="100%" stop-color="#BFDBFE" />
    </linearGradient>
    <linearGradient id="jacketBlue" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1D4ED8" />
      <stop offset="100%" stop-color="#1E3A8A" />
    </linearGradient>
    <linearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F59E0B" />
      <stop offset="100%" stop-color="#FBBF24" />
    </linearGradient>
  </defs>

  <rect width="800" height="800" fill="url(#bgGradPmb)" />

  <!-- Confetti and celebratory shapes in background -->
  <circle cx="120" cy="150" r="14" fill="#F59E0B" opacity="0.6" />
  <rect x="680" y="140" width="18" height="18" fill="#3B82F6" transform="rotate(45 680 140)" opacity="0.6" />
  <circle cx="710" cy="220" r="10" fill="#EC4899" opacity="0.5" />
  <rect x="90" y="240" width="16" height="16" fill="#10B981" transform="rotate(30 90 240)" opacity="0.6" />

  <!-- Campus Main Gate Arch Outline in backdrop -->
  <path d="M 150 480 Q 400 180 650 480" fill="none" stroke="#93C5FD" stroke-width="12" stroke-dasharray="16 12" />

  <!-- Top Welcoming Ribbon -->
  <rect x="120" y="50" width="560" height="70" fill="url(#goldRibbon)" rx="35" filter="drop-shadow(0 4px 6px rgba(0,0,0,0.1))" />
  <text x="400" y="93" font-family="'Outfit', sans-serif" font-size="24" font-weight="900" fill="#1E3A8A" text-anchor="middle" letter-spacing="2">SELAMAT DATANG MABA UNIROW!</text>

  <!-- Central Student 1 (Male Maba with Alma Mater Blue Jacket) -->
  <!-- Body/Jacket -->
  <path d="M 310 440 L 490 440 L 520 700 L 280 700 Z" fill="url(#jacketBlue)" />
  <!-- Inner White Shirt & Tie -->
  <polygon points="380,440 420,440 400,530" fill="#FFFFFF" />
  <polygon points="395,470 405,470 403,550 397,550" fill="#DC2626" />
  <!-- Unirow Pin on lapel -->
  <circle cx="340" cy="480" r="8" fill="#FACC15" stroke="#FFFFFF" stroke-width="2" />
  <!-- Head & Smile -->
  <ellipse cx="400" cy="350" rx="55" ry="65" fill="#FDBA74" />
  <!-- Hair -->
  <path d="M 345 350 C 340 280, 460 280, 455 350 C 440 310, 360 310, 345 350 Z" fill="#1E293B" />
  <!-- Glasses -->
  <circle cx="380" cy="345" r="14" fill="none" stroke="#0F172A" stroke-width="3" />
  <circle cx="420" cy="345" r="14" fill="none" stroke="#0F172A" stroke-width="3" />
  <line x1="394" y1="345" x2="406" y2="345" stroke="#0F172A" stroke-width="3" />
  <!-- Cheerful Smile -->
  <path d="M 385 380 Q 400 400 415 380" fill="none" stroke="#9A3412" stroke-width="3" stroke-linecap="round" />
  <!-- Lanyard ID Card -->
  <path d="M 370 440 L 395 560 L 430 440" fill="none" stroke="#F59E0B" stroke-width="4" />
  <rect x="385" y="560" width="30" height="42" fill="#FFFFFF" stroke="#94A3B8" stroke-width="2" rx="3" />
  <rect x="390" y="565" width="20" height="15" fill="#0284C7" />

  <!-- Left Student 2 (Female Maba Hijab) -->
  <g transform="translate(-140, 20)">
    <path d="M 310 460 L 470 460 L 490 700 L 290 700 Z" fill="url(#jacketBlue)" />
    <!-- Hijab Yellow/Gold -->
    <ellipse cx="390" cy="380" rx="60" ry="75" fill="#FBBF24" />
    <ellipse cx="390" cy="385" rx="42" ry="48" fill="#FED7AA" />
    <!-- Eyes and smile -->
    <circle cx="375" cy="380" r="4" fill="#0F172A" />
    <circle cx="405" cy="380" r="4" fill="#0F172A" />
    <path d="M 380 405 Q 390 415 400 405" fill="none" stroke="#9A3412" stroke-width="3" stroke-linecap="round" />
    <!-- Holding Binder/Books -->
    <rect x="360" y="520" width="60" height="75" fill="#EC4899" rx="4" transform="rotate(-15 360 520)" />
  </g>

  <!-- Right Student 3 (Thumbs Up & Laptop) -->
  <g transform="translate(140, 20)">
    <path d="M 330 460 L 490 460 L 510 700 L 310 700 Z" fill="url(#jacketBlue)" />
    <ellipse cx="410" cy="380" rx="52" ry="60" fill="#FED7AA" />
    <!-- Short Brown Hair -->
    <path d="M 360 375 C 360 300, 460 300, 460 375 Z" fill="#451A03" />
    <circle cx="395" cy="375" r="4" fill="#0F172A" />
    <circle cx="425" cy="375" r="4" fill="#0F172A" />
    <path d="M 400 400 Q 410 415 420 400" fill="none" stroke="#9A3412" stroke-width="3" stroke-linecap="round" />
    <!-- Thumbs up gesture -->
    <circle cx="475" cy="490" r="16" fill="#FED7AA" />
    <rect x="470" y="465" width="10" height="20" rx="5" fill="#FED7AA" />
  </g>

  <!-- Bottom Mahasiswa Baru Motto Badge -->
  <rect x="180" y="690" width="440" height="50" fill="#1E3A8A" rx="25" />
  <text x="400" y="722" font-family="'Outfit', sans-serif" font-size="16" font-weight="700" fill="#F8FAFC" text-anchor="middle" letter-spacing="1">MABA 2026: UNGGUL, KREATIF, BERKARAKTER</text>
</svg>
`;

// 5. Taman Asri & Green Campus UNIROW Tuban
const svgGreenCampus = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <linearGradient id="skyMint" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#6EE7B7" />
      <stop offset="50%" stop-color="#A7F3D0" />
      <stop offset="100%" stop-color="#ECFDF5" />
    </linearGradient>
    <linearGradient id="lawnGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#10B981" />
      <stop offset="50%" stop-color="#059669" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#F0FDF4" />
      <stop offset="100%" stop-color="#DCFCE7" />
    </linearGradient>
  </defs>

  <!-- Sky -->
  <rect width="800" height="800" fill="url(#skyMint)" />
  <circle cx="150" cy="120" r="70" fill="#FEF08A" opacity="0.8" />
  <ellipse cx="600" cy="140" rx="120" ry="35" fill="#FFFFFF" opacity="0.9" />

  <!-- Background Campus Faculties -->
  <rect x="180" y="240" width="440" height="260" fill="url(#buildingGrad)" stroke="#86EFAC" stroke-width="3" rx="8" />
  <!-- Faculty Glass Windows -->
  <g fill="#0284C7" stroke="#FFFFFF" stroke-width="3">
    <rect x="220" y="270" width="70" height="80" rx="4" />
    <rect x="310" y="270" width="70" height="80" rx="4" />
    <rect x="420" y="270" width="70" height="80" rx="4" />
    <rect x="510" y="270" width="70" height="80" rx="4" />
    <rect x="220" y="380" width="70" height="90" rx="4" />
    <rect x="310" y="380" width="70" height="90" rx="4" />
    <rect x="420" y="380" width="70" height="90" rx="4" />
    <rect x="510" y="380" width="70" height="90" rx="4" />
  </g>

  <!-- Campus Sign on Building -->
  <rect x="270" y="200" width="260" height="48" fill="#047857" rx="8" stroke="#34D399" stroke-width="2" />
  <text x="400" y="230" font-family="'Outfit', sans-serif" font-size="14" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="2">KAMPUS UNIROW TUBAN</text>

  <!-- Rolling Lush Green Lawn Courtyard -->
  <path d="M 0 460 Q 250 420 500 470 T 800 450 L 800 800 L 0 800 Z" fill="url(#lawnGrad)" />

  <!-- Botanical Trees & Palms -->
  <circle cx="90" cy="420" r="85" fill="#059669" />
  <circle cx="140" cy="380" r="70" fill="#10B981" />
  <circle cx="700" cy="410" r="95" fill="#047857" />
  <circle cx="640" cy="370" r="75" fill="#34D399" />

  <!-- Cobblestone Garden Pathway -->
  <path d="M 400 500 Q 380 650 360 800 L 460 800 Q 430 650 430 500 Z" fill="#E2E8F0" stroke="#CBD5E1" stroke-width="2" />

  <!-- Outdoor Discussion Gazebo & Bench -->
  <rect x="200" y="580" width="120" height="15" fill="#78350F" rx="3" />
  <rect x="210" y="595" width="12" height="60" fill="#451A03" />
  <rect x="298" y="595" width="12" height="60" fill="#451A03" />

  <!-- Cheerful Maba studying outdoors -->
  <ellipse cx="260" cy="540" rx="20" ry="24" fill="#FED7AA" />
  <path d="M 235 564 L 285 564 L 290 640 L 230 640 Z" fill="#059669" />
  <rect x="245" y="585" width="30" height="24" fill="#FFFFFF" rx="2" />

  <!-- Flower beds -->
  <circle cx="530" cy="620" r="14" fill="#F43F5E" />
  <circle cx="560" cy="630" r="16" fill="#FBBF24" />
  <circle cx="590" cy="625" r="15" fill="#A855F7" />
  <circle cx="550" cy="650" r="18" fill="#EC4899" />

  <!-- Bottom Badge -->
  <rect x="220" y="720" width="360" height="44" fill="#064E3B" rx="22" stroke="#6EE7B7" stroke-width="2" />
  <text x="400" y="747" font-family="'Outfit', sans-serif" font-size="14" font-weight="700" fill="#ECFDF5" text-anchor="middle" letter-spacing="1">LINGKUNGAN KAMPUS ASRI & SEJUK</text>
</svg>
`;

function svgToDataUrl(svgString: string): string {
  const cleaned = svgString.trim();
  try {
    if (typeof btoa !== 'undefined') {
      const base64 = btoa(unescape(encodeURIComponent(cleaned)));
      return `data:image/svg+xml;base64,${base64}`;
    }
  } catch (err) {
    console.error('Base64 encoding error:', err);
  }
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(cleaned)}`;
}

export const CAMPUS_PRESETS: CampusPreset[] = [
  {
    id: 'gedung-rektorat',
    title: 'Gedung Landmark & Rektorat UNIROW',
    category: 'Arsitektur Kampus',
    description: 'Fasad modern ceria bernuansa kebanggaan civitas akademika UNIROW Tuban.',
    imageUrl: svgToDataUrl(svgCampusFront),
    thumbnailUrl: svgToDataUrl(svgCampusFront),
    accentColor: '#059669',
  },
  {
    id: 'lambang-unirow',
    title: 'Lambang Resmi UNIROW Ronggolawe Tuban',
    category: 'Identitas & Maskot',
    description: 'Emblem bunga teratai, kuda putih gagah Ronggolawe, dan gerbang merah bersejarah.',
    imageUrl: svgToDataUrl(svgLogoUnirow),
    thumbnailUrl: svgToDataUrl(svgLogoUnirow),
    accentColor: '#047857',
  },
  {
    id: 'gedung-kuliah',
    title: 'Gedung Perkuliahan & Koridor Kampus',
    category: 'Fasilitas Akademik',
    description: 'Gedung bertingkat modern tempat riset, laboratorium, dan ruang kuliah interaktif.',
    imageUrl: svgToDataUrl(svgCampusHallway),
    thumbnailUrl: svgToDataUrl(svgCampusHallway),
    accentColor: '#16A34A',
  },
  {
    id: 'maba-pmb',
    title: 'Penyambutan Mahasiswa Baru',
    category: 'Kehidupan Mahasiswa',
    description: 'Semangat dan keceriaan mahasiswa baru menyongsong masa depan cerah di UNIROW.',
    imageUrl: svgToDataUrl(svgStudentsPmb),
    thumbnailUrl: svgToDataUrl(svgStudentsPmb),
    accentColor: '#059669',
  },
  {
    id: 'logo-mf',
    title: 'Logo Resmi MF',
    category: 'Identitas & Lambang',
    description: 'Logo resmi lambang kebanggaan dengan paduan warna elegan merah marun dan emas.',
    imageUrl: '/logo.png',
    thumbnailUrl: '/logo.png',
    accentColor: '#881337',
  },
];
