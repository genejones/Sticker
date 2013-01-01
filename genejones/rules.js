if (!window.giftTag){
	window.giftTag = {};
}

giftTag.debug = true; //allow for debug console.log statements
giftTag.jQuery = {load:true, lazy:false}; //of course, not definig this means load will be false
//this is a convience wrapper, because jQuery needs to be added to webpages so much
//I'm considering a) a Google Analytics convience wrapper &
//b) a means to add your own convienance wrappers
	//but I'll get to those later

giftTag.immediateRules = [
	{"id":1, "matching":function(){return true;}},
	{"id":2, "matching":function(){return false;}}
]

giftTag.lazyRules = [
	{"id":3, "matching":function(){return true;}},
	{"id":4, "matching":function(){return false;}}
];