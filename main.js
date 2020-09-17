




$(function () {

	var score = 0;
	var timer = 2;
	var startTime;
	var endTime;
	var array_botmatch = [1,2,3,4];
	var mix_toprow = 0;
	var array_mixbot;

	const homepage = document.getElementById("homepage");
    const gamepage = document.getElementById('gamepage');
    const rulessection = document.getElementById("gamerules");
    const gamesection = document.getElementById('gamescore-section');
	const img = ['./images/heart.png','./images/moon.png','./images/star.png','./images/triangle.png'];



	function shuffle() {
		if (mix_toprow == 1){
			for(let i = img.length - 1; i > 0; i--) {
		    	let j = Math.floor(Math.random() * (i + 1));
		    	[img[i], img[j]] = [img[j], img[i]];
			}
		}
		array_botmatch = [1,2,3,4];
	  	for(let i = array_botmatch.length - 1; i > 0; i--) {
	    	let j = Math.floor(Math.random() * (i + 1));
	    	[array_botmatch[i], array_botmatch[j]] = [array_botmatch[j], array_botmatch[i]];
	  	}
	};

	function clear_inputs(){
		for (var i = 0; i < 4; i++)
			document.getElementById('gameinput' + (i+1)).value='';
		document.getElementById('gameinput1').focus();
	};

	function check_match(){
		for (var i = 0; i < 4; i++){
			if (array_botmatch[i] != document.getElementById('gameinput' + (i+1)).value){
				document.querySelector("#gameinput1").classList.toggle("wobble-hor-bottom");
				document.querySelector("#gameinput2").classList.toggle("wobble-hor-bottom");
				document.querySelector("#gameinput3").classList.toggle("wobble-hor-bottom");
				document.querySelector("#gameinput4").classList.toggle("wobble-hor-bottom");
				clear_inputs();
				return 0;
			}
		}
		score++;
		clear_inputs();
		new_set();
		return 1;
	};

	function new_set(){
		shuffle();
		for(var i = 0; i < 4; i++){
			document.getElementById('img'+ (i+1)).src = img[i];
			document.getElementById('img'+ (i+5)).src = img[array_botmatch[i] - 1];
		}
	};

	function start_game(){
		if (document.getElementById('checkbox-mix').checked){
			console.log('checked');
			mix_toprow = 1;
		}
		else {
			console.log('unchecked');
			mix_toprow = 0;
		}
		timer = document.getElementById("timer").value;
		if (timer <= 0)
			timer = 1;
		getEndTime();
		initializeClock('clockdiv', endTime);
		new_set();

	    homepage.classList.add("uk-hidden");
		gamepage.classList.remove("uk-hidden");
		document.getElementById("gameinput1").focus();
	}

	function end_game(){
	    homepage.classList.remove("uk-hidden");
		gamepage.classList.add("uk-hidden");
		rulessection.classList.add("uk-hidden");
		gamesection.classList.remove("uk-hidden");
		document.getElementById("gamescore").innerHTML = "Score: " + score;
		document.getElementById("start").innerHTML = "Play Again";
	}

	function getEndTime(){
		startTime = new Date();
		endTime = new Date(startTime.getTime() + timer*60000);
		console.log(startTime);
		console.log(endTime);
	}

	function getTimeRemaining(endtime){
	  	const total = Date.parse(endtime) - Date.parse(new Date());
	  	const seconds = Math.floor( (total/1000) % 60 );
	  	const minutes = Math.floor( (total/1000/60) % 60 );
	  	const hours = Math.floor( (total/(1000*60*60)) % 24 );
	  	const days = Math.floor( total/(1000*60*60*24) );
	
	  	return {
	  	  	total,
	  	  	days,
	  	  	hours,
	  	  	minutes,
	  	  	seconds
	  	};
	}

	function initializeClock(id, endtime) {
	  	const clock = document.getElementById(id);
	  	const timeinterval = setInterval(() => {
	  	  	const t = getTimeRemaining(endtime);
	  	  	if (t.seconds < 10)
	  	  		t.seconds = "0" + t.seconds;
	  	  	clock.innerHTML = t.minutes + " : " + t.seconds;
	  	  	if (t.total <= 0) {
	  	  	  	clearInterval(timeinterval);
	  	  	  	end_game();
	  	  	}
	  	},100);
	}




	$("#start").on("click", function (event) {
	    event.preventDefault();
	    start_game();
	});

	$(".gameinputs").keypress(function (event) {
		if (! ((event.which > 48 && event.which < 53) || (event.which>96 && event.which<101)) ) {
			event.preventDefault();
		}
		
	});


	$(".gameinputs").keydown(function (event) {
		event.preventDefault();
		if ((event.which > 48 && event.which < 53) || (event.which>96 && event.which<101)) {
			this.value = event.key;
		    if (this.value.length >= this.maxLength) {
		      	var $next = $(this).next('.gameinputs');
		      	if ($next.length){
		          	$(this).next('.gameinputs').focus();
		          }
		      	else{
		          	$(this).blur();
		          	check_match()
		          }
	    	}
		}
		if (event.which == 8)
			$(this).prev('.gameinputs').focus();
	});

	document.getElementById("timer").addEventListener("keyup", function(event) {
	    if (event.keyCode === 13) {
	        event.preventDefault();
	        document.getElementById("start").click();
	    }
	});



	



});