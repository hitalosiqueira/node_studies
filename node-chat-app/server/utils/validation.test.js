const {isRealString} = require('./validation');

describe('input strings validation', () => {
    test('should reject non string values', () => {
        var res = isRealString(123);
        expect(res).toBe(false);
    });

    test('should reject string with only space', () => {
        var res = isRealString('    ');
        expect(res).toBe(false);
    });

    test('should accept string with correct data', () => {
        var res = isRealString('teste');
        expect(res).toBe(true);
    });
});