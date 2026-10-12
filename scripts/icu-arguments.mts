/** Collects ICU argument names, including those nested in plural/select branches. */
export function icuArguments(message: string): Set<string> {
  const names = new Set<string>();
  let i = 0;
  const skipSpace = () => {
    while (/\s/.test(message[i] ?? '')) i++;
  };
  const read = (pattern: RegExp) => {
    const match = pattern.exec(message.slice(i));
    i += match?.[0].length ?? 0;
    return match?.[0] ?? '';
  };

  function parseText(untilClose: boolean) {
    while (i < message.length) {
      const char = message[i++];
      if (char === '{') parseArgument();
      else if (char === '}' && untilClose) return;
    }
  }

  function parseArgument() {
    skipSpace();
    names.add(read(/^[^\s,{}]+/));
    skipSpace();
    if (message[i] !== ',') return void i++; // `{name}`
    i++;
    skipSpace();
    const type = read(/^\w+/);
    skipSpace();
    if (message[i] !== ',') return void i++; // `{name, number}`
    i++;
    if (['plural', 'select', 'selectordinal'].includes(type)) {
      for (;;) {
        skipSpace();
        if (i >= message.length || message[i] === '}') return void i++;
        read(/^[^\s{]+/); // branch key, e.g. `one`, `=0`, `offset:1`
        skipSpace();
        if (message[i] === '{') {
          i++;
          parseText(true);
        }
      }
    }
    read(/^[^}]*/); // style, e.g. `long` or `::currency/EUR`
    i++;
  }

  parseText(false);
  return names;
}
