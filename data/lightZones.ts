import { LightZone } from '../types';

export const LIGHT_ZONES: LightZone[] = [
  {
    minFc: 1000,
    label: "Direct Sun",
    description: "Intense, unfiltered beams. Leaves feel warm to the touch.",
    plants: [
      { name: "Cactus" },
      { name: "Succulents" },
      { name: "Bird of Paradise" },
      { name: "Croton" }
    ],
    recommendedProductId: 102
  },
  {
    minFc: 500,
    label: "Bright Indirect",
    description: "The 'Goldilocks' zone. Casts a sharp shadow, but no direct beams.",
    plants: [
      { name: "Monstera",    linkPath: '/journal/monstera-guide' },
      { name: "Fiddle Leaf Fig" },
      { name: "Alocasia" },
      { name: "Pothos",      linkPath: '/the-guide#genus-pothos' }
    ],
    recommendedProductId: 101
  },
  {
    minFc: 100,
    label: "Medium Light",
    description: "Casts a soft, blurry shadow. Good for maintenance, not rapid growth.",
    plants: [
      { name: "ZZ Plant" },
      { name: "Philodendron", linkPath: '/the-guide#genus-philodendron' },
      { name: "Dracaena" },
      { name: "Parlor Palm" }
    ],
    recommendedProductId: 103
  },
  {
    minFc: 0,
    label: "Low Light",
    description: "Reading a book is difficult. Survival mode for most plants.",
    plants: [
      { name: "Snake Plant", linkPath: '/the-guide#genus-sansevieria' },
      { name: "Cast Iron Plant" },
      { name: "Peace Lily" }
    ],
    recommendedProductId: 105
  }
];
