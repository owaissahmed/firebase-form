import { initializeApp }
    from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, }
    from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import { getFirestore, doc, setDoc, addDoc,getDoc, collection, getDocs, query, where,onSnapshot, }
    from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";

// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB5sjqEHGOd6nNTRpFq9nddhZ6i1jTYwcQ",
    authDomain: "login-786.firebaseapp.com",
    projectId: "login-786",
    storageBucket: "login-786.appspot.com",
    messagingSenderId: "124709798613",
    appId: "1:124709798613:web:905b3990b5c0fbef2e185c",
    measurementId: "G-58S5ZTS697"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

// var hello = document.getElementById("greetName")    
var friendsData = document.getElementById("friendsData")


var userinfo = JSON.parse(localStorage.getItem("userdata"))
// var friendsname = JSON.parse(localStorage.getItem("friendsname")) 
// console.log(userinfo.firstName) 
// hello.innerHTML = `Hello,${userinfo.firstName}`;
// for (var i = 0 ; i < friendsname.length ; i++){

//     friendsData.innerHTML += `<li>${friendsname[i]}</li> ` 
// }

onAuthStateChanged(auth, (user) => {
    if (user) {
        getUserFromDataBase(user.uid);
    } else {
        console.log("not login");
    }
});

const getUserFromDataBase = async (uid) => {
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    var hello = document.getElementById("greetName")
    if (docSnap.exists()) {
        hello.innerHTML = `Hello, ${docSnap.data().firstName}`;
        getAllUsers(userinfo.email, uid, userinfo.firstName);
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
};

const getAllUsers = async (email, currentId, currentName) => {
    const q = query(collection(db, "users"), where("email", "!=", email));
    const querySnapshot = await getDocs(q);
    var friendsData = document.getElementById("friends")
    var time = document.getElementById("time")
    time.innerHTML = new Date().toLocaleTimeString();
    querySnapshot.forEach((doc) => {
        friendsData.innerHTML += `<li>${doc.data().firstName} <button onclick='startChat("${doc.id
            }","${doc.data().name
            }","${currentId}","${currentName}")' id="chat-btn">Start Chat</button></li> `;
    });
};


let startChat = (id, name, currentId, currentName) => {
    let chatWith = document.getElementById("chat-with");
    chatWith.innerHTML = `Chats of ${name}`;
    let send = document.getElementById("send");
    let message = document.getElementById("message");
    let chatID;
    if (id < currentId) {
      chatID = `${id}${currentId}`;
    } else {
      chatID = `${currentId}${id}`;
    }
    loadAllChats(chatID);
    send.addEventListener("click", async () => {
      let allMessages = document.getElementById("all-messages");
      allMessages.innerHTML = "";
      await addDoc(collection(db, "messages"), {
        sender_name: currentName,
        receiver_name: name,
        sender_id: currentId,
        receiver_id: id,
        chat_id: chatID,
        message: message.value,
        timestamp: new Date(),
      });
    });
  };
  
  const loadAllChats = (chatID) => {
    const q = query(collection(db, "messages"), where("chat_id", "==", chatID));
    let allMessages = document.getElementById("all-messages");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      allMessages.innerHTML = "";
      querySnapshot.forEach((doc) => {
        allMessages.innerHTML += `<li>${doc.data().message}</li>`;
      });
    });
  };
  
  window.startChat = startChat;
  