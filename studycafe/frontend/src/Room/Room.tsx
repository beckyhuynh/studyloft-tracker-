import './Room.css'
import Tile from '../Tile/Tile.js';
import React from 'react';

// for 8 x 8 tile room
const horizontalAxis = ["a","b","c","d","e","f","g","h"]
const verticalAxis = ["1","2","3","4","5","6","7","8"]

interface Piece{
    image: string
    x: number
    y: number
}

const pieces: Piece[] = [];

pieces.push({image: "./images/assets/chair.png", x:0, y:7})
pieces.push({image: "./images/assets/table.png", x:1, y:5})

let activePiece: HTMLElement | null = null;

function grabItem(e: React.MouseEvent){
    const element = e.target as HTMLElement;
    if(element.classList.contains("itempiece")) {
        const x = e.clientX - 80;
        const y = e.clientY - 80;
        element.style.position = "absolute";
        element.style.left = `${x}px`
        element.style.top = `${y}px`;

        activePiece = element; // only set if we clicked onto it
    }

}

function movePiece(e: React.MouseEvent) {
    if (activePiece) {
        const x = e.clientX - 80;
        const y = e.clientY - 80;
        activePiece.style.position = "absolute";
        activePiece.style.left = `${x}px`
        activePiece.style.top = `${y}px`;
    }
}

function dropPiece(e: React.MouseEvent) {
    if(activePiece) {
        activePiece = null;
    }
}

function Room(){
    // display inventory items in a scrollable horizontal list at top
    // drag items to a tile in the room, update locations, store inside database
    // when the server reloads again, it should render the entire room with item in same spot
    // can move item to different location in the room
    let floor = [];

    for (let j = verticalAxis.length - 1; j>=0;j--) {
        for(let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;
            let image = undefined;

            pieces.forEach(p => {
                if (p.x == i && p.y == j) {
                    image = p.image;
                }
            })

            floor.push(<Tile key = {`${j},${i}`} image = {image} number = {number} />);
        }
    }

    return (
    <div 
    onMouseMove = {(e) => movePiece(e)} 
    onMouseDown={e => grabItem(e)} 
    onMouseUp = {(e) => dropPiece(e)}
    className = "emptyroom">
        {floor}
    </div>
    );
}

export default Room;