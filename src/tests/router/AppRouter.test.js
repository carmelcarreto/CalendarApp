import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import '@testing-library/jest-dom';

import { AppRouter } from '../../router/AppRouter';

const middleware = [thunk];
const mockStore = configureStore(middleware);

//store.dispatch = jest.fn();

describe(`Pruebas en <AppRouter />`, () => {
    
    test(`debe de mostrar el espere...`, () => {

        const initState = {
            auth: {
                checking: true
            }
        };
        const store = mockStore( initState);
        
        const wrapper = mount(
            <Provider store = {store} >
                <AppRouter /> 
            </Provider>
        );
        
        //expect( wrapper ).toMatchSnapshot();
        expect( wrapper.find('h5').exists() ).toBe(true);
    });
});