import { StyleSheet, View } from 'react-native';

import { DayStatus } from '@/features/checkins/types';
import { getDayStatusColor, getDayStatusLabel } from '@/features/checkins/utils';
import { AppText, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { radius } from '@/shared/constants/radius';
import { spacing } from '@/shared/constants/spacing';

interface StatusBreakdownCardProps {
  daysByStatus: Record<DayStatus, number>;
}

const STATUSES: DayStatus[] = ['great', 'average', 'bad'];

export const StatusBreakdownCard = ({ daysByStatus }: StatusBreakdownCardProps) => {
  return (
    <Card>
      <View style={styles.container}>
        <AppText variant="heading3">Day breakdown</AppText>

        <View style={styles.list}>
          {STATUSES.map((status) => (
            <View key={status} style={styles.item}>
              <View style={styles.label}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: getDayStatusColor(status),
                    },
                  ]}
                />

                <AppText>{getDayStatusLabel(status)}</AppText>
              </View>

              <AppText color={colors.textMuted}>{daysByStatus[status]}</AppText>
            </View>
          ))}
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
    gap: spacing.sm,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: radius.full,
  },
});