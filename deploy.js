/*
This file is global; it is updated across all clients at the same time.
Each site also has a file, loaded just prior to this one, which defines giftTag & all of the rule checks.
This file, called prelabel, contains a list of validation checks.
*/

if (! window.giftTag){
	var giftTag = {};
}

giftTag.baseURL = '//gene.jones.s3-website-us-east-1.amazonaws.com/'; //please include the trailing slash plox
giftTag.clientURL = 'genejones'; //no trailing slash here though

giftTag.testForJQuery = function testForJQuery(callback){
	var ready = false;
	if (window.jQuery){
		//jQuery is defined
		ready = true;
	}
	else{
		//inject jQuery
		this.injectJquery();
		$.noConflict(); //make sure other scripts can use the $ symbol
		//as this script will be executed all kinds of places
	}
	if (callback){
		return callback();
	}
	return true; //jQuery is now present on the site :)
};

giftTag.injectjQuery = function injectjQuery(){
	this.injectJS_DOM("//ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js");
};

giftTag.injectJS_DOM = function injectJS_DOM(src){
	var head = document.getElementsByTagName("head")[0];
	var script = document.createElement('script');
	script.type = "text/javascript";
	script.src = src;
	head.appendChild(script);
};

giftTag.injectJS_anon = function (src){
	jQuery.getScript(src);
	//gets the code asyncronously, executes it
	//doesn't insert code into the dom; inferior to injectJS_DOmw with legacy support
	//still here if needed for others
};

giftTag.checkReadyState = function(callback){
	if (document.readyState === 'complete'){
		return callback(); //early abort the function, our work here is done
		//this would probably never happen, but just for fun let's put this here
	}
	else if (window.addEventListener){
		window.addEventListener("load", callback, false);
		//find out when the document is loaded
	}
	else if (window.attachEvent){
		window.attachEvent("onload", callback);
		//find out when the document is loaded
		//for older IE versions
		//I don't know why I even bother with this, as this code is pretty much just so I can write a blog post about it
		//I *hate* IE8 and below. IE10 is pretty decent though.
	}
	//yes, jQUery could have abstracted this away for me.
	//what if jQuery isn't loaded yet, hmm? We might want to lazyLoad it.
	//actually, we definitely want to lazyLoad it.
};

giftTag.console = function (yarn){
	//called yarn because yarn is a type of string...
	//wrapper function for console.log, prevents evil IE6 from choking on it
	//also introduces the debug function, preventing thousands of messages for standard users
	if (giftTag.debug){
		if (console && console.log){
			console.log(yarn);
		}
	}
};

giftTag.lazyLoad = function (){
	giftTag.checkReadyState(function(){
		giftTag.console("Had to stop slazking. Now lazyloading...");
		giftTag.rulesLoad(giftTag.lazyRules);
		giftTag.console("Done lazyloading. Return to slacking.");
	});
	//lazy load the list of lazy rules
	//why yes, this is a stupid wrapper function, possibly giving us no useful abstraction
	//no, I'm not refactoring it right now
};

giftTag.rulesLoad = function (rules){
	for (var i=0; i<rules.length; i++){
		if (rules[i].matching()) {
			giftTag.injectJS_DOM(this.baseURL + giftTag.clientURL + "/" + "rules/" + rules[i].id + ".js");
			//jQuery.getScript could be used here, but that doesn't work across all legacy browsers
			//plus, jQuery.getScript doesn't add to DOM, which is annoying to troubleshoot
			//did I mention this is a quick and dirty DIY 
		}
	}
};

giftTag.init = function (){
	giftTag.injectjQuery();
	//inject jQuery on every page, if desired in rules.js
	
	giftTag.console("Loading Immediate Rules");
	giftTag.rulesLoad(giftTag.immediateRules);
	//load immediate rules
	giftTag.console("Done loading immdiate rules");

	giftTag.lazyLoad();
	//once page is loaded, commence with the tags which don't need the page to be fully loaded
};

giftTag.init();
//let's get this party started!