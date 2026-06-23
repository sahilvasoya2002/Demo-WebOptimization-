import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { RemoteImage } from '../../../components/RemoteImage';
import { AppIcon } from '../../../components/AppIcon';
import { colors, formatStatusLabel, statusColor } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { avatar, spacing } from '../../../theme/layout';
import { sizes, typography, weights } from '../../../theme/typography';
import { MS, SH } from '../../../utils/responsive';
import type { CharacterCardData } from './CharacterCard';

interface CharacterInfoModalProps {
  visible: boolean;
  character: CharacterCardData;
  onClose: () => void;
}

export function CharacterInfoModal({
  visible,
  character,
  onClose,
}: CharacterInfoModalProps) {
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={styles.backdropTap}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.shadow} />
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
            accessibilityLabel="Close"
            accessibilityRole="button"
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <AppIcon name="close" size={MS(20)} color={colors.text} />
          </TouchableOpacity>

          <View style={styles.header}>
            <RemoteImage uri={character.image} style={styles.avatar} />
            <View style={styles.headerMeta}>
              <Text style={styles.name}>{character.name}</Text>
              <View style={styles.statusRow}>
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: statusColor(character.status) },
                  ]}
                />
                <Text style={styles.statusText}>
                  {formatStatusLabel(character.status)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Species</Text>
            <Text style={styles.fieldValue}>{character.species}</Text>
          </View>
          <View style={[styles.field, styles.fieldLast]}>
            <Text style={styles.fieldLabel}>Last known location</Text>
            <Text style={styles.fieldValue}>{character.location}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  backdropTap: {
    flex: 1,
  },
  shadow: {
    position: 'absolute',
    bottom: 0,
    left: brutal.shadowOffset,
    right: -brutal.shadowOffset,
    height: SH(260),
    backgroundColor: brutal.borderColor,
    borderTopLeftRadius: brutal.radius,
    borderTopRightRadius: brutal.radius,
  },
  card: {
    backgroundColor: colors.card,
    borderTopLeftRadius: brutal.radius,
    borderTopRightRadius: brutal.radius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    borderBottomWidth: 0,
    padding: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  closeButton: {
    position: 'absolute',
    top: spacing.md,
    right: spacing.md,
    zIndex: 1,
    width: MS(32),
    height: MS(32),
    borderRadius: MS(16),
    backgroundColor: colors.surface,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
    paddingRight: spacing.xxl,
  },
  avatar: {
    width: avatar.sm,
    height: avatar.sm,
    borderRadius: brutal.badgeRadius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    backgroundColor: colors.border,
    marginRight: spacing.md,
  },
  headerMeta: {
    flex: 1,
  },
  name: {
    ...typography.cardTitle,
    marginBottom: spacing.xs,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: MS(8),
    height: MS(8),
    borderRadius: MS(4),
    marginRight: spacing.sm,
  },
  statusText: {
    fontSize: sizes.sm,
    fontWeight: weights.semibold,
    color: colors.text,
  },
  field: {
    paddingVertical: spacing.md,
    borderBottomWidth: brutal.borderWidth,
    borderBottomColor: colors.border,
  },
  fieldLast: {
    borderBottomWidth: 0,
    paddingBottom: spacing.sm,
  },
  fieldLabel: {
    ...typography.label,
    marginBottom: MS(4),
  },
  fieldValue: {
    ...typography.bodyMedium,
  },
});
