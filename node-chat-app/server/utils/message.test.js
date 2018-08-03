const {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
    test('should generate correct message object', () => {
        var message = generateMessage('hitalo', 'hello world');
        
        expect(message).toBeDefined();
        expect(message.from).toBe('hitalo');
        expect(message.text).toBe('hello world');
        expect(message.createdAt).toBeDefined();
    });
});

describe('generate location message', () => {
    test('should generate correct location message object', () => {
        var message = generateLocationMessage('hitalo', 0, 0);
        
        expect(message).toBeDefined();
        expect(message.from).toBe('hitalo');
        expect(message.url).toBe('https://www.google.com/maps?q=0,0');
        expect(message.createdAt).toBeDefined();
    });
});