const expect = require('chai').expect;

const User = require('../../database/models/user_schema');

describe('User model', () => {
  describe('username', () => {
    it('is invalid if no username is provided', () => {
      let user = new User();
  
      user.validate((error) => {
        expect(error.errors.username).to.exist;
      })
    })


    it('trims whitespace', () => {
      let user = new User({ username: '   user1  ' });
      expect(user.username).to.equal('user1')
    })
  })



})