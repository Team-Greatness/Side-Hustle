const expect = require('expect');
const React = require('react');
const sinon = require('sinon');
import viewJob from '../../components/viewJob';
import { shallow, mount } from 'enzyme';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.

describe('React unit tests', () => {
  describe('<Square />', () => {
    let wrapper;
    let onButtonClick;

    before(() => {
      onButtonClick = sinon.spy();
      wrapper = shallow(<Square row={0} square={1} letter="X" handleClick={ onButtonClick } />);
    });

    it('Renders a <div> with class "square"', () => {
      expect(wrapper.text()).toEqual('X');
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.props().className).toEqual('square');
    });

    it('Clicking on the square passes row and square props to handleClick', () => {
      wrapper.simulate('click');
      expect(onButtonClick.calledOnce).toBe(true);
      expect(onButtonClick.args[0]).toEqual([0, 1]);
    });
  });

  describe('<Row />', () => {
    // TODO: Write a test to make sure a Row renders 3 Squares
    it('Row should render three squares', () => {
      const wrapper = mount(<Row />);
      // console.log(wrapper.children())
      // expect(wrapper.children()).to.have.length(items.length);
    });
  });

  describe('GameList', () => {
    // TODO: Write a test to make sure a GameList renders a <ul> with an <li>
    // for every item in its gameList array prop

  });
});
