// var back = document.getElementById('back');

// function backListener() {
//     window.history.back()
//   }
  
// back.addEventListener('click', backListener);

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });             

 console.log(document.cookie)


function createAccount() {

  var username = document.getElementById('username').value
  console.log(username)
  document.cookie = "username="+username+"; expires=Fri, 4 Mar 2022 12:00:00 UTC; path=/";

  console.log(document.cookie.username)
}