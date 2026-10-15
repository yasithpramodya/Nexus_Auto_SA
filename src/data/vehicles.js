import skyline from '../assets/cars/skyline-r34.jpg';
import skylineInterior from '../assets/cars/skyline-r34-interior.jpg';
import skylineRear from '../assets/cars/skyline-r34-rear.jpg';
import skylineEngine from '../assets/cars/skyline-r34-engine.jpg';

import rcf from '../assets/cars/lexus-rcf.jpg';
import rcfInterior from '../assets/cars/lexus-rcf-interior.jpg';
import rcfRear from '../assets/cars/lexus-rcf-rear.jpg';

import crossover from '../assets/cars/crown-crossover.jpg';
import crossoverInterior from '../assets/cars/crown-crossover-interior.jpg';
import crossoverRear from '../assets/cars/crown-crossover-rear.jpg';

import mr2 from '../assets/cars/mr2.jpg';
import mr2Front from '../assets/cars/mr2-front.jpg';
import mr2Interior from '../assets/cars/mr2-interior.jpg';

import athlete from '../assets/cars/crown-athlete.jpg';
import athleteRear from '../assets/cars/crown-athlete-rear.jpg';
import athleteInterior from '../assets/cars/crown-athlete-interior.jpg';

import s660 from '../assets/cars/s660.jpg';
import s660Interior from '../assets/cars/s660-interior.jpg';

import hero from '../assets/cars/hero.jpg';

export const heroImage = hero;

export const business = {
  name: 'Nexus Auto SA',
  tagline: 'Adelaide’s Premier Japanese Import & Performance Specialist',
  phone: '(08) 7113 3287',
  mobile: '0415 993 511',
  email: 'sales@nexusautosa.com.au',
  address: 'U1 106 Springbank Road, Clapham SA 5062',
  licence: 'LMVD 294810',
  hours: [
    { day: 'Mon – Fri', sales: '8:30am – 5:30pm', service: '8:30am – 5:00pm' },
    { day: 'Saturday', sales: '9:00am – 4:00pm', service: 'By appointment' },
    { day: 'Sunday', sales: 'Appointment only', service: 'Closed' },
  ],
};

export const vehicles = [
  {
    id: 'skyline-r34',
    title: 'Nissan Skyline GT-R V-Spec',
    chassis: 'BNR34',
    year: 2001,
    odometerKm: 58410,
    price: 168000,
    priceDisplay: '$168,000 AUD',
    priceNote: 'Drive Away · SA Rego Included',
    transmission: '6-speed manual',
    engine: '2.6L twin-turbo inline-6 (RB26DETT)',
    drive: 'ATTESA E-TS Pro AWD',
    bodyStyle: 'Coupe',
    colour: 'Bayside Blue (TV2)',
    seats: 4,
    auctionGrade: '4.5 B',
    status: 'Just arrived',
    category: 'Performance',
    tags: ['RB26DETT', 'AWD', 'Manual', 'Collector Grade'],
    image: skyline,
    gallery: [
      { src: skyline, label: 'Front Angle' },
      { src: skylineInterior, label: 'Cockpit & MFD' },
      { src: skylineRear, label: 'Rear & Diffuser' },
      { src: skylineEngine, label: 'RB26DETT Engine Bay' },
    ],
    description: 'Iconic BNR34 V-Spec in genuine Bayside Blue. Sourced directly from USS Tokyo auction with documented Japanese logbooks and verified mileage. Factory carbon aero, Brembo brakes, and multi-function display fully operational.',
    features: [
      'Original RB26DETT Twin-Turbo Engine',
      'ATTESA E-TS Pro All-Wheel Drive System',
      'Active Limited Slip Differential (LSD)',
      'Factory MFD (Multi-Function Display) in English/Metric',
      'Brembo 4-Piston Front & 2-Piston Rear Brakes',
      'Full Japanese Export Certificate & Odometer Verification',
    ],
  },
  {
    id: 'lexus-rcf',
    title: 'Lexus RC F Track Edition',
    chassis: 'USC10',
    year: 2020,
    odometerKm: 33070,
    price: 129990,
    priceDisplay: '$129,990 AUD',
    priceNote: 'Drive Away · 12 Mo Warranty',
    transmission: '8-speed Sport Direct Shift',
    engine: '5.0L naturally aspirated V8 (2UR-GSE)',
    drive: 'RWD with Torsen LSD',
    bodyStyle: 'Coupe',
    colour: 'Obsidian Black',
    seats: 4,
    auctionGrade: '5 A',
    status: 'In stock',
    category: 'Performance',
    tags: ['V8 Power', 'Track Edition', 'Carbon Ceramic', 'Pristine'],
    image: rcf,
    gallery: [
      { src: rcf, label: 'Exterior Profile' },
      { src: rcfInterior, label: 'Circuit Red Cockpit' },
      { src: rcfRear, label: 'Track Wing & Quad Exhaust' },
    ],
    description: 'Ultra-rare Track Edition featuring factory carbon fiber bonnet, carbon roof, fixed rear wing, and Brembo carbon-ceramic brakes. 351kW naturally aspirated V8 symphonic exhaust note with sumptuous red leather and Alcantara cockpit.',
    features: [
      '351kW / 530Nm 5.0L High-Output 2UR-GSE V8',
      'Brembo Carbon Ceramic Brake Package',
      'Full Factory Carbon Fiber Aerodynamics',
      'Titanium Dual Exhaust System with Active Valves',
      'Mark Levinson 17-Speaker Premium Surround Audio',
      'Alcantara & Circuit Red Leather Sport Buckets',
    ],
  },
  {
    id: 'crown-crossover',
    title: 'Toyota Crown Crossover RS Advanced',
    chassis: 'TZSH35',
    year: 2023,
    odometerKm: 25577,
    price: 78500,
    priceDisplay: '$78,500 AUD',
    priceNote: 'Drive Away · Hybrid Efficiency',
    transmission: 'Direct Shift 6-speed auto',
    engine: '2.4L Turbo Dual-Boost Hybrid (T24A-FTS)',
    drive: 'E-Four Advanced Electric AWD',
    bodyStyle: 'Sedan',
    colour: 'Precious White Pearl / Black Roof',
    seats: 5,
    auctionGrade: '4.5 A',
    status: 'In stock',
    category: 'Luxury Sedan',
    tags: ['Turbo Hybrid', 'E-Four AWD', 'Panoramic Roof', 'Modern Tech'],
    image: crossover,
    gallery: [
      { src: crossover, label: 'Front 3/4 View' },
      { src: crossoverInterior, label: 'Dual-Screen Cabin' },
      { src: crossoverRear, label: 'Continuous LED Lightbar' },
    ],
    description: 'Japan-only flagship RS Advanced grade with Toyota’s potent 2.4L turbo hybrid delivering 257kW of electrified all-weather performance. Fitted with panoramic glass roof, digital inner mirror, head-up display, and Toyota Safety Sense 3.0.',
    features: [
      'Dual-Boost Hybrid Architecture (257kW Total Output)',
      'E-Four Advanced Dynamic Torque Vectoring AWD',
      'Panoramic Glass Sunroof with Electric Shade',
      'Full Color Head-Up Display (HUD) & 12.3" Digital Cockpit',
      'Ventilated & Heated Electric Leather Seats',
      'Toyota Safety Sense 3.0 with Radar Cruise & Lane Trace',
    ],
  },
  {
    id: 'mr2',
    title: 'Toyota MR2 GT Turbo (Rev 2)',
    chassis: 'SW20',
    year: 1993,
    odometerKm: 96200,
    price: 48000,
    priceDisplay: '$48,000 AUD',
    priceNote: 'Drive Away · Classic SA Historic Eligible',
    transmission: '5-speed manual (E153)',
    engine: '2.0L twin-entry turbo (3S-GTE)',
    drive: 'Mid-Engine, Rear-Wheel Drive',
    bodyStyle: 'Coupe',
    colour: 'Liquid Silver Metallic (199)',
    seats: 2,
    auctionGrade: '4 B',
    status: 'Arriving soon',
    category: 'Classic',
    tags: ['Mid-Engine Turbo', 'T-Top', 'Manual', 'JDM Classic'],
    image: mr2Front,
    gallery: [
      { src: mr2Front, label: 'Pop-Up Headlights Front' },
      { src: mr2, label: 'Rear Quarter & Wing' },
      { src: mr2Interior, label: 'T-Top Glass Cockpit' },
    ],
    description: 'Unmolested, factory-original SW20 Turbo with factory glass T-Tops and storage bags. Revision 2 chassis with upgraded suspension geometry and twin-piston brakes. Complete Japanese logbook service history from new.',
    features: [
      'Factory 3S-GTE Twin-Entry Turbocharged 4-Cylinder',
      'Original Glass T-Bar Roof Panels with Storage Covers',
      'E153 Heavy-Duty Manual Transmission with Viscous LSD',
      'Original Factory Recaro Seats & 3-Spoke Sport Wheel',
      'Zero Rust Chassis & Underside Inspected in Japan',
      'Eligible for South Australian Historic Club Registration',
    ],
  },
  {
    id: 'crown-athlete',
    title: 'Toyota Crown Athlete S VIP',
    chassis: 'GRS214',
    year: 2015,
    odometerKm: 71940,
    price: 32990,
    priceDisplay: '$32,990 AUD',
    priceNote: 'Drive Away · Complied & Serviced',
    transmission: '8-speed Super ECT automatic',
    engine: '3.5L DOHC Dual VVT-i V6 (2GR-FSE)',
    drive: 'RWD with Sport Suspension',
    bodyStyle: 'Sedan',
    colour: 'Deep Emerald Green Pearl (6W7)',
    seats: 5,
    auctionGrade: '4.5 B',
    status: 'In stock',
    category: 'Luxury Sedan',
    tags: ['234kW V6', 'Luxury VIP', 'Adaptive Damping', 'Smooth Cruise'],
    image: athlete,
    gallery: [
      { src: athlete, label: 'Showroom Exterior' },
      { src: athleteRear, label: 'Rear & Dual Chrome Exhaust' },
      { src: athleteInterior, label: 'VIP Executive Cabin' },
    ],
    description: 'The definitive Japanese luxury cruiser. Powered by the silky 234kW 2GR-FSE 3.5L V6 mated to an 8-speed automatic. Immaculate dark emerald paint with Crown illuminated door sills, rear privacy blinds, and adaptive cruise control.',
    features: [
      '234kW 3.5L 2GR-FSE Direct Injection V6',
      '8-Speed Automatic with Paddle Shift',
      'Adaptive Variable Suspension (AVS) Comfort/Sport Modes',
      'Power Memory Seats with Dual-Zone Climate Concierge',
      'Factory Crown Bi-LED Headlights & Signature 3D Grille',
      'Reverse Camera, Parking Sensors & Smart Key Entry',
    ],
  },
  {
    id: 's660',
    title: 'Honda S660 Roadster Alpha',
    chassis: 'JW5',
    year: 2017,
    odometerKm: 18300,
    price: 27500,
    priceDisplay: '$27,500 AUD',
    priceNote: 'Drive Away · Super Low Km',
    transmission: '6-speed short-throw manual',
    engine: '0.66L turbo mid-engine (S07A)',
    drive: 'Mid-Engine, Rear-Wheel Drive',
    bodyStyle: 'Convertible',
    colour: 'Carnelian Yellow Pearl',
    seats: 2,
    auctionGrade: '4.5 A',
    status: 'Just arrived',
    category: 'Kei Roadster',
    tags: ['Mid-Engine RWD', 'Manual 6-Speed', 'Roll-Top', '18,300 km'],
    image: s660,
    gallery: [
      { src: s660, label: 'Showroom Convertible' },
      { src: s660Interior, label: 'Open-Air Cockpit' },
    ],
    description: 'Pint-sized supercar thrills! Mid-engine layout with 45:55 weight balance, 6-speed manual gearbox, and removable targa roll-top. Only 18,300 genuine verified kilometres. Turns heads everywhere in Adelaide.',
    features: [
      'Mid-Ship Turbocharged Engine with Center Exhaust Exit',
      '6-Speed Close-Ratio Manual Transmission',
      'Quick-Detach Roll-Top Targa Roof System',
      'Agile Handling Assist & Yokohama Advan Sport Tires',
      'Sports Display with G-Meter & Turbo Boost Gauge',
      'Ultra-Low Fuel Consumption with Pure Go-Kart Dynamics',
    ],
  },
];

export const formatKm = (km) => `${km.toLocaleString('en-AU')} km`;
export const formatAud = (num) => `$${num.toLocaleString('en-AU')}`;
