const PARSER_REGEXP = /\$\{([a-zA-Z0-9_]*)\}?/gi;

export const transformValue = (input, placeholder) => input || placeholder;

export default (template, values, placeholder) =>
  template.replace(PARSER_REGEXP, (_, key) => transformValue(values[key], placeholder || _));
