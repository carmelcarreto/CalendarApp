import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import moment from 'moment';

import '@testing-library/jest-dom';

import { CalendarModal } from '../../../components/calendar/CalendarModal';
import { eventStartUpdated, eventClearActiveEvent } from '../../../actions/events';


jest.mock('../../../actions/events', () => ({
    eventStartUpdated: jest.fn(),
    eventClearActiveEvent: jest.fn(),
}))

const middlewares = [ thunk ];
const mockStore = configureStore( middlewares );

const now = moment().minutes(0).seconds(0).add(1,'hours'); // 3:00:00
const nowPlusOne = now.clone().add(1, 'hours');

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola Mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            end: nowPlusOne.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'katy'
    },
    ui: {
        modalOpen: true
    }
};

const store = mockStore( initState );
store.dispatch = jest.fn();


const wrapper = mount(
    <Provider store={ store } >
        <CalendarModal />
    </Provider>
);


describe('Pruebas en <CalendarModal />', () => {

    beforeEach(() => {
        jest.clearAllMocks();
    })

    
    test('debe de mostrar el modal', () => {
        
        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);

    });

    test('debe de llamar la acción de actualizar y cerrar modal', () => {
        
        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( eventStartUpdated ).toHaveBeenCalledWith( initState.calendar.activeEvent );
        expect( eventClearActiveEvent ).toHaveBeenCalled();

    });

    test('debe de mostrar error si falta el titulo', () => {

        wrapper.find('form').simulate('submit', {
            preventDefault(){}
        });

        expect( wrapper.find('input[name="title"]').hasClass('is-invalid') ).toBe(true);
        
    });

    
});