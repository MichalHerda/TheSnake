//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------FILL ARRAYS OF GAME AREA COORDINATES--------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
    function xCooFill(gameArea, xCooNumber) {
        xCoo = [];                                                                          // reset
        let xCooSize = gameArea.width/xCooNumber;                                           // calculate "pixel" size
            for(let i = 0; i < xCooNumber; i++) {                                           // fill array
                xCoo.push ( (i * xCooSize).toFixed(2) );
            }
        return xCoo;
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
    function yCooFill(gameArea, yCooNumber) {
        yCoo = [];                                                                          // this is sister function
        let yCooSize = gameArea.height/yCooNumber;                                          // of xCooFill
            for(let i = 0; i < yCooNumber; i++) {                                           // perhaps they would be merged in future
                yCoo.push ( (i * yCooSize).toFixed(2) );
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
            //console.log("foodX:      ", foodX);
            //console.log("foodY:      ", foodY);
            //console.log("Add food    ");
        }
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
    function raiseSnake(snake, xCoo, yCoo, xCooNumber, yCooNumber, segmentBeginNo, segmentNo, segmentWidth, snakeCooIndexX, snakeCooIndexY) {
        for (let i = 0; i < segmentNo; i++) {
            let snakeX = xCoo [snakeCooIndexX + (snakeCooIndexX - i)];
            let snakeY = yCoo [snakeCooIndexY];
            snake.append({ snakeX, snakeY});
            segmentBeginNo ++;
            //console.log("Add segment    ");
            //console.log("snakeX: ",snakeX)
            //console.log("snakeY: ",snakeY)
        }
    }
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------GAME FUNCTIONS-------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
   function snakeMove
            (xCoo, yCoo, xCooNumber, yCooNumber, gameArea, segmentNo, snakeRepeater, horizont, direction, segmentWidth, segmentHeight, foodRepeater, food,
             foodBeginNo, foodNo, snakeCooIndexX, snakeCooIndexY, snake) {
       let preBuforX = 0;
       let preBuforY = 0;
       let buforX = 0;
       let buforY = 0;       

       for (let i = 0; i < segmentNo; i ++) {
           let segment = snakeRepeater.itemAt(i);
//------------------------------------------------------------------------------------------------------------------------------------------------------------
            if ( i === 0 ) {                                                                // First snakeRepeater array item is responsible for giving
                                                                                            // whole snake direction
               if (horizont === true) {                                                     // MOVING VERTICALLY :

                   if(direction === true) {                                                 // move right                           
                           buforX = segment.x;
                           buforY = segment.y;
                           segment.x += segmentWidth;
                           segment.x = segment.x.toFixed(2);
                   }

                   if(direction === false) {                                                // move left
                           buforX = segment.x;
                           buforY = segment.y;
                           segment.x -= segmentWidth;
                           segment.x = segment.x.toFixed(2);
                   }
               }                                                                            // bool horizont brace
//------------------------------------------------------------------------------------------------------------------------------------------------------------
               if (horizont === false) {                                                    // MOVING HORIZONTALLY :

                   if(direction === true) {                                                 // move down
                           buforX = segment.x;
                           buforY = segment.y;
                           segment.y += segmentHeight;
                           segment.y = segment.y.toFixed(2);
                   }

                   if(direction === false) {                                                //move up
                           buforX = segment.x;
                           buforY = segment.y;
                           segment.y -= segmentHeight;
                           segment.y = segment.y.toFixed(2);
                   }
               }                                                                            // bool horizont brace
            //console.log("segment Width: ",segmentWidth);
            //console.log("segmentX:",segment.x);
            //console.log("segmentY:",segment.y);
            resetCoordinates(segment, gameArea, segmentWidth, segmentHeight);               // check is snake in gameArea
            collisionDetectionSnake (snakeRepeater, snake, i, segmentWidth, segmentHeight);
            collisionDetectionFood(snakeRepeater, foodRepeater, i, foodBeginNo, foodNo,
                                   xCoo, yCoo, xCooNumber, yCooNumber, food, segmentWidth,
                                   segmentHeight);
            }                                                                               // checking loop index brace
//------------------------------------------------------------------------------------------------------------------------------------------------------------
           if ( i !== 0 ) {                                                                 // The rest of snakeRepeater array items are replacing
                                                                                            // in the following formula:
               preBuforX = segment.x;                                                       // item 1 = item 0 (coordinates)
               preBuforY = segment.y;                                                       // item 2 = item 1
               segment.x = buforX;                                                          // item 3 = item 2
               segment.y = buforY;                                                          // etc.....
               buforX = preBuforX;
               buforY = preBuforY;
            }                                                                               // checking loop index brace                                                        
        }                                                                                   // loop brace
    }
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
function resetCoordinates(segment, gameArea, segmentWidth, segmentHeight) {
        if(Math.round(segment.x) > Math.round(gameArea.width - segmentWidth) ) {            // this function checks if snake goes
            segment.x = 0;                                                                  // outside gameArae
        }                                                                                   // and change coordinates if does
        if(Math.round(segment.x) < 0) {
            segment.x = gameArea.width - segmentWidth;
        }
        if(Math.round(segment.y) > Math.round(gameArea.height - segmentHeight) ) {
            segment.y = 0;
        }
        if(Math.round(segment.y) < 0) {
            segment.y = gameArea.height - segmentHeight;
        }
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
   function collisionDetectionFood (snakeRepeater, foodRepeater, i, foodBeginNo, foodNo, xCoo, yCoo, xCooNumber, yCooNumber, food, segmentWidth, segmentHeight) {
        let snakeHeadX = Math.round(snakeRepeater.itemAt(i).x);
        let snakeHeadY = Math.round(snakeRepeater.itemAt(i).y);                              // round the coordinates
                                                                                             // cause very vierd values
        let foodAcurateX = Math.round(foodRepeater.itemAt(foodBeginNo).x);                   // are returned
        let foodAcurateY = Math.round(foodRepeater.itemAt(foodBeginNo).y);                   // I hope it is enought to avoid bugs

        //console.log( "food normalized  X: ",foodAcurateX,", Y:",foodAcurateY);
        //console.log( "snake normalized X: ",snakeHeadX,", Y:", snakeHeadY);

        if ( (Math.abs(foodAcurateX - snakeHeadX) < (segmentWidth/2) ) && ( Math.abs(foodAcurateY - snakeHeadY ) < (segmentHeight/2) ) ) {            // then compare them
            console.log("___POINT!!!")
            console.log("foodrepeater idx: ", foodRepeater.itemAt(foodBeginNo));
            food.remove(foodBeginNo);                                                       // remove if collision detected
            add(xCoo, yCoo, xCooNumber, yCooNumber, food, foodNo, foodBeginNo);             // add next food item
            foodBeginNo ++;
            console.log("food begin number: ", foodBeginNo);
            addSegmentAfterFoodSwallowing(snakeRepeater, segmentWidth, segmentHeight, snake)
        }
    }
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
    function collisionDetectionSnake (snakeRepeater, snake, i, segmentWidth, segmentHeight) {
        let snakeSegmentsNo = snakeRepeater.count
        console.log("snake items number: ",snakeSegmentsNo);
        for (let z = 1; z < snakeSegmentsNo; z++) {
            console.log("snake segment no ",z,"X: ",snakeRepeater.itemAt(z).x);
            console.log("snake segment no ",z,"Y: ",snakeRepeater.itemAt(z).y);
            if( (snakeRepeater.itemAt(0).x) === (snakeRepeater.itemAt(z).x) && (snakeRepeater.itemAt(0).y) === (snakeRepeater.itemAt(z).y) )
            {console.log("SNAKE IS DEAD !!!");}
        }
    }
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------
    function addSegmentAfterFoodSwallowing(snakeRepeater, segmentWidth, segmentHeight, snake) {
        let snakeX = (snakeRepeater.itemAt((snakeRepeater.count)-1).x).toString();
        console.log("lastX: ",snakeRepeater.itemAt((snakeRepeater.count)-1).x)
        let snakeY = (snakeRepeater.itemAt((snakeRepeater.count)-1).y).toString() ;
        snake.append({ snakeX, snakeY});
        console.log("ARRAY:",snake);
        segmentNo++;
    }
//------------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------------------------

