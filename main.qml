import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Controls 2.5
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------MAIN WINDOW AND FRAME---------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
ApplicationWindow {
    id: mainWindow
    width: 1280
    height: 960
    visible: true
    title: qsTr("Snake")
    color: "black"
//-----------------------------------------------------------------------------------------------------------------------
    Rectangle {
        id: frame
        width: Math.round(mainWindow.width/1.25)
        height: Math.round(mainWindow.height)
        anchors.left: parent.left
        color: "blue"
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------GAME AREA---------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
        Rectangle {
            id: gameArea
            width: Math.round(frame.width/1.06)
            height: Math.round(frame.height/1.08)
            anchors.centerIn: parent
            color: "steelblue"
            clip: true
//-----------------------------------------------------------------------------------------------------------------------
//------------------------------------------GLOBAL GAME VARIABLES BELOW:-------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
            property int segmentNo: 7                              // <- initial snake segments number to create
            property int segmentBeginNo: 0                         // <- for initial snake creating purposes
            property double segmentWidth: gameArea.width/40
            property double segmentHeight: gameArea.height/35      // <- segment width/height are also food dimensions
            property int foodNo: 0                                 // <- initial food Number
//-----------------------------------------------------------------------------------------------------------------------
            property int buforX: 0                                 // <- bufor variables for moving snake purposes
            property int buforY: 0
//-----------------------------------------------------------------------------------------------------------------------
//-------------------------------------------GAME CONTROL PROPERTIES-----------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
            property int direction: -1
            property bool horizont: true                           // true: move x, false move y
            focus: true
            Keys.onPressed: (event)=> {
                    if (event.key === Qt.Key_Left)
                        {gameArea.direction = -1; gameArea.horizont = true}
                    if (event.key === Qt.Key_Right)
                        {gameArea.direction = 1; gameArea.horizont = true}
                    if (event.key === Qt.Key_Up)
                        {gameArea.direction = -1; gameArea.horizont = false}
                    if (event.key === Qt.Key_Down)
                        {gameArea.direction = 1; gameArea.horizont = false}
                }
//-----------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------FOOD ELEMENT----------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
                ListModel {
                    id: food

                    function add() {
                        let foodWidth = gameArea.segmentWidth
                        let foodHeight = gameArea.segmentHeight
                        let hiXlimit = gameArea.width// - gameArea.segmentWidth
                        let hiYlimit = gameArea.height// - gameArea.segmentHeight
                        let foodX =/* Math.round */(Math.floor(Math.random() * (hiXlimit/gameArea.segmentWidth - 0)) * gameArea.segmentWidth) //+ gameArea.segmentWidth
                        let foodY =/* Math.round */(Math.floor(Math.random() * (hiYlimit/gameArea.segmentHeight - 0)) * gameArea.segmentHeight)// + gameArea.segmentHeight

                        food.append ({foodX,foodY})
                        gameArea.foodNo ++

                        console.log("foodX:      ", foodX)
                        console.log("foodY:      ", foodY)
                        console.log("hiXlimit:   ", hiXlimit)
                        console.log("hiYlimit:   ", hiYlimit)
                        console.log("gameArea W: ", gameArea.width)
                        console.log("gameArea H  ", gameArea.height)
                        console.log("segment W:  ", gameArea.segmentWidth)
                        console.log("segment H:  ", gameArea.segmentHeight)
                    }
                    Component.onCompleted: add()
                }
//----------------------------------------------------------------------------------------------------------------------
                    Repeater {
                        id: foodRepeater
                        model: food
                        delegate: Rectangle {
                            id: foodRec
                            x: foodX
                            y: foodY
                            width: gameArea.segmentWidth
                            height: gameArea.segmentHeight
                            color: "chartreuse"
                            border {color: "darkviolet"; width: Math.floor(foodRec.width/10)}
                        }
                    }
//-----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------SNAKE ELEMENT----------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
                ListModel {
                    id: snake
                    function raiseSnake() {
                        let snakeX = ( (gameArea.width/gameArea.segmentWidth)*10 ) - ( gameArea.segmentBeginNo * gameArea.segmentWidth)
                        let snakeY = (gameArea.height/gameArea.segmentHeight)*10
                        snake.append({ snakeX, snakeY})
                        gameArea.segmentBeginNo ++

                        console.log("snakeX: ",snakeX)
                        console.log("snakeY: ",snakeY)
                    }
                    Component.onCompleted: raiseSnake()
                }
//-----------------------------------------------------------------------------------------------------------------------
                    Repeater {
                        id: snakeRepeater
                        model: snake
                        delegate: Rectangle {
                            id: snakeRec
                            x: snakeX
                            y: snakeY
                            width: gameArea.segmentWidth
                            height: gameArea.segmentHeight
                            color: "red"
                            border {color: "darkviolet"; width: Math.floor(snakeRec.width/10)}
                        }
                    }
//-----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------GAME FUNCTIONS---------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
                function addSegment() {
                    if (gameArea.segmentBeginNo < gameArea.segmentNo) {
                        Qt.callLater(snake.raiseSnake)
                     // gameArea.segmentNo ++
                        console.log("segmentNo = ", gameArea.segmentBeginNo)
                    }
                }
//-----------------------------------------------------------------------------------------------------------------------
                function addFood() {
                    if (gameArea.foodNo < 5000 ) {
                        Qt.callLater(food.add)
                        console.log("food Number = ", gameArea.foodNo)
                    }
                }
//-----------------------------------------------------------------------------------------------------------------------
                function snakeMove() {
                    var preBuforX = 0
                    var preBuforY = 0

                    for (let i = 0; i < gameArea.segmentNo; i ++) {
                        var segment = snakeRepeater.itemAt(i)
                        console.log("snake item no: ",i," coordinate x = ",segment.x)
                        console.log("snake item no: ",i," coordinate y = ",segment.y)

                        if (gameArea.horizont === true) {
                            if(gameArea.direction === 1) {

                                if( i === 0) {
                                    gameArea.buforX = segment.x
                                    gameArea.buforY = segment.y
                                    segment.x += gameArea.segmentWidth
                                    gameArea.resetCoordinates(segment)
                                }
                                else {
                                    preBuforX = segment.x
                                    preBuforY = segment.y
                                    segment.x = gameArea.buforX
                                    segment.y = gameArea.buforY
                                    gameArea.buforX = preBuforX
                                    gameArea.buforY = preBuforY
                                    gameArea.resetCoordinates(segment)
                                }
                            }
                            else
                            {
                                if( i === 0) {
                                    gameArea.buforX = segment.x
                                    gameArea.buforY = segment.y
                                    segment.x -= gameArea.segmentWidth
                                    gameArea.resetCoordinates(segment)
                                }
                                else {
                                    preBuforX = segment.x
                                    preBuforY = segment.y
                                    segment.x = gameArea.buforX
                                    segment.y = gameArea.buforY
                                    gameArea.buforX = preBuforX
                                    gameArea.buforY = preBuforY
                                    gameArea.resetCoordinates(segment)
                                }

                            }

                        }
                        if (gameArea.horizont === false) {
                            if(gameArea.direction === 1) {
                                if( i === 0) {
                                    gameArea.buforX = segment.x
                                    gameArea.buforY = segment.y
                                    segment.y += gameArea.segmentWidth
                                    gameArea.resetCoordinates(segment)
                                }
                                else {
                                    preBuforX = segment.x
                                    preBuforY = segment.y
                                    segment.x = gameArea.buforX
                                    segment.y = gameArea.buforY
                                    gameArea.buforX = preBuforX
                                    gameArea.buforY = preBuforY
                                    gameArea.resetCoordinates(segment)
                                }

                            }
                            else
                            {
                                if( i === 0) {
                                    gameArea.buforX = segment.x
                                    gameArea.buforY = segment.y
                                    segment.y -= gameArea.segmentWidth
                                    gameArea.resetCoordinates(segment)
                                }
                                else {
                                    preBuforX = segment.x
                                    preBuforY = segment.y
                                    segment.x = gameArea.buforX
                                    segment.y = gameArea.buforY
                                    gameArea.buforX = preBuforX
                                    gameArea.buforY = preBuforY
                                    gameArea.resetCoordinates(segment)
                                }

                            }
                        }
                    }
                }

                function resetCoordinates(segment) {
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
                function colisionDetection() {
                }

//-----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------TIMER------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
            Timer {
                interval: 200
                repeat: true
                running: true
                onTriggered: {                   
                    gameArea.addSegment()

                    /*if(gameArea.segmentBeginNo >= gameArea.segmentNo )*/  gameArea.snakeMove() ; gameArea.addFood()
                    console.log("direction: ", gameArea.direction)
                    console.log("horizont: ", gameArea.horizont)
                    }
                }
            }
        }
    }



