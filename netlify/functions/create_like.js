// Goal: Provide a function to "like" a post in Firebase
// Requirement: "Likes" are user-specific – a user can "like" a post, but only once.
// Currently, the "number of likes" on a post isn't user-specific, nor does it prevent an
// unlimited number of likes. How would we expand/refactor our domain model to support this?

// allows us to use firebase
let firebase = require(`./firebase`)

exports.handler = async function(event) {

  // write the recipe and the implementation
  // get the three querystring parameters and store in memory
  let postId = event.queryStringParameters.postId
  let userId = event.queryStringParameters.userId

  // establish a connection to firebase in memory
  let db = firebase.firestore()

  // add a like and wait for it to return

  let existingLikes = await db.collection(`likes`).where(`postId`, `==`, `${postId}`).where(`userId`, `==`, `${userId}`).get()
  
  if(existingLikes.size == 0){

  // create a new post, wait for it to return
  await db.collection(`likes`).add({
    postId: postId,
    userId: userId,
    numberOfLikes: 0,
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
}

  return {
    statusCode: 200
  }
}