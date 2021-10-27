const expect = require('chai').expect;

const User = require('../../database/models/user_schema');

describe('User model', () => {
  describe('username', () => {
    it('is invalid if no username is provided', () => {
      let user = new User();

      user.validate((user) => {
        expect(user.errors.username.message).to.equal('Please provide a Username');
      })
    })

    it('trims whitespace', () => {
      let user = new User({ username: '   user1  ' });

      expect(user.username).to.equal('user1')
    })

    it('has a minimum length of 4 characters', () => {
      let user = new User({ username: 'bob' })

      user.validate((user) => {
        expect(user.errors.username.message).to.equal('Username must be at least 4 characters');
      })
    })

    it('has a maximum length of 15 charaters', () => {
      let user = new User({ username: 'areallylongnameisnotok' })

      user.validate((user) => {
        expect(user.errors.username.message).to.equal('Username must not have more than 15 charaters');
      })
    })
  })



})