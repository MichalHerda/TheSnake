import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Controls 2.5
import "jsBackEnd.js" as Js
//-------------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------MAIN WINDOW AND FRAME---------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------
ApplicationWindow {
    id: mainWindow
    width: Screen.width
    height: Screen.height
    visible: true
    title: qsTr("Snake")
    color: "black"
//-----------------------------------------------------------------------------------------------------------------------
//-------------------------------------------ARRAYS FOR GAME COORDINATES-------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
    property int xCooNumber: 40
    property int yCooNumber: 35
    property variant xCoo: Js.xCooFill(gameArea, xCooNumber)
    property variant yCoo: Js.yCooFill(gameArea, yCooNumber)
//-----------------------------------------------------------------------------------------------------------------------
//------------------------------------------GLOBAL GAME VARIABLES BELOW:-------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
    property int segmentNo: 7                                           // <- initial snake segments number to create
    property int segmentBeginNo: 0                                      // <- for initial snake creating purposes
    property double segmentWidth: gameArea.width/xCooNumber
    property double segmentHeight: gameArea.height/yCooNumber           // <- segment width/height are also food dimensions
    property int foodNo: 0                                              // <- initial food Number
//-----------------------------------------------------------------------------------------------------------------------
    property int buforX: 0                                              // <- bufor variables for moving snake purposes
    property int buforY: 0
//-----------------------------------------------------------------------------------------------------------------------
//-------------------------------------------GAME CONTROL PROPERTIES-----------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
    property int direction: -1
    property bool horizont: true                                        // true: move x, false move y
//-----------------------------------------------------------------------------------------------------------------------
    Rectangle {
        id: frame
        width: Math.floor(mainWindow.width/1.25)
        height: Math.floor(mainWindow.height)
        anchors.left: parent.left
        color: "blue"
//-----------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------GAME AREA---------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
        Rectangle {
            id: gameArea
            width: Math.floor(frame.width/1.06)
            height: Math.floor(frame.height/1.08)
            anchors.centerIn: parent
            color: "steelblue"
            clip: true

            focus: true
            Keys.onPressed: (event)=> {
                    if (event.key === Qt.Key_Left)
                        {direction = -1; horizont = true}
                    if (event.key === Qt.Key_Right)
                        {direction = 1; horizont = true}
                    if (event.key === Qt.Key_Up)
                        {direction = -1; horizont = false}
                    if (event.key === Qt.Key_Down)
                        {direction = 1; horizont = false}
                }
//-----------------------------------------------------------------------------------------------------------------------
//-------------------------------------------------FOOD ELEMENT----------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
                ListModel {
                    id: food
                    function add() {
                        let foodWidth = segmentWidth
                        let foodHeight = segmentHeight
                        let hiXlimit = gameArea.width
                        let hiYlimit = gameArea.height
                        let foodX = (Math.floor(Math.random() * (hiXlimit/segmentWidth - 0)) * (segmentWidth))
                        let foodY = (Math.floor(Math.random() * (hiYlimit/segmentHeight - 0)) * (segmentHeight))

                        food.append ({foodX,foodY})
                        foodNo ++
/*
                        console.log("foodX:      ", foodX)
                        console.log("foodY:      ", foodY)
                        console.log("hiXlimit:   ", hiXlimit)
                        console.log("hiYlimit:   ", hiYlimit)
                        console.log("gameArea W: ", gameArea.width)
                        console.log("gameArea H  ", gameArea.height)
                        console.log("segment W:  ", segmentWidth)
                        console.log("segment H:  ", segmentHeight)   */
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
                            width: segmentWidth
                            height: segmentHeight
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
                        let snakeX = ( (gameArea.width/segmentWidth)*10 ) - ( segmentBeginNo * segmentWidth)
                        let snakeY = ( (gameArea.height/segmentHeight)*10 )
                        snake.append({ snakeX, snakeY})
                        segmentBeginNo ++

                        //console.log("snakeX: ",snakeX)
                        //console.log("snakeY: ",snakeY)
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
                            width: segmentWidth
                            height: segmentHeight
                            color: "red"
                            border {color: "darkviolet"; width: Math.floor(snakeRec.width/10)}
                        }
                    }
//-----------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------TIMER------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------
            Timer {
                interval: 100
                repeat: true
                running: true
                onTriggered: {
                    Js.addSegment(snake, segmentNo, segmentBeginNo);                   
                    Js.addFood(food, foodNo);
                    Js.snakeMove(segmentNo, snakeRepeater, horizont, direction);
                    //console.log("direction: ", direction);
                    //console.log("horizont: ", horizont);
                    //console.log("xCoo: ",xCoo);
                    }
                }
            }
        Component.onCompleted: {
            Js.xCooFill(gameArea, xCooNumber)
            Js.yCooFill(gameArea, yCooNumber)
        }

        }
    }
