// var back = document.getElementById('back');

// function backListener() {
//     window.history.back()
//   }
  
// back.addEventListener('click', backListener);

console.log(document.cookie)

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });