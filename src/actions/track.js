import { CREATE_TRACK } from './constants';
import { readFile } from '../reducers/helper/read-file';
import { timeInterpret } from '../domain-logic/time-interpret';
import { trackCalculate } from '../domain-logic/track-calculate';

export const createTrack = file => {
  readFile(file).then(result =>
    console.log(timeInterpret(result))
  )

}
