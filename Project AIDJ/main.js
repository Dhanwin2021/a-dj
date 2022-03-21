song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
scoreleftwrist=0;
scorerightwrist=0;
status1="";
status2="";
function preload(){
    song1=loadSound('music.mp3');
    song2=loadSound('Harry.mp3');
}
    function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function draw(){
    image(video,0,0,600,500);
   status1=song1.isPlaying();
   status2=song2.isPlaying();
   fill('#FF0000');
   stroke('#FF0000');

   if(scoreleftwrist > 0.2){
       circle(leftWristX,leftWristY,20);
       song2.stop();
       if(status1==false){
           song1.play();
           document.getElementById("songname").innerHTML="Playing - DJ remix";
       }
   }

   if(scorerightwrist > 0.2){
    circle(rightWristX,rightWristY,20);
    song1.stop();
    if(status2==false){
        song2.play();
        document.getElementById("songname").innerHTML="Playing - Harry Potter Theme Song";
    }
}
}
function modelLoaded(){
    console.log('PoseNet Is Initialised');
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        leftWristX=results[0].pose.leftWrist.x;
        leftWristY=results[0].pose.leftWrist.y;
        rightWristX=results[0].pose.rightWrist.x;
        rightWristY=results[0].pose.rightWrist.y;
        scoreleftwrist=results[0].pose.keypoints[9].score;
        scorerightwrist=results[0].pose.keypoints[10].score;
        }
}