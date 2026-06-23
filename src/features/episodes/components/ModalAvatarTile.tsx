import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RemoteImage } from '../../../components/RemoteImage';
import { colors } from '../../../theme/colors';
import { brutal } from '../../../theme/brutal';
import { avatar, MODAL_AVATAR_WIDTH } from '../../../theme/layout';
import { sizes, weights } from '../../../theme/typography';
import { MS } from '../../../utils/responsive';
import type { Character } from '../../../types/api';

interface ModalAvatarTileProps {
  item: Character;
}

/**
 * Avatar item cell inside the episode character roster modal.
 */
export function ModalAvatarTile({ item }: ModalAvatarTileProps) {
  return (
    <View style={styles.modalAvatarWrap}>
      <RemoteImage uri={item.image} style={styles.modalAvatar} />
      <Text style={styles.modalAvatarName} numberOfLines={1}>
        {item.name}
      </Text>
    </View>
  );
}

const modalAvatarSize = avatar.sm;

const styles = StyleSheet.create({
  modalAvatarWrap: {
    width: MODAL_AVATAR_WIDTH,
    alignItems: 'center',
  },
  modalAvatar: {
    width: modalAvatarSize,
    height: modalAvatarSize,
    borderRadius: brutal.badgeRadius,
    borderWidth: brutal.borderWidth,
    borderColor: brutal.borderColor,
    backgroundColor: colors.border,
    marginBottom: MS(6),
  },
  modalAvatarName: {
    fontSize: sizes.xxs,
    fontWeight: weights.semibold,
    color: colors.text,
    textAlign: 'center',
  },
});
