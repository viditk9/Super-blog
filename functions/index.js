const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

const createNotification = (notification) => {
  return admin.firestore().collection('notifications')
    .add(notification)
    .then((doc) => {
      console.log('noti added !', doc);
    })
}

  exports.projectCreated = functions.firestore
  .document('projects/{projectId}')
  .onCreate(doc => {
    const project = doc.data();
    const notification = {
      content: 'Added a new article',
      user: `${project.authorFirstName} ${project.authorLastName}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
  });

  exports.signedUp = functions.auth.user()
  .onCreate(user => {

    return admin.firestore().collection('users')
      .doc(user.uid).get().then(doc => {

        const newUser = doc.data();
        const notification = {
          content: 'Joined the squad',
          user: `${newUser.firstName} ${newUser.lastName}`,
          time: admin.firestore.FieldValue.serverTimestamp()
        }
        return createNotification(notification);
      })
  })

  exports.projectUpdated = functions.firestore
  .document('projects/{projectId}')
  .onUpdate(doc => {
    const project = doc.after._fieldsProto;
    console.log('this is info ', project);
    const notification = {
      content : ' got updated',
      user: `${project.title.stringValue}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
  })

  exports.projectDeleted = functions.firestore
  .document('projects/{projectId}')
  .onDelete((snap,context) => {
    const project = snap.data();
    console.log('this is info ', project);
    const notification = {
      content : ' got deleted',
      user: `${project.title}`,
      time: admin.firestore.FieldValue.serverTimestamp()
    }
    return createNotification(notification);
  })