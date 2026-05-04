import { StyleSheet, View } from 'react-native';

import { DailyCheckIn } from '@/features/checkins/types';
import { getDayStatusColor, getDayStatusLabel } from '@/features/checkins/utils';
import { AppText, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { radius } from '@/shared/constants/radius';
import { spacing } from '@/shared/constants/spacing';

interface RecentCheckInsCardProps {
  checkIns: DailyCheckIn[];
}

export const RecentCheckInsCard = ({ checkIns }: RecentCheckInsCardProps) => {
  const recentCheckIns = checkIns.slice(0, 5);

  return (
    <Card>
      <View style={styles.container}>
        <AppText variant="heading3">Recent check-ins</AppText>

        {recentCheckIns.length === 0 ? (
          <AppText color={colors.textMuted}>No check-ins yet.</AppText>
        ) : (
          <View style={styles.list}>
            {recentCheckIns.map((checkIn) => (
              <View key={checkIn.id} style={styles.item}>
                <View
                  style={[
                    styles.statusDot,
                    {
                      backgroundColor: getDayStatusColor(checkIn.status),
                    },
                  ]}
                />

                <View style={styles.itemContent}>
                  <AppText>{checkIn.date}</AppText>
                  <AppText variant="bodySmall" color={colors.textMuted}>
                    {getDayStatusLabel(checkIn.status)} · {checkIn.score}/100
                  </AppText>
                </View>
              </View>
            ))}
          </View>
        )}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  itemContent: {
    gap: spacing.xs,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: radius.full,
  },
});