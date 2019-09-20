import axios from 'axios';
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStatusInformation, defaultValue } from 'app/shared/model/status-information.model';

export const ACTION_TYPES = {
  FETCH_STATUSINFORMATION_LIST: 'statusInformation/FETCH_STATUSINFORMATION_LIST',
  FETCH_STATUSINFORMATION: 'statusInformation/FETCH_STATUSINFORMATION',
  CREATE_STATUSINFORMATION: 'statusInformation/CREATE_STATUSINFORMATION',
  UPDATE_STATUSINFORMATION: 'statusInformation/UPDATE_STATUSINFORMATION',
  DELETE_STATUSINFORMATION: 'statusInformation/DELETE_STATUSINFORMATION',
  RESET: 'statusInformation/RESET'
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IStatusInformation>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false
};

export type StatusInformationState = Readonly<typeof initialState>;

// Reducer

export default (state: StatusInformationState = initialState, action): StatusInformationState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_STATUSINFORMATION_LIST):
    case REQUEST(ACTION_TYPES.FETCH_STATUSINFORMATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true
      };
    case REQUEST(ACTION_TYPES.CREATE_STATUSINFORMATION):
    case REQUEST(ACTION_TYPES.UPDATE_STATUSINFORMATION):
    case REQUEST(ACTION_TYPES.DELETE_STATUSINFORMATION):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true
      };
    case FAILURE(ACTION_TYPES.FETCH_STATUSINFORMATION_LIST):
    case FAILURE(ACTION_TYPES.FETCH_STATUSINFORMATION):
    case FAILURE(ACTION_TYPES.CREATE_STATUSINFORMATION):
    case FAILURE(ACTION_TYPES.UPDATE_STATUSINFORMATION):
    case FAILURE(ACTION_TYPES.DELETE_STATUSINFORMATION):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSINFORMATION_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.FETCH_STATUSINFORMATION):
      return {
        ...state,
        loading: false,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.CREATE_STATUSINFORMATION):
    case SUCCESS(ACTION_TYPES.UPDATE_STATUSINFORMATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data
      };
    case SUCCESS(ACTION_TYPES.DELETE_STATUSINFORMATION):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {}
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

const apiUrl = 'api/status-informations';

// Actions

export const getEntities: ICrudGetAllAction<IStatusInformation> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_STATUSINFORMATION_LIST,
  payload: axios.get<IStatusInformation>(`${apiUrl}?cacheBuster=${new Date().getTime()}`)
});

export const getEntity: ICrudGetAction<IStatusInformation> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_STATUSINFORMATION,
    payload: axios.get<IStatusInformation>(requestUrl)
  };
};

export const createEntity: ICrudPutAction<IStatusInformation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_STATUSINFORMATION,
    payload: axios.post(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IStatusInformation> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_STATUSINFORMATION,
    payload: axios.put(apiUrl, cleanEntity(entity))
  });
  dispatch(getEntities());
  return result;
};

export const deleteEntity: ICrudDeleteAction<IStatusInformation> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_STATUSINFORMATION,
    payload: axios.delete(requestUrl)
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET
});
