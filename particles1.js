 /**
              * ------------------------------------
              * Section for canvas setup
              --------------------------------------
              */
var canvas = document.getElementById("canvas"),
ctx = canvas.getContext("2d"),
width = canvas.width = window.innerWidth,
height = canvas.height = window.innerHeight;

// Readjust values on window resize
window.addEventListener("resize", function () {
	width = canvas.width = window.innerWidth;
	height = canvas.height = window.innerHeight;
	init();
});

/**
    * ------------------------------------
    * Section for vector class
    --------------------------------------
    */
function Vector(x, y) {
	this.x = x || 0;
	this.y = y || 0;

	this.add = function (vector) {
		this.x += vector.x;
		this.y += vector.y;
		return this;
	};

	this.sub = function (vector) {
		this.x -= vector.x;
		this.y -= vector.y;
		return this;
	};

	this.set = function (vector) {
		this.x = vector.x;
		this.y = vector.y;
	};

	this.setMag = function (mag) {
		return this.norm().mult(mag);
	};

	this.mag = function () {
		return Math.sqrt(this.magSq());
	};

	this.magSq = function () {
		return this.x * this.x + this.y * this.y;
	};

	this.norm = function () {
		return this.mag() === 0 ? this : this.div(this.mag());
	};

	this.mult = function (value) {
		this.x *= value;
		this.y *= value;
		return this;
	};

	this.div = function (value) {
		this.x /= value;
		this.y /= value;
		return this;
	};

	this.fromAngle = function (angle) {
		return new Vector(Math.cos(angle), Math.sin(angle));
	};

	this.limit = function (max) {
		var mSq = this.magSq();
		if (mSq > max * max) {
			this.div(Math.sqrt(mSq)).mult(max);
		}
		return this;
	};

	this.copy = function () {
		return new Vector(this.x, this.y);
	};
}

/**
  * ------------------------------------
  * Section for Utility classes
  --------------------------------------
  */
// Get a random number from a certain range
function random(min, max) {
	var rand = Math.random();

	if (typeof min === "undefined") {
		return rand;
	} else if (typeof max === "undefined") {
		if (min instanceof Array) {
			return min[Math.floor(rand * min.length)];
		} else {
			return rand * min;
		}
	} else {
		if (min > max) {
			var tmp = min;
			min = max;
			max = tmp;
		}

		return rand * (max - min) + min;
	}
}

// Get the distance from two points
function dist(x1, y1, x2, y2) {
	return Math.hypot(null, x2 - x1, y2 - y1);
}

// Get a random vector
function random2DVector() {
	var vector = new Vector();
	return vector.fromAngle(Math.random() * Math.PI * 2);
}

// Subtract two vectors
function sub(v1, v2) {
	var x = v1.x - v2.x,
	y = v1.y - v2.y;

	return new Vector(x, y);
}

/**
  * ------------------------------------
  * Section for particle class
  --------------------------------------
  */
function Particle() {

	// Set variables
	this.pos = new Vector(random(width), random(height));
	this.prev = this.pos.copy();
	this.vel = random2DVector();
	this.vel.setMag(random(2, 4));
	this.accel = new Vector();
	this.maxForce = 1;
	this.maxSpeed = 4;
	this.size = 1;

	// Detect the edges of the canvas and move to other edge
	this.edges = function () {
		if (this.pos.x > width) {
			this.prev.x = this.pos.x = 0;
		} else if (this.pos.x < 0) {
			this.prev.x = this.pos.x = width;
		}
		if (this.pos.y > height) {
			this.prev.y = this.pos.y = 0;
		} else if (this.pos.y < 0) {
			this.prev.y = this.pos.y = height;
		}
	};

	// Check the distance between two particles within a range or radius
	this.dist = function (particle, otherParticle) {var radius = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
		var d = dist(
		particle.pos.x,
		particle.pos.y,
		otherParticle.pos.x,
		otherParticle.pos.y);

		if (otherParticle != particle && d < radius) {
			return true;
		}

		return false;
	};

	// Steer to avoid crowding local flockmates 
	this.seperation = function (particles) {
		var steering = new Vector(),
		total = 0;var _iteratorNormalCompletion = true;var _didIteratorError = false;var _iteratorError = undefined;try {

			for (var _iterator = particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {var other = _step.value;
				if (this.dist(this, other)) {
					var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y),
					diff = sub(this.pos, other.pos);
					diff.div(d * d);
					steering.add(diff);
					total++;
				}
			}} catch (err) {_didIteratorError = true;_iteratorError = err;} finally {try {if (!_iteratorNormalCompletion && _iterator.return) {_iterator.return();}} finally {if (_didIteratorError) {throw _iteratorError;}}}

		if (total > 0) {
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.vel);
			steering.limit(this.maxForce);
		}

		return steering;
	};

	// Steer towards the average heading of local flockmates 
	this.align = function (particles) {
		var steering = new Vector(),
		total = 0;var _iteratorNormalCompletion2 = true;var _didIteratorError2 = false;var _iteratorError2 = undefined;try {

			for (var _iterator2 = particles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {var other = _step2.value;
				if (this.dist(this, other)) {
					steering.add(other.vel);
					total++;
				}
			}} catch (err) {_didIteratorError2 = true;_iteratorError2 = err;} finally {try {if (!_iteratorNormalCompletion2 && _iterator2.return) {_iterator2.return();}} finally {if (_didIteratorError2) {throw _iteratorError2;}}}

		if (total > 0) {
			steering.div(total);
			steering.setMag(this.maxSpeed);
			steering.sub(this.vel);
			steering.limit(this.maxForce);
		}

		return steering;
	};

	// Steer to move toward the average position of local flockmates 
	this.cohesion = function (particles) {
		var perceptionRadius = 100,
		steering = new Vector(),
		total = 0;var _iteratorNormalCompletion3 = true;var _didIteratorError3 = false;var _iteratorError3 = undefined;try {

			for (var _iterator3 = particles[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {var other = _step3.value;
				if (this.dist(this, other, perceptionRadius)) {
					steering.add(other.pos);
					total++;
				}
			}} catch (err) {_didIteratorError3 = true;_iteratorError3 = err;} finally {try {if (!_iteratorNormalCompletion3 && _iterator3.return) {_iterator3.return();}} finally {if (_didIteratorError3) {throw _iteratorError3;}}}

		if (total > 0) {
			steering.div(total);
			steering.sub(this.pos);
			steering.setMag(this.maxSpeed);
			steering.sub(this.vel);
			steering.limit(this.maxForce);
		}

		return steering;
	};

	// Apply the following forces to the particle
	this.attract = function (particles) {
		var
		seperation = this.seperation(particles),
		alignment = this.align(particles),
		cohesion = this.cohesion(particles);

		this.accel.add(seperation);
		this.accel.add(alignment);
		this.accel.add(cohesion);

	};

	// Update the particle's position
	// Draw the particle
	// Add the attractions
	// Detect the edges of the canvas
	this.update = function (particles) {
		this.pos.add(this.vel);
		this.vel.add(this.accel);
		this.vel.limit(this.maxSpeed);
		this.accel.mult(0);

		this.edges();
		this.draw();
		this.attract(particles);

	};

	// Main draw function
	this.draw = function () {
		ctx.beginPath();

		// Create color based on pos
		var t = width + height,
		d = this.pos.x + this.pos.y,
		p = d / t,
		color = 360 * p;

		ctx.strokeStyle = "hsl(" + color + ", 100%, 50%)";
		ctx.lineWidth = this.size;
		ctx.moveTo(this.prev.x, this.prev.y);
		ctx.lineTo(this.pos.x, this.pos.y);
		ctx.stroke();
		ctx.closePath();

		// Set prev pos to current pos
		this.prev.set(this.pos);
	};
}

/**
  * ------------------------------------
  * Section for canvas init and looping
  --------------------------------------
  */

var particles = void 0;

// Init function
var init = function init() {
	particles = [];

	for (var i = 0; i < 100; i++) {
		particles.push(new Particle());
	}
};

// Animation Loop function
var animate = function animate() {
	ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
	ctx.fillRect(0, 0, width, height);var _iteratorNormalCompletion4 = true;var _didIteratorError4 = false;var _iteratorError4 = undefined;try {

		for (var _iterator4 = particles[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {particle = _step4.value;
			particle.update(particles);
		}

		// Stay in sync with browser
	} catch (err) {_didIteratorError4 = true;_iteratorError4 = err;} finally {try {if (!_iteratorNormalCompletion4 && _iterator4.return) {_iterator4.return();}} finally {if (_didIteratorError4) {throw _iteratorError4;}}}requestAnimationFrame(animate);
};

// Init animation loop
init();
animate();