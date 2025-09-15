
import type { Theme, Filter } from './types';

const GUIDELINES = `
-- CRITICAL GUIDELINES --
RULE #1 (ABSOLUTE AND UNBREAKABLE): DO NOT MODIFY THE PEOPLE. You MUST use the exact faces, expressions, and head positions from the original photo. Any change to the faces is a failure. You MUST also use the upper body, clothing, and poses from the original images (from the waist up). DO NOT RECREATE OR CHANGE THEIR POSES. Only recreate poses if the image is only from the shoulders up, in which case you can be creative and redesign a proportional body for the submitted image and for the people present in the image. Think of the people in the original images as static 'cutouts'. For the chosen theme, you must recreate the clothing based on the theme, for both the attire the people will wear and the background relative to the chosen theme.

TECHNICAL TASK (THE ONLY CREATIVE PART):
POSITIONING: Place the 'cutouts' naturally in the new scene.
INTEGRATION: Your main challenge is to make the cutouts look like they belong in the scene.
LIGHTING: Apply the lighting and shadows from the new environment onto the people. If the scene's light is yellow, the people should have yellow light on them.
PERFECT BLEND: Eliminate all hard edges from the cutouts. The transition between the people and the new background must be invisible.
Ensure the final image is a clear and authentic photograph of the period or event.
`;

const DECADE_PROMPT_TEMPLATE = (decade: string) => `Create a photograph of the person in this image as if they were living in the ${decade}. The photograph should capture the fashions, hairstyles, and overall atmosphere characteristic of that period. ${GUIDELINES}`;
const FESTIVITY_PROMPT_TEMPLATE = (festivity: string) => `Transform this photograph to immerse the person in a ${festivity} celebration. The final image should be a vibrant and authentic photograph capturing the essence of this festivity, including themed clothing, accessories, and a characteristic background atmosphere. ${GUIDELINES}`;

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
];

export const FILTERS: Filter[] = [
    { id: 'normal', name: 'Normal', className: 'filter-normal' },
    { id: '1977', name: '1977', className: 'filter-1977' },
    { id: 'gingham', name: 'Gingham', className: 'filter-gingham' },
    { id: 'lofi', name: 'Lo-Fi', className: 'filter-lofi' },
    { id: 'inkwell', name: 'Inkwell', className: 'filter-inkwell' },
    { id: 'moon', name: 'Moon', className: 'filter-moon' },
    { id: 'nashville', name: 'Nashville', className: 'filter-nashville' },
    { id: 'slumber', name: 'Slumber', className: 'filter-slumber' },
    { id: 'toaster', name: 'Toaster', className: 'filter-toaster' },
    { id: 'walden', name: 'Walden', className: 'filter-walden' },
    { id: 'willow', name: 'Willow', className: 'filter-willow' },
    { id: 'xpro2', name: 'X-Pro II', className: 'filter-xpro2' },
    { id: 'clarendon', name: 'Clarendon', className: 'filter-clarendon' },
    { id: 'hudson', name: 'Hudson', className: 'filter-hudson' },
    { id: 'mayfair', name: 'Mayfair', className: 'filter-mayfair' },
    { id: 'reyes', name: 'Reyes', className: 'filter-reyes' },
];
