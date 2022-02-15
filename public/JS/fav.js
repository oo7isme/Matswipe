var back = document.getElementById('back');

function backListener() {
    location.replace("../index.html")
  }
  
back.addEventListener('click', backListener);