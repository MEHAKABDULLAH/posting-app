import { app,auth,createUserWithEmailAndPassword} from "./firebase.js"

let registerBtn = document.getElementById('registerBtn')

let register =()=>{
  let email = document.getElementById('email')
  let password = document.getElementById('password')
  createUserWithEmailAndPassword(auth, email.value, password.value)
  .then((userCredential) => {
    
    const user = userCredential.user;
   alert('user registered succesfully',user)
   window.location.href = 'home.html';
   localStorage.setItem(
    "user",
    JSON.stringify({ email: user.email, id: user.uid })
  );
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  alert('user not registered',errorMessage)
    
   
  });
}
registerBtn.addEventListener('click',register)