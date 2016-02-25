// console.log('WELCOME INDEX works!');

$(function() {

	// fade in signup/login elements and logohead
	$("#logoHead").fadeIn("slow");
	$("#logoutDiv").fadeIn("slow");



	// fade in signup/login elements and logohead
	setTimeout(function() {
		$("#logoHead").fadeIn(1000);
	}, 2000);

	setTimeout(function() {
		$("#buttonDiv").fadeIn(1000);
	}, 4000);

	// fade out button div and fade in login form on click of login button
	$("#loginButton").click(function(){
	    $("#buttonDiv").fadeOut(1000);
	    setTimeout(function() {
	    	$("#login").fadeIn(500);
	    }, 1000);	
	});

	// fade out button div and fade in signup form on click of signup button
	$("#signupButton").click(function(){
	    $("#buttonDiv").fadeOut(1000);
	    setTimeout(function() {
	    	$("#signup").fadeIn(500);
	    }, 1000);	
	});













});  // <-------------------------------------- END DOC.READY









