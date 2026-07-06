import * as migration_20260706_010716_initial from './20260706_010716_initial';

export const migrations = [
  {
    up: migration_20260706_010716_initial.up,
    down: migration_20260706_010716_initial.down,
    name: '20260706_010716_initial'
  },
];
