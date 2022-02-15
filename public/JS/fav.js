var back = document.getElementById('back');

function backListener() {
    window.history.back()
  } 
  
back.addEventListener('click', backListener);