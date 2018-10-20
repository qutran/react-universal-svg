// TODO hotfix, remove when react-primitives updated react-native-web
import ReactDOM from 'react-dom';
import { injectEventPluginsByName } from 'react-dom/unstable-native-dependencies';
ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.EventPluginHub = {
  injection: { injectEventPluginsByName },
};
