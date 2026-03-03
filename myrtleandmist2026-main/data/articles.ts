import { Article } from '../types';

export const CAT_PROFILES  = 'profiles';
export const CAT_TECHNIQUE = 'technique';
export const CAT_ENV       = 'environment';
export const CAT_MIND      = 'mindfulness';

export const ARTICLES: Article[] = [
  {
    id: 'monstera-guide',
    category: CAT_PROFILES,
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=1200&auto=format&fit=crop',
    relatedProductIds: [101, 102, 103, 106],
    myrtle: {
      title: 'The Ultimate Guide to Monstera Care',
      excerpt: 'From Fenestration to Air Layering: The complete handbook for growing the undisputed King of Aroids.',
      quickOverview: [
        { label: 'Light', value: 'Bright Indirect' },
        { label: 'Water', value: 'Soak & Dry' },
        { label: 'Difficulty', value: 'Moderate' },
        { label: 'Toxicity', value: 'Yes (Pets)' },
      ],
      content: `
        <p class="lead text-xl mb-8 leading-relaxed">There are few plants as iconic as the <a href="#">Monstera deliciosa</a>. With its massive, glossy leaves and signature splits (fenestrations), it has become the undisputed queen of the indoor jungle.</p>
        <h2 id="care-basics" class="text-2xl font-bold mt-10 mb-6">Part 1: The Basics of Care</h2>
        <p class="mb-8">Bright indirect light is mandatory. East-facing window is ideal.</p>
      `
    },
    mist: {
      title: 'Monstera: The Energy of Abundance',
      excerpt: 'The King of Aroids is a powerful symbol of expansion. Learn how to align its generous energy with your home.',
      quickOverview: [
        { label: 'Element', value: 'Wood' },
        { label: 'Planet', value: 'Jupiter' },
        { label: 'Chakra', value: 'Heart (Anahata)' },
        { label: 'Archetype', value: 'The Ruler' },
      ],
      content: `
        <p class="lead text-xl mb-8 leading-relaxed text-gray-300">In the energetic body of the home, plants act as conductors.</p>
        <h2 id="feng-shui" class="text-2xl font-bold mt-8 mb-4 text-white">Feng Shui: The Wood Element</h2>
      `
    }
  },
  {
    id: 'propagation-101',
    category: CAT_TECHNIQUE,
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1591958911259-b42d50275810?q=80&w=1200&auto=format&fit=crop',
    relatedProductIds: [103, 102],
    myrtle: {
      title: 'Propagation Mastery: Water vs. Soil',
      excerpt: 'Stop rotting your cuttings. We break down the exact node placement and humidity requirements for success.',
      quickOverview: [
        { label: 'Method', value: 'Stem Cutting' },
        { label: 'Success Rate', value: 'High' },
        { label: 'Timeframe', value: '3-6 Weeks' },
        { label: 'Medium', value: 'Water / Perlite' },
      ],
      content: `
        <p class="lead text-xl mb-6">Propagation is the closest thing to magic in the plant world.</p>
      `
    },
    mist: {
      title: 'Propagation as Rebirth Ritual',
      excerpt: 'The spiritual practice of cutting away the old to cultivate new life. Patience, trust, and the water element.',
      quickOverview: [
        { label: 'Concept', value: 'Renewal' },
        { label: 'Element', value: 'Water' },
        { label: 'Season', value: 'Spring / New Moon' },
        { label: 'Intention', value: 'Multiplication' },
      ],
      content: `
        <p class="lead text-xl mb-6 text-gray-300">Propagation is an exercise in faith.</p>
      `
    }
  },
  {
    id: 'sacred-spaces',
    category: CAT_ENV,
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?q=80&w=1200&auto=format&fit=crop',
    relatedProductIds: [1, 2, 4],
    myrtle: {
      title: 'Biophilic Design: Science of Sanctuary',
      excerpt: 'How incorporating natural elements into your home architecture lowers cortisol and improves cognitive function.',
      quickOverview: [
        { label: 'Strategy', value: 'Biophilia' },
        { label: 'Benefit', value: 'Stress Reduction' },
        { label: 'Key Element', value: 'Natural Light' },
        { label: 'Target', value: 'Home Office' },
      ],
      content: `
         <p class="lead text-xl mb-6">It is not just a trend; it is biology.</p>
      `
    },
    mist: {
      title: 'Designing Your Sacred Space',
      excerpt: 'How to arrange your physical environment to support your emotional and spiritual well-being.',
      quickOverview: [
        { label: 'Element', value: 'Fire / Light' },
        { label: 'Location', value: 'Low Traffic' },
        { label: 'Vibe', value: 'Grounded' },
        { label: 'Tool', value: 'Altar' },
      ],
      content: `
        <p class="lead text-xl mb-6 text-gray-300">A sacred space is not about religion; it is about reclaiming territory.</p>
      `
    }
  }
];
