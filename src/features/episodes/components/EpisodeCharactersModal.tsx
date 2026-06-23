import React, { useCallback } from 'react';
import {
  FlatList,
  ListRenderItem,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import {
  spacing,
  MODAL_COLUMNS,
} from '../../../theme/layout';
import { sizes, typography } from '../../../theme/typography';
import type { Character } from '../../../types/api';
import { MS, SH } from '../../../utils/responsive';
import { AppIcon } from '../../../components/AppIcon';
import { SkeletonModalAvatar } from '../../../components/skeleton/SkeletonModalAvatar';
import { SkeletonPulse } from '../../../components/skeleton/SkeletonPulse';
import { useEpisode } from '../hooks/useEpisodes';
import { useResidents } from '../../locations/hooks/useResidents';
import { ModalAvatarTile } from './ModalAvatarTile';

interface EpisodeCharactersModalProps {
  episodeId: number | null;
  onClose: () => void;
}

/**
 * Bottom-sheet modal displaying character avatars for a specific episode.
 */
export function EpisodeCharactersModal({
  episodeId,
  onClose,
}: EpisodeCharactersModalProps) {
  const { data: episode, isLoading: episodeLoading } = useEpisode(episodeId);
  const residentQueries = useResidents(episode?.characters ?? []);
  const charactersLoading = episodeLoading || residentQueries.some(query => query.isLoading);
  const characters = residentQueries
    .map(query => query.data)
    .filter((character): character is Character => character !== undefined);

  const renderAvatar: ListRenderItem<Character> = useCallback(
    ({ item }) => <ModalAvatarTile item={item} />,
    [],
  );

  const avatarKeyExtractor = useCallback(
    (item: Character) => String(item.id),
    [],
  );

  return (
    <Modal visible={episodeId !== null} animationType="slide" transparent>
      <View style={styles.modalBackdrop}>
        <View style={styles.modalShadow} />
        <View style={styles.modalCard}>
          <View style={styles.modalHeader}>
            {charactersLoading ? (
              <SkeletonPulse style={styles.modalTitleSkeletonWrap}>
                <View style={styles.modalTitleSkeleton} />
              </SkeletonPulse>
            ) : (
              <Text style={styles.modalTitle} numberOfLines={1}>
                {episode?.name}
              </Text>
            )}
            <TouchableOpacity
              style={styles.closeIconButton}
              onPress={onClose}
              accessibilityLabel="Close modal"
              accessibilityRole="button"
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
              <AppIcon name="close-outline" size={MS(20)} color={colors.text} />
            </TouchableOpacity>
          </View>
          {charactersLoading ? (
            <View style={styles.listContainer}>
              {Array.from({ length: 3 }).map((_, rowIndex) => (
                <View key={`skeleton-row-${rowIndex}`} style={styles.avatarRow}>
                  {Array.from({ length: MODAL_COLUMNS }).map((__, colIndex) => (
                    <SkeletonModalAvatar key={`skeleton-${rowIndex}-${colIndex}`} />
                  ))}
                </View>
              ))}
            </View>
          ) : (
            <FlatList
              data={characters}
              renderItem={renderAvatar}
              keyExtractor={avatarKeyExtractor}
              numColumns={MODAL_COLUMNS}
              columnWrapperStyle={styles.avatarRow}
              contentContainerStyle={styles.modalAvatarList}
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              style={styles.listContainer}
            />
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  modalShadow: {
    position: 'absolute',
    bottom: 0,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    height: SH(480),
    backgroundColor: brutal.borderColor,
    borderTopLeftRadius: brutal.radius,
    borderTopRightRadius: brutal.radius,
  },
  modalCard: {
    backgroundColor: colors.card,
    borderTopLeftRadius: brutal.radius,
    borderTopRightRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderBottomWidth: 0,
    padding: spacing.xl,
    height: SH(460),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    ...typography.rowTitle,
    fontSize: sizes.xl,
    flex: 1,
    marginRight: spacing.md,
    marginBottom: 0,
  },
  modalTitleSkeletonWrap: {
    flex: 1,
    marginRight: spacing.md,
  },
  modalTitleSkeleton: {
    width: '80%',
    height: MS(20),
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.border,
  },
  closeIconButton: {
    width: MS(28),
    height: MS(28),
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderRadius: brutal.badgeRadius,
    backgroundColor: colors.accentSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listContainer: {
    flex: 1,
    marginBottom: spacing.sm,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  modalAvatarList: {
    paddingBottom: spacing.lg,
  },
});
