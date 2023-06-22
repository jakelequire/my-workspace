// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';

// // Initialize Firebase
// const firebaseConfig = {
//   // your config here
// };
// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const db = firebase.firestore();

// // Get the current user's ID
// const userId = firebase.auth().currentUser.uid;

// // Create a new to-do list
// const todoList = {
//   name: "Grocery Shopping",
//   description: "Buy milk and eggs",
//   notifications: 0,
//   color: "#ff0000",
//   items: [
//     {
//       name: "Buy milk",
//       description: "",
//       important: false,
//       status: "pending",
//       dueDate: "2023-06-22",
//       dueTime: "10:00",
//       reminders: [
//         {
//           time: "09:00",
//           date: "2023-06-22"
//         }
//       ]
//     },
//     // More items...
//   ]
// };

// // Add the to-do list to the Firestore database
// db.collection('todos').add({
//   userId: userId,
//   ...todoList
// })
// .then((docRef) => {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch((error) => {
//   console.error("Error adding document: ", error);
// });
