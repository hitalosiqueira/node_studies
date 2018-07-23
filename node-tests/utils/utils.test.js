const utils = require('./utils');
const expect = require('expect');

describe('Utils', () => {
    it('should add two numbers', () => {
        var res = utils.add(10, 10);
    
        expect(res).toBe(20).toBeA('number')
    });
    
    it('should square a number', () => {
        var res = utils.pow2(10);
    
        expect(res).toBe(100).toBeA('number')
    });
    
    it('should asyn add two numbers', (done) =>{
        utils.asyncAdd(4 , 3, (sum) => {
            expect(sum).toBe(7).toBeA('number');
            done();
        });
    });
}); 



