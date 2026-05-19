import './Room.css'
import Tile from '../Tile/Tile.js';

// for 8 x 8 tile room
const horizontalAxis = ["a","b","c","d","e","f","g","h"]
const verticalAxis = ["1","2","3","4","5","6","7","8"]

function Room(){
    // display inventory items in a scrollable horizontal list at top
    // drag items to a tile in the room, update locations, store inside database
    // when the server reloads again, it should render the entire room with item in same spot
    // can move item to different location in the room
    let floor = [];

    for (let j = verticalAxis.length - 1; j>=0;j--) {
        for(let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;

            if (number % 2 == 0) {
                //floor.push(<span className = "tile light-tile">[{horizontalAxis[i]}{verticalAxis[j]}]</span>)
                floor.push(<Tile/>)
            }

            else{
                // floor.push(
                // <span className = "tile dark-tile">[{horizontalAxis[i]}{verticalAxis[j]}]</span>
                // )
                floor.push(<Tile/>)
            }
        }
    }

    return <div className = "emptyroom">{floor}</div>;
}

export default Room;