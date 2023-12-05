$(document).ready(function() {
  var breakLength = 5;
  var sessionLength = 25;
  var firstPlay = true;
  var countdownID, bigTime, mins, secs;
  var mode = "session";

  // break-down
  $(".break-down").on("click", function() {
    if (breakLength > 1) {
      breakLength--;
      $(".break").text(breakLength);
      resetTimer();
      $(".minute").text(sessionLength);
    }
  });

  // break-up
  $(".break-up").on("click", function() {
    if (breakLength < 99) {
      breakLength++;
      $(".break").text(breakLength);
      resetTimer();
      $(".minute").text(sessionLength);
    }
  });

  // session-down
  $(".session-down").on("click", function() {
    if (sessionLength > 1) {
      sessionLength--;
      $(".session").text(sessionLength);
      resetTimer();
      $(".minute").text(sessionLength);
    }
  });

  // session-up
  $(".session-up").on("click", function() {
    if (sessionLength < 60) {
      sessionLength++;
      $(".session").text(sessionLength);
      resetTimer();
      $(".minute").text(sessionLength);
    }
  });

  // play
   $(".play").on("click", function() {
    startTimer();
  });
  
  // pause
  $(".pause").on("click", function() {
    pauseTimer();
  });

  // stop
  $(".stop").on("click", function() {
    resetTimer();
  });

  // reset timer
  function resetTimer() {
    pauseTimer();
    bigTime = sessionLength * 60;
    $(".minute").html(sessionLength);
    $(".second").html("00");
    firstPlay = true;
  }

  // start timer
  function startTimer() {
    if (firstPlay) {
      bigTime = sessionLength * 60;
    }
    countdownID = setInterval(countdown, 1000);
  }

  // stop timer
  function pauseTimer() {
    clearInterval(countdownID);
  }

  // countdowm
  var audioBreak = new Audio("http://www.oringz.com/oringz-uploads/sounds-1007-hiccup.mp3");
  var audioSession = new Audio("http://www.oringz.com/oringz-uploads/sounds-990-system-fault.mp3");
  
  function countdown() {
    if (bigTime == 0) {
      if (mode == "session") {
        audioBreak.play();
        mode = "break";
        $(".time").css("color", "#508AAB");
        bigTime = breakLength * 60;
      } else if (mode == "break") {
        audioSession.play();
        mode = "session";
        $(".time").css("color", "black");
        bigTime = sessionLength * 60;
      }
    } else {
      bigTime--;
      mins = Math.floor(bigTime / 60);
      secs = bigTime - mins * 60;
      mins = (mins < 10 ? "0" : "") + mins;
      secs = (secs < 10 ? "0" : "") + secs;
      $(".minute").text(mins);
      $(".second").text(secs);
    }
  }

})
