import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Controls 2.5
import "jsBackEnd.js" as Js
//-------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------MAIN WINDOW AND FRAME----------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------------------------------------------
ApplicationWindow {
    id: mainWindow
    width: 900
    height: 640
    visible: true
    title: qsTr("Snake")
    color: "black"
//------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------ARRAYS FOR GAME COORDINATES------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
    property int xCooNumber: 34;                                    // number of pixels X Size/ xCoo Size
    property int yCooNumber: 28;                                    // number of pixels Y Size/ yCoo Size
    property variant xCoo: Js.xCooFill(gameArea, xCooNumber)        // fill X Size array
    property variant yCoo: Js.yCooFill(gameArea, yCooNumber)        // fill Y Size array
//------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------GLOBAL GAME VARIABLES BELOW------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
    property int segmentNo: 7                                       // initial snake segments number to create
    property int segmentBeginNo: 0                                  // for initial snake creating purposes
    property double segmentWidth: gameArea.width/xCooNumber
    property double segmentHeight: gameArea.height/yCooNumber       // segment width/height are also food dimensions
    property int foodNo: 0                                          // initial food Number
//------------------------------------------------------------------------------------------------------------------------------------------
    property int buforX: 0                                          // bufor variables for moving snake purposes
    property int buforY: 0
//------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------GAME CONTROL PROPERTIES--------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
    property int direction: -1                                      // (1): right/down, (-1): left, up
    property bool horizont: true                                    // true: move x, false move y
//------------------------------------------------------------------------------------------------------------------------------------------
    Rectangle {
        id: frame                                                   // only esthetic function
        width: Math.floor(mainWindow.width/1.25)
        height: Math.floor(mainWindow.height)
        anchors.left: parent.left
        color: "blue"
        clip: true
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------GAME AREA---------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
        Rectangle {
            id: gameArea                                            // as the item's ID says
            width: Math.floor(frame.width/1.06)
            height: Math.floor(frame.height/1.08)
            anchors.centerIn: parent
            color: "steelblue"
            clip: true

            focus: true
            Keys.onPressed: (event)=> {                             // snake control function
                    if (event.key === Qt.Key_Left)
                        {direction = -1; horizont = true}
                    if (event.key === Qt.Key_Right)
                        {direction = 1; horizont = true}
                    if (event.key === Qt.Key_Up)
                        {direction = -1; horizont = false}
                    if (event.key === Qt.Key_Down)
                        {direction = 1; horizont = false}
                }
//------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------------FOOD ELEMENT---------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
                ListModel {
                    id: food
                    Component.onCompleted: Js.add(xCoo, yCoo, xCooNumber, yCooNumber, foodNo)
                }
//------------------------------------------------------------------------------------------------------------------------------------------
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
                            border {color: "darkviolet"; width: foodRec.width/10 }
                        }
                    }
//------------------------------------------------------------------------------------------------------------------------------------------
//---------------------------------------------------------SNAKE ELEMENT--------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
                ListModel {
                    id: snake
                    Component.onCompleted: Js.raiseSnake(xCoo, yCoo, segmentBeginNo)
                }
//------------------------------------------------------------------------------------------------------------------------------------------
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
                            border {color: "darkviolet"; width: snakeRec.width/10 }
                        }
                    }
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------TIMER-------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
            Timer {
                interval: 250
                repeat: true
                running: true
                onTriggered: {
                    Js.addSegment(xCoo, yCoo, snake, segmentNo, segmentBeginNo);
                    Js.addFood(xCoo, yCoo, xCooNumber, yCooNumber, food, foodNo);
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
