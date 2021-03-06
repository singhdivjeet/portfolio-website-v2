$(function() {
	const appearancePreference = window.localStorage.getItem(
		"appearancePreference"
	);
	let night = appearancePreference === "dark";
	if (!appearancePreference) {
		const d = new Date();
		const hours = d.getHours();
		night =
			(window.matchMedia &&
				window.matchMedia("(prefers-color-scheme: dark)").matches) ||
			hours >= 19 ||
			hours <= 7; // between 7pm and 7am or if preference is dark
	}

	const body = document.querySelector("body");
	const toggle = document.getElementById("toggle");
	const input = document.getElementById("switch");

	if (night) {
		input.checked = true;
		body.classList.add("night");
	}

	toggle.addEventListener("click", function() {
		const isChecked = input.checked;
		if (isChecked) {
			body.classList.remove("night");
			window.localStorage.setItem("appearancePreference", "light");
		} else {
			body.classList.add("night");
			window.localStorage.setItem("appearancePreference", "dark");
		}
	});

	if (window.location.pathname !== "/") return;

	//
	var TxtRotate = function(el, toRotate, period) {
		this.toRotate = toRotate;
		this.el = el;
		this.loopNum = 0;
		this.period = parseInt(period, 10) || 2000;
		this.txt = "";
		this.tick();
		this.isDeleting = false;
	};

	TxtRotate.prototype.tick = function() {
		var i = this.loopNum % this.toRotate.length;
		var fullTxt = this.toRotate[i];

		if (this.isDeleting) {
			this.txt = fullTxt.substring(0, this.txt.length - 1);
		} else {
			this.txt = fullTxt.substring(0, this.txt.length + 1);
		}

		this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

		var that = this;
		var delta = 300 - Math.random() * 100;

		if (this.isDeleting) {
			delta /= 2;
		}

		if (!this.isDeleting && this.txt === fullTxt) {
			delta = this.period;
			this.isDeleting = true;
		} else if (this.isDeleting && this.txt === "") {
			this.isDeleting = false;
			this.loopNum++;
			delta = 500;
		}

		setTimeout(function() {
			that.tick();
		}, delta);
	};

	window.onload = function() {
		var elements = document.getElementsByClassName("txt-rotate");
		for (var i = 0; i < elements.length; i++) {
			var toRotate = elements[i].getAttribute("data-rotate");
			var period = elements[i].getAttribute("data-period");
			if (toRotate) {
				new TxtRotate(elements[i], JSON.parse(toRotate), period);
			}
		}
		// INJECT CSS
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
		document.body.appendChild(css);
	};

	//

	const introHeight = document.querySelector(".intro").offsetHeight;
	const topButton = document.getElementById("top-button");
	const $topButton = $("#top-button");

	window.addEventListener(
		"scroll",
		function() {
			if (window.scrollY > introHeight) {
				$topButton.fadeIn();
			} else {
				$topButton.fadeOut();
			}
		},
		false
	);

	topButton.addEventListener("click", function() {
		$("html, body").animate({ scrollTop: 0 }, 500);
	});

	const hand = document.querySelector(".emoji.wave-hand");

	function waveOnLoad() {
		hand.classList.add("wave");
		setTimeout(function() {
			hand.classList.remove("wave");
		}, 2000);
	}

	setTimeout(function() {
		waveOnLoad();
	}, 1000);

	hand.addEventListener("mouseover", function() {
		hand.classList.add("wave");
	});

	hand.addEventListener("mouseout", function() {
		hand.classList.remove("wave");
	});

	window.sr = ScrollReveal({
		reset: false,
		duration: 600,
		easing: "cubic-bezier(.694,0,.335,1)",
		scale: 1,
		viewFactor: 0.3,
	});

	sr.reveal(".background");
	sr.reveal(".skills");
	sr.reveal(".experience", { viewFactor: 0.2 });
	sr.reveal(".featured-projects", { viewFactor: 0.1 });
	sr.reveal(".other-projects", { viewFactor: 0.05 });
});
