//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------FILL ARRAYS OF GAME AREA COORDINATES--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
    function xCooFill(gameArea, xCooNumber) {
        xCoo = [];                                                                          // reset
        let xCooSize = gameArea.width/xCooNumber;                                           // calculate "pixel" size
            for(let i = 0; i < xCooNumber; i++) {                                           // fill array
                xCoo.push (i * xCooSize);
            }
        return xCoo;
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
    function yCooFill(gameArea, yCooNumber) {
        yCoo = [];                                                                          // this is sister function
        let yCooSize = gameArea.height/yCooNumber;                                          // of xCooFill
            for(let i = 0; i < yCooNumber; i++) {                                           // perhaps they would be merged in future
                yCoo.push (i * yCooSize);
            }
        return yCoo;
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
    function rndGenerator (itemsNo) {
        let rndNo = Math.floor(Math.random() * (itemsNo - 0));                              // function generates random number
        return rndNo;                                                                       // in range: ( 0 - itemsNo )
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------FUNCTIONS TO FILL QML LIST MODELS IN REPEATERS-----------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
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
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------GAME FUNCTIONS--------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
   function snakeMove(gameArea, segmentNo, snakeRepeater, horizont, direction, segmentWidth, segmentHeight) {
       let preBuforX = 0;
       let preBuforY = 0;
       let buforX = 0;
       let buforY = 0;

       for (let i = 0; i < segmentNo; i ++) {
           var segment = snakeRepeater.itemAt(i);
//-------------------------------------------------------------------------------------------------------------------------------------------------------
            if ( i === 0 ) {                                                                // First snakeRepeater array item is responsible for giving
                                                                                            // whole snake direction

               if (horizont === true) {                                                     // MOVING VERTICALLY :

                   if(direction === true) {                                                 // move right
                           buforX = segment.x;
                           buforY = segment.y;
                           segment.x += segmentWidth;
                   }

                   if(direction === false) {                                                // move left
                           buforX = segment.x;
                           buforY = segment.y;
                           segment.x -= segmentWidth;

                   }
               }                                                                            // bool horizont brace
//-------------------------------------------------------------------------------------------------------------------------------------------------------
               if (horizont === false) {                                                    // MOVING HORIZONTALLY :

                   if(direction === true) {                                                 // move down
                           buforX = segment.x;
                           buforY = segment.y;
                           segment.y += segmentHeight;
                   }

                   if(direction === false) {                                                //move up
                           buforX = segment.x;
                           buforY = segment.y;
                           segment.y -= segmentHeight;
                   }
               }                                                                            // bool horizont brace
            }                                                                               // checking loop index brace
//-------------------------------------------------------------------------------------------------------------------------------------------------------
           if ( i !== 0 ) {                                                                 // The rest of snakeRepeater array items are replacing
                                                                                            // in the following formula:
               preBuforX = segment.x;                                                       // item 1 = item 0 (coordinates)
               preBuforY = segment.y;                                                       // item 2 = item 1
               segment.x = buforX;                                                          // item 3 = item 2
               segment.y = buforY;                                                          // etc.....
               buforX = preBuforX;
               buforY = preBuforY;
           }                                                                                // checking loop index brace
           resetCoordinates(segment, gameArea);                                             // check is snake in gameArea
       }                                                                                    // loop brace
   }
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
function resetCoordinates(segment, gameArea) {
        if(segment.x > gameArea.width - segment.width) {                                    // this function checks if snake goes
            segment.x = 0;                                                                  // outside gameArae
        }                                                                                   // and change coordinates if does
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
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
   function colisionDetection() {

   }
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------

