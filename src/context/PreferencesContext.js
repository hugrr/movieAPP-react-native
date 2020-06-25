import {createContext} from 'react';

const PreferencesContext = createContext({
  theme: '',
  taggleTheme: () => {},
});
export default PreferencesContext;
