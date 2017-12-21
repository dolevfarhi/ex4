window.onload = function() {
			// init canvas
			var canvas = document.getElementById("canvas");
			var ctx = canvas.getContext("2d");
			
			// get dimensions for canvas
			var w = window.innerWidth;
			var h = window.innerHeight;
			
			canvas.width = w;
			canvas.height = h;
			
			// snowflakes particles
			var mp = 25; // max particles
			var particles = []; // array for particles
			
			for (var i = 0; i < mp; i++) {
				particles.push({
					x : Math.random() * w, // x coord
					y : Math.random() * h, // y coord
					r : Math.random() * 6 + 1, // radius of particles
					d : Math.random() * mp, // density
				});
			}
			
			// function to draw flakes
			function draw() {
				ctx.clearRect(0,0,w,h);
				ctx.fillStyle = "rgba(255,255,255,0.8)";
				ctx.beginPath();
				
				for (var i = 0; i < mp; i++) {
					var p = particles[i];
					ctx.moveTo(p.x,p.y);
					ctx.arc(p.x,p.y,p.r,0,Math.PI * 2,true);
				}
				
				ctx.fill();
				update();
			}
			
			var angle = 0;
			
			// update snowflakes movements
			function update() {
				angle += 0.01;
				
				for (var i = 0; i < mp; i++) {
					var p = particles[i];
					// update coords x and y
					p.y += Math.cos(angle + p.d) + 1 + p.r / 2;
					p.x += Math.sin(angle) * 2;
					
					// send flakes back to the top when it exits screen
					if (p.x > w + 7 || p.x < -7 || p.y > h) {
						if (i%3 > 0) {
							// for 66% of the flakes 
							particles[i] = {x:Math.random() * w, y:-10, r : p.r, d : p.d};
						
						} else {
							// flakes exit from the right
							if (Math.sin(angle) > 0) {
								particles[i] = {x:-7, y:Math.random()*h, r:p.r, d:p.d};
							} else {
								// enter from right
								particles[i] = {x:w+7,y:Math.random()*h, r:p.r, d:p.d};
							}
						}
					}
				}
			}
			
			// animation loop every 33ms
			setInterval(draw, 33);
			
			// let's go for the demo !!!
			$('.container').on('mouseover', function(){
			  $('.bauble').addClass('light');
  			  $('.star').addClass('star-light');
			})

			$('.container').on('mouseout', function(){
 			  $('.bauble').removeClass('light');
			})
			
    		$("button").click(function(){
		      $('.envelope').css('z-index',-1).slideToggle("slow");
		      $("button").css('display',"none");
		      $("h1").css('display',"block");
		      $(".container").css('display',"block");
    		});
}