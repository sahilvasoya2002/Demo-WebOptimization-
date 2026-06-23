import { open } from '@op-engineering/op-sqlite';
import type { FavouriteRow } from '../types/api';

const db = open({ name: 'demoapp.db' });

let initialized = false;

export function initDB(): void {
  if (initialized) {
    return;
  }
  db.executeSync(`
    CREATE TABLE IF NOT EXISTS favourites (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      status TEXT NOT NULL,
      species TEXT NOT NULL,
      image TEXT NOT NULL,
      location TEXT NOT NULL
    );
  `);
  initialized = true;
}

function rowToFavourite(row: Record<string, string | number | boolean | null>): FavouriteRow {
  return {
    id: Number(row.id),
    name: String(row.name),
    status: String(row.status) as FavouriteRow['status'],
    species: String(row.species),
    image: String(row.image),
    location: String(row.location),
  };
}

export function getFavourites(): FavouriteRow[] {
  const result = db.executeSync('SELECT * FROM favourites ORDER BY name ASC;');
  return (result.rows ?? []).map(row =>
    rowToFavourite(row as Record<string, string | number | boolean | null>),
  );
}

export function addFavourite(item: FavouriteRow): void {
  db.executeSync(
    'INSERT OR REPLACE INTO favourites (id, name, status, species, image, location) VALUES (?, ?, ?, ?, ?, ?);',
    [item.id, item.name, item.status, item.species, item.image, item.location],
  );
}

export function removeFavourite(id: number): void {
  db.executeSync('DELETE FROM favourites WHERE id = ?;', [id]);
}
