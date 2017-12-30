
const videoA = {
  id: 'a',
  title: 'Create a GraphQL Schema',
  duration: 120,
  watched: true
}

const videoB = {
  id: 'b',
  title: 'Ember.js CLI',
  duration: 240,
  watched: false
}
const videos = [videoA, videoB]

module.exports = {
  getVideoById: id => new Promise(resolve => {
    const [video] = videos.filter(video => video.id === id)
    resolve(video)
  }),
  getVideos: () => new Promise(resolve => resolve(videos)),
  createVideo: ({ title, duration, released }) => {
    const video = {
      id: Buffer.from(title, 'utf-8').toString('base64'),
      title,
      duration,
      released
    }
    videos.push(video)
    return video
  }
}
