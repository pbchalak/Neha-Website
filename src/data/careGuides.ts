import { CareGuideItem, PestGuideItem } from '../types';

export const CARE_GUIDES: CareGuideItem[] = [
  {
    id: 'watering',
    title: 'Watering Guidance',
    iconName: 'Droplets',
    overview: 'Understand when and how to water plants, avoiding excessive watering that suffocates root networks.',
    keyPractices: [
      'Perform the Finger Test: Insert your index finger 1 to 2 inches into the soil. If it feels cool and damp, delay watering; if dry and powdery, water thoroughly.',
      'Water Deeply, Not Frequently: Soak root zones so water percolates through drainage holes, encouraging deep root systems rather than shallow surface roots.',
      'Morning Schedule: Water in early morning so foliage dries quickly in the sunlight, discouraging fungal leaf spots.',
      'Seasonal Adjustments: Plants drink significantly more during hot dry summers than during cool, dormant winter periods.'
    ],
    commonMistakes: [
      'Watering on a strict calendar rather than assessing soil moisture.',
      'Allowing pots to sit continuously in waterlogged drip saucers.',
      'Wetting delicate flowers or leaves under scorching midday sun.'
    ],
    seasonalAdvice: 'In high summer, water container plants twice daily if required; in winter, reduce frequency by 50%.'
  },
  {
    id: 'sunlight',
    title: 'Sunlight Requirements',
    iconName: 'Sun',
    overview: 'Learn about full sunlight, partial shade, and the varied photosynthetic needs across plant families.',
    keyPractices: [
      'Full Sunlight (6+ hours): Flowering roses, sunflowers, hibiscus, citrus, and vegetable seedlings require direct unfiltered sun to produce abundant blooms and fruits.',
      'Partial Sun / Dappled Light (3 to 6 hours): Great for morning balconies, leafy greens, and sensitive shrubs that wilt in harsh afternoon rays.',
      'Bright Indirect Light: Ideal for indoor ornamental plants like Areca palms and Crotons. Place near east or north-facing windows or behind sheer linen curtains.',
      'Low to Medium Light: Resilient shade-tolerant indoor foliage such as Golden Pothos (Money Plant) and Snake plants.'
    ],
    commonMistakes: [
      'Moving a shaded plant into direct blazing sun without gradual hardening off (causes sun scorch).',
      'Keeping outdoor flowering plants in deep indoor shade and wondering why they fail to bloom.'
    ],
    seasonalAdvice: 'As the sun changes angles between winter and summer, relocate indoor pots closer to south-facing windows during cooler months.'
  },
  {
    id: 'soil',
    title: 'Soil & Potting Mediums',
    iconName: 'Layers',
    overview: 'Choose suitable soil with appropriate fertility, aeration, and drainage tailored to each species.',
    keyPractices: [
      'The Golden Potting Formula: 40% garden red soil + 30% organic compost or vermicompost + 20% cocopeat + 10% coarse sand/perlite.',
      'Drainage Priority: Good potting soil allows water to penetrate freely and drain within 10-15 seconds rather than clumping into impenetrable clay.',
      'Soil Aeration: Periodically loosen top 1 inch of soil with a hand fork to break surface crusts and allow oxygen to penetrate root hairs.',
      'pH Balance: Most garden species thrive in slightly acidic to neutral soil (pH 6.0 to 7.0).'
    ],
    commonMistakes: [
      'Using heavy, pure clay backyard soil directly inside sealed indoor containers.',
      'Reusing diseased potting soil from deceased plants without solarizing or refreshing with compost.'
    ],
    seasonalAdvice: 'Top-dress all potted plants with a fresh 1-inch layer of rich vermicompost every spring and autumn.'
  },
  {
    id: 'fertilizers',
    title: 'Fertilizers & Plant Nutrition',
    iconName: 'Sparkles',
    overview: 'Understand the essential roles of Nitrogen, Phosphorus, Potassium, and organic compost in plant vitality.',
    keyPractices: [
      'Nitrogen (N) for Lush Foliage: Essential for vegetable greens, ornamental palms, and leafy herbs.',
      'Phosphorus (P) for Vigorous Roots & Buds: Crucial when establishing seedlings and forming blossom buds on roses and fruit trees.',
      'Potassium (K) for Fruit Ripening & Disease Immunity: Strengthens plant cell walls and enhances flower color brilliance.',
      'Organic Alternatives: Earthworm vermicompost, bone meal, seaweed kelp extract, and aged cow dung manure provide gentle, continuous feeding without chemical burning.'
    ],
    commonMistakes: [
      'Over-fertilizing stressed or dry plants, which scorches roots and blackens leaf tips.',
      'Feeding dormant plants in the depths of winter when their metabolic uptake slows down.'
    ],
    seasonalAdvice: 'Always dilute liquid plant food to half strength for indoor houseplants, applying only during active spring-summer growth.'
  },
  {
    id: 'pruning',
    title: 'Pruning & Training',
    iconName: 'Scissors',
    overview: 'Remove damaged or unwanted plant parts when appropriate to focus biological energy into healthy growth.',
    keyPractices: [
      'The 3 Ds Rule: Regularly cut away Dead, Damaged, and Diseased branches using sharp, sterilized bypass shears.',
      'Deadheading: Snip off fading or withered flowers just above the first 5-leaflet node to spur a fresh flush of blooms.',
      'Pinching for Bushiness: Pinch the apical tips of young herbs (tulsi, basil, chillies) to force lateral bushy branching.',
      'Sanitize Tools: Wipe blades with rubbing alcohol between cuts to prevent cross-infecting fungal pathogens.'
    ],
    commonMistakes: [
      'Tearing stems with dull shears rather than making clean, 45-degree angle cuts.',
      'Removing more than 30% of a plant foliage canopy in one aggressive pruning session.'
    ],
    seasonalAdvice: 'Conduct heavy structural pruning on roses and deciduous fruit trees in late winter before fresh spring buds swell.'
  },
  {
    id: 'pest-management',
    title: 'Pest Management',
    iconName: 'ShieldAlert',
    overview: 'Learn to detect and manage common nursery pests like aphids, whiteflies, thrips, mealybugs, and caterpillars.',
    keyPractices: [
      'Weekly Inspections: Examine leaf undersides and new tender stem tips where pests congregate.',
      'Neem Oil Spray: Emulsify 5ml cold-pressed pure neem oil + 2ml liquid dish soap in 1 liter of lukewarm water; spray once weekly in early evening.',
      'Companion Planting: Interplant marigolds, garlic, and basil around vegetables to naturally repel flying insects.',
      'Manual Removal: Wash mild infestations off leaves with a firm jet of clean water.'
    ],
    commonMistakes: [
      'Spraying oily pest treatments in hot midday sunshine, which causes severe leaf phototoxicity.',
      'Spraying broad-spectrum chemical insecticides that eradicate beneficial pollinator bees and ladybugs.'
    ],
    seasonalAdvice: 'Watch closely during warm humid monsoon transitions when soft-bodied insects reproduce rapidly.'
  },
  {
    id: 'maintenance',
    title: 'Routine Plant Maintenance',
    iconName: 'CheckCircle2',
    overview: 'Regularly inspect plants, remove weeds, clear fallen debris, and maintain appropriate growing conditions.',
    keyPractices: [
      'Weeding: Pull out opportunistic weeds while small before their taproots compete with your plant for water and minerals.',
      'Leaf Hygiene: Gently wipe indoor broad foliage with a damp cloth to remove household dust and restore full light absorption.',
      'Pot Repotting: When roots begin circling the container bottom or poking out of drainage holes, repot into a container 2 inches wider.',
      'Air Circulation: Space containers adequately to prevent stagnant damp pockets where mildew and fungus breed.'
    ],
    commonMistakes: [
      'Repotting a plant directly into an enormous pot, leaving excessive damp unrooted soil that turns sour.',
      'Ignoring drainage hole blockages caused by settling silt.'
    ],
    seasonalAdvice: 'Rotate pots a quarter turn each week so foliage grows evenly balanced toward the light source.'
  }
];

export const PEST_DIRECTORY: PestGuideItem[] = [
  {
    name: 'Aphids (Greenflies / Blackflies)',
    symptoms: 'Clusters of tiny green/black insects on soft tender shoots, curled leaves, sticky honeydew secretion.',
    affectedPlants: 'Rose, Hibiscus, Sunflower, Tomato, Chilli',
    organicRemedy: 'Neem oil spray (5ml/L) or a firm spray of diluted soapy water every 3 days until cleared.',
    preventiveAction: 'Encourage predatory ladybird beetles; plant marigolds nearby.'
  },
  {
    name: 'Mealybugs',
    symptoms: 'White cotton-like fluffy clusters in leaf axils and stems; plant displays stunted pale growth.',
    affectedPlants: 'Hibiscus, Croton, Money Plant, Papaya',
    organicRemedy: 'Dip a cotton swab in rubbing alcohol and touch each mealybug directly, then mist with neem emulsion.',
    preventiveAction: 'Isolate affected plants immediately; keep foliage clean and dust-free.'
  },
  {
    name: 'Whiteflies',
    symptoms: 'Tiny moth-like white insects fluttering when leaves are shaken; yellow stippled foliage.',
    affectedPlants: 'Tomato, Brinjal, Cabbage, Hibiscus',
    organicRemedy: 'Yellow sticky traps positioned at canopy height + organic insecticidal potassium soap spray.',
    preventiveAction: 'Inspect leaf undersides prior to bringing new seedlings into your garden.'
  },
  {
    name: 'Thrips',
    symptoms: 'Silvery sheen on leaves with tiny black specks, distorted flower petals, brown buds.',
    affectedPlants: 'Rose, Chilli, Marigold, Tomato',
    organicRemedy: 'Blue sticky traps + organic spinosad or systemic garlic-chilli bio-spray.',
    preventiveAction: 'Avoid excessive dry heat; mulch soil to break their pupation cycle in soil.'
  },
  {
    name: 'Caterpillars & Leaf Miners',
    symptoms: 'Irregular holes chewed in leaves, serpentine white tracks inside leaf layers, defoliated stems.',
    affectedPlants: 'Cabbage, Tomato, Brinjal, Lemon',
    organicRemedy: 'Hand-pick caterpillars in the morning; apply Bacillus thuringiensis (Bt) or neem oil.',
    preventiveAction: 'Use breathable insect barrier netting over young brassica and vegetable seedlings.'
  }
];
