import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

import { colors } from '@/shared/constants/colors';
import { typography } from '@/shared/constants/typography';

type AppTextVariant = keyof typeof typography;

interface AppTextProps extends PropsWithChildren, TextProps {
  variant?: AppTextVariant;
  color?: string;
  align?: TextStyle['textAlign'];
  style?: StyleProp<TextStyle>;
}

export const AppText = ({
  children,
  variant = 'body',
  color = colors.text,
  align = 'left',
  style,
  ...props
}: AppTextProps) => {
  return (
    <Text
      {...props}
      style={[
        styles.base,
        typography[variant],
        {
          color,
          textAlign: align,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    includeFontPadding: false,
  },
});