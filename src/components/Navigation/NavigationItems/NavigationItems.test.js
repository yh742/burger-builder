import React from 'react';

// shallow only render one level, don't render sub-tree 
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

// this is used for console output
describe('<NavigationItems />',
    () => {
        let wrapper;
        beforeEach(()=>{
            wrapper = shallow(<NavigationItems />);
        });

        // not authenticated test
        it('should render two <NavigationItem /> elements if not authenticated',
            () => {
                expect(wrapper.find(NavigationItem)).toHaveLength(2);
            }
        );

        // authenticated test
        it('should render three <NavigationItem /> elements if authenticated',
        () => {
            // this sets the property used by the wrapper
            wrapper.setProps({isAuthenticated: true});
            expect(wrapper.find(NavigationItem)).toHaveLength(3);
        });

        // NavigationItem
        it('should contain logout NavigationItem if authenticated',
        () => {
            // this sets the property used by the wrapper
            wrapper.setProps({isAuthenticated: true});
            expect(wrapper.contains(<NavigationItem exact link='/logout'>Logout</NavigationItem>));
        });
    }
);


 
