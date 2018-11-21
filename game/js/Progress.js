/*  This function is being called by unity's loader every time 
    there is download progress. */

function Progress(gameInstance, progress) {
  this.message = "Loading...";

  if (!gameInstance.Module)
    return;
    
  if (progress < 0.9) {
    this.message = "Downloading";
  }

  if (progress >= 0.9) {
    this.message = "Preparing";
    document.getElementById("spinner").style.display = "inherit";
    document.getElementById("bgBar").style.display = "none";
    document.getElementById("progressBar").style.display = "none";
  }
  
  if (progress == "complete") {
    document.getElementById("loadingBox").style.display = "none";
  }

  var length = 100 * Math.min(progress, 1);
  bar = document.getElementById("progressBar")
  bar.style.width = length + "%";
  document.getElementById("loadingInfo").innerHTML = this.message;
};