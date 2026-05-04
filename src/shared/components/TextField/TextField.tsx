import { TextInput, TextInputProps, StyleSheet, View } from 'react-native';

import { AppText } from '@/shared/components/AppText';
import { colors } from '@/shared/constants/colors';
import { radius } from '@/shared/constants/radius';
import { spacing } from '@/shared/constants/spacing';

interface TextFieldProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
}

export const TextField = ({ label, errorMessage, style, ...props }: TextFieldProps) => {
  return (
    <View style={styles.container}>
      {label ? (
        <AppText variant="bodySmall" color={colors.textMuted}>
          {label}
        </AppText>
      ) : null}

      <TextInput
        {...props}
        placeholderTextColor={colors.textMuted}
        style={[styles.input, Boolean(errorMessage) && styles.inputError, style]}
      />

      {errorMessage ? (
        <AppText variant="caption" color={colors.danger}>
          {errorMessage}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
  input: {
    minHeight: 48,
    paddingHorizontal: spacing.md,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    color: colors.text,
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.danger,
  },
});