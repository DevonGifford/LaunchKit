import { useEffect, useState } from 'react';

/**
 * Reads CSS custom properties from the live page and re-reads them whenever the
 * class on <html> changes (the toolbar's light/dark switch), so the Foundations
 * pages always show what src/app/theme.css currently defines.
 */
export function useCssVariables(names: readonly string[]) {
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    const read = () => {
      const style = getComputedStyle(document.documentElement);
      setValues(
        Object.fromEntries(names.map((name) => [name, style.getPropertyValue(name).trim()])),
      );
    };
    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [names]);

  return values;
}

/** Relative luminance of a `#rrggbb` colour, or undefined for anything else. */
function luminance(colour: string) {
  const match = /^#([0-9a-f]{6})$/i.exec(colour);
  if (!match?.[1]) return undefined;
  const hex = match[1];
  const [r, g, b] = [0, 2, 4].map((i) => {
    const channel = parseInt(hex.slice(i, i + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  }) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG contrast ratio between two `#rrggbb` colours, or undefined if either isn't one. */
export function contrastRatio(a: string, b: string) {
  const la = luminance(a);
  const lb = luminance(b);
  if (la === undefined || lb === undefined) return undefined;
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}
