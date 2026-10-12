import { describe, expect, it } from 'vitest';
import { icuArguments } from '../../scripts/icu-arguments.mts';

const args = (message: string) => [...icuArguments(message)].sort();

describe('icuArguments', () => {
  it('finds simple and formatted arguments', () => {
    expect(args('© {year} LaunchKit')).toEqual(['year']);
    expect(args('Updated {date, date, long}')).toEqual(['date']);
    expect(args('{price, number, ::currency/EUR}')).toEqual(['price']);
  });

  it('finds arguments nested in plural and select branches, not branch text', () => {
    expect(args('{count, plural, one {# guide} other {# guides by {author}}}')).toEqual([
      'author',
      'count',
    ]);
    expect(args('{gender, select, female {Elle} other {Il}}')).toEqual(['gender']);
  });

  it('returns nothing for plain text', () => {
    expect(args('Skip to content')).toEqual([]);
  });
});
