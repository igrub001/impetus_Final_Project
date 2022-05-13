/*
// Developed By: Isaac Grubb
This an edited version of a project i did for ML5 module
It has a Partical section which follow the key points of the skeleton. It also has a sound classification model which i trained on diffrent and claps. This is also not relevent.
Since i am only using the skeleton to show the audiance their reflection inhave commented it out.

// This the property of isaac grubb
*/

let video; 
let poseNet;
let poses = [];

var capture;

// creating keypoint items

let leftHand = { x: 0, y: 0 };
let rightHand = { x: 0, y: 0 };

let  leftShoulder = { x: 0, y: 0 };
let  rightShoulder = { x: 0, y: 0 };
let  leftElbow = { x: 0, y: 0 };
let  rightElbow = { x: 0, y: 0 };
let  leftWrist = { x: 0, y: 0 };
let  rightWrist = { x: 0, y: 0 };
let  leftHip = { x: 0, y: 0 };
let  rightHip = { x: 0, y: 0 };
let  leftKnee = { x: 0, y: 0 };
let  rightKnee = { x: 0, y: 0 };
let  leftAnkle = { x: 0, y: 0 };
let  rightAnkle = { x: 0, y: 0 };
		
//number of particles
let MAX_PARTICLES = 100;
let particles = [];
let particle_texture=null;

let controlPos;
let controlPos2;
let controlPos3;
let controlPos4;
let controlPos5;
let controlPos6;
let controlPos7;
let controlPos8;
let controlPos9;
let controlPos10;
let controlPos11;
let controlPos12;

let classifier,
    options = { probabilityThreshold: 0.7 },
    label = "listening",
    confidence = 0.0;

//implementation of the models
let soundModelURL = 'https://teachablemachine.withgoogle.com/models/4J13Z7qY6/model.json';

function preload(){
    particle_texture = loadImage("assets/particle_texture.png");
  
   classifier = ml5.soundClassifier(soundModelURL, options, modelReady);
}


function setup() {
//    createCanvas(640, 480);
    //making the canvas 
    createCanvas(1920, 1080);
    video = createCapture(VIDEO);
    video.size(1920, 1080);
    video.hide();
  
  // background(255);
    
    //calling the single pose detection posenet. 
    //controling the confidence of the pose detection. 
    let options = {
         imageScaleFactor: 0.3,
         flipHorizontal: true, 
         minConfidence: 0.8,
         maxPoseDetections: 1,
         scoreThreshold: 0.8,
         detectionType: 'single',
      
      
//  architecture: 'MobileNetV1',
//  imageScaleFactor: 0.3,
//  outputStride: 16,
//  flipHorizontal: true,
//  minConfidence: 0.5,
//  maxPoseDetections: 1,
//  scoreThreshold: 0.5,
//  nmsRadius: 20,
//  detectionType: 'single',
//  inputResolution: 513,
//  multiplier: 0.75,
//  quantBytes: 2,

      
    }
    
    poseNet = ml5.poseNet(video, options,modelReady);

     
    poseNet.on('pose', function (results) {
        poses = results;
    });
    
    controlPos = p5.Vector.random2D();
    controlPos2 = p5.Vector.random2D();
  controlPos3 = p5.Vector.random2D();
    controlPos4 = p5.Vector.random2D();
  controlPos5 = p5.Vector.random2D();
    controlPos6 = p5.Vector.random2D();
  controlPos7 = p5.Vector.random2D();
    controlPos8 = p5.Vector.random2D();
    controlPos9 = p5.Vector.random2D();
  controlPos10 = p5.Vector.random2D();
    controlPos11 = p5.Vector.random2D();
  controlPos12 = p5.Vector.random2D();
  

    for (let i = 0; i < MAX_PARTICLES; i++) {
        let particle = new Particle(random(0.5, 3), random(50, 100), random(height));
        particles.push(particle);
      }
      ellipseMode(CENTER);

  classifier.classify(gotResult);

}


function modelReady() {
  console.log('poseNet ready');
}

function draw() {
    background(22,55);

   push();
  translate(width,0);
  scale(-1, 1);
    //commenting out the webcam image
  // image(video, 0, 0);
  
  video.loadPixels();
  
   pop();
  
  //drawing the skeleton/ face
    drawKeypoints();
    drawSkeleton();
  
  fill(100);
  strokeWeight(3);
  stroke(160);
  textSize(20);
  textAlign(LEFT);
  // textAlign(20,40);
//  text(label, 0, 10, width, 50);
  
  textSize(20);
  textAlign(LEFT);
//  text(confidence, 10, 460, width - 10, 20);

  
  console.log(label);

  // if statments to trigger the controlForce. If the label is called and it is 0.68 confident that it is true. Increasing the confidence requirement then it is alot less interactive as obviously the people i modeled arnt the ones clapping
  
//   if (label == 'Isaac' && confidence >= 0.68) {
     
//     //I have left this blank so the particles have no direction if this is triggered 
        
//   }else if (label == 'Alice' && confidence >= 0.68){
    
//     for (let i = 0; i < particles.length; i++) {

//         let controlForce = particles[i].seek(controlPos7); 
//         controlForce.mult(18.0);
//         particles[i].applyForce(controlForce);
//       }
    
//   }else if (label == 'Claudia' && confidence >= 0.68){
    
//      for (let i = 0; i < particles.length; i++) {

//         let controlForce = particles[i].seek(controlPos8); 
//         controlForce.mult(18.0);
//         particles[i].applyForce(controlForce);
//       }
    
//   }else if (label == 'Louis' && confidence >= 0.68){
    
//     for (let i = 0; i < particles.length; i++) {

//         let controlForce = particles[i].seek(controlPos9); 
//         controlForce.mult(18.0);
//         particles[i].applyForce(controlForce);
//       }
    
//   }else{
    
  noStroke();
  noFill();
    
         
        for (let i = 0; i < particles.length; i++) {
       
      
        let controlForce = particles[i].seek(controlPos5 ); 
     
        controlForce.mult(2.0);
       
      
      particles[i].applyForce(controlForce);
      
      }
     
  // }
  
//  for (let i = 0; i < particles.length; i++) {
//    particles[i].run(particles);
//  }
              
    
}

function modelReady() {
  // classify sound
  classifier.classify(gotResult);
  
}

function gotResult(error, results) {
  if (error) {
    // check for error
    return console.log(error);
  }
  
  console.log(results);
  
  // save these values
  label = results[0].label;
  confidence = nf(results[0].confidence, 0, 2); // Round the confidence to 0.01
}


function drawKeypoints() {
   
  //this is where ive created keypoints for the particles to follow an attached them to pose locations
    if (poses.length > 0) {
        for (let i = 0; i < 1; i++) {
       
            let pose = poses[i].pose;

           
            let nose = pose.keypoints[0];
            let leftEar = pose.keypoints[3];
            let rightEar = pose.keypoints[4];

            
             leftShoulder = {
                x: pose.keypoints[5].position.x, y: pose.keypoints[5].position.y
            }
            rightShoulder = {
                x: pose.keypoints[6].position.x, y: pose.keypoints[6].position.y
            }
          leftElbow = {
                x: pose.keypoints[7].position.x, y: pose.keypoints[7].position.y
            }
            rightElbow = {
                x: pose.keypoints[8].position.x, y: pose.keypoints[8].position.y
            }
          leftWrist = {
                x: pose.keypoints[9].position.x, y: pose.keypoints[9].position.y
            }
            rightWrist = {
                x: pose.keypoints[10].position.x, y: pose.keypoints[10].position.y
            }
          leftHip = {
                x: pose.keypoints[11].position.x, y: pose.keypoints[11].position.y
            }
          // leftHip = {
          //       x: 30, y: 30
          //   }
            rightHip = {
                x: pose.keypoints[12].position.x, y: pose.keypoints[12].position.y
            }
          // rightHip = {
          //       x: 30, y: 450
          //   }
          leftKnee = {
                x: pose.keypoints[13].position.x, y: pose.keypoints[13].position.y
            }
          
          // leftKnee = {
          //       x:  620, y: 30
          //   }
          
            rightKnee = {
                x: pose.keypoints[14].position.x, y: pose.keypoints[14].position.y
            }
          // rightKnee = {
          //       x: 620, y: 450
          //   }
          
          leftAnkle = {
                x: pose.keypoints[15].position.x, y: pose.keypoints[15].position.y
            }
            rightAnkle = {
                x: pose.keypoints[16].position.x, y: pose.keypoints[16].position.y
            }
          
          
            push();
            noFill();
          // fill(255);
          stroke(255);
          strokeWeight(1);
          
            // ellipse(leftHand.x, leftHand.y, 10, 10);
            // ellipse(rightHand.x, rightHand.y, 10, 10);
//           rect(pose.rightEye.x, pose.rightEye.y, 1, 9);
//     rect(pose.leftEye.x, pose.leftEye.y, 1, 8);
    
//     rect(pose.rightEar.x, pose.rightEar.y, 1, 8);
//     rect(pose.leftEar.x, pose.leftEar.y, 1, 10);
//     rect(pose.nose.x, pose.nose.y, 1, 9);
       
//     rect(pose.rightWrist.x, pose.rightWrist.y, 1, 9);
//     rect(pose.leftWrist.x, pose.leftWrist.y, 1, 8);
//     rect(pose.leftAnkle.x, pose.leftAnkle.y, 1, 10);
//     rect(pose.rightAnkle.x, pose.rightAnkle.y, 1, 11);
//     rect(pose.leftElbow.x, pose.leftElbow.y, 1, 6);
//     rect(pose.rightElbow.x, pose.rightElbow.y, 1, 12);
//     rect(pose.leftKnee.x, pose.leftKnee.y, 1, 13);
//     rect(pose.rightKnee.x, pose.rightKnee.y, 1, 7);
          
//           for (let i = 0; i < pose.keypoints.length; i++) {
//       let x = pose.keypoints[i].position.x;
//       let y = pose.keypoints[i].position.y;
//       //fill(x, y, 255, 255);
//       // rect(x, y, 1, 8);
//     }
 
          
//            push()
   
//     for (let i = 0; i < poses.length; i++) {
//         let skeleton = poses[i].skeleton;
      
//         for (let j = 0; j < skeleton.length; j++) {
//             let partA = skeleton[j][0];
//             let partB = skeleton[j][1];
        
//             // strokeWeight(4);
//           strokeWeight(4);
//             stroke(241, 229, 172);
//             line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
//         }
        
//     }
  


//     pop();
          
            //drawing the face keypoints in a triangle. make it look diffrent to the body
            pop();

            push();
            stroke(241, 229, 172);
            strokeWeight(1);
            noFill();
            triangle(nose.position.x, nose.position.y, leftEar.position.x, leftEar.position.y, rightEar.position.x, rightEar.position.y);
            pop();
          
          
          
          // push();
          //   stroke(241, 229, 172);
          //   strokeWeight(1);
          //   noFill();
          //   line(leftShoulder.position.x, rightHip.position.y,rightHip.position.x,leftShoulder.position.y);
          //   pop();
          
            // initialising control points attached to key points

            controlPos = createVector(leftShoulder.x, leftShoulder.y);
          
            controlPos2 = createVector(rightShoulder.x,rightShoulder.y);
       
          controlPos3 = createVector(leftElbow.x, leftElbow.y);
          
            controlPos4 = createVector(rightElbow.x,rightElbow.y);
          
          controlPos5 = createVector(leftWrist.x,leftWrist.y);
          // controlPos5 = createVector((leftWrist.x, leftWrist.y),(rightWrist.x,rightWrist.y));
          
            controlPos6 = createVector(rightWrist.x,rightWrist.y);
          
          controlPos7 = createVector(leftHip.x, leftHip.y);
          // controlPos7 = createVector(rect(30,30,40,40));
          
            controlPos8 = createVector(rightHip.x,rightHip.y);
          
          controlPos9 = createVector(leftKnee.x, leftKnee.y);
          
            controlPos10 = createVector(rightKnee.x,rightKnee.y);
          
          controlPos11 = createVector(leftAnkle.x, leftAnkle.y);
          
            controlPos12 = createVector(rightAnkle.x, rightAnkle.y);
                    
  
        }
    }

}

function drawSkeleton() {
  // this where you can control the drawing of the skeleton
    //drawing the skeleton
    push()
   //for loop going through all the keypoints and crating lines inbetween eachone in order.
    for (let i = 0; i < poses.length; i++) {
        let skeleton = poses[i].skeleton;
      
        for (let j = 0; j < skeleton.length; j++) {
            let partA = skeleton[j][0];
            let partB = skeleton[j][1];
        
            // strokeWeight(4);
          strokeWeight(7);
            //bright stroke to make it stand out
            stroke(241, 229, 172);
            line(partA.position.x, partA.position.y, partB.position.x, partB.position.y);
        }
        
    }
  


    pop();
}

