import './Room.css'
import Tile from '../Tile/Tile.js';
import React from 'react';
import {useRef, useState, useEffect} from "react";

// for 8 x 8 tile room
const horizontalAxis = ["a","b","c","d","e","f","g","h"]
const verticalAxis = ["1","2","3","4","5","6","7","8"]

interface Piece{
    image: string
    x: number
    y: number
}

const initialFloorState: Piece[] = [];

initialFloorState.push({image: "./images/assets/chair.png", x:0, y:7})
initialFloorState.push({image: "./images/assets/table.png", x:1, y:5})


function Room(){
    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setgridX] = useState(0);
    const [gridY, setgridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialFloorState)
    // display inventory items in a scrollable horizontal list at top
    // drag items to a tile in the room, update locations, store inside database
    // when the server reloads again, it should render the entire room with item in same spot
    // can move item to different location in the room
    const roomRef = useRef<HTMLDivElement>(null);

    // let activePiece: HTMLElement | null = null;

    function grabItem(e: React.MouseEvent){
        const element = e.target as HTMLElement;
        const room = roomRef.current;
        if(element.classList.contains("itempiece") && room) {
            setgridX(Math.floor((e.clientX- room.offsetLeft) / 150));
            setgridY(Math.abs(Math.ceil((e.clientY - room.offsetTop - 1200) / 150)));
            const x = e.clientX - 80;
            const y = e.clientY - 80;
            element.style.position = "absolute";
            element.style.left = `${x}px`
            element.style.top = `${y}px`;

            setActivePiece(element);
            // activePiece = element; // only set if we clicked onto it
        }

    }

    function movePiece(e: React.MouseEvent) {
        const room = roomRef.current;
        if (activePiece && room) {
            const minX = room.offsetLeft -25;
            const minY = room.offsetTop - 25;
            const maxX = room.offsetLeft + room.clientWidth - 120;
            const maxY = room.offsetTop + room.clientHeight - 120;

            const x = e.clientX - 80;
            const y = e.clientY - 80;
            activePiece.style.position = "absolute";
            // activePiece.style.left = `${x}px`
            // activePiece.style.top = `${y}px`;

            if (x < minX) {
                activePiece.style.left = `${minX}px`;
            } else if(x > maxX) {
                activePiece.style.left = `${maxX}px`;
            } else{
                activePiece.style.left = `${x}px`;
            }

            if (y < minY) {
                activePiece.style.top = `${minY}px`;
            } else if(y > maxY) {
                activePiece.style.top = `${maxY}px`;
            } else{
                activePiece.style.top = `${y}px`;
            }

        }
    }

    function dropPiece(e: React.MouseEvent) {
        const room = roomRef.current;
        if(activePiece && room) {
            const x = Math.floor((e.clientX- room.offsetLeft) / 150);
            const y = Math.abs(Math.ceil((e.clientY - room.offsetTop - 1200) / 150));
            //console.log(x,y);

            setPieces((value) => {
                const pieces = value.map(p => {
                    if (p.x == gridX && p.y == gridY) {
                        p.x = x;
                        p.y = y;
                    }
                    return p;
                })
                return pieces;
            });
            setActivePiece(null);
        }
    }

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
    className = "emptyroom"
    ref = {roomRef}
    >
        {floor}
    </div>
    );
}

export default Room;