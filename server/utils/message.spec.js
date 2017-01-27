var expect = require('expect');
var {generateMessage} = require('./message');


describe('generateMessage',()=>{
    it('Should generate correct message block',()=>{
        var from ='vittal288@gmail.com';
        var text = 'Hi, there';
        var res = generateMessage(from,text);
        expect(res.from).toBe(from);
        expect(res.text).toBe(text);
        expect(res.createdAt).toBeA('number');

        expect(res).toInclude({from,text})
    });
});