;(function (){
	const timerStructure = document.createElement('li');
	const addTimerButton = document.querySelector('#add-timer');
	const addTimerInput = document.querySelector('#time-input');
	const timersWrap = document.querySelector('#timers');
	
	
	timerStructure.classList.add('timer');
	timerStructure.innerHTML = "<div class=\"timer__counter\"></div><button class=\"timer__button timer__pause\" data-play=\"▶\" data-pause=\"⏸\"></button><button class=\"timer__button timer__delete\">×</button>";

	function addTimer(count) {
		
		const html = timerStructure.cloneNode(true);
		const pauseButton = html.querySelector('.timer__pause');
		const counterNode = html.querySelector('.timer__counter');
		const deleteButton = html.querySelector('.timer__delete');
		
		return {
			value: count,
			pause: false,
			interval: false,
			html: html,
			pauseButton: pauseButton,
			counterNode: counterNode,
			deleteButton: deleteButton,
			init: function () {
				timersWrap.append(this.html);
				this.updateCounter();
				this.start();
				
				this.pauseButton.addEventListener('click', () => {
					this.togglePause();
				});
				this.deleteButton.addEventListener('click', () => {
					this.delete();
				});
			},
			updateCounter: function() {
				if (this.value < 1) {
					this.delete();
				}
				this.counterNode.innerText = this.value;
			},
			start: function() {
				this.interval = setInterval(() => {
					this.value -= 1;
					this.updateCounter();
				}, 1000);
			},
			togglePause: function() {
				if (!this.pause) {
					clearInterval(this.interval);
					this.pauseButton.classList.add('active');
				} else {
					this.start();
					this.pauseButton.classList.remove('active');
				}
				
				this.pause = !this.pause;
			},
			delete: function() {
				clearInterval(this.interval);
				this.html.remove();
			}
		}
	}
	
	addTimerButton.addEventListener('click', function(e) {
		e.preventDefault();
		const timer = addTimer(addTimerInput.value);
		addTimerInput.value = '';
		timer.init();
	})
})();
