import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { useCheckIns } from '@/features/checkins/hooks';
import { AppText, Button, Card, Screen, SectionHeader } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';
import { canEditCheckInDate, getCurrentISODate, getYesterdayISODate } from '@/shared/utils';

export const DailyCheckInListScreen = () => {
  const { sortedCheckIns } = useCheckIns();

  const today = getCurrentISODate();
  const yesterday = getYesterdayISODate();

  const hasTodayCheckIn = sortedCheckIns.some((checkIn) => checkIn.date === today);
  const hasYesterdayCheckIn = sortedCheckIns.some((checkIn) => checkIn.date === yesterday);

  const visibleDates = [
    today,
    yesterday,
    ...sortedCheckIns
      .map((checkIn) => checkIn.date)
      .filter((date) => date !== today && date !== yesterday),
  ];

  const uniqueVisibleDates = Array.from(new Set(visibleDates));

  const openCheckIn = (date: string) => {
  router.push({
    pathname: '/check-in/[date]',
    params: { date },
  });
};

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title="Daily Check-ins"
          description="Track your day, edit today or yesterday, and review older entries."
        />

        <Card>
          <View style={styles.quickActions}>
            <AppText variant="heading3">Quick actions</AppText>

            <Button onPress={() => openCheckIn(today)}>
              {hasTodayCheckIn ? 'Edit today' : 'Add today'}
            </Button>

            <Button variant="secondary" onPress={() => openCheckIn(yesterday)}>
              {hasYesterdayCheckIn ? 'Edit yesterday' : 'Add yesterday'}
            </Button>
          </View>
        </Card>

        <View style={styles.list}>
          <AppText variant="heading3">History</AppText>

          {uniqueVisibleDates.map((date) => {
            const checkIn = sortedCheckIns.find((item) => item.date === date);
            const isEditable = canEditCheckInDate(date);

            return (
              <Card key={date}>
                <View style={styles.checkInCard}>
                  <View style={styles.checkInInfo}>
                    <AppText variant="heading3">{date}</AppText>

                    {checkIn ? (
                      <AppText variant="bodySmall" color={colors.textMuted}>
                        Mood {checkIn.moodRating}/10 · Score {checkIn.score}/100 · {checkIn.status}
                      </AppText>
                    ) : (
                      <AppText variant="bodySmall" color={colors.textMuted}>
                        No check-in yet
                      </AppText>
                    )}

                    <AppText variant="caption" color={isEditable ? colors.primary : colors.textMuted}>
                      {isEditable ? 'Editable' : 'Read-only'}
                    </AppText>
                  </View>

                  <Button
                    variant={isEditable ? 'primary' : 'secondary'}
                    onPress={() => openCheckIn(date)}
                  >
                    {checkIn ? (isEditable ? 'Edit' : 'View') : 'Add'}
                  </Button>
                </View>
              </Card>
            );
          })}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  quickActions: {
    gap: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  checkInCard: {
    gap: spacing.md,
  },
  checkInInfo: {
    gap: spacing.xs,
  },
});