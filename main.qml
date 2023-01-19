import QtQuick 2.0
import QtQuick.Controls 2.5
import QtQml.Models 2.3
import QtQml 2.3

Window {

    id: mainWindow
    width: 640
    height: 480
    visible: true
    title: qsTr("Snake")
    color: "darkslategrey"

    property int rec1Width: mainWindow.width/1.25
    property int rec1Height: mainWindow.height
    property int foodWidth: rec1Width/20
    property int foodHeight: rec1Height/20

    function findRndX(rec1, food){
        var rndX;
        rndX = Math.floor ( Math.random() * ( ( rec1Width - foodWidth) - 0) );
        console.log("food X: ",rndX)
        return rndX;
    }

    function findRndY(rec1, food){
        var rndY;
        rndY = Math.floor ( Math.random() * ( ( rec1Height - foodHeight) - 0) );
        console.log("food Y: ",rndY)
        return rndY;
    }

    Rectangle {

        id: rec1
        width:  rec1Width
        height: rec1Height
        anchors.left: mainWindow.left
        color: "lightslategrey"
        border.width: 5
        border.color: "black"
        clip: true

        Component{

        id: foodComponent

            Rectangle{
                id: foodZ
                width: rec1Width/20
                height: rec1Height/20
                color: "green"
                radius: 10
                border.width: 5
                border.color: "orange"

                }
        }

        Item {
            id: food
            property int foodX: findRndX(rec1,food)
            property int foodY: findRndY(rec1,food)
            x: foodX
            y: foodY


        Loader {
           id: foodLoader
           sourceComponent: foodComponent
        }

        }


        Rectangle {
            id: snake
            width: rec1.width/20
            height: rec1.height/20
            color: "red"
            border.width: 3
            border.color: "yellow"
            x: rec1.width/2
            y: rec1.height/2
            property int direction: 1
            property bool horizont: true
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

            Timer {

                id: snakeTimer
                interval: 10
                repeat: true
                running: true
                onTriggered: {

                    console.log("food component X: ",food.x); console.log("food component Y: ",food.y)
                    console.log("snake component X: ",snake.x); console.log("snake component Y: ",snake.y)
                    if(snake.horizont === true)  { Math.floor(snake.x += snake.direction) }
                    if(snake.horizont === false) { Math.floor(snake.y += snake.direction) }
                    if(snake.x > rec1.width - snake.width) {
                        snake.x = 0
                    }
                    if(snake.x < 0) {
                        snake.x = rec1.width - snake.width
                    }
                    if(snake.y > rec1.height - snake.height) {
                        snake.y = 0
                    }
                    if(snake.y < 0) {
                        snake.y = rec1.height - snake.height
                    }

                    if ( ( (snake.x + snake.width >= food.x) && (snake.x <=  food.x + food.width  ) )  &&
                       ( ( snake.y + snake.height >= food.y) && ( snake.y <=  food.y + food.height  ) ) ) {
                        foodLoader.destroy();
                        console.log("destroy!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")

                }


            }




        }


    }


  }

}
