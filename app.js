import { auth,app ,onAuthStateChanged,signInWithEmailAndPassword,
    GoogleAuthProvider,signInWithPopup,sendEmailVerification,
    sendPasswordResetEmail,deleteUser,signOut,provider
   } from "./firebase.js";
  
   onAuthStateChanged(auth, (user) => {
    if (user) {
     
      const uid = user.uid;
      console.log("user Exist",user);
      
      // ...
    } else {
     console.log("user signout");
     
      // ...
    }
  });
  
  
  
  /////signin/login ////
  
  let login = document.getElementById('loginBtn');
  let loginBtn = () => {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
  
    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
          
           alert("login sucessfully!")
      
            // alert("User  logged in successfully: " + user.email);
           // Displaying user email
            // Clear input fields
            email.value = "";
            password.value = "";
            localStorage.setItem(
              "user",
              JSON.stringify({ email: user.email, id: user.uid })
            );
  
            // Redirect to home.html after a short delay
            setTimeout(function() {
                window.location.href = 'index.html';
            }, 3000);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert("registered your account"); // Displaying error message
        });
  };
  
         
  
  
  
  login.addEventListener('click', loginBtn);
  
  
  ///continue with google 
  let googlelogin = document.getElementById('googleBtn')
  let googleBtn =()=>{
    signInWithPopup(auth, provider)
    .then((result) => {
      
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);
      console.log(token)
      localStorage.setItem(
        "user",
        JSON.stringify({
          email: user.email,
          id: user.uid,
          name: user.displayName,
          picture: user.photoURL,
        })
      );
      window.location.href = 'index.html';
      
      
      
  
   
    }).catch((error) => {
     
      const errorCode = error.code;
      const errorMessage = error.message;
    
     
    console.log(errorMessage);
    
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  
  }
  googlelogin.addEventListener('click',googleBtn)
  
  ////Email verification
  
  let emailVerify = document.getElementById('sendVerification')
  let verifyBtn=()=>{
  
    sendEmailVerification(auth.currentUser)
    .then(() => {
      // Email verification sent!
      alert("Verification email sent! check your inbox")
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
      
    });
    
  
  }
  emailVerify.addEventListener('click',verifyBtn)
  
  
  /////Reset Email///
  
  let Resetemail = document.getElementById('resetPassword')
  let resetBtn=()=>{
  
    sendPasswordResetEmail(auth, email.value)
    .then(() => {
      // Password reset email sent!
      // ..
      alert("password reset email sent!")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
      alert('try again')
      
      
    });
  }
  Resetemail.addEventListener('click',resetBtn)
  
  ////DeleteAccount///
  let delteBtn = document.getElementById('deleteAccount')
  let deleteAcc =()=>{
  
    const user = auth.currentUser;
  
    deleteUser(user).then(() => {
      // User deleted.
      alert("your account has been delete ")
    }).catch((error) => {
      // An error ocurred
      // ...
      alert("no user in signin")
    });
  
  
  }
  delteBtn.addEventListener('click',deleteAcc)
  
  
  
  
  
    
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  