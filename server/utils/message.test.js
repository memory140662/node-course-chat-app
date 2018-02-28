const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

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


describe('generateLocationMessage', () => {
    it('should generate correct location message object', () => {
        let from = 'Gui';
        let latitude = '24';
        let longitude = '121';
        let locationMessae = generateLocationMessage(from, latitude, longitude);

        expect(locationMessae).toInclude({
            from,
            url: `https://www.google.com/maps?q=${latitude},${longitude}`
        });

        expect(locationMessae.createAt).toBeA('number');
    });
});