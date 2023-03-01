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
    function raiseSnake(snake, xCoo, yCoo, xCooNumber, yCooNumber, segmentBeginNo, segmentNo, segmentWidth) {
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
   function snakeMove(gameArea, segmentNo, snakeRepeater, horizont, direction, segmentWidth, segmentHeight, foodRepeater, food, foodBeginNumber, foodNo) {
       let preBuforX = 0;
       let preBuforY = 0;
       let buforX = 0;
       let buforY = 0;       

       for (let i = 0; i < segmentNo; i ++) {
           let segment = snakeRepeater.itemAt(i);
//-------------------------------------------------------------------------------------------------------------------------------------------------------
            if ( i === 0 ) {                                                                // First snakeRepeater array item is responsible for giving
                                                                                            // whole snake direction

               if (horizont === true) {                  // MOVING VERTICALLY :

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
            collisionDetectionFood(snakeRepeater, foodRepeater, i, foodBeginNo, foodNo, xCoo, yCoo, xCooNumber, yCooNumber, food);
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
            }                                                                               // checking loop index brace
           resetCoordinates(segment, gameArea);                                             // check is snake in gameArea        
        }                                                                                   // loop brace
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
   function collisionDetectionFood (snakeRepeater, foodRepeater, i, foodBeginNo, foodNo, xCoo, yCoo, xCooNumber, yCooNumber, food) {
        let snakeHeadX = snakeRepeater.itemAt(i).x.toFixed(2);
        let snakeHeadY = snakeRepeater.itemAt(i).y.toFixed(2);                              // round the coordinates
                                                                                            // cause very vierd values
        let foodAcurateX = foodRepeater.itemAt(foodBeginNo).x.toFixed(2);                   // are returned
        let foodAcurateY = foodRepeater.itemAt(foodBeginNo).y.toFixed(2);

        console.log( "food normalized  X: ",foodAcurateX,", Y:",foodAcurateY);
        console.log( "snake normalized X: ",snakeHeadX,", Y:", snakeHeadY);

        if ( (foodAcurateX === snakeHeadX) && (foodAcurateY === snakeHeadY ) ) {            // then compare them
            console.log("___POINT!!!")
            console.log("foodrepeater idx: ", foodRepeater.itemAt(foodBeginNo));
            food.remove(foodBeginNo);                                                       // remove if collision detected
            add(xCoo, yCoo, xCooNumber, yCooNumber, food, foodNo, foodBeginNo);             // add next food item
            foodBeginNo ++;
            console.log("food begin number: ", foodBeginNo);
        }
    }       
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
    function collisionDetectionSnake () {

    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------
    function directionAllowedForSnake(horizont, direction, snakeRepeater, segmentWidth, segmentHeight) {

        let snakeHeadX = snakeRepeater.itemAt(0).x.toFixed(2);
        let snakeHeadY = snakeRepeater.itemAt(0).y.toFixed(2);

        let nextSegmentX = snakeRepeater.itemAt(1).x.toFixed(2);
        let nextSegmentY = snakeRepeater.itemAt(1).y.toFixed(2);

        console.log("Snake Head   X: ",snakeHeadX,", Y: ",snakeHeadY);
        console.log("Next Segment X: ",nextSegmentX,", Y: ",nextSegmentY);
        if(horizont === true) {
            if (direction === true ) {
                let comparedCooX = snakeHeadX - segmentWidth.toFixed(2);
                let comparedCooY = snakeHeadY
                console.log("Compared Coo X: ",comparedCooX,", Y: ", comparedCooY);

                if( (comparedCooX === nextSegmentX) && (comparedCooY === nextSegmentY)  )  return false;
                else
                return true;

            }
            if (direction === false ) {
                let comparedCooX = snakeHeadX + segmentWidth.toFixed(2);
                let comparedCooY = snakeHeadY
                console.log("Compared Coo X: ",comparedCooX,", Y: ", comparedCooY);

                if( (comparedCooX === nextSegmentX) && (comparedCooY === nextSegmentY)  )  return false;
                else
                return true;
            }
        }
        if(horizont === false) {
            if (direction === true ) {
                let comparedCooX = snakeHeadX;
                let comparedCooY = snakeHeadY + segmentHeight.toFixed(2);
                console.log("Compared Coo X: ",comparedCooX,", Y: ", comparedCooY);

                if( (comparedCooX === nextSegmentX) && (comparedCooY === nextSegmentX)  ) return false;
                else
                return true;
            }
            if (direction === false ) {
                let comparedCooX = snakeHeadX;
                let comparedCooY = snakeHeadY - segmentHeight.toFixed(2);
                console.log("Compared Coo X: ",comparedCooX,", Y: ", comparedCooY);

                if( (comparedCooX === nextSegmentX) && (comparedCooY === nextSegmentX)  ) return false;
                else
                return true;

            }
        }
    }
//-------------------------------------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------------------


