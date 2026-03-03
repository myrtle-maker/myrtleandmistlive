import { PillarData } from '../types';
import { CAT_PROFILES, CAT_TECHNIQUE, CAT_ENV, CAT_MIND } from './articles';

export const PILLAR_CONTENT: Record<'myrtle' | 'mist', PillarData> = {
  myrtle: {
    title: "The Botanical Science",
    subtitle: "From Soil to Success",
    description: "The definitive, evidence-based authority on houseplant survival, troubleshooting, and propagation.",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?q=80&w=2070&auto=format&fit=crop",
    categories: [
      { id: CAT_PROFILES,  title: "Plant Profiles",  description: "Deep dives into specific species.",            icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" },
      { id: CAT_TECHNIQUE, title: "Technique & Care", description: "Watering, pruning, and propagation methods.",  icon: "M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" },
      { id: CAT_ENV,       title: "Environment",      description: "Light, soil, and humidity control.",            icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
      { id: CAT_MIND,      title: "Neuro-Wellness",   description: "The psychology of green spaces.",              icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" }
    ],
    sections: [
      { id: "genus-monstera", title: "Genus: Monstera", categoryId: CAT_PROFILES, content: `<p class="mb-6">The darlings of the aroid world.</p>` }
    ]
  },
  mist: {
    title: "The Sanctuary Blueprint",
    subtitle: "Energy, Intention, & Flow",
    description: "Connect spiritual practices to everyday life.",
    image: "https://images.unsplash.com/photo-1518151596349-f5383a8b422a?q=80&w=2070&auto=format&fit=crop",
    categories: [
      { id: CAT_MIND,      title: "Mindfulness",   description: "Meditation and breathwork practices.",    icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
      { id: CAT_ENV,       title: "Sacred Spaces", description: "Feng Shui and altar creation.",           icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
      { id: CAT_TECHNIQUE, title: "Rituals",        description: "Daily practices for grounding.",          icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" }
    ],
    sections: [
      { id: "energy-body", title: "The Energy Body", categoryId: CAT_TECHNIQUE, content: `<p class="mb-4">You are more than a physical vessel.</p>` }
    ]
  }
};
