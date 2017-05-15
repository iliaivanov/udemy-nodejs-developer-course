const expect = require('expect');

let {generateMessage, generateLocationMessage} = require('./../utils/message');

describe('generateMessage', () => {
    it('should generenate correct message object', () => {
        let from = 'Ilia';
        let text = 'My new message';
        let generatedMessage = generateMessage(from, text);

        expect(generatedMessage.from).toBe(from);
        expect(generatedMessage.text).toBe(text);

        // or this one...
        // expect(generatedMessage).toInclude({from, text});

        expect(generatedMessage.createdAt).toBeA('number');
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location message', () => {
        let from = 'Petr';
        let latitude = '123';
        let longitude = '456';
        let url = `https://www.google.ee/maps?q=${latitude},${longitude}`;
        let generatedLocationMessage = generateLocationMessage(from, latitude, longitude);

        expect(generatedLocationMessage).toInclude({from, url});
        expect(generatedLocationMessage.createdAt).toBeA('number');
    });
});