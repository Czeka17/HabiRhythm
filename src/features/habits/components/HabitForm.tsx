import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { HabitTypeSelector } from '@/features/habits/components';
import { CreateHabitInput } from '@/features/habits/types';
import { createHabitSchema, CreateHabitFormValues } from '@/features/habits/utils';
import { Button, TextField } from '@/shared/components';
import { spacing } from '@/shared/constants/spacing';

interface HabitFormProps {
  onSubmit: (values: CreateHabitInput) => void;
}

export const HabitForm = ({ onSubmit }: HabitFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateHabitFormValues>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      name: '',
      type: 'habit',
      targetPerWeek: 5,
    },
  });

  const submitForm = (values: CreateHabitFormValues) => {
    onSubmit(values);
    reset();
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Name"
            placeholder="e.g. Workout"
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="type"
        render={({ field: { value, onChange } }) => (
          <HabitTypeSelector value={value} onChange={onChange} />
        )}
      />

      <Controller
        control={control}
        name="targetPerWeek"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Weekly target"
            placeholder="5"
            value={String(value)}
            keyboardType="number-pad"
            onBlur={onBlur}
            onChangeText={(text) => {
              const numericValue = Number(text.replace(/[^0-9]/g, ''));
              onChange(Number.isNaN(numericValue) ? 1 : numericValue);
            }}
            errorMessage={errors.targetPerWeek?.message}
          />
        )}
      />

      <Button isLoading={isSubmitting} onPress={handleSubmit(submitForm)}>
        Add habit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});