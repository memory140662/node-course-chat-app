const expect = require('expect');
const { generateMessage } = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        let from = 'Zhu';
        let text = 'Some message';
        // store res in variable
        let message = generateMessage(from, text);
        // assert from match
        // expect(message.from).toBe(from);
        // assert text match
        // expect(message.text).toBe(text);
        expect(message).toInclude({from, text});
        // assert createAt is number
        expect(message.createAt).toBeA('number');
    });
});