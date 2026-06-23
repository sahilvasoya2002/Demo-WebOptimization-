import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BrutalBox } from '../../../components/BrutalBox';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { EPISODE_ROW_HEIGHT, spacing } from '../../../theme/layout';
import { typography } from '../../../theme/typography';
import { MS, SW } from '../../../utils/responsive';
import { getSeasonTheme } from '../../../utils/url';

interface EpisodeRowProps {
  episodeCode: string;
  name: string;
  airDate: string;
  onPress: () => void;
}

/**
 * Renders an episode row displaying its code, name, and air date.
 */
function EpisodeRowComponent({
  episodeCode,
  name,
  airDate,
  onPress,
}: EpisodeRowProps) {
  const season = episodeCode.slice(0, 3);
  const theme = React.useMemo(() => {
    return getSeasonTheme(season);
  }, [season]);

  return (
    <BrutalBox
      style={styles.episodeRowWrap}
      contentStyle={styles.episodeRow}
      onPress={onPress}>
      <View style={[styles.episodeCodeBadge, { backgroundColor: theme.bg }]}>
        <Text style={[styles.episodeCode, { color: theme.color }]}>{episodeCode}</Text>
      </View>
      <View style={styles.episodeMeta}>
        <Text style={styles.episodeName} numberOfLines={1}>
          {name}
        </Text>
        <Text style={styles.episodeAirDate}>{airDate}</Text>
      </View>
    </BrutalBox>
  );
}

export const EpisodeRow = React.memo(EpisodeRowComponent);

const styles = StyleSheet.create({
  episodeRowWrap: {
    marginHorizontal: spacing.lg,
    marginBottom: MS(10),
  },
  episodeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    minHeight: EPISODE_ROW_HEIGHT,
  },
  episodeCodeBadge: {
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: brutal.badgeRadius,
    marginRight: spacing.md,
    minWidth: SW(56),
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: { width: MS(1.5), height: MS(1.5) },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  episodeCode: {
    ...typography.accent,
    fontSize: MS(12),
    fontWeight: 'bold',
  },
  episodeMeta: {
    flex: 1,
  },
  episodeName: {
    ...typography.rowTitle,
    marginBottom: 2,
  },
  episodeAirDate: typography.caption,
});
