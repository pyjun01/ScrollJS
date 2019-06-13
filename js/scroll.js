(function (){
	let scroll_tg= [];
	window.addEventListener("load", function (){
		document.querySelectorAll(".scroll-tg").forEach(ele =>{
			let { parent, delay, duration, scroll }= ele.dataset;
			let rect= ( parent? document.querySelector(parent): ele ).getBoundingClientRect();
			let pos= rect.top+window.scrollY + rect.height / 4;

			if(scroll && scroll.includes("top")) pos += 30;
			if(scroll && scroll.includes("bottom")) pos -= 30;
			if(delay) ele.style.transitionDelay= `${delay}s`;
			if(duration) ele.style.transitionDuration= `${duration}s`;
			
			scroll_tg.push({
				ele,
				pos,
				delay,
				duration
			});
		});

		let window_height= window.innerHeight;
		let top;
		const onScroll= e =>{
			top= window.scrollY + window_height;
			scroll_tg.forEach(v =>{
				if(v.pos < top)
					v.ele.classList.add('scroll-active');
			})
			scroll_tg= scroll_tg.filter(v =>{
				if(v.pos < top){
					setTimeout(() =>{
						v.ele.classList.remove("scroll-tg");
						v.ele.style['transition-delay']= '';
					}, (v.duration || 600) + (v.delay? v.delay*1000: v.ele.style.transitionDelay));
				}
				return v.pos > top;
			})
		}
		window.addEventListener("scroll", onScroll);
		window.addEventListener("resize", e => window_height= window.innerHeight);
		onScroll();
	})
})();