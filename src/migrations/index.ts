import * as migration_20261110_110649_ilk_kurulum from './20261110_110649_ilk_kurulum';

export const migrations = [
  {
    up: migration_20261110_110649_ilk_kurulum.up,
    down: migration_20261110_110649_ilk_kurulum.down,
    name: '20261110_110649_ilk_kurulum'
  },
];
