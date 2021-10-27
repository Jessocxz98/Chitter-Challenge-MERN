const expect = require('chai').expect;

const User = require('../../database/models/user_schema');

describe('User model', () => {
  it('is invalid if no username is provided', () => {
    let user = new User();

    user.validate((error) => {
      expect(error.errors.username).to.exist;
    })
  })
})