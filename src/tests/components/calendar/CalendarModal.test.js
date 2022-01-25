import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import moment from 'moment';

import '@testing-library/jest-dom';

import { CalendarModal } from '../../../components/calendar/CalendarModal';

/*jest.mock('../../../actions/events', () => ({
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn()
}));*/


const middleware = [thunk];
const mockStore = configureStore(middleware);

const now = moment().minutes(0).seconds(0).add(1, 'hours');//11:04:00
const nowPlusOne = now.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: now.toDate(),
    and: nowPlusOne.toDate()
}

const initState = {
    calendar: {
        events: [],
        activeEvent: {
            title: 'Hola mundo',
            notes: 'Algunas notas',
            start: now.toDate(),
            and: nowPlusOne.toDate()
        }
    },
    auth: {
        uid: '123',
        name: 'Katy'
    },
    ui: {
        modalOpen: true
    }
};

const store = mockStore( initState);
store.dispatch = jest.fn();

const wrapper = mount(
    <Provider store = {store} >
        <CalendarModal /> 
    </Provider>
)

describe(`Pruebas en <CalendarModal />`, () => {
    
    test(`debe de mostrar el modal`, () => {
        expect( wrapper.find('Modal').prop('isOpen') ).toBe(true);
    
    });
});