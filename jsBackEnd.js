//-------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------FILL ARRAYS OF GAME AREA COORDINATES---------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
    function xCooFill(gameArea, xCooNumber) {
        xCoo = [];                                                                          // reset
        let xCooSize = gameArea.width/xCooNumber;
        console.log("gameArea.width = ", gameArea.width);
        console.log("xCoSize = ", xCooSize);
        for(let i = 0; i < xCooNumber; i++) {
            let xCoordinate = i * xCooSize;
            xCoo.push(xCoordinate);
        }
        console.log("xCoo: ", xCoo);
        return xCoo;
    }
//------------------------------------------------------------------------------------------------------------------------------------------
    function yCooFill(gameArea, yCooNumber) {
        yCoo = [];
        let yCooSize = gameArea.height/yCooNumber;
        console.log("gameArea.height = ", gameArea.height);
        console.log("yCoSize = ", yCooSize);
        for(let i = 0; i < yCooNumber; i++) {
            let yCoordinate = i * yCooSize;
            yCoo.push(yCoordinate);
        }
        console.log("yCoo: ", yCoo);
        return yCoo;
    }
//-------------------------------------------------------------------------------------------------------------------------------------------
    function rndGenerator (itemsNo) {
        let rndNo = Math.floor(Math.random() * (itemsNo - 0));
        console.log("Inside rndGenerator(), itemsNo = ",itemsNo);
        console.log("Inside rndGenerator(), rndNo = ",rndNo);
        return rndNo;
    }
//*******************************************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------GAME FUNCTIONS--------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//*******************************************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------------------------------------
    function addSegment(xCoo, yCoo, snake, segmentNo, segmentBeginNo) {
        if (segmentBeginNo < segmentNo) {
            raiseSnake(xCoo, yCoo, segmentBeginNo);
            //console.log("segmentNo = ", segmentBeginNo);
        }
    }
//-------------------------------------------------------------------------------------------------------------------------------------------
    function addFood(xCoo, yCoo, xCooNumber, yCooNumber, food, foodNo) {
        if (foodNo < 5000 ) {
            add(xCoo, yCoo, xCooNumber, yCooNumber, foodNo);
            //console.log("food Number = ", foodNo);
        }
    }
//-------------------------------------------------------------------------------------------------------------------------------------------
   function resetCoordinates(segment, gameArea) {
           if(segment.x > gameArea.width - segment.width) {                                 // this function checks if snake moves
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
   function snakeMove(segmentNo, snakeRepeater, horizont, direction) {
       var preBuforX = 0;
       var preBuforY = 0;

       for (let i = 0; i < segmentNo; i ++) {
           var segment = snakeRepeater.itemAt(i);
           //console.log("snake item no: ",i," coordinate x = ",segment.x);
           //console.log("snake item no: ",i," coordinate y = ",segment.y);

           if (horizont === true) {                                                         // moving vertically


               if(direction === 1) {                                                        // move right

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

               if(direction === 1) {                                                        // move down
                   if( i === 0) {
                       buforX = segment.x;
                       buforY = segment.y;
                       segment.y += segmentWidth;
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
                       segment.y -= segmentWidth;
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
   function pushSnakeForward (preBuforX, preBuforY, segment, buforX, buforY ) {

   }
//-------------------------------------------------------------------------------------------------------------------------------------------
   function colisionDetection() {

   }
//-------------------------------------------------------------------------------------------------------------------------------------------
    function add(xCoo, yCoo, xCooNumber, yCooNumber, foodNo) {
        //let foodWidth = segmentWidth
        //let foodHeight = segmentHeight
        //let hiXlimit = gameArea.width
        //let hiYlimit = gameArea.height
        //let foodX = (Math.floor(Math.random() * (hiXlimit/segmentWidth - 0)) * (segmentWidth))
        //let foodY = (Math.floor(Math.random() * (hiYlimit/segmentHeight - 0)) * (segmentHeight))
        let foodX = xCoo[Js.rndGenerator(xCooNumber)]
        let foodY = yCoo[Js.rndGenerator(yCooNumber)]

        food.append ({foodX,foodY})
        foodNo ++
        console.log("foodX:      ", foodX)
        console.log("foodY:      ", foodY)
    /*                      console.log("hiXlimit:   ", hiXlimit)
        console.log("hiYlimit:   ", hiYlimit)
        console.log("gameArea W: ", gameArea.width)
        console.log("gameArea H  ", gameArea.height)
        console.log("segment W:  ", segmentWidth)
        console.log("segment H:  ", segmentHeight)   */
    }
//---------------------------------------------------------------------------------------------------------------------------------------------
    function raiseSnake(xCoo, yCoo, segmentBeginNo) {
        let snakeX = xCoo [12]                      //( (gameArea.width/segmentWidth)*10 ) - ( segmentBeginNo * segmentWidth)
        let snakeY = yCoo [8]                       //( (gameArea.height/segmentHeight)*10 )
        snake.append({ snakeX, snakeY})
        segmentBeginNo ++
        //console.log("snakeX: ",snakeX)
        //console.log("snakeY: ",snakeY)
    }
//---------------------------------------------------------------------------------------------------------------------------------------------
