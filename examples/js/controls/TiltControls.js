

THREE.TiltControls = function( object ){

	

	this.object = object ;
	this.target = new THREE.Vector3();

	this.rotateStart = new THREE.Vector2();
	this.rotateEnd = new THREE.Vector2();
	this.rotateDelta = new THREE.Vector2();
	this.rotateSpeed = 1.0 ;

	var scope = this;

	var Environment = {
	    //mobile or desktop compatible event name, to be used with '.on' function

	    isAndroid: function() {
	        return navigator.userAgent.match(/Android/i);
	    },
	    isBlackBerry: function() {
	        return navigator.userAgent.match(/BlackBerry/i);
	    },
	    isIOS: function() {
	        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
	    },
	    isOpera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    isWindows: function() {
	        return navigator.userAgent.match(/IEMobile/i);
	    },
	    isMobile: function() {
	        return (Environment.isAndroid() || Environment.isBlackBerry() || Environment.isIOS() || Environment.isOpera() || Environment.isWindows());
	    }
	};

	function init(){

		if (window.DeviceOrientationEvent) {
		    window.addEventListener("deviceorientation", function () {
		        tilt(event.beta, event.gamma);
		    }, true);
		} else if (window.DeviceMotionEvent) {
		    window.addEventListener('devicemotion', function () {
		        tilt(event.acceleration.x * 2, event.acceleration.y * 2);
		    }, true);
		} else {
		    window.addEventListener("MozOrientation", function () {
		        tilt(orientation.x * 50, orientation.y * 50);
		    }, true);
		}

	} //start

	function quit(){
		//TODO: remove listeners. 
	} //quit

	this.rotateLeft = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		thetaDelta -= angle;

	};

	this.rotateUp = function ( angle ) {

		if ( angle === undefined ) {

			angle = getAutoRotationAngle();

		}

		phiDelta -= angle;

	};

	function onTilt(offsetX, offsetY){

		rotateEnd.set( event.clientX, event.clientY );
		rotateDelta.subVectors( rotateEnd, rotateStart );

		// rotating across whole screen goes 360 degrees around
		scope.rotateLeft( 2 * Math.PI * offsetX * scope.rotateSpeed );

		// rotating up and down along whole screen attempts to go 360, but limited to 180
		scope.rotateUp( 2 * Math.PI * offsetY * scope.rotateSpeed );

		console.log("X: " + rotateDelta.x)
		console.log("y: " + rotateDelta.y)

		rotateStart.copy( rotateEnd );
	} //onTilt

	if(Environment.isMobile()){
		init();
	}

}