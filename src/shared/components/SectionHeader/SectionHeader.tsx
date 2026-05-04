import { View, StyleSheet } from 'react-native';

import { AppText } from '@/shared/components/AppText';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface SectionHeaderProps {
  title: string;
  description?: string;
}

export const SectionHeader = ({ title, description }: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      <AppText variant="heading2">{title}</AppText>

      {description ? (
        <AppText variant="bodySmall" color={colors.textMuted}>
          {description}
        </AppText>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.xs,
  },
});