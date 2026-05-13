import { Alert, StyleSheet, View } from 'react-native';

import { MissionCard } from '@/features/missions/components';
import { useMissions } from '@/features/missions/hooks';
import { AppText, Card, Screen, SectionHeader } from '@/shared/components';
import { colors } from '@/shared/constants/colors';
import { spacing } from '@/shared/constants/spacing';

const MAX_ACCEPTED_MISSIONS = 3;

export const MissionsScreen = () => {
  const { offers, activeAcceptedMissions, acceptMission } = useMissions();

  const hasReachedLimit = activeAcceptedMissions.length >= MAX_ACCEPTED_MISSIONS;

  const handleAcceptMission = (offerId: string) => {
    if (hasReachedLimit) {
      Alert.alert('Mission limit reached', 'You can have up to 3 active missions at the same time.');
      return;
    }

    acceptMission(offerId);
  };

  return (
    <Screen scrollable>
      <View style={styles.container}>
        <SectionHeader
          title="Missions"
          description="Choose daily, weekly and monthly quests to earn XP."
        />

        <Card>
          <AppText color={colors.textMuted}>
            Active missions: {activeAcceptedMissions.length}/{MAX_ACCEPTED_MISSIONS}
          </AppText>
        </Card>

        <View style={styles.section}>
          <AppText variant="heading3">Accepted missions</AppText>

          {activeAcceptedMissions.length === 0 ? (
            <Card>
              <AppText color={colors.textMuted}>No accepted missions yet.</AppText>
            </Card>
          ) : (
            activeAcceptedMissions.map((mission) => (
              <MissionCard key={mission.id} mission={mission} variant="accepted" />
            ))
          )}
        </View>

        <View style={styles.section}>
          <AppText variant="heading3">Available missions</AppText>

          {offers.length === 0 ? (
            <Card>
              <AppText color={colors.textMuted}>
                No available missions right now. Accepted missions stay locked until their period
                ends.
              </AppText>
            </Card>
          ) : (
            offers.map((mission) => (
              <MissionCard
                key={mission.id}
                mission={mission}
                variant="offer"
                onAccept={() => handleAcceptMission(mission.id)}
              />
            ))
          )}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: spacing.lg,
  },
  section: {
    gap: spacing.md,
  },
});