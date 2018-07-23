const request = require('supertest');
const expect = require('expect');

var app = require('./server').app;

describe('Server', () => {
    it('should return hello world responde', (done) => {
        request(app)
            .get('/')
            .expect(200)
            .expect("Hello World!")
            .expect((res) => {
                expect(res.body).toBe().toBeA("string")
            })
            .end(done)
    });
});
