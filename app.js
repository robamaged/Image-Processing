//Displays the original image after being uploaded

function displayOriginalImage(event) {

  if (event.files.length != 0) {

    if (checkFileName(event.files[0].name)) {

      document.getElementById("inputImage").src = window.URL.createObjectURL(event.files[0]);

      document.getElementById("originalImage").style.display = "initial";

      document.getElementById("transformation").style.display = "initial";

      document.getElementById("result").style.display = "none";

    }

  }

}



//Makes sure the uploaded file is a png or jpg image

function checkFileName(fileName) {

  if (fileName == "") {

    alert("Browse to upload a valid File with png or jpg extension");

    return false;

  }

  else if (fileName.split(".")[1].toUpperCase() == "PNG" || fileName.split(".")[1].toUpperCase() == "JPG")

    return true;

  else {

    alert("File with " + fileName.split(".")[1] + " is invalid. Upload a valid file with png or jpg extensions");

    return false;

  }

}



//Displays the corresponding form to the selected transformation and hides the other forms

function showTransformForm() {

  const increaseBrightnessForm = document.getElementById("increaseBrightnessForm");

  const decreaseBrightnessForm = document.getElementById("decreaseBrightnessForm");

  //Write your code here for the other forms

  const increaseContrastForm = document.getElementById("increaseContrastForm");

  const decreaseContrastForm = document.getElementById("decreaseContrastForm");

  const inverseForm = document.getElementById("inverseForm");

  const mylist = document.getElementById("myList");



  //Storing the type chosen in a variable

  transformType = mylist.options[mylist.selectedIndex].text;



  //Displaying to the user the type he chose by changing the text element of id= transformType to the selected type

  document.getElementById("transformType").value = mylist.options[mylist.selectedIndex].text;



  if (transformType == "Increase Brightness") {

    document.getElementById("increaseBrightnessInputs").style.display = "initial";

    document.getElementById("decreaseBrightnessInputs").style.display = "none";

    document.getElementById("increaseContrastInputs").style.display = "none";

    document.getElementById("decreaseContrastInputs").style.display = "none";

    document.getElementById("Inverse").style.display = "none";

  } else if (transformType == "Decrease Brightness") {

    //write your code here

    document.getElementById("increaseBrightnessInputs").style.display = "none";

    document.getElementById("decreaseBrightnessInputs").style.display = "initial";

    document.getElementById("increaseContrastInputs").style.display = "none";

    document.getElementById("decreaseContrastInputs").style.display = "none";

    document.getElementById("Inverse").style.display = "none";

  } else if (transformType == "Increase Contrast") {

    //Write your code here

    document.getElementById("increaseBrightnessInputs").style.display = "none";

    document.getElementById("decreaseBrightnessInputs").style.display = "none";

    document.getElementById("increaseContrastInputs").style.display = "initial";

    document.getElementById("decreaseContrastInputs").style.display = "none";

    document.getElementById("Inverse").style.display = "none";

  } else if (transformType == "Decrease Contrast") {

    //Write your code here

    document.getElementById("increaseBrightnessInputs").style.display = "none";

    document.getElementById("decreaseBrightnessInputs").style.display = "none";

    document.getElementById("increaseContrastInputs").style.display = "none";

    document.getElementById("decreaseContrastInputs").style.display = "initial";

    document.getElementById("Inverse").style.display = "none";

  } else {

    //Write your code here

    document.getElementById("increaseBrightnessInputs").style.display = "none";

    document.getElementById("decreaseBrightnessInputs").style.display = "none";

    document.getElementById("increaseContrastInputs").style.display = "none";

    document.getElementById("decreaseContrastInputs").style.display = "none";

    document.getElementById("Inverse").style.display = "initial";
  }



  // Listener to the event of submiting the increase brightness form

  increaseBrightnessForm.addEventListener("submit", (e) => {

    e.preventDefault()

    var ib = document.getElementById("ib").value

    increaseBrightness(Number(ib))

  });

  //Write your code here for EventListeners for the other forms using the constants you will create in the transform function

  decreaseBrightnessForm.addEventListener("submit", (e) => {

    e.preventDefault()

    var db = document.getElementById("db").value

    decreaseBrightness(Number(db))

  });

  increaseContrastForm.addEventListener("submit", (e) => {

    e.preventDefault()

    var ib2 = document.getElementById("ib2").value

    var ibb2 = document.getElementById("ibb2").value

    var ibbb2 = document.getElementById("ibbb2").value

    var ibbbb2 = document.getElementById("ibbbb2").value

    increaseContrast(Number(ib2), Number(ibb2), Number(ibbb2), Number(ibbbb2))

  });

  decreaseContrastForm.addEventListener("submit", (e) => {

    e.preventDefault()

    var DOriginalBrightestDark = document.getElementById("DOriginalBrightestDark").value

    var DOriginalDarkestBright = document.getElementById("DOriginalDarkestBright").value

    var DTransformedBrightestDark = document.getElementById("DTransformedBrightestDark").value

    var DTransformedDarkestBright = document.getElementById("DTransformedDarkestBright").value


    decreaseContrast(Number(DOriginalBrightestDark), Number(DOriginalDarkestBright), Number(DTransformedBrightestDark), Number(DTransformedDarkestBright))

  });

  inverseForm.addEventListener("submit", (e) => {

    e.preventDefault();
    inverse();

  });



  //Applies pixel-wise transformations to increase brightness

  function increaseBrightness(ib) {

    const img = document.getElementById("inputImage");

    const canvas = document.getElementById("resultImage");

    const ctx = canvas.getContext('2d');



    var transformedImage = [];

    var val;



    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)

    rgba = getRGBAValues(img, canvas, ctx);



    for (i = 0; i < img.width * img.height * 4; i += 4) {

      val = rgba[i] + ib;

      if (val > 255) {

        val = 255;

      }

      transformedImage.push(val, val, val, rgba[i + 3]);

    }



    displayResultImage(img, transformedImage, ctx);



  }



  //Write your code here for three more functions for the other transformations

  function decreaseBrightness(db) {

    const img = document.getElementById("inputImage");

    const canvas = document.getElementById("resultImage");

    const ctx = canvas.getContext('2d');



    var transformedImage = [];

    var val;



    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)

    rgba = getRGBAValues(img, canvas, ctx);



    for (i = 0; i < img.width * img.height * 4; i += 4) {

      val = rgba[i] - db;

      if (val < 0) {

        val = 0;

      }

      transformedImage.push(val, val, val, rgba[i + 3]);

    }



    displayResultImage(img, transformedImage, ctx);



  }



  function increaseContrast(ib2, ibb2, ibbb2, ibbbb2) {

    const img = document.getElementById("inputImage");

    const canvas = document.getElementById("resultImage");

    const ctx = canvas.getContext('2d');



    var transformedImage = [];

    var val;



    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)

    rgba = getRGBAValues(img, canvas, ctx);



    for (i = 0; i < img.width * img.height * 4; i += 4) {

      if (rgba[i] <= ib2) {
        val = Math.round((ibbb2 / ib2) * (rgba[i]));
      }
      else if (rgba[i] >= ibb2) {
        val = Math.round((((255 - ibbbb2) / (255 - ibb2)) * (rgba[i] - ibb2)) + ibbbb2);
      }
      else {
        val = Math.round((((ibbbb2 - ibbb2) / (ibb2 - ib2)) * (rgba[i] - ib2)) + ibbb2);
      }
      transformedImage.push(val, val, val, rgba[i + 3]);

    }
    displayResultImage(img, transformedImage, ctx);
  }

  function decreaseContrast(DOriginalBrightestDark, DOriginalDarkestBright, DTransformedBrightestDark, DTransformedDarkestBright) {
    const img = document.getElementById("inputImage");
    const canvas = document.getElementById("resultImage");
    const ctx = canvas.getContext('2d');
    var transformedImage = [];
    var val;
    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)
    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      if (rgba[i] <= DOriginalBrightestDark) {
        val = Math.round((DTransformedBrightestDark / DOriginalBrightestDark) * (rgba[i]));
      }
      else if (rgba[i] >= DOriginalDarkestBright) {
        val = Math.round((((255 - DTransformedDarkestBright) / (255 - DOriginalDarkestBright)) * (rgba[i] - DOriginalDarkestBright)) + DTransformedDarkestBright);
      }
      else {
        val = Math.round((((DTransformedDarkestBright - DTransformedBrightestDark) / (DOriginalDarkestBright - DOriginalBrightestDark)) * (rgba[i] - DOriginalBrightestDark)) + DTransformedBrightestDark);
      }
      transformedImage.push(val, val, val, rgba[i + 3]);
    }

    displayResultImage(img, transformedImage, ctx);
  }


  function inverse() {

    const img = document.getElementById("inputImage");

    const canvas = document.getElementById("resultImage");

    const ctx = canvas.getContext('2d');


    var transformedImage = [];

    var val;

    //Images are displayed in the RGBA format so a greyscale pixel could look like (25,25,25,255)

    rgba = getRGBAValues(img, canvas, ctx);

    for (i = 0; i < img.width * img.height * 4; i += 4) {
      val = 255 - rgba[i];

      transformedImage.push(val, val, val, rgba[i + 3]);

    }



    displayResultImage(img, transformedImage, ctx);



  }



  //Extracts rgba 1D array of all the pixels in the original image

  function getRGBAValues(img, canvas, ctx) {

    canvas.width = img.width;

    canvas.height = img.height;



    ctx.drawImage(img, 0, 0);



    var rgba = ctx.getImageData(

      0, 0, img.width, img.height

    ).data;

    return rgba;

  }



  //Displays the transformed image

  function displayResultImage(img, transformedImage, ctx) {

    //Get a pointer to the current location in the image.

    var palette = ctx.getImageData(0, 0, img.width, img.height); //x,y,w,h

    //Wrap your array as a Uint8ClampedArray

    palette.data.set(new Uint8ClampedArray(transformedImage)); // assuming values 0..255, RGBA, pre-mult.

    //Repost the data.

    ctx.putImageData(palette, 0, 0);

    document.getElementById("result").style.display = "initial";

  }

}  