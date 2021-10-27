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
      
      expect(user['username']).to.equal('user1');
    })

    it('cannot contain spaces', () => {
      let user = new User({ username: 'user 1'});

      user.validate((user) => {
        expect(user.errors.username.message).to.equal('Username cannot contain spaces')
      })
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

    it('has to be a unique username', () => {
      new User({ username: 'user1' });

      new User({ username: 'user1' }).validate((user) => {
        expect(user.errors.username.message).to.equal('Error, expected `username` to be unique. Value: `user1`');
      })
    })

    it('has to be unique, regardless of case used', () => {
      new User({ username: 'user1' });

      new User({ username: 'USER1' }).validate((user) => {
        expect(user.errors.username.message).to.equal('Error, expected `username` to be unique. Value: `user1`')
      })
    })
  })

  describe('password', () => {
    it('is invalid if no password provided', () => {
      let user = new User();

      user.validate((user), () => {
        expect(user.errors.password.message).to.equal('Please provide a password');
      })
    })

    it('has a minimum length of 10', () => {
      let user = new User({ password: '1234' })

      user.validate((user) => {
        expect(user.errors.password.message).to.equal('Password must be at least 10 characters');
      })
    })
  })



})