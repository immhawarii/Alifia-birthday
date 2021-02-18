function myFunction() {
    if (video.paused) {
      video.play();
      myBtn.innerHTML = "Pause";
    } else {
      video.pause();
      myBtn.innerHTML = "Play";
    }
  }

  