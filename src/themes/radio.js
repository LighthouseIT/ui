import { defaultVariables } from '../theme';

export default (variables = defaultVariables) => ({
  'lh.ui.Radio': {
    container: {
      height: 24,
      width: 24,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: variables.checkbox.inativeBackgroundColor,

      thumbAnimation(driver) {
        return {
          borderColor: driver.interpolate({
            inputRange: [0, 1],
            outputRange: [
              variables.checkbox.inativeBackgroundColor,
              variables.checkbox.activeBackgroundColor,
            ],
          }),
          borderWidth: driver.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 8],
          }),
        };
      },
    },
  },
});
