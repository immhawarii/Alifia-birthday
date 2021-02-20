
// // https://stackoverflow.com/questions/33322681/checking-microphone-volume-in-javascript

// // https://stackoverflow.com/questions/33322681/checking-microphone-volume-in-javascript
navigator.mediaDevices
  .getUserMedia({ audio: true })
  .then(function (stream) {
    let AudioContext =
      window.AudioContext || // Default
      window.webkitAudioContext || // Safari and old versions of Chrome
      false;

    if (AudioContext) {
      // Do whatever you want using the Web Audio API
      audioContext = new AudioContext();
      // ...
    } else {
      // Web Audio API is not supported
      // Alert the user
      alert(
        "Sorry, but the Web Audio API is not supported by your browser. Please, consider upgrading to the latest version or downloading Google Chrome or Mozilla Firefox"
      );
    }
    let analyser = audioContext.createAnalyser();
    let microphone = audioContext.createMediaStreamSource(stream);
    let javascriptNode = audioContext.createScriptProcessor(2048, 1, 1);

    analyser.smoothingTimeConstant = 0.8;
    analyser.fftSize = 1024;

    microphone.connect(analyser);
    analyser.connect(javascriptNode);
    javascriptNode.connect(audioContext.destination);

    javascriptNode.onaudioprocess = function () {
      var array = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(array);
      var values = 0;

      var length = array.length;
      for (var i = 0; i < length; i++) {
        values += array[i];
      }

      var average = values / length;
      if (average > 70) {
        document.querySelector(".candle").classList.add("out");
        console.log("lilin mati")
        document.getElementById("hbd").removeAttribute("hidden")
        document.getElementById("hbd").animate({
          'font-size' : '40px',
          'opacity': '1'
        }, 3000);
        setTimeout(() => {
          document
          .querySelector(".candle")
          .style.setProperty("--wind", average + "deg");
        }, 5000);
      } else {
        document
          .querySelector(".candle")
          .style.setProperty("--wind", average + "deg");
      }
    };
  })
  .catch(function (err) {
    document.querySelector(".error").classList.add("show");
    console.log(err);
  });

function goBack() {
  window.history.back();
}

function claimReward() {
  let timeout = 1000;
  setTimeout(() => {
    window.location.href = 'rewards.html';
  }, timeout);
}

const curry = f => (...args) =>
args.length >= f.length ? f(...args) : curry(f.bind(f, ...args));

const compose = (f, g) => x => f(g(x));
const composeN = (...fns) => (...args) =>
fns.reverse().reduce((x, f) => f.apply(f, [].concat(x)), args);

$(document).ready(function () {
  let loading = $(".loading").wrapInner("<div></div>"),
      min = 20,
      max = 70,
      minMove = 10,
      maxMove = 20;

  startAnimation(loading);

  loading.on(
      "animationend webkitAnimationEnd oAnimationEnd",
      "span:last-child",
      (e) => {
          startAnimation(loading);
      }
  );

  //Set CSS vars & generate spans if needed
  function setCSSVars(elem, min, max, minMove, maxMove) {
      let width = Math.ceil(elem.width()),
          text = elem.text();
      for (let i = 1; i < width; i++) {
          let num = Math.floor(Math.random() * (max - min + 1)) + min,
              numMove =
                  Math.floor(Math.random() * (maxMove - minMove + 1)) +
                  minMove,
              dir = i % 2 == 0 ? 1 : -1,
              spanCurrent = elem.find("span:eq(" + i + ")"),
              span = spanCurrent.length ? spanCurrent : $("<span />");
          span.css({
              "--x": i - 1 + "px",
              "--move-y": num * dir + "px",
              "--move-y-s":
                  (i % 2 == 0 ? num * dir - numMove : num * dir + numMove) +
                  "px",
              "--delay": i * 10 + "ms"
          });
          if (!spanCurrent.length) {
              elem.append(span.text(text));
          }
      }
  }

  //Start animation
  function startAnimation(elem) {
      elem.removeClass("start");
      setCSSVars(elem, min, max, minMove, maxMove);
      void elem[0].offsetWidth;
      elem.addClass("start");
  }
});
