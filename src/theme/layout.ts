import { MS, SCREEN_WIDTH, SH, SW } from '../utils/responsive';

export const spacing = {
  xs: MS(4),
  sm: MS(8),
  md: MS(12),
  lg: MS(16),
  xl: MS(20),
  xxl: MS(24),
};

export const SIMPLE_HEADER_HEIGHT = SH(58);
export const FILTER_HEADER_HEIGHT = SH(100);
export const HEADER_HEIGHT = FILTER_HEADER_HEIGHT;

export const GRID_GAP = MS(12);
export const GRID_COLUMNS = 2;
export const GRID_CARD_WIDTH =
  (SCREEN_WIDTH - spacing.lg * 2 - GRID_GAP) / GRID_COLUMNS;
export const GRID_CARD_HEIGHT = SW(200);
export const GRID_ROW_HEIGHT = GRID_CARD_HEIGHT + GRID_GAP;

export const radius = {
  sm: MS(6),
  md: MS(12),
  lg: MS(20),
  full: MS(999),
};

export const avatar = {
  sm: SW(64),
  md: SW(72),
  lg: SW(200),
};

export const CARD_HEIGHT = MS(88);
export const LIST_ITEM_GAP = MS(12);
export const LIST_ITEM_HEIGHT = CARD_HEIGHT + LIST_ITEM_GAP;
export const EPISODE_ROW_HEIGHT = MS(74);
export const LOCATION_ROW_HEIGHT = MS(86);

export const screenPadding = spacing.lg;

export const RESIDENT_COLUMNS = 3;
export const RESIDENT_COLUMN_GAP = spacing.md;
export const RESIDENT_CARD_WIDTH =
  (SCREEN_WIDTH - screenPadding * 2 - (RESIDENT_COLUMNS - 1) * RESIDENT_COLUMN_GAP) /
  RESIDENT_COLUMNS;

export const MODAL_COLUMNS = 3;
export const MODAL_COLUMN_GAP = spacing.md;
export const MODAL_AVATAR_WIDTH =
  (SCREEN_WIDTH - spacing.xl * 2 - (MODAL_COLUMNS - 1) * MODAL_COLUMN_GAP) /
  MODAL_COLUMNS;


