import type { Theme, Filter } from './types';

const FESTIVITIES_GUIDELINES = `
-- CRITICAL GUIDELINES FOR FESTIVITIES --

RULE #1: ABSOLUTE FACIAL FIDELITY. This is the most important rule. You MUST preserve the person's face with 100% accuracy.
- DO NOT "beautify" or "perfect" the face. The goal is REALISM, not artificial perfection.
- PRESERVE EVERY DETAIL: Keep the exact facial expression, wrinkles, fine lines, skin texture, skin marks, sun spots, and skin tone.
- PRESERVE FEATURES: Keep the original eye color, beard, mustache, and fine hair details (contours, individual strands) exactly as they are. The face must be a pixel-perfect match to the original in terms of identity and characteristics.

RULE #2: STATIC UPPER BODY.
- You MUST use the upper body (from the waist up) and the exact pose from the original photo. Treat the person as a static 'cutout'.
- DO NOT change their pose or position.

RULE #3: CREATIVE REALISM. This is your only area for creativity.
- CLOTHING: Recreate the person's clothing to perfectly match the chosen festivity theme.
- BACKGROUND: Generate a new background that is 100% realistic and natural for the festivity. It must look like a real location, not a synthetic or artificial backdrop.
- SEAMLESS INTEGRATION: Your primary technical challenge is to blend the 'cutout' into the new scene flawlessly. It must not look like a cheap collage.
- LIGHTING: The lighting on the person MUST match the new background. Apply realistic shadows and highlights from the environment onto their body and clothes.
- OVERALL GOAL: The final image must look like an authentic, high-quality photograph taken at the event, maintaining all the raw, real details of the original person. It should feel organic and completely real.
`;

const TIME_TRAVEL_GUIDELINES = `
-- CRITICAL GUIDELINES FOR TIME TRAVEL --

RULE #1: ABSOLUTE FACIAL FIDELITY. This is the most important rule. You MUST preserve the person's face with 100% accuracy.
- DO NOT "beautify" or "perfect" the face. The goal is REALISM, not artificial perfection.
- PRESERVE EVERY DETAIL: Keep the exact facial expression, wrinkles, fine lines, skin texture, skin marks, sun spots, and skin tone.
- PRESERVE FEATURES: Keep the original eye color, beard, mustache, and fine hair details (contours, individual strands) exactly as they are. The face must be a pixel-perfect match to the original in terms of identity and characteristics.

RULE #2: STATIC BODY AND POSE.
- You MUST use the person's body and the exact pose from the original photo. Treat the person as a static 'cutout'.
- DO NOT change their pose or position. The consistency of the pose is critical.

RULE #3: CREATIVE REALISM FOR THE ERA. This is your only area for creativity.
- HAIRSTYLE: Recreate the person's hairstyle to perfectly match a popular style from the chosen decade.
- CLOTHING: Recreate the person's clothing to be authentic to the fashion of the era.
- BACKGROUND: Generate a new background that is 100% realistic and captures the atmosphere and aesthetic of the decade.
- PHOTOGRAPHIC STYLE: The final image must look like an authentic photograph from that time period. Use appropriate film grain, color toning, and lighting styles characteristic of the decade's photography.
- SEAMLESS INTEGRATION: Your primary technical challenge is to blend the 'cutout' into the new scene flawlessly. The lighting on the person MUST match the new background. Apply realistic shadows and highlights from the environment.
- OVERALL GOAL: Create a believable and immersive "photograph from the past" that authentically transports the original person to the chosen decade, while maintaining their exact pose and facial reality.
`;


const DECADE_PROMPT_TEMPLATE = (decade: string) => `Create a photograph of the person in this image as if they were living in the ${decade}. The photograph should capture the fashions, hairstyles, and overall atmosphere characteristic of that period. ${TIME_TRAVEL_GUIDELINES}`;
const FESTIVITY_PROMPT_TEMPLATE = (festivity: string) => `Transform this photograph to immerse the person in a ${festivity} celebration. The final image should be a vibrant and authentic photograph capturing the essence of this festivity, including themed clothing, accessories, and a characteristic background atmosphere. ${FESTIVITIES_GUIDELINES}`;

export const DECADES: Theme[] = [
    { id: '1950s', name: '1950s', prompt: DECADE_PROMPT_TEMPLATE('1950s') },
    { id: '1960s', name: '1960s', prompt: DECADE_PROMPT_TEMPLATE('1960s') },
    { id: '1970s', name: '1970s', prompt: DECADE_PROMPT_TEMPLATE('1970s') },
    { id: '1980s', name: '1980s', prompt: DECADE_PROMPT_TEMPLATE('1980s') },
    { id: '1990s', name: '1990s', prompt: DECADE_PROMPT_TEMPLATE('1990s') },
    { id: '2000s', name: '2000s', prompt: DECADE_PROMPT_TEMPLATE('2000s') },
    { id: '2010s', name: '2010s', prompt: DECADE_PROMPT_TEMPLATE('2010s') },
    { id: '2020s', name: '2020s', prompt: DECADE_PROMPT_TEMPLATE('2020s') },
];

export const FESTIVITIES: Theme[] = [
    { id: 'halloween', name: 'Halloween', prompt: FESTIVITY_PROMPT_TEMPLATE('Halloween') },
    { id: 'christmas', name: 'Christmas', prompt: FESTIVITY_PROMPT_TEMPLATE('Christmas') },
    { id: 'new-year', name: 'New Year\'s Eve', prompt: FESTIVITY_PROMPT_TEMPLATE('New Year\'s Eve party') },
    { id: 'carnival', name: 'Carnival', prompt: FESTIVITY_PROMPT_TEMPLATE('Brazilian Carnival') },
    { id: 'tomorrowland', name: 'Tomorrowland', prompt: FESTIVITY_PROMPT_TEMPLATE('Tomorrowland electronic music festival') },
    { id: 'summer', name: 'Summer', prompt: FESTIVITY_PROMPT_TEMPLATE('Summer beach party') },
    { id: 'winter', name: 'Winter', prompt: FESTIVITY_PROMPT_TEMPLATE('Cozy winter cabin scene') },
    { id: 'autumn', name: 'Autumn', prompt: FESTIVITY_PROMPT_TEMPLATE('Autumn harvest festival') },
    { id: 'spring', name: 'Spring', prompt: FESTIVITY_PROMPT_TEMPLATE('Spring blossom festival') },
    { id: 'st-patricks', name: 'St. Patrick\'s Day', prompt: FESTIVITY_PROMPT_TEMPLATE('St. Patrick\'s Day parade') },
    { id: 'valentines', name: 'Valentine\'s Day', prompt: FESTIVITY_PROMPT_TEMPLATE('Romantic Valentine\'s Day setting') },
    { id: 'easter', name: 'Easter', prompt: FESTIVITY_PROMPT_TEMPLATE('Easter celebration') },
    { id: 'day-of-dead', name: 'Day of the Dead', prompt: FESTIVITY_PROMPT_TEMPLATE('Día de los Muertos (Day of the Dead) celebration') },
    { id: 'diwali', name: 'Diwali', prompt: FESTIVITY_PROMPT_TEMPLATE('Diwali, the festival of lights') },
    { id: 'world-cup', name: 'Copa do Mundo', prompt: FESTIVITY_PROMPT_TEMPLATE('Brazilian Football World Cup celebration') },
    { id: 'festa-junina', name: 'Festa Junina', prompt: FESTIVITY_PROMPT_TEMPLATE('Brazilian Festa Junina (June Festival)') },
    { id: 'oktoberfest', name: 'Oktoberfest', prompt: FESTIVITY_PROMPT_TEMPLATE('Oktoberfest beer festival') },
    { id: 'rodeio', name: 'Rodeio', prompt: FESTIVITY_PROMPT_TEMPLATE('Brazilian Rodeo festival') },
    { id: 'carnival-of-venice', name: 'Carnival of Venice', prompt: FESTIVITY_PROMPT_TEMPLATE('Carnival of Venice in Italy') },
    { id: 'hanukkah', name: 'Hanukkah', prompt: FESTIVITY_PROMPT_TEMPLATE('Hanukkah, the Jewish festival of lights') },
    { id: 'old-west', name: 'Old West', prompt: FESTIVITY_PROMPT_TEMPLATE('American Old West / Wild West setting') },
];

export const FILTERS: Filter[] = [
    { id: 'normal', name: 'Normal', className: 'filter-normal', style: 'none' },
    { id: '1977', name: '1977', className: 'filter-1977', style: 'sepia(.5) hue-rotate(-30deg) saturate(1.4)' },
    { id: 'gingham', name: 'Gingham', className: 'filter-gingham', style: 'contrast(1.1) brightness(1.1)' },
    { id: 'lofi', name: 'Lo-Fi', className: 'filter-lofi', style: 'saturate(1.1) contrast(1.5)' },
    { id: 'inkwell', name: 'Inkwell', className: 'filter-inkwell', style: 'grayscale(1)' },
    { id: 'moon', name: 'Moon', className: 'filter-moon', style: 'grayscale(1) contrast(1.1) brightness(1.1)' },
    { id: 'nashville', name: 'Nashville', className: 'filter-nashville', style: 'sepia(.2) contrast(1.2) brightness(1.05) hue-rotate(-15deg)' },
    { id: 'slumber', name: 'Slumber', className: 'filter-slumber', style: 'saturate(.6) brightness(1.05) contrast(1.1)' },
    { id: 'toaster', name: 'Toaster', className: 'filter-toaster', style: 'sepia(.4) saturate(2.5) hue-rotate(-15deg) contrast(1.2)' },
    { id: 'walden', name: 'Walden', className: 'filter-walden', style: 'sepia(.3) contrast(.9) brightness(1.1) hue-rotate(-10deg)' },
    { id: 'willow', name: 'Willow', className: 'filter-willow', style: 'grayscale(.5) contrast(.95) brightness(.9)' },
    { id: 'xpro2', name: 'X-Pro II', className: 'filter-xpro2', style: 'sepia(.45) contrast(1.25) brightness(1.75) hue-rotate(-5deg)' },
    { id: 'clarendon', name: 'Clarendon', className: 'filter-clarendon', style: 'sepia(.15) contrast(1.25) brightness(1.25) hue-rotate(5deg)' },
    { id: 'hudson', name: 'Hudson', className: 'filter-hudson', style: 'contrast(1.2) brightness(1.05) saturate(1.1)' },
    { id: 'mayfair', name: 'Mayfair', className: 'filter-mayfair', style: 'contrast(1.1) brightness(1.15) saturate(1.1)' },
    { id: 'reyes', name: 'Reyes', className: 'filter-reyes', style: 'sepia(.75) contrast(.85) brightness(1.1)' },
];
