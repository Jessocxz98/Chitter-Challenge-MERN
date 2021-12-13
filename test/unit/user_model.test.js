const expect = require('chai').expect;

const User = require('../../database/models/User');

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

    it('has a maximum length of 15 characters', () => {
      let user = new User({ username: 'areallylongnameisnotok' })

      user.validate((user) => {
        expect(user.errors.username.message).to.equal('Username must not have more than 15 characters');
      })
    })

    it('has to be a unique username', () => {
      new User({ username: 'user1' });

      new User({ username: 'user1' }).validate((user) => {
        expect(user.errors.username.message).to.equal("`user1` is not unique. Please provide a unique username");
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

    it('has a minimum length of 8', () => {
      let user = new User({ password: '1234' });

      user.validate((user) => {
        expect(user.errors.password.message).to.equal('Password must be at least 8 characters');
      })
    })
  })

  describe('email', () => {
    it('is invalid if no email is provided', () => {
      let user = new User();

      user.validate((user) => {
        expect(user.errors.email.message).to.equal('Please provide an email');
      })
    })

    it('must provide a valid email', () => {
      let user = new User({ email: '1' });

      user.validate((user) => {
        expect(user.errors.email.message).to.equal('Please provide a valid email')
      })
    })

    it('throws error if email contains spaces', () => {
      let user = new User({ email: 'fake @ email . com' });

      user.validate((user) => {
        expect(user.errors.email.message).to.equal('Please provide a valid email')
      })
    })

    it('trims whitespace', () => {
      let user = new User({ email: '  fake@email.com  ' });

      expect(user['email']).to.equal('fake@email.com');
    })
  })
})