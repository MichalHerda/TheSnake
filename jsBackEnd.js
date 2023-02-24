//-------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------FILL ARRAYS OF GAME AREA COORDINATES---------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
    function xCooFill(gameArea, xCooNumber) {
        xCoo = [];                                                                          // reset
        let xCooSize = gameArea.width/xCooNumber;                                           // calculate "pixel" size
            for(let i = 0; i < xCooNumber; i++) {                                           // fill array
                xCoo.push (i * xCooSize);
            }
        return xCoo;
    }
//------------------------------------------------------------------------------------------------------------------------------------------
    function yCooFill(gameArea, yCooNumber) {
        yCoo = [];                                                                          // this is sister function
        let yCooSize = gameArea.height/yCooNumber;                                          // of xCooFill
            for(let i = 0; i < yCooNumber; i++) {                                           // perhaps they would be merged in future
                yCoo.push (i * yCooSize);
            }
        return yCoo;
    }
//-------------------------------------------------------------------------------------------------------------------------------------------
    function rndGenerator (itemsNo) {
        let rndNo = Math.floor(Math.random() * (itemsNo - 0));                              // function generates random number
        return rndNo;                                                                       // in range: ( 0 - itemsNo )
    }
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------FUNCTIONS TO FILL QML LIST MODELS IN REPEATERS------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
    function add(xCoo, yCoo, xCooNumber, yCooNumber, food, foodNo, foodBeginNo) {
        for (let i = 0; i < foodNo; i++) {
            let foodX = xCoo[Js.rndGenerator(xCooNumber)];
            let foodY = yCoo[Js.rndGenerator(yCooNumber)];

            food.append ({foodX,foodY});
            foodBeginNo ++;
            console.log("foodX:      ", foodX);
            console.log("foodY:      ", foodY);
            console.log("Add food    ");
        }
    }
//---------------------------------------------------------------------------------------------------------------------------------------------
    function raiseSnake(xCoo, yCoo, xCooNumber, yCooNumber, segmentBeginNo, segmentNo, segmentWidth) {
        for (let i = 0; i < segmentNo; i++) {
            let snakeX = xCoo [Math.floor(xCooNumber/2.5)] - (segmentBeginNo * segmentWidth);
            let snakeY = yCoo [Math.floor(yCooNumber/2)];
            snake.append({ snakeX, snakeY});
            segmentBeginNo ++;
            console.log("Add segment    ");
            console.log("snakeX: ",snakeX)
            console.log("snakeY: ",snakeY)
        }
    }
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------GAME FUNCTIONS--------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------  
   function snakeMove(gameArea, segmentNo, snakeRepeater, horizont, direction, segmentWidth, segmentHeight) {
       let preBuforX = 0;
       let preBuforY = 0;

       for (let i = 0; i < segmentNo; i ++) {
           var segment = snakeRepeater.itemAt(i);

           if (horizont === true) {                                                         // moving vertically
               if(direction === true) {                                                     // move right

                   if( i === 0) {
                       buforX = segment.x;
                       buforY = segment.y;
                       segment.x += segmentWidth;
                   }
                   else {
                       preBuforX = segment.x;
                       preBuforY = segment.y;
                       segment.x = buforX;
                       segment.y = buforY;
                       buforX = preBuforX;
                       buforY = preBuforY;
                   }
               }
               else                                                                         // move left
               {
                   if( i === 0) {
                       buforX = segment.x;
                       buforY = segment.y;
                       segment.x -= segmentWidth;
                   }
                   else {
                       preBuforX = segment.x;
                       preBuforY = segment.y;
                       segment.x = buforX;
                       segment.y = buforY;
                       buforX = preBuforX;
                       buforY = preBuforY;
                   }
               }
           }
           if (horizont === false) {                                                        // moving horizontally
               if(direction === true) {                                                     // move down
                   if( i === 0) {
                       buforX = segment.x;
                       buforY = segment.y;
                       segment.y += segmentHeight;
                   }
                   else {
                       preBuforX = segment.x;
                       preBuforY = segment.y;
                       segment.x = buforX;
                       segment.y = buforY;
                       buforX = preBuforX;
                       buforY = preBuforY;
                   }
               }
               else                                                                         //move up
               {
                   if( i === 0) {
                       buforX = segment.x;
                       buforY = segment.y;
                       segment.y -= segmentHeight;
                   }
                   else {
                       preBuforX = segment.x;
                       preBuforY = segment.y;
                       segment.x = buforX;
                       segment.y = buforY;
                       buforX = preBuforX;
                       buforY = preBuforY;
                   }
               }
           }
           resetCoordinates(segment, gameArea);
       }
   }
//------------------------------------------------------------------------------------------------------------------------------------------
function resetCoordinates(segment, gameArea) {
        if(segment.x > gameArea.width - segment.width) {                                 // this function checks if snake goes
            segment.x = 0;                                                               // outside gameArae
        }                                                                                // and change coordinates if does
        if(segment.x < 0) {
            segment.x = gameArea.width - segment.width;
        }
        if(segment.y > gameArea.height - segment.height) {
            segment.y = 0;
        }
        if(segment.y < 0) {
            segment.y = gameArea.height - segment.height;
        }
}
//------------------------------------------------------------------------------------------------------------------------------------------
  function pushSnakeForward (preBuforX, preBuforY, segment, buforX, buforY ) {

   }
//------------------------------------------------------------------------------------------------------------------------------------------
   function colisionDetection() {

   }
//------------------------------------------------------------------------------------------------------------------------------------------


