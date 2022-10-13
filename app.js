import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
}
    from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
    doc,
    getDoc,
    setDoc,
    getFirestore,
    collection,
    getDocs
}
    from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

var btn = document.getElementById("btnsignup1")
if(btn){
btn.addEventListener("click", function () {
    var fname = document.getElementById("fname")
    var lname = document.getElementById("lname")
    var email = document.getElementById("email")
    var password = document.getElementById("password")
    var birth = document.getElementById("birth")

    createUserWithEmailAndPassword(auth, email.value, password.value, fname.value, lname.value,birth.value)
        .then(async (userCredential) => {
            // Signed in 
            const user = userCredential.user;
            // ...
            Swal.fire({
                icon: 'success',
                title: "Congrats",
                text: "Your Form Has Been Submitted",
                iconColor: 'green',
                background: 'black',
                color: 'whitesmoke',
            });

            // window.location.href = "index.html"
            await setDoc(doc(db, "users", user.uid), {

                email: email.value,
                password: password.value,
                firstName: fname.value,
                fatherName: lname.value,
                birth: birth.value,
            });
            setTimeout(() => {
                window.location = "index.html"
            }, 1000)
            console.log("user=>")
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;

            Swal.fire({
                icon: 'error',
                title: errorCode,
                text: errorMessage,
                iconColor: 'red',
                background: 'black',
                color: 'whitesmoke',
            });
        });
    setTimeout(() => {
        fname.value = "";
        lname.value = "";
        email.value = "";
        password.value = "";
        birth.value = "";
    }, 1500)
})
}
var login = document.getElementById("login")
var signupform = document.getElementById("signupform")

if(login){
    login.addEventListener("click", function () {
        var lemail = document.getElementById("lemail")
        var lpassword = document.getElementById("lpassword")
        signInWithEmailAndPassword(auth, lemail.value, lpassword.value)
        .then(async (userCredential) => {
            // Signed in 
        const user = userCredential.user;
        // ...
        console.log(user)
        Swal.fire({
            icon: 'success',
            title: "Congrats",
            text: "You are successfully login",
            iconColor: 'green',
            background: 'black',
            color: 'whitesmoke',
        });
        
        // console.log(profile)
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        var friend = []
        if (docSnap.exists()) {
                        const querySnapshot = await getDocs(collection(db, "users")) ;
                        querySnapshot.forEach((doc) => {
                          console.log(doc.id)
                          let  alluserdata =  doc.data()
                          friend.push(alluserdata.firstName)
                          localStorage.setItem("friendsname",JSON.stringify(friend))
                          console.log(friend)
                        })
                      localStorage.setItem("userdata", JSON.stringify(docSnap.data()))
                        console.log (docSnap.data())
                    } else {
                        console.log("No such document!");
                    }
                    setTimeout(() => {
                        window.location = ("chat.html")
                        // window.location = "user.html"
                        signupform.style.display = "none"
                        lemail.value = ""
                        lpassword.value = ""
        }, 1000)
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        
        Swal.fire({
                 icon: 'error',
                 title: errorCode,
                 text: errorMessage,
                 iconColor: 'red',
                 background: 'black',
                 color: 'whitesmoke',
          });
          setTimeout(() => {
              lemail.value = ""
              lpassword.value = ""
            },1000)
        })
});
} 
// var logout = document.getElementById("logout")
// if(logout){
//     logout.addEventListener("click",function () {
//         onAuthStateChanged(auth, (user) => {
//             if (!user) {
//                 // User is signed in, see docs for a list of available properties
//                 // https://firebase.google.com/docs/reference/js/firebase.User
//                 const uid = user.uid;
//                 // ...
//                 window.location("signup.html")
//         //   console.log (user)
//         //   console.log (uid)
//         } else {
//           // User is signed out
//           // ...
//           console.log("User is signed out")

//         }
//       });
// })
// }

        // login.addEventListener("click", function () {
            //     var lemail = document.getElementById("lemail")
            //     var lpassword = document.getElementById("lpassword")
            
            //     signInWithEmailAndPassword(auth, lemail.value, lpassword.value)
            //         .then(async (userCredential) => {
            //             // Signed in 
            //             const user = userCredential.user;
            //             // ...
            //             const docRef = doc(db, "users", user.uid);
            //             const docSnap = await getDoc(docRef);
            //             let profileData = document.getElementById("itemlist");
            //             if (docSnap.exists()) {
            //                 // let profileLi =
            //                 //     `<li>First Name = ${user.fname.value}</li>
            //                 // <li>Last name = ${user.lname.value}</li>
            //                 // <li>Email = ${user.email.value}</li>`
            //                 // profileData.innerHTML = profileLi.docSnap.data();
            //                 console.log("Document data:", docSnap.data());
            //             } else {
            //                 // doc.data() will be undefined in this case
            //                 console.log("No such document!");
            //             }
            //             Swal.fire("User", "Successfully Logged");
            //             setTimeout(() => {
            //                 window.location = "profile.html"
            //             }, 1500)
            //         })
            //         .catch((error) => {
            //             const errorCode = error.code;
            //             const errorMessage = error.message;
            
            //             console.log("err=>", errorMessage)
            //         });
            
            // })