import { Alert, StyleSheet, View } from 'react-native';

import {
  RecentCheckInsCard,
  TodayOverviewCard,
  WeeklyProgressCard,
} from '@/features/dashboard/components';
import { useCheckIns } from '@/features/checkins/hooks';
import { useHabits } from '@/features/habits/hooks';
import { Screen, SectionHeader } from '@/shared/components';
import { spacing } from '@/shared/constants/spacing';
import { getCurrentISODate } from '@/shared/utils';
import { ContributionCalendar } from '@/features/calendar/components';
import { getCalendarDays } from '@/features/calendar/utils';

export const DashboardScreen = () => {
  const { activeHabits } = useHabits();
  const { sortedCheckIns } = useCheckIns();

  const today = getCurrentISODate();
  const todayCheckIn = sortedCheckIns.find((checkIn) => checkIn.date === today);

    const calendarDays = getCalendarDays({
        checkIns: sortedCheckIns,
        weeksCount: 4,
    });

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title="habiRhythm"
          description="Build better days through small daily actions."
        />

        <TodayOverviewCard todayCheckIn={todayCheckIn} />
        <ContributionCalendar
            days={calendarDays}
            onDayPress={(day) => {
                Alert.alert(
                day.date,
                day.status === 'empty'
                    ? 'No check-in for this day.'
                    : `Status: ${day.status}\nScore: ${day.score}/100`,
                );
            }}
            />

        <WeeklyProgressCard habits={activeHabits} checkIns={sortedCheckIns} />

        <RecentCheckInsCard checkIns={sortedCheckIns} />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
});