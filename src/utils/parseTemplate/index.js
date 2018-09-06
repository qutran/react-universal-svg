const PARSER_REGEXP = /\$\{([a-zA-Z0-9_]*)\}?/gi;

const transformValue = (input, placeholder) => input || placeholder;

export const getParamsFromTemplate = (template) =>
  (template.match(PARSER_REGEXP) || []).map((item) => item.replace(PARSER_REGEXP, (_, key) => key));

export default (template, values, placeholder) =>
  template.replace(PARSER_REGEXP, (_, key) => transformValue(values[key], placeholder || _));
