//-------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------GAME FUNCTIONS--------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
//*******************************************************************************************************************************************
//-------------------------------------------------------------------------------------------------------------------------------------------
            function addSegment(snake, segmentNo, segmentBeginNo) {
                if (segmentBeginNo < segmentNo) {
                    Qt.callLater(snake.raiseSnake)
                    console.log("segmentNo = ", segmentBeginNo)
                }
            }
//-------------------------------------------------------------------------------------------------------------------------------------------
            function addFood(food, foodNo) {
                if (foodNo < 5000 ) {
                    Qt.callLater(food.add)
                    console.log("food Number = ", foodNo)
                }
            }
//-------------------------------------------------------------------------------------------------------------------------------------------
           function resetCoordinates(segment, gameArea) {
                   if(segment.x > gameArea.width - segment.width) {                         // this function checks if snake moves
                       segment.x = 0                                                        // outside gameArae
                   }                                                                        // and reset coordinates if does
                   if(segment.x < 0) {
                       segment.x = gameArea.width - segment.width
                   }
                   if(segment.y > gameArea.height - segment.height) {
                       segment.y = 0
                   }
                   if(segment.y < 0) {
                       segment.y = gameArea.height - segment.height
                   }
           }
//------------------------------------------------------------------------------------------------------------------------------------------
           function snakeMove(segmentNo, snakeRepeater, horizont, direction) {
               var preBuforX = 0
               var preBuforY = 0

               for (let i = 0; i < segmentNo; i ++) {
                   var segment = snakeRepeater.itemAt(i)
                   //console.log("snake item no: ",i," coordinate x = ",segment.x)
                   //console.log("snake item no: ",i," coordinate y = ",segment.y)

                   if (horizont === true) {                                             // moving vertically


                       if(direction === 1) {                                            // move right

                           if( i === 0) {
                               buforX = segment.x
                               buforY = segment.y
                               segment.x += segmentWidth
                           }
                           else {
                               preBuforX = segment.x
                               preBuforY = segment.y
                               segment.x = buforX
                               segment.y = buforY
                               buforX = preBuforX
                               buforY = preBuforY
                           }
                       }
                       else                                                             // move left
                       {
                           if( i === 0) {
                               buforX = segment.x
                               buforY = segment.y
                               segment.x -= segmentWidth
                           }
                           else {
                               preBuforX = segment.x
                               preBuforY = segment.y
                               segment.x = buforX
                               segment.y = buforY
                               buforX = preBuforX
                               buforY = preBuforY
                           }
                       }
                   }
                   if (horizont === false) {                                            // moving horizontally

                       if(direction === 1) {                                            // move down
                           if( i === 0) {
                               buforX = segment.x
                               buforY = segment.y
                               segment.y += segmentWidth
                           }
                           else {
                               preBuforX = segment.x
                               preBuforY = segment.y
                               segment.x = buforX
                               segment.y = buforY
                               buforX = preBuforX
                               buforY = preBuforY
                           }
                       }
                       else                                                             //move up
                       {
                           if( i === 0) {
                               buforX = segment.x
                               buforY = segment.y
                               segment.y -= segmentWidth
                           }
                           else {
                               preBuforX = segment.x
                               preBuforY = segment.y
                               segment.x = buforX
                               segment.y = buforY
                               buforX = preBuforX
                               buforY = preBuforY
                           }
                       }
                   }
                   resetCoordinates(segment, gameArea)
               }
           }
//------------------------------------------------------------------------------------------------------------------------------------------
           function pushSnakeForward (preBuforX, preBuforY, segment, buforX, buforY ) {

           }
//-------------------------------------------------------------------------------------------------------------------------------------------
           function colisionDetection() {

           }
//-------------------------------------------------------------------------------------------------------------------------------------------
