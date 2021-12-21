import moment from 'moment';
import { types } from '../types/types';

const initialState = {
    events: [{
        title: 'cumpleaños me',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Ir de albercada',
        user: {
            _id: '123',
            name: 'Katy'
        }
    }],
    activeEvent: null
};

export const calendarReducer = ( state = initialState, action ) => {
    
    switch (action.type) {

        case types.eventSetActive:
            return{
                ...state,
                activeEvent: action.payload
            }
        case types.eventAddNew:
            return{
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }
        case types.eventClearActiveEvent:
            return{
                ...state,
                activeEvent: null
            }

        default:
            return state;
    }
}