const fileInput = document.getElementById("imageUpload");
const imgView = document.getElementById("uploadedImage");
const greyConvert = document.getElementById("convertGrayscale");
const greyView = document.getElementById("grayscaleImage");
const reader = new FileReader();
fileInput.addEventListener("change", function(e){
    reader.addEventListener("load",() => {
        imgView.src = reader.result;
    });
    reader.readAsDataURL(e.target.files[0]);
});
greyConvert.addEventListener("click",() => {
    if (imgView.src!=""){
        greyView.width = imgView.naturalWidth;
        greyView.height = imgView.naturalHeight;
        let ctx=greyView.getContext("2d",{ willReadFrequently: true });
        ctx.drawImage(imgView, 0, 0, ctx.canvas.width, ctx.canvas.height);
        let imgDetails = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);
        let imgPxs = imgDetails.data;
        for (var i = 0; i < imgPxs.length; i += 4) {
            let pxLightness = parseInt((imgPxs[i] + imgPxs[i + 1] + imgPxs[i + 2]) / 3);
            imgPxs[i] = pxLightness;
            imgPxs[i + 1] = pxLightness;
            imgPxs[i + 2] = pxLightness;
        };
        ctx.putImageData(imgDetails, 0, 0);
    };
});