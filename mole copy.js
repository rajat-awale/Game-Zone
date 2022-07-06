
window.onload = function () {

  function MouseGame() {
      this.mousesWrap = this.$('.game-content');
      this.mouses = this.$('.game-content div');
      this.gameStart = this.$('#game-start');
      this.gameState = this.$('#game-state');
      this.gameTime = this.$('#game-time');
      this.gameScore = this.$('#game-score');
      this.totScore = 1;
      this.isStart = false;
      this.bindEvent();
  }

  MouseGame.prototype = {
      constructor: MouseGame,

      /**
       * Get element
       * @param  {String} elem
       * @example
       * @return {NodeList}
       */

      $: function (elem) {
          return document.querySelectorAll(elem);
      },

      /**
       * @param  {Number} from start
       * @param  {Number} to   finish
       * @return {Number}      randon number
       */
      getRandom: function (from, to) {
          return Math.floor(Math.random() * (to - from + 1)) + from + 1;
      },

      /**
       * @param  {HTMLElement} elem Element to be set
       * @param  {String} val  Set content
       * @return {String}      Set content
       */
      text: function (elem, val) {
          if (elem.textContent) {
              return val !== undefined ? elem.textContent = val : elem.textContent;
          } else if (elem.innerText) {
              return val !== undefined ? elem.innerText = val : elem.innerText;
          }
      },

      moveUpAndDown: function () {
          var that = this;
  
          that.moveTime = setInterval(function () {

              for (var i = 0, j = that.mouses.length; i < j; ++i) {
                  that.mouses[i].setAttribute('clicked', '0');
                  that.mouses[i].className = 'hamster active';
                  that.mouses[i].style.display = 'none';
              }

              var showNum = that.getRandom(0, 9);
              for (var i = 0; i < showNum; i++) {
                  that.mouses[that.getRandom(0, 59)].style.display = 'block';
              }
          }, 2000);
      },

      bindEvent: function () {
          var that = this;

          that.gameStart[0].addEventListener('click', function () {
              if (!that.isStart) that.startGame();
              else { that.totalTime = 1; that.text(that.gameState[0], "Game over"); that.text(that.gameTime[0], "0"); }
          }, false);

          // Hamster operation
          that.mousesWrap[0].addEventListener('click', function (e) {
              e = e || window.event;
              var elem = e.target

              if (elem.getAttribute('clicked') === '1') {
                  return;
              }

              if (elem.style.display !== 'block') {
                  that.score -= 1;
              }
              // Add points
              if (elem.className.indexOf('hamster') !== -1) {
                  that.score += that.totScore;
              }

              elem.setAttribute('clicked', '1');
              if (that.score < 0) that.score = 0;
              that.text(that.gameScore[0], that.score);
          }, false);
      },

      countDown: function () {
          var that = this;
          that.text(that.gameState[0], "Playing");
          var t = setInterval(function () {
              that.text(that.gameTime[0], --that.totalTime);
              if (that.totalTime === 0) {
                  clearInterval(t);
                  clearInterval(that.moveTime);
                  that.isStart = false;
                  for (var i = 0, j = that.mouses.length; i < j; ++i) {
                      that.mouses[i].style.display = 'none';
                  }
                  if (that.score < 0) that.score = 0;
                  alert('Game over.\nYour score：' + that.score);
              }
          }, 1000);
      },

      // Start the game
      startGame: function () {
          this.score = 0;
          this.totalTime = 30;
          this.text(this.gameTime[0], this.totalTime);
          this.text(this.gameScore[0], this.score);
          this.countDown();
          this.moveUpAndDown();
          this.isStart = true;

      }
  };

  new MouseGame();
}