import { setDefaultThemeStyle } from './init';
import { defaultVariables } from './themes/variables';
import getTheme from './theme';

setDefaultThemeStyle();

// Theme
export { getTheme, defaultVariables };

// Components
export { View } from './components/View';
export { Screen } from './components/Screen';
export { NavigationHeader } from './components/NavigationHeader';
export { FormGroup } from './components/FormGroup';
export { TextInput } from './components/TextInput';

export {
  Heading,
  Title,
  Subtitle,
  Text,
  Caption,
  Label,
} from './components/Text';

export { Button } from './components/Button';
export { Switch } from './components/Switch';
export { Checkbox } from './components/Checkbox';
export { Radio } from './components/Radio';
export { Icon } from './components/Icon';
