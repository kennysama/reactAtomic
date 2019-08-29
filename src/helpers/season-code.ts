import { getSeasonCodeLookup } from '../lookups/season-code';
import { isBefore, isAfter } from 'date-fns/esm';
import { TSeasonCode } from '../types/season-code';
import { ApiError } from '../types/api';
import { getClientMessage } from './message';

export function getSeasonCode(currentDate: Date): TSeasonCode {
  const currentSeason = getSeasonCodeLookup().filter(
    season => isBefore(season.dateTo, currentDate) && isAfter(season.dateFrom, currentDate),
  );

  if (currentSeason.length !== 1) {
    const message = getClientMessage('err', '0002', [`${currentSeason.length}`, `${currentDate}`]);
    throw new ApiError([message]);
  }

  return currentSeason[0].seasonCode;
}
