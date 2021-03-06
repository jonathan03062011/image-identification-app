camera=document.getElementById("camera");
Webcam.attach(camera);

Webcam.set({
    width:360,
    height:300,
    image_format:'png',
    png_quality:90
});


function takesnapshot()
{
  Webcam.snap(function(data_uri){
      document.getElementById("output").innerHTML="<img id='capturedimage' src='"+data_uri+"'>";
  });
}

console.log('ml5 version:',ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/yfXWA7mn5/model.json',modelLoaded);

function modelLoaded()
{
    console.log("model loaded");
}

function check()
{
    img=document.getElementById("capturedimage");
    classifier.classify(img,gotResult);
}
function gotResult(error,results)
{
   if(error)
   {
       console.log(error)
   }
   else{
        console.log(results);

   }
   document.getElementById("objectname").innerHTML=results[0].label;
   document.getElementById("accuracyobject").innerHTML=results[0].confidence.toFixed(3);
}