const expect = require('chai').expect;

const Peep = require('../../database/models/Peep');

describe('Peep model', () => {
  it('is invalid if no text is provided', () => {
    let peep = new Peep();
    peep.validate((error) => {
      expect(error.errors.text).to.exist;
    })
  })

  it('stores text in the peep', () => {
    let peep = new Peep({ text: 'Test 1' });
    expect(peep.text).to.equal('Test 1')
  })

  it('is expected to have a user associated with the peep', () => {
    let peep = new Peep({ text: 'My first peep', userId: 'User1'})
    expect(peep.userId).to.equal('User1')
  })
})