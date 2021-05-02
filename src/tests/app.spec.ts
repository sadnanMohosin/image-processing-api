const request = require('request');
require('../index.ts');
require('../modify.ts');

describe('server', () => {
  describe('GET /', () => {
    const data = {
      status: 200,
      body: 'Image',
    };
    beforeAll((done) => {
      request.get('http://localhost:200/', (error, response, body) => {
        data.status = response.statusCode;
        data.body = body;
        done();
      });
    });
    it('gets the api endpoint', () => {
      expect(data.status).toBe(200);
    });
    it('gets if image doest not exist', () => {
      expect(data.body).toBe('<h1>Image does not Exist</h1>');
    });
  });
  describe('GET /', () => {
    const data = {
      status: 200,
      body: 'Image',
    };
    beforeAll((done) => {
      request.get(
        'http://localhost:200/?name=fjord.jpg&format=jpg&width=600&height=300',
        (error, response, body) => {
          data.status = response.statusCode;
          data.body = body;
          done();
        }
      );
    });
    it('status 200', () => {
      expect(data.status).toBe(200);
    });
    it('gets the resized image', () => {
      expect(typeof data.body).toEqual('string');
    });
  });
});
