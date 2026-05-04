import { StyleSheet, View } from 'react-native';

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

export const DashboardScreen = () => {
  const { activeHabits } = useHabits();
  const { sortedCheckIns } = useCheckIns();

  const today = getCurrentISODate();
  const todayCheckIn = sortedCheckIns.find((checkIn) => checkIn.date === today);

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title="habiRhythm"
          description="Build better days through small daily actions."
        />

        <TodayOverviewCard todayCheckIn={todayCheckIn} />

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