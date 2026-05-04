import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';

import { HabitTypeSelector } from '@/features/habits/components';
import { CreateHabitInput } from '@/features/habits/types';
import { createHabitSchema, CreateHabitFormValues } from '@/features/habits/utils';
import { Button, TextField } from '@/shared/components';
import { spacing } from '@/shared/constants/spacing';

interface HabitFormProps {
  initialValues?: Partial<CreateHabitFormValues>;
  submitLabel?: string;
  onSubmit: (values: CreateHabitInput) => void;
}

export const HabitForm = ({ initialValues, submitLabel = 'Add habit', onSubmit }: HabitFormProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<CreateHabitFormValues>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: {
      name: initialValues?.name ?? '',
      type: initialValues?.type ?? 'habit',
      targetPerWeek: initialValues?.targetPerWeek ?? 5,
    },
  });

  const selectedType = watch('type');

  useEffect(() => {
    reset({
      name: initialValues?.name ?? '',
      type: initialValues?.type ?? 'habit',
      targetPerWeek: initialValues?.targetPerWeek ?? 5,
    });
  }, [initialValues, reset]);

  const submitForm = (values: CreateHabitFormValues) => {
    onSubmit({
      name: values.name,
      type: values.type,
      targetPerWeek: values.type === 'habit' ? values.targetPerWeek : undefined,
    });

    if (!initialValues) {
      reset({
        name: '',
        type: 'habit',
        targetPerWeek: 5,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange, onBlur } }) => (
          <TextField
            label="Name"
            placeholder="e.g. Workout or Alcohol"
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

      {selectedType === 'habit' ? (
        <Controller
          control={control}
          name="targetPerWeek"
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              label="Weekly target"
              placeholder="5"
              value={value ? String(value) : ''}
              keyboardType="number-pad"
              onBlur={onBlur}
              onChangeText={(text) => {
                const numericValue = Number(text.replace(/[^0-9]/g, ''));
                onChange(Number.isNaN(numericValue) ? undefined : numericValue);
              }}
              errorMessage={errors.targetPerWeek?.message}
            />
          )}
        />
      ) : null}

      <Button isLoading={isSubmitting} onPress={handleSubmit(submitForm)}>
        {submitLabel}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.md,
  },
});