import { User } from '../firebase';
import { expect } from 'chai';
import 'mocha';

class UserTest {
    @User() user;
}

describe('Hello function', () => {

    const userTest = new UserTest();

    it('should return hello world', () => {
        const result = userTest.user();
        console.log(result)
        expect(result).to.equal('Hello world!');
    });

});