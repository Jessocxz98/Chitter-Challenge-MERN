const expect = require('chai').expect;
const Peep = require('../models/peep_model');

describe('Peep model', () => {
  it('should be invalid if no text is provided', () => {
    let peep = new Peep();

    peep.validate((error) => {
      expect(error.errors.text).to.exist;
    })
  })
})