const expect = require('expect');

let {generateMessage} = require('./../utils/message');

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