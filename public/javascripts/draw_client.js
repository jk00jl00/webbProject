

let paint,
    clickX = new Array(),
    clickY = new Array(),
    clickDrag = new Array(),
    draw_canvas = document.getElementById("drawing_canvas"),
    guess_canvas = document.getElementById("guess_canvas"),
    ctx,
    offsetLeft,
    offsetTop;

if(draw_canvas){
    ctx = draw_canvas.getContext("2d"),
    offsetLeft = draw_canvas.offsetLeft,
    offsetTop = draw_canvas.offsetTop;
} else{
    ctx = guess_canvas.getContext("2d"),
    offsetLeft = guess_canvas.offsetLeft,
    offsetTop = guess_canvas.offsetTop;

    var img = new Image;
    img.onload = function(){
        ctx.drawImage(img,0,0);
    };
    img.src = document.getElementById("imdata").value;
}

function addClick(x, y, dragging)
{
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}

function redraw(){
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clears the canvas

    ctx.strokeStyle = "#000";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;


                
    for(var i=0; i < clickX.length; i++) {		
        ctx.beginPath();

        if(clickDrag[i] && i){
            ctx.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            ctx.moveTo(clickX[i]-1, clickY[i]);
        }
        ctx.lineTo(clickX[i], clickY[i]);
        ctx.closePath();
        ctx.stroke();
    }
}

function sendConfirmation(data){
    var httpPost = new XMLHttpRequest(),
    path = "/confirm",
    data = JSON.stringify({correct: data});

    httpPost.onreadystatechange = function(err) {
        if (httpPost.readyState == 4 && httpPost.status == 200){
            location.reload();
        } else {
            console.log(err);
        }
    };
    // Set the content type of the request to json since that's what's being sent
    httpPost.open("POST", path, true);
    httpPost.setRequestHeader('Content-Type', 'application/json');
    httpPost.send(data);
}

function sendImage(){
    var httpPost = new XMLHttpRequest(),
    path = "/draw",
    base64 = draw_canvas.toDataURL("image/png"),
    data = JSON.stringify({image: base64, class: document.getElementById("class").value});

    httpPost.onreadystatechange = function(err) {
        if (httpPost.readyState == 4 && httpPost.status == 200){
            console.log(httpPost.responseText);
            
            sendConfirmation(confirm("Is this a " + httpPost.responseText));

            
        } else {
            console.log(err);
        }
    };
    // Set the content type of the request to json since that's what's being sent
    httpPost.open("POST", path, true);
    httpPost.setRequestHeader('Content-Type', 'application/json');
    httpPost.send(data);
}

function sendGuess(){
    var httpPost = new XMLHttpRequest(),
    path = "/guess",
    data = JSON.stringify({id: document.getElementById("imid").value, guess: document.getElementById("class").value.toLowerCase()});

    httpPost.onreadystatechange = function(err) {
        if (httpPost.readyState == 4 && httpPost.status == 200){
            console.log(httpPost.responseText);
            let message = (httpPost.responseText == 'true')? "You guessed correctly": "Incorrect answer try again"; 

            alert(message);
            location.reload();

        } else {
            console.log(err);
        }
    };
    // Set the content type of the request to json since that's what's being sent
    httpPost.open("POST", path, true);
    httpPost.setRequestHeader('Content-Type', 'application/json');
    httpPost.send(data);
}

if(draw_canvas){
    document.getElementById("submitButton").onclick = sendImage;

    draw_canvas.addEventListener("mousedown" , ((e) => {
        var mouseX = e.pageX - offsetLeft;
        var mouseY = e.pageY - offsetTop;
                
        paint = true;
        addClick(e.pageX - offsetLeft, e.pageY - offsetTop);
        redraw();
    }));

    draw_canvas.addEventListener("mouseup" , ((e) => {
        paint = false;
    }));

    draw_canvas.addEventListener("mousemove" , ((e) => {
        if(paint){
            addClick(e.pageX - offsetLeft, e.pageY-offsetTop, true);
            redraw();
        }
    }));

    draw_canvas.addEventListener("mouseleave" , ((e) => {
        paint = false;
    }));
} else{
    document.getElementById("submitButton").onclick = sendGuess;
}