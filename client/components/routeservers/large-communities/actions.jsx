
export const LOAD_REJECT_REASONS_REQUEST = '@birdseye/LOAD_REJECT_REASONS_REQUEST';
export const LOAD_REJECT_REASONS_SUCCESS = '@birdseye/LOAD_REJECT_REASONS_SUCCESS';

export const LOAD_NOEXPORT_REASONS_REQUEST = '@birdseye/LOAD_NOEXPORT_REASONS_REQUEST';
export const LOAD_NOEXPORT_REASONS_SUCCESS = '@birdseye/LOAD_NOEXPORT_REASONS_SUCCESS';



export function loadNoExportReasonsSuccess(reasons) {
  return {
    type: LOAD_REJECT_REASONS_SUCCESS,
    payload: {
       noexport_reasons: reasons
    }
  };
}


