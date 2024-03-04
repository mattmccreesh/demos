jQuery(function($){
    var fileDiv = document.getElementById("select-image");
    var fileInput = document.getElementById("upload-image");
    var upload_button = document.getElementById("upload-button");
    upload_button.addEventListener("click",async function(e){
        if (fileInput.files.length != 0) {
            var result = await fetch("/cat", {
                    method: "POST",
                    body: fileInput.files[0],
                });
            if (result.status == 200) {
                console.log("Success")
                window.location.assign("/cat")
                //window.location.assign(result.url)
            }
            else {
                console.log("Failure")
                window.location.assign("/noncat")
            }
        }
        else {
            console.log("Null input");
        }
        e.preventDefault();
      },false)
    
    fileInput.addEventListener("change",function(e){
      var files = this.files;
      showThumbnail(files)
    },false)
    
    fileDiv.addEventListener("click",function(e){
      $(fileInput).show().focus().click().hide();
      e.preventDefault();
    },false)
    
    fileDiv.addEventListener("dragenter",function(e){
      e.stopPropagation();
      e.preventDefault();
    },false);
    
    fileDiv.addEventListener("dragover",function(e){
      e.stopPropagation();
      e.preventDefault();
    },false);
    
    fileDiv.addEventListener("drop",function(e){
      e.stopPropagation();
      e.preventDefault();
    
      var dt = e.dataTransfer;
      fileInput.files = dt.files;
      var files = dt.files;
    
      showThumbnail(files)
    },false);
    
    function showThumbnail(files){
      for(var i=0;i<files.length;i++){
        var file = files[i]
        var imageType = /image.*/
        if(!file.type.match(imageType)){
          console.log("Not an Image");
          continue;
        }
    
        var thumbnail = document.getElementById("thumbnail");

        // Only allow selecting 1 photo
        if (thumbnail.hasChildNodes()){
            var image = document.getElementById("upload-img");
            image.file = file;

            var reader = new FileReader();
            reader.onload = (function(aImg){
                return function(e){
                    aImg.src = e.target.result;
                };
            }(image));
            var ret = reader.readAsDataURL(file);
            var canvas = document.createElement("canvas");
            ctx = canvas.getContext("2d");
            image.onload= function(){
                ctx.drawImage(image,100,100)
            }
        }
        else {
            var image = document.createElement("img");
            image.id = "upload-img";
            image.file = file;
            thumbnail.appendChild(image);
        
            var reader = new FileReader();
            reader.onload = (function(aImg){
                return function(e){
                    aImg.src = e.target.result;
                };
            }(image));
            var ret = reader.readAsDataURL(file);
            var canvas = document.createElement("canvas");
            ctx = canvas.getContext("2d");
            image.onload= function(){
                ctx.drawImage(image,100,100);
            }
        }
      }
    }
});