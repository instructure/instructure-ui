'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setDefaultTheme = exports.clearRegistry = exports.setRegistry = exports.getRegistry = undefined;
exports.registerTheme = registerTheme;
exports.makeTheme = makeTheme;
exports.registerComponentTheme = registerComponentTheme;
exports.generateTheme = generateTheme;
exports.getTheme = getTheme;
exports.generateComponentTheme = generateComponentTheme;
exports.getRegisteredThemes = getRegisteredThemes;

var _shortid = require('shortid');

var _shortid2 = _interopRequireDefault(_shortid);

var _canUseDOM = require('@instructure/ui-utils/lib/dom/canUseDOM');

var _canUseDOM2 = _interopRequireDefault(_canUseDOM);

var _warning = require('@instructure/ui-utils/lib/warning');

var _warning2 = _interopRequireDefault(_warning);

var _mergeDeep = require('@instructure/ui-utils/lib/mergeDeep');

var _mergeDeep2 = _interopRequireDefault(_mergeDeep);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var DEFAULT_THEME_KEY = '@@themeableDefaultTheme';

var makeRegistry = function makeRegistry() {
  return {
    defaultThemeKey: null,
    components: _defineProperty({}, DEFAULT_THEME_KEY, {}),
    themes: {},
    registered: [] // the theme keys in the order they are registered
  };
};

var GLOBAL_THEME_REGISTRY = makeRegistry();

var validateRegistry = function validateRegistry(registry) {
  var valid = true;
  var defaultRegistry = makeRegistry();

  Object.keys(defaultRegistry).forEach(function (key) {
    if (!registry || registry[key] === undefined) {
      valid = false;
    }
  });

  (0, _warning2.default)(valid, '[themeable] Inavlid theme registry.');

  return registry;
};

var getRegistry = exports.getRegistry = function getRegistry() {
  if (!_canUseDOM2.default) {
    return GLOBAL_THEME_REGISTRY;
  }

  if (!window.GLOBAL_THEME_REGISTRY) {
    window.GLOBAL_THEME_REGISTRY = GLOBAL_THEME_REGISTRY;
  }

  return validateRegistry(window.GLOBAL_THEME_REGISTRY);
};

var setRegistry = exports.setRegistry = function setRegistry(registry) {
  GLOBAL_THEME_REGISTRY = registry;

  if (_canUseDOM2.default) {
    window.GLOBAL_THEME_REGISTRY = GLOBAL_THEME_REGISTRY;
  }
};

var clearRegistry = exports.clearRegistry = function clearRegistry() {
  setRegistry(makeRegistry());
};

var getDefaultThemeKey = function getDefaultThemeKey() {
  var _getRegistry = getRegistry(),
      defaultThemeKey = _getRegistry.defaultThemeKey,
      registered = _getRegistry.registered;

  return defaultThemeKey || registered[0] || DEFAULT_THEME_KEY;
};

var setDefaultTheme = exports.setDefaultTheme = function setDefaultTheme(themeKey, overrides, immutable) {
  var registry = getRegistry();
  var theme = registry.themes[themeKey];

  (0, _warning2.default)(theme, '[themeable] Could not find theme: \'' + themeKey + '\' in the registry.');

  theme = Object.assign({}, theme, {
    immutable: immutable
  });

  registry.themes[themeKey] = theme;
  registry.defaultThemeKey = themeKey;
  registry.overrides = overrides;

  return theme;
};

function registerTheme(theme) {
  var registry = getRegistry();
  var key = theme.key || _shortid2.default.generate();

  registry.themes[key] = theme;
  registry.registered.push(key);
}

/**
 * Wraps a theme and provides a method to set as default and toggle between a11y and base
 *
 * @param {String} themeKey
 * @param {Object} options Provide the base theme and an optional accessible version
 */
function makeTheme(_ref) {
  var theme = _ref.theme,
      a11y = _ref.a11y;

  return Object.assign({}, theme, {
    use: function use() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          accessible = _ref2.accessible,
          overrides = _ref2.overrides;

      if (accessible) {
        (0, _warning2.default)(a11y, '[themeable] No accessible theme provided for ' + theme.key + '.');
        setDefaultTheme(a11y.key, null, true);
      } else {
        (0, _warning2.default)(theme, 'Invalid theme.');
        setDefaultTheme(theme.key, overrides, false);
      }
    }
  });
}

var getRegisteredTheme = function getRegisteredTheme(themeKey, defaultTheme) {
  var theme = getRegistry().themes[themeKey];

  if (!defaultTheme) {
    (0, _warning2.default)(theme, '[themeable] Could not find theme: \'' + themeKey + '\' in the registry.');
  }

  return theme || defaultTheme;
};

var overrideThemeVariables = function overrideThemeVariables(themeKey, overrides) {
  var theme = getRegisteredTheme(themeKey, {});
  var variables = {};

  if (overrides && Object.keys(overrides).length > 0 && theme.immutable) {
    (0, _warning2.default)(false, '[themeable] Theme, \'%s\', is immutable. Cannot apply overrides: %o', themeKey, overrides);
    variables = theme.variables;
  } else {
    variables = (0, _mergeDeep2.default)(theme.variables, overrides);
  }

  return variables;
};

/**
 * Merge theme variables for 'themeKey' with the defaults (and overrides)
 *
 * @param {String} themeKey
 * @param {Object} variable Theme overrides
 * @return {Object} A merged variables object
 */
var mergeWithDefaultThemeVariables = function mergeWithDefaultThemeVariables(themeKey) {
  var overrides = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var defaultOverrides = getRegistry().overrides || {};
  var defaultThemeKey = getDefaultThemeKey();

  if (themeKey) {
    return overrideThemeVariables(defaultThemeKey, overrideThemeVariables(themeKey, overrides));
  } else {
    // fall back to defaults, but still apply overrides
    return overrideThemeVariables(defaultThemeKey, (0, _mergeDeep2.default)(defaultOverrides, overrides));
  }
};

/**
 * Wraps a component theme function to merge its return values with the return
 * values of the default function
 *
 * @param {Function} componentThemeFunction
 * @param {String} themeKey
 * @return {Object} A wrapped theme object
 */
var makeComponentTheme = function makeComponentTheme(componentThemeFunction, themeKey) {
  return function (variables) {
    var theme = {};

    if (typeof componentThemeFunction === 'function') {
      theme = componentThemeFunction(variables);
    }

    // so that the components for the themeKey can
    // just specify overrides we merge them here
    if (typeof componentThemeFunction[themeKey] === 'function') {
      theme = Object.assign({}, theme, componentThemeFunction[themeKey](variables));
    }

    return theme;
  };
};

/**
 * Register a component theme function
 *
 * @param {String} key The theme key for the component (e.g., [Link.theme])
 * @param {Function} componentThemeFunction The function to use for preparing this component's theme
 */
function registerComponentTheme(componentKey, componentThemeFunction) {
  var registry = getRegistry();

  if (typeof componentThemeFunction !== 'function') {
    return;
  }

  registry.components[DEFAULT_THEME_KEY][componentKey] = componentThemeFunction;

  Object.keys(componentThemeFunction).forEach(function (themeKey) {
    if (!registry.components.hasOwnProperty(themeKey)) {
      // eslint-disable-line no-prototype-builtins
      registry.components[themeKey] = {};
    }

    registry.components[themeKey][componentKey] = makeComponentTheme(componentThemeFunction, themeKey);
  });
}

var getRegisteredComponents = function getRegisteredComponents(themeKey) {
  var registry = getRegistry();
  var t = themeKey || getDefaultThemeKey();

  // fall back to the default component theme functions
  return Object.assign({}, registry.components[DEFAULT_THEME_KEY], registry.components[t]);
};

/**
 * Generate themes for all @themeable components, to be used by `<ApplyTheme />`.
 *
 * @param {String} themeKey The theme to use (for global theme variables across components)
 * @param {Object} overrides theme variable overrides (usually for user defined values)
 * @return {Object} A theme config to use with `<ApplyTheme />`
 */
function generateTheme(themeKey, overrides) {
  var registry = getRegistry();

  (0, _warning2.default)(registry.registered.length > 0, '[themeable] No themes have been registered. ' + 'Import a theme from @instructure/ui-themes or register a custom theme with registerTheme ' + '(see @instructure/ui-themeable/lib/registry.js).');

  var components = getRegisteredComponents(themeKey);
  var theme = {};

  var variables = mergeWithDefaultThemeVariables(themeKey, overrides);

  Object.getOwnPropertySymbols(components).forEach(function (componentKey) {
    theme[componentKey] = components[componentKey](variables);
  });

  return theme;
}

/**
 * Return theme variables for themeKey.
 *
 * @param {String} themeKey The theme to use to generate the variables
 * @return {Object} A theme config to use with `<ApplyTheme />`
 */
function getTheme(themeKey) {
  return getRegisteredTheme(themeKey, {}).variables || {};
}

/**
 * Generate theme variables for a @themeable component.
 * If no themeKey is provided, the default theme will be generated.
 *
 * @param {Symbol} key The theme key for the component (e.g., [Link.theme])
 * @param {String} themeKey The theme to use to generate the variables (falls back to the default theme)
 * @param {Object} overrides overrides for component level theme variables (usually user defined)
 * @return {Object} A theme config for the component
 */
function generateComponentTheme(componentKey, themeKey, overrides) {
  var variables = mergeWithDefaultThemeVariables(themeKey);

  // fall back to the default component theme functions
  var t = themeKey || getDefaultThemeKey();
  var components = getRegisteredComponents(t);

  var componentThemeFunction = components[componentKey];

  var componentTheme = {};

  if (typeof componentThemeFunction === 'function') {
    try {
      componentTheme = componentThemeFunction(variables);
    } catch (e) {
      if (process.env.NODE_ENV !== 'production') {
        console.error(e); // eslint-disable-line no-console
      }
    }
  }

  var theme = getRegisteredTheme(t, {});

  if (overrides && Object.keys(overrides).length > 0 && theme.immutable) {
    (0, _warning2.default)(false, '[themeable] Theme \'%s\' is immutable. Cannot apply overrides for \'%s\': %o', t, componentKey.toString(), overrides);
    return componentTheme;
  } else {
    return Object.assign({}, componentTheme, overrides || {});
  }
}

function getRegisteredThemes() {
  return getRegistry().themes;
}