import React, { useCallback, useEffect, useState } from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from '../../../store/index';
import {
  clearFilters,
  setGender,
  setStatus,
} from '../../../store/slices/filtersSlice';
import type { CharacterGender, CharacterStatus } from '../../../types/api';
import { styles } from './CharacterFiltersModal.styles';

const STATUS_OPTIONS: Array<CharacterStatus | ''> = [
  '',
  'Alive',
  'Dead',
  'unknown',
];
const GENDER_OPTIONS: Array<CharacterGender | ''> = [
  '',
  'Female',
  'Male',
  'Genderless',
  'unknown',
];

interface CharacterFiltersModalProps {
  visible: boolean;
  onClose: () => void;
}

/**
 * CharacterFiltersModal Component
 * Renders a bottom-sheet slide-up modal that allows filtering characters by status and gender.
 * Integrates with Redux store to manage and apply selected filters.
 * 
 * @param {CharacterFiltersModalProps} props - The component props.
 * @param {boolean} props.visible - Controls the visibility of the modal.
 * @param {() => void} props.onClose - Callback triggered when closing the modal.
 */
export function CharacterFiltersModal({
  visible,
  onClose,
}: CharacterFiltersModalProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { status, gender } = useSelector((state: RootState) => state.filters);
  const [draftStatus, setDraftStatus] = useState(status);
  const [draftGender, setDraftGender] = useState(gender);

  useEffect(() => {
    if (visible) {
      setDraftStatus(status);
      setDraftGender(gender);
    }
  }, [visible, status, gender]);

  const handleApply = useCallback(() => {
    dispatch(setStatus(draftStatus));
    dispatch(setGender(draftGender));
    onClose();
  }, [dispatch, draftGender, draftStatus, onClose]);

  const handleClear = useCallback(() => {
    setDraftStatus('');
    setDraftGender('');
    dispatch(clearFilters());
    onClose();
  }, [dispatch, onClose]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <TouchableOpacity
          style={styles.backdropTap}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.shadow} />
        <View style={styles.card}>
          <Text style={styles.title}>Filters</Text>

          <Text style={styles.sectionLabel}>Status</Text>
          <View style={styles.optionRow}>
            {STATUS_OPTIONS.filter(option => option !== '').map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionPill,
                  draftStatus === option && styles.optionPillActive,
                ]}
                onPress={() =>
                  setDraftStatus(draftStatus === option ? '' : option)
                }>
                <Text
                  style={[
                    styles.optionLabel,
                    draftStatus === option && styles.optionLabelActive,
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={styles.sectionLabel}>Gender</Text>
          <View style={styles.optionRow}>
            {GENDER_OPTIONS.filter(option => option !== '').map(option => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionPill,
                  draftGender === option && styles.optionPillActive,
                ]}
                onPress={() =>
                  setDraftGender(draftGender === option ? '' : option)
                }>
                <Text
                  style={[
                    styles.optionLabel,
                    draftGender === option && styles.optionLabelActive,
                  ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.actions}>
            <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
              <Text style={styles.clearLabel}>Clear all</Text>
            </TouchableOpacity>
            <View style={styles.applyWrap}>
              <View style={styles.applyShadow} />
              <TouchableOpacity style={styles.applyButton} onPress={handleApply}>
                <Text style={styles.applyLabel}>Apply</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}
