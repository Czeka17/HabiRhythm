import { StyleSheet, View } from 'react-native';

import { AcceptedMission, MissionOffer } from '@/features/missions/types';
import { AppText, Button, Card } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

type MissionCardVariant = 'offer' | 'accepted';

interface MissionCardProps {
  mission: MissionOffer | AcceptedMission;
  variant: MissionCardVariant;
  onAccept?: () => void;
}

export const MissionCard = ({ mission, variant, onAccept }: MissionCardProps) => {
  const isAccepted = variant === 'accepted';
  const lockedUntil = isAccepted ? (mission as AcceptedMission).lockedUntil : null;

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleGroup}>
            <AppText variant="heading3">{mission.title}</AppText>

            <AppText variant="bodySmall" color={colors.textMuted}>
              {mission.period.toUpperCase()} · {mission.xpReward} XP
            </AppText>
          </View>

          {isAccepted ? (
            <View style={styles.badge}>
              <AppText variant="caption" color={colors.primary}>
                LOCKED
              </AppText>
            </View>
          ) : null}
        </View>

        <AppText color={colors.textMuted}>{mission.description}</AppText>

        {lockedUntil ? (
          <AppText variant="bodySmall" color={colors.textMuted}>
            Locked until: {lockedUntil}
          </AppText>
        ) : null}

        {!isAccepted && onAccept ? <Button onPress={onAccept}>Accept mission</Button> : null}
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
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  titleGroup: {
    flex: 1,
    gap: spacing.xs,
  },
  badge: {
    alignSelf: 'flex-start',
  },
});