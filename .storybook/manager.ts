import { addons } from 'storybook/manager-api';
import { darkTheme, lightTheme } from './theme';

// Storybook's UI follows the system appearance, like the site does by default.
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

addons.setConfig({ theme: prefersDark ? darkTheme : lightTheme });
