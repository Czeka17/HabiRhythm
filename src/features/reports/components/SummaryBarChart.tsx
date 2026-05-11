import { StyleSheet, View } from 'react-native';

import { AppText, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

interface SummaryBarChartItem {
  label: string;
  value: number;
  maxValue: number;
}

interface SummaryBarChartProps {
  title: string;
  items: SummaryBarChartItem[];
  valueSuffix?: string;
}

export const SummaryBarChart = ({ title, items, valueSuffix = '' }: SummaryBarChartProps) => {
  return (
    <Card>
      <View style={styles.container}>
        <AppText variant="heading3">{title}</AppText>

        <View style={styles.list}>
          {items.map((item) => {
            const width = item.maxValue === 0 ? 0 : Math.min((item.value / item.maxValue) * 100, 100);

            return (
              <View key={item.label} style={styles.item}>
                <View style={styles.itemHeader}>
                  <AppText variant="bodySmall">{item.label}</AppText>
                  <AppText variant="bodySmall" color={colors.textMuted}>
                    {item.value}
                    {valueSuffix}
                  </AppText>
                </View>

                <View style={styles.track}>
                  <View style={[styles.fill, { width: `${width}%` }]} />
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  item: {
    gap: spacing.xs,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  track: {
    height: 10,
    borderRadius: 999,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 999,
    backgroundColor: colors.primary,
  },
});