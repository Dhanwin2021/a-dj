song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
status=0;
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
        if((leftWristX>0)&&(leftWristY>0)){
            song2.stop();
            song1.play();
            song1.setVolume(1);
            song1.rate(1);
            document.getElementById("songname").innerHTML="Playing ~ DJ music";
        }
        if((rightWristX>0)&&(rightWristY>0)){
            song1.stop();
            song2.play();
            song2.setVolume(1);
            song2.rate(1);
            document.getElementById("songname").innerHTML="Playing ~ Harry Potter Theme Song";
        }
    }
}