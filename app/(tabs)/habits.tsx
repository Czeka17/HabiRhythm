import { Button, Text, View } from 'react-native';

import { useHabits } from '@/features/habits/hooks';
import { Screen } from '@/shared/components/Screen';

export default function HabitsRoute() {
  const { activeHabits, addHabit } = useHabits();

  return (
    <Screen>
      <View style={{ gap: 16 }}>
        <Text>Habits: {activeHabits.length}</Text>

        <Button
          title="Add test habit"
          onPress={() =>
            addHabit({
              name: 'Training',
              type: 'habit',
              targetPerWeek: 5,
            })
          }
        />

        {activeHabits.map((habit) => (
          <Text key={habit.id}>
            {habit.name} - {habit.frequency.targetPerWeek}/week
          </Text>
        ))}
      </View>
    </Screen>
  );
}