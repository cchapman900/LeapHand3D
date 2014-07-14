/*
 *	Chris Chapman
 *	
 *	Renders a hand in Three.js using input from Leap device
 */
 
var LeapHand3D = function() {
				this.object3D = new THREE.Object3D();
				
				var palm = new palm();
				this.object3D.add(palm);
				
				var fingers = new finger([1, 2, 3, 4, 5]);
				//console.log(fingers);
				this.object3D.add(fingers);
				
				
				//Each element of the hand
				
				function fingerJoint() {
					var geometry = new THREE.SphereGeometry(.2, 20, 20);
					var material = new THREE.MeshLambertMaterial({color: 0xff0000});
					var mesh = new THREE.Mesh(geometry, material);
					
					return mesh;
				}
				
				function finger(joints) {
					var finger = new THREE.Object3D();
					
					for (i = 0; i < joints.length; i++) {
						var newFinger = fingerJoint();
						finger.add(newFinger);
					}
					
					return finger;
				}
				
				
				function palm () {
					var geometry = new THREE.SphereGeometry(.4,	20,	20);
					var material = new THREE.MeshLambertMaterial({color: 0x00ff00});
					var mesh = new THREE.Mesh(geometry, material);
					
					return mesh;
				}
				
				
				
				//Connect to Leap data
				this.update = function(hand) {
					palm.position.set(hand.stabilizedPalmPosition[0]/25, (hand.stabilizedPalmPosition[1]/25)-4, hand.stabilizedPalmPosition[2]/50);
					updateFingers(hand.fingers);
				}
				
				function updateFingers(leapFingers) {
					for (i = 0; i < leapFingers.length; i++) {
						var fingerPosition = leapFingers[i].stabilizedTipPosition;
						fingers.children[i].position.set(fingerPosition[0]/25, (fingerPosition[1]/25)-4, fingerPosition[2]/50);
					}
				}
				
				
			}
			
			var leapHand = new LeapHand3D();
			
			var controller = Leap.loop(function(frame){
				if(frame.hands.length > 0)
				{
					var hand = frame.hands[0];
					
					var leapFingers = hand.fingers;
					//console.log(leapFingers);
					
					leapHand.update(hand);
				}
			});
			
			scene.add(leapHand.object3D);
 