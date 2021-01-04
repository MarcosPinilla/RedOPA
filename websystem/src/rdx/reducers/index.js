import { combineReducers } from 'redux';
import InstitutionReducer from './institutionReducer';

export default combineReducers({
    institutionId: InstitutionReducer
});