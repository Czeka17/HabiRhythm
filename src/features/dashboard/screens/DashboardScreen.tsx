import { Alert, StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import {
  RecentCheckInsCard,
  TodayOverviewCard,
  WeeklyProgressCard,
} from '@/features/dashboard/components';
import { CalendarDay } from '@/features/calendar/types';
import { useCheckIns } from '@/features/checkins/hooks';
import { useHabits } from '@/features/habits/hooks';
import { Screen, SectionHeader } from '@/shared/components';
import { spacing } from '@/shared/constants/spacing';
import {canEditCheckInDate, getCurrentISODate } from '@/shared/utils';
import { ContributionCalendar } from '@/features/calendar/components';
import { getCalendarDays, hasCalendarDayCheckIn } from '@/features/calendar/utils';

export const DashboardScreen = () => {
  const { activeHabits } = useHabits();
  const { sortedCheckIns } = useCheckIns();

  const today = getCurrentISODate();
  const todayCheckIn = sortedCheckIns.find((checkIn) => checkIn.date === today);

    const calendarDays = getCalendarDays({
        checkIns: sortedCheckIns,
        weeksCount: 4,
    });

    const openCalendarDay = (date: string) => {
    router.push({
        pathname: '/check-in/[date]' as const,
        params: { date },
    });
    };
    const handleCalendarDayPress = (day: CalendarDay) => {
        if (hasCalendarDayCheckIn(day) || canEditCheckInDate(day.date)) {
            openCalendarDay(day.date);
            return;
        }

        Alert.alert('No check-in', 'There is no check-in for this day.');
    };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title="habiRhythm"
          description="Build better days through small daily actions."
        />

        <TodayOverviewCard todayCheckIn={todayCheckIn} />
        <ContributionCalendar days={calendarDays} onDayPress={handleCalendarDayPress} />

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