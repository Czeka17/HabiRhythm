import { StyleSheet, View } from 'react-native';

import { AppText, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface SummaryMetricCardProps {
  label: string;
  value: string | number;
  description?: string;
}

export const SummaryMetricCard = ({ label, value, description }: SummaryMetricCardProps) => {
  return (
    <Card style={styles.card}>
      <View style={styles.container}>
        <AppText variant="bodySmall" color={colors.textMuted}>
          {label}
        </AppText>

        <AppText variant="heading2">{value}</AppText>

        {description ? (
          <AppText variant="caption" color={colors.textMuted}>
            {description}
          </AppText>
        ) : null}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
  },
  container: {
    gap: spacing.xs,
  },
});