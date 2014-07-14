/*
 *	Chris Chapman
 *	
 *	Hand3D: Renders a hand in Three.js
*/


var Hand3D = function(palm, fingers) {
	
	//The Three.js container for the hand
	this.hand3D 	= new THREE.Object3D();
	
	
	//The palm property
	this.palm 		= new Palm3D(palm.position, palm.rotation, palm.size);
	this.hand3D.add(this.palm.palm3D);
	
	
	//The fingers (and the constructor for the fingers
	this.fingers 	= new THREE.Object3D();
	
	for (var i=0; i<fingers.length; i++) {
		var finger 	= new Finger3D(fingers[i]);
		this.fingers.add(finger);
	}
	
	
	this.hand3D.add(this.fingers);
	
	
	
	
	/*****************
	 *	Constructors
	 *****************/
	 
	 
	 //Palm constructor
	function Palm3D(palmPos, palmRot, palmSize) {
		
		
		this.palm3D = new THREE.Object3D();
		this.rotationContainer = new THREE.Object3D();
		
		
		this.rotationContainer.add(setGeometry());
		setDirection(palmRot, this.rotationContainer);
		this.palm3D.add(this.rotationContainer);
		
		setPosition(palmPos, this.palm3D);
		
		
		function setGeometry() {
			var geometry = new THREE.BoxGeometry(palmSize, palmSize/.75, .1);
			var material = new THREE.MeshLambertMaterial({color: 0xff0000});
			var mesh = new THREE.Mesh(geometry, material);
			
			return mesh;
		}
		
		 function setDirection(palmRot, rotationCont){
			var lookDirection = new THREE.Vector3(palmRot[0], palmRot[1], palmRot[2]);
			var pos = new THREE.Vector3();
			
			pos.addVectors(lookDirection, rotationCont.position);
			rotationCont.lookAt(pos);
		}
		
		function setPosition(palmPosition, object) {
			object.position.set(palmPosition[0], palmPosition[1], palmPosition[2]);
		}
		
		this.updateRotation = function(newRot) {
			setDirection(newRot, this.rotationContainer);
		}
		
		this.updatePosition = function(newPos) {
			setPosition(newPos, this.rotationContainer);
		}
	}
	
	function Finger3D(finger) {
	
		this.finger3D = new THREE.Object3D();
		
		this.fingerJoint3D = new Array(finger.length);
		
		for (var i=0; i<finger.length; i++){
			this.fingerJoint3D[i] = new FingerJoint3D(finger[i], i);
			this.finger3D.add(this.fingerJoint3D[i]);
		}
		
		this.updatePosition = function(newFingerPositions) {
			
			for (var j=0; j<finger.length; j++){
				for (var k =0; k<finger[j].length; k++) {
					fingerJoint3D[j][k].position = newFingerPositions[j][k] / 100;
				}
			}
			
		}
		
		return this.finger3D;

	}
	
	function FingerJoint3D(jointPos, jointNum) {
	
		this.fingerJoint3D = new THREE.Object3D();
		
		
		var jointColor = 0x0000ff;
		
		if (jointNum == 0) {
			jointColor = 0xffff00;
		} else if (jointNum == 1) {
			jointColor = 0x00ff00;
		}
		
		
		var geometry = new THREE.SphereGeometry(.2, 20, 20);
		var material = new THREE.MeshLambertMaterial({color: jointColor});
		var mesh = new THREE.Mesh(geometry, material);
		
		
		this.fingerJoint3D.add(mesh);
		this.fingerJoint3D.position.set(jointPos[0], jointPos[1], jointPos[2]);
		
		return this.fingerJoint3D;
		
	}
	
}