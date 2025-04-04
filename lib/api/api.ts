import { GamesApi } from '@/lib/api/GamesApi';
import { EventApi } from '@/lib/api/EventApi';
import { GamerApi } from '@/lib/api/GamerApi';

import { GamesApi as MockGamesApi } from '@/test/mocks/api/GamesApi';
import { EventApi as MockEventApi } from '@/test/mocks/api/EventApi';
import { GamerApi as MockGamerApi } from '@/test/mocks/api/GamerApi';

import { isTestEnvironment } from '@/lib/util/test';
import { type ApiType } from './types';

enum ApiEnum {
  Test,
  Production,
}

function ApiFactory(type: ApiEnum): ApiType {
  if (type === ApiEnum.Test) {
    console.log('test environment, using mock api');
    return { games: MockGamesApi, event: MockEventApi, gamer: MockGamerApi };
  }

  return { games: GamesApi, event: EventApi, gamer: GamerApi };
}

const Api = ApiFactory(isTestEnvironment() ? ApiEnum.Test : ApiEnum.Production);

export default Api;
