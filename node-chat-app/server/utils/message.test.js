const {generateMessage} = require('./message');

describe('generate message', () => {
    test('should generate correct message object', () => {
        var message = generateMessage('hitalo', 'hello world');
        
        expect(message).toBeDefined();
        expect(message.from).toBe('hitalo');
        expect(message.text).toBe('hello world');
        expect(message.createdAt).toBeDefined();
    });
});