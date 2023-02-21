//-----------------------------------------------------------------------------------------------------------------------
           function resetCoordinates(segment, gameArea) {
                   if(segment.x > gameArea.width - segment.width) {
                       segment.x = 0
                   }
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
//-----------------------------------------------------------------------------------------------------------------------
           function snakeMove(segmentNo, snakeRepeater, horizont, direction) {
               var preBuforX = 0
               var preBuforY = 0

               for (let i = 0; i < segmentNo; i ++) {
                   var segment = snakeRepeater.itemAt(i)
                   console.log("snake item no: ",i," coordinate x = ",segment.x)
                   console.log("snake item no: ",i," coordinate y = ",segment.y)

                   if (horizont === true) {
                       if(direction === 1) {

                           if( i === 0) {
                               buforX = segment.x
                               buforY = segment.y
                               segment.x += segmentWidth
                               resetCoordinates(segment, gameArea)
                           }
                           else {
                               preBuforX = segment.x
                               preBuforY = segment.y
                               segment.x = buforX
                               segment.y = buforY
                               buforX = preBuforX
                               buforY = preBuforY
                               resetCoordinates(segment, gameArea)
                           }
                       }
                       else
                       {
                           if( i === 0) {
                               buforX = segment.x
                               buforY = segment.y
                               segment.x -= segmentWidth
                               resetCoordinates(segment, gameArea)
                           }
                           else {
                               preBuforX = segment.x
                               preBuforY = segment.y
                               segment.x = buforX
                               segment.y = buforY
                               buforX = preBuforX
                               buforY = preBuforY
                               resetCoordinates(segment, gameArea)
                           }

                       }

                   }
                   if (horizont === false) {
                       if(direction === 1) {
                           if( i === 0) {
                               buforX = segment.x
                               buforY = segment.y
                               segment.y += segmentWidth
                               resetCoordinates(segment, gameArea)
                           }
                           else {
                               preBuforX = segment.x
                               preBuforY = segment.y
                               segment.x = buforX
                               segment.y = buforY
                               buforX = preBuforX
                               buforY = preBuforY
                               resetCoordinates(segment, gameArea)
                           }

                       }
                       else
                       {
                           if( i === 0) {
                               buforX = segment.x
                               buforY = segment.y
                               segment.y -= segmentWidth
                               resetCoordinates(segment, gameArea)
                           }
                           else {
                               preBuforX = segment.x
                               preBuforY = segment.y
                               segment.x = buforX
                               segment.y = buforY
                               buforX = preBuforX
                               buforY = preBuforY
                               resetCoordinates(segment, gameArea)
                           }

                       }
                   }
               }
           }
//-----------------------------------------------------------------------------------------------------------------------
           function colisionDetection() {

           }
//-----------------------------------------------------------------------------------------------------------------------
