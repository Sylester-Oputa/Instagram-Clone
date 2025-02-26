import {firebase} from '../lib/firebase'

// , FieldValue

export async function doesUsernameExist(username) {
   const result = await firebase
   .firestore()
   .collection('users')
   .where('username', '==', username)
   .get();
   return result.docs.map((user) => user.data().length > 0);
}

export async function getUserByUserId(userId) {
   const result = await firebase
   .firestore()
   .collection('users')
   .where('userId', '==', userId)
   .get();
   const user = result.docs.map((item) => ({
      ...item.data(),
      docId: item.id
   }))
   return user;
}

export async function getSuggestedProfiles(userId) {
   const result = await firebase
   .firestore()
   .collection('users')
   .limit(10).get();
   return result;
}