import { StyleSheet } from 'react-native';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { SIMPLE_HEADER_HEIGHT, spacing } from '../../../theme/layout';
import { typography } from '../../../theme/typography';
import { MS } from '../../../utils/responsive';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingTop: SIMPLE_HEADER_HEIGHT + spacing.sm,
    paddingBottom: spacing.xxl,
    flexGrow: 1,
  },
  skeletonList: {
    paddingTop: SIMPLE_HEADER_HEIGHT + spacing.sm,
    paddingBottom: spacing.xxl,
  },
  seasonSectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },
  seasonBadge: {
    alignSelf: 'flex-start',
    marginLeft: spacing.lg,
    marginRight: spacing.md,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderRadius: brutal.badgeRadius,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    shadowColor: colors.black,
    shadowOffset: { width: MS(1.5), height: MS(1.5) },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 2,
  },
  seasonHeader: {
    ...typography.accent,
    fontWeight: 'bold',
  },
  headerLine: {
    flex: 1,
    height: brutal.borderWidth,
    backgroundColor: brutal.borderColor,
  },
  headerLineLeft: {
    marginLeft: spacing.lg,
  },
  headerLineRight: {
    marginRight: spacing.lg,
  },
});
