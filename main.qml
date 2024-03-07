import QtQuick 2.15
import QtQuick.Window 2.15
import QtQuick.Controls 2.5
import "jsBackEnd.js" as Js
//-----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------MAIN WINDOW AND FRAME---------------------------------------------------------------------
//-----------------------------------------------------------------------------------------------------------------------------------------------------
ApplicationWindow {
    id: mainWindow
    width: 900
    height: 640
    visible: true
    title: qsTr("Snake")
    color: "black"
//----------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------ARRAYS FOR GAME COORDINATES-----------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
    property int xCooNumber: 18                                                         // number of pixels X Size/ xCoo Size
    property int yCooNumber: 16                                                         // number of pixels Y Size/ yCoo Size
    property variant xCoo: Js.xCooFill(gameArea, xCooNumber)                            // fill X Size array
    property variant yCoo: Js.yCooFill(gameArea, yCooNumber)                            // fill Y Size array
    property int snakeCooIndexX: Math.floor(xCooNumber/4);
    property int snakeCooIndexY: Math.floor(yCooNumber/2);
//----------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------GLOBAL GAME VARIABLES BELOW-----------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
    property int segmentNo: 5                                                           // initial snake segments number to create
    property int segmentBeginNo: 0                                                      // for initial snake creating purposes
    property double segmentWidth: (gameArea.width/xCooNumber).toFixed(2)
    property double segmentHeight: (gameArea.height/yCooNumber).toFixed(2)              // segment width/height are also food dimensions
    property int foodBeginNo: 0                                                         // initial food Number
    property int foodNo: 1                                                              // maximum food Number
//----------------------------------------------------------------------------------------------------------------------------------------------------
//----------------------------------------------------------GAME CONTROL PROPERTIES-------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
    property bool direction: true                                                       // true: right||down,  false: left||up
    property bool horizont:  true                                                       // true: move xDim,    false: move yDim
//----------------------------------------------------------------------------------------------------------------------------------------------------
    QtObject {
        id: points
        property int score: 0
        property int gameLevel: 1
        property bool gameOver: true
        property bool pause: false
    }
//----------------------------------------------------------------------------------------------------------------------------------------------------
    Rectangle {
        id: frame                                                                       // frame is only for esthetic functions
        width: Math.floor(mainWindow.width/1.3)
        height: Math.floor(mainWindow.height)
        anchors.left: parent.left
        color: "blue"
        clip: true               
//----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------GAME AREA--------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
        Rectangle {
            id: gameArea                                                                // function as the item's ID says
            width: Math.floor(frame.width/1.06)
            height: Math.floor(frame.height/1.08)
            anchors.centerIn: parent
            color: "steelblue"
            clip: true

            focus: true
            Keys.onPressed: (event)=> {
                    let snakeHeadX = snakeRepeater.itemAt(0).x;                         // after key pressed, function checks
                    let snakeHeadY = snakeRepeater.itemAt(0).y;                         // is next snake segment in selected direction
                                                                                        // if it is - move is not allowed
                    let nextSegmentX = snakeRepeater.itemAt(1).x;
                    let nextSegmentY = snakeRepeater.itemAt(1).y;

                    let comparedElementLeft;
                    let comparedElementRight;
                    let comparedElementUp;
                    let comparedElementDown;

                    //check where is snake segment index 2:

                    if ( (Math.round(snakeHeadX) !== 0 ) ) comparedElementLeft = (snakeHeadX - segmentWidth);
                    if ( (Math.round(snakeHeadX) === 0 ) ) comparedElementLeft = (gameArea.width - segmentWidth);

                    if ( (Math.round(snakeHeadX) !== Math.round(gameArea.width - segmentWidth))) comparedElementRight = snakeHeadX + segmentWidth;
                    if ( (Math.round(snakeHeadX) === Math.round(gameArea.width - segmentWidth))) comparedElementRight = 0;

                    if ( (Math.round(snakeHeadY) !== 0 ) ) comparedElementUp = (snakeHeadY - segmentHeight);
                    if ( (Math.round(snakeHeadY) === 0 ) ) comparedElementUp = (gameArea.height - segmentHeight);

                    if ( (Math.round(snakeHeadY) !== Math.round(gameArea.height - segmentHeight))) comparedElementDown = snakeHeadY + segmentHeight;
                    if ( (Math.round(snakeHeadY) === Math.round(gameArea.height - segmentHeight))) comparedElementDown = 0;

                        if ( (event.key === Qt.Key_Left) && ( Math.round(comparedElementLeft) !== Math.round(nextSegmentX) ) )
                            {direction = false; horizont = true; }
                        if ( (event.key === Qt.Key_Right) && ( Math.round(comparedElementRight) !== Math.round(nextSegmentX) ) )
                            {direction = true; horizont = true; }
                        if ( (event.key === Qt.Key_Up) && ( Math.round(comparedElementUp) !== Math.round(nextSegmentY) ) )
                            {direction = false; horizont = false; }
                        if ( (event.key === Qt.Key_Down) && ( Math.round(comparedElementDown) !== Math.round(nextSegmentY) ) )
                            {direction = true; horizont = false; }
                        if ( (event.key === Qt.Key_Space) && (points.gameOver === true) ) {
                            Js.restartGame(snakeRepeater, snake, segmentNo, segmentBeginNo, snakeCooIndexX, snakeCooIndexY, xCoo, yCoo);
                            console.log("PRESSED, gameover = ", points.gameOver)
                        }
                        if ( event.key === Qt.Key_P ) {
                                    points.pause = points.pause ? false : true;
                                    console.log("pause: ", points.pause);
                                }
            }
//----------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------FOOD ELEMENT--------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
                ListModel {
                    id: food
                    Component.onCompleted: Js.add(xCoo, yCoo, xCooNumber, yCooNumber, food, foodNo, foodBeginNo, snakeRepeater, segmentWidth, segmentHeight)
                    Component.onDestruction: Js.add(xCoo, yCoo, xCooNumber, yCooNumber, food, foodNo, foodBeginNo, snakeRepeater, segmentWidth, segmentHeight)
                }
//----------------------------------------------------------------------------------------------------------------------------------------------------
                    Repeater {
                        id: foodRepeater                                                // food items
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
//----------------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------SNAKE ELEMENT-------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
                ListModel {
                    id: snake
                    Component.onCompleted:
                        Js.raiseSnake(snake, xCoo, yCoo, xCooNumber, yCooNumber, segmentBeginNo, segmentNo, segmentWidth, snakeCooIndexX, snakeCooIndexY)
                }
//----------------------------------------------------------------------------------------------------------------------------------------------------
                    Repeater {
                        id: snakeRepeater
                        model: snake                                                    // snake item
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
//----------------------------------------------------------------------------------------------------------------------------------------------------
//-----------------------------------------------------------------TIMER------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------------------------------
            Timer {
                interval: 250 - (points.gameLevel * 10)
                repeat: true
                running: !points.gameOver && !points.pause
                onTriggered: {
                    Js.snakeMove
                    (xCoo, yCoo, xCooNumber, yCooNumber, gameArea, segmentNo, snakeRepeater, horizont, direction, segmentWidth, segmentHeight,
                     foodRepeater, food, foodBeginNo, foodNo, snakeCooIndexX, snakeCooIndexY, snake);
                    }
                }

            Rectangle {
                id: gameOverWin
                width: gameArea.width/1.75
                height: gameArea.height/6
                anchors.centerIn: parent
                color: "darkgoldenrod"
                border {color: "darkblue"; width: gameOverWin.width/20}
                visible: points.gameOver || points.pause ? true : false

                Text {
                    id: gameOverText
                    anchors.centerIn: parent
                    text: qsTr("GAME OVER !!! PRESS SPACE - NEW GAME")
                    color: "darkblue"
                    font {pointSize: 12; bold: true}
                    visible: points.gameOver ? true : false
                }

                Text {
                    id: pauseText
                    anchors.centerIn: parent
                    text: qsTr("GAME PAUSED - PRESS 'P' TO CONTINUE")
                    color: "darkblue"
                    font {pointSize: 12; bold: true}
                    visible: points.pause ? true : false
                }
            }
        }                                                                               // game area brace

    Component.onCompleted: {
        Js.xCooFill(gameArea, xCooNumber)
        Js.yCooFill(gameArea, yCooNumber)
        console.log("xCoo: ",xCoo);
        console.log("yCoo: ",yCoo);
        }
    }                                                                                   // frame brace

    Rectangle {
        id: hud
        width: mainWindow.width - frame.width
        height: frame.height
        anchors.right: parent.right
        color: "darkblue"
        border {color: "darkslategrey"; width: hud.width/20}

        Column {
            id: hudColumn
            width: hud.width/1.5
            height: hud.height/1.2
            anchors.centerIn: hud
            spacing: hudColumn.height/25
            //horizontalAlignment: Qt.AlignHCenter

            Label {
                text: "SCORE : "
                anchors.horizontalCenter: parent.horizontalCenter
                color: "steelblue"
                font { pointSize: 25; underline: true }
            }

            Label {
                text: points.score.toString()
                anchors.horizontalCenter: parent.horizontalCenter
                color: "steelblue"
                font { pointSize: 35 }
            }

            Label {
                text: "LEVEL : "
                anchors.horizontalCenter: parent.horizontalCenter
                color: "steelblue"
                font { pointSize: 25; underline: true }
            }

            Label {
                text: points.gameLevel.toString()
                anchors.horizontalCenter: parent.horizontalCenter
                color: "steelblue"
                font { pointSize: 35 }
            }
        }
    }

    HighScores {
        id: highScoresForm
        width: parent.width
        height: parent.height
        visible: points.gameOver
        Keys.onPressed: {
            points.gameOver = false;
        }
    }
}


//----------------------------------------------------------------------------------------------------------------------------------------------------
