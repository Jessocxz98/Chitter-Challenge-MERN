const request = require('supertest');

module.exports.SignupUser = async () => {
  try {
      // Signup user
      let dataToSend = { username: 'user3', password: '01234567890123', email: 'other@email.com' };
      const res = await request('http://localhost:5000/api/users').post('/signup').send(dataToSend);
      const { id, username } = res.body;
      const user = { id, username };
      return user;
  }
  catch (err) {
    console.log(err)
  }
}

module.exports.PostPeep = async (userId) => {
  try {
    let dataToSend = { text: 'Hello', userId: userId };
    const res = await request('http://localhost:5000/api/peeps').post('/').send(dataToSend);
    const peep = res.body
    // console.log(peep)
    return peep;
  }
  catch (err) {
    console.log(err);
  }
}