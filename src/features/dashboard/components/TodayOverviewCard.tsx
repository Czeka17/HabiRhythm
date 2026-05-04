import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { DailyCheckIn } from '@/features/checkins/types';
import { getDayStatusColor, getDayStatusLabel } from '@/features/checkins/utils';
import { AppText, Button, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { radius } from '@/shared/constants/radius';
import { spacing } from '@/shared/constants/spacing';
import { getCurrentISODate } from '@/shared/utils';

interface TodayOverviewCardProps {
  todayCheckIn?: DailyCheckIn;
}

export const TodayOverviewCard = ({ todayCheckIn }: TodayOverviewCardProps) => {
  const today = getCurrentISODate();

  const openTodayCheckIn = () => {
  router.push({
    pathname: '/check-in/[date]' as const,
    params: { date: today },
  });
};

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <AppText variant="bodySmall" color={colors.textMuted}>
              Today
            </AppText>
            <AppText variant="heading2">{today}</AppText>
          </View>

          {todayCheckIn ? (
            <View
              style={[
                styles.statusDot,
                {
                  backgroundColor: getDayStatusColor(todayCheckIn.status),
                },
              ]}
            />
          ) : null}
        </View>

        {todayCheckIn ? (
          <View style={styles.content}>
            <AppText variant="heading3">{getDayStatusLabel(todayCheckIn.status)}</AppText>

            <AppText color={colors.textMuted}>
              Mood {todayCheckIn.moodRating}/10 · Score {todayCheckIn.score}/100
            </AppText>

            {todayCheckIn.note ? (
              <AppText variant="bodySmall" color={colors.textMuted}>
                “{todayCheckIn.note}”
              </AppText>
            ) : null}
          </View>
        ) : (
          <AppText color={colors.textMuted}>
            You have not completed today’s check-in yet.
          </AppText>
        )}

        <Button onPress={openTodayCheckIn}>
          {todayCheckIn ? 'Edit today' : 'Add today’s check-in'}
        </Button>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    gap: spacing.xs,
  },
  statusDot: {
    width: 18,
    height: 18,
    borderRadius: radius.full,
  },
});