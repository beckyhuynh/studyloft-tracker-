import './Room.css'
import Tile from '../Tile/Tile.js';
import React, { JSX } from 'react';
import {useRef, useState, useEffect} from "react";
import '../Bar.css'


function Room(){
    // let barList: JSX.Element[] = []; 
    // for 8 x 8 tile room
    const horizontalAxis = ["a","b","c","d","e","f","g","h"]
    const verticalAxis = ["1","2","3","4","5","6","7","8"]

    // connect this to the inventory database
    // each time saved stuff, the count should be updated accordingly
    // if the count for an item is zero, all items are used up, delete that entry from database
    // and it should not be rendered in the inventory bar anymore
    const barListInitial: JSX.Element[] = []; 
    const chair = ["./images/assets/chairFront.png","./images/assets/chairLeft.png", "./images/assets/chairBack.png", "./images/assets/chairRight.png"];

    const furniture: (Array<string>)[] = [];
    furniture.push(chair);

    // for each item in inventory, push it into barList to be rendered in inventory bar
    // each time push item, also push in its count;
    const countMap = new Map();
    countMap.set("chair",2);
    countMap.set("table",2);

    const [itemCount, setItemCount] = useState(countMap); // itemCount is a map of item in inventory and its amt(session persistent only)

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src = {chair[0]}/>
            <div className = "imageText">{itemCount.get("chair")}</div>
        </div>
        );


    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/table.png"/>
            <div className = "imageText">{itemCount.get("table")}</div>
        </div>
        );


    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/toilet.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/oven.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/plant.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/window.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/painting1.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/painting2.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/dog.gif"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/cat.gif"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/couchLeft.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/couchRight.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
    <div className = "container">
        <img className = "picture" style = {{width:150, height:150}} src="./images/assets/fridgeTop.png"/>
        <div className = "imageText">10</div>
    </div>
        );

    barListInitial.push(
    <div className = "container">
        <img className = "picture" style = {{width:150, height:150}} src="./images/assets/fridgeBottom.png"/>
        <div className = "imageText">10</div>
    </div>
        );

    barListInitial.push(
    <div className = "container">
        <img className = "picture" style = {{width:150, height:150}} src="./images/assets/sink.png"/>
        <div className = "imageText">10</div>
    </div>
        );

    barListInitial.push(
    <div className = "container">
        <img className = "picture" style = {{width:150, height:150}} src="./images/assets/toiletSide.png"/>
        <div className = "imageText">10</div>
    </div>
        );

    barListInitial.push(
    <div className = "container">
        <img className = "picture" style = {{width:150, height:150}} src="./images/assets/bathTubLeft.png"/>
        <div className = "imageText">10</div>
    </div>
        );

    barListInitial.push(
    <div className = "container">
        <img className = "picture" style = {{width:150, height:150}} src="./images/assets/bathTubRight.png"/>
        <div className = "imageText">10</div>
    </div>
        );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/clock.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/carpet.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/desk.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/bedBottom.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/bedTop.png"/>
            <div className = "imageText">10</div>
        </div>
            );

    
    const [barList, setBarList] = useState<JSX.Element[]>(barListInitial);
    
    // itemCount.get("chair")
    // itemCount.get("table")


    

    const things = barList.map(item => <li className = "thingBar" style ={{listStyleType:'none'}}>{item}</li>)


    interface Piece{
        image: string | null
        x: number
        y: number
    }

    // start out with two windows by default
    // for initial floor state, if there isnt anything in it already, thats a fresh room
    // if no item in position in database:

    // else if there is smth in database, for each item in database, add into initial floor state
    // otherwise, push stuff from position database into initial floor state and render that
    const roomFurnish: Piece[] = [];
    roomFurnish.push({image: "./images/assets/window.png", x:1, y:6});
    roomFurnish.push({image: "./images/assets/window.png", x:6, y:6});

    const [initialFloorState, setFloor] = useState<Piece[]>(roomFurnish);
    // initialFloorState.push({image: "./images/assets/chair.png", x:0, y:7})

// when press onto an item, it will push it onto the first upper left tile
// of the floor, only if there isnt an item there already, otherwise send an alert

    function spawnItem(e: React.MouseEvent){
        const elem = e.target as HTMLElement;
        const test = [...initialFloorState];
        // console.log("here");
        console.log(initialFloorState);

        // if(elem.classList.contains("picture")){
        //     console.log("clicked")
        //     console.log(e.target)
        //     test.push({image:elem.getAttribute('src'),x:0,y:1})
        //     console.log(initialFloorState)
        // }
        // test.push({image:"./images/assets/chair.png",x:0,y:1})
        test.push({image:elem.getAttribute('src'),x:0,y:0})
        // return test;
        setFloor(test);
        setPieces(test);
        
        
        let count = [...itemCount];
        let countArray = [...count.values()]; 
        const mapped = countArray.map(thing => thing[0]);

        let idx = 0;
        let curr = "";
        let amt = 0;
        let currStr = "";

        // mapping here
        if (elem.getAttribute('src') == "./images/assets/chairFront.png") {
            idx = mapped.indexOf("chair");
            curr = "chair";
            currStr = "./images/assets/chairFront.png";
        }

        if ((elem.getAttribute('src')) == "./images/assets/table.png"){
            idx = mapped.indexOf("table");
            curr = "table";
            currStr = "./images/assets/table.png";
        }
        

        amt = count[idx][1];
        amt --;


        // fix the idx thing here, need to actually find which spot has the thing
        let newArr = [...barList];
        let idx2 = 0;

        for (let i = 0; i < newArr.length; i++){
            // console.log("yo mam")
            // console.log(currStr);
            // console.log("vs");
            // console.log(newArr[i].props.children[0].props.src);

            if (newArr[i].props.children[0].props.src == (currStr)){
                idx2 = i;
                console.log(i + currStr);
                break;
            }
        }

        newArr[idx2] = (
            <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src = {currStr}/>
            <div className = "imageText">{amt}</div>
        </div>
        );

        setBarList(newArr);

        // if ran out of item, dont display it in the bar anymore
        if (amt == 0){
            // console.log("we in")
            // console.log(barList);
            const filtered = newArr.filter((_,i) => i !== idx2);
            setBarList(filtered);
            // console.log(barList)
        }

        let newmap = new Map(itemCount);
        newmap.set(curr, amt);

        setItemCount(newmap);
    }


    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setgridX] = useState(0);
    const [gridY, setgridY] = useState(0);
    const [pieces, setPieces] = useState<Piece[]>(initialFloorState)
    // console.log(pieces);
    // display inventory items in a scrollable horizontal list at top
    // drag items to a tile in the room, update locations, store inside database
    // when the server reloads again, it should render the entire room with item in same spot
    // can move item to different location in the room
    const roomRef = useRef<HTMLDivElement>(null);

    // let activePiece: HTMLElement | null = null;

    function rotateItem(e:React.MouseEvent){
        // console.log("we in");
        e.stopPropagation;
        e.preventDefault;
        setPieces((value) => {
                const pieces = value.map(p => {
                    if (p.image != null && p.x == 1 && p.y == 0) {
                        // console.log("hee");
                        let index = 0;
                        let idx = 0;

                        // which item
                        for (let j = 0; j < furniture.length; j++){
                            if (furniture[j].includes(p.image)) {
                                idx = j;
                                break;
                            }
                        }

                        for (let i = 0; i < furniture[idx].length; i++){
                            if (p.image == furniture[idx][i]) {
                                index = i + 1;
                                if (index > furniture[idx].length-1) {
                                    index = 0;
                                }
                                console.log(index);
                                // console.log("equal");
                                p.image = furniture[idx][index];
                                break;
                            }
                        }
                        // p.image = "./images/assets/plant.png";
                    }
                    return p;
                })
 
                return pieces;
            });
    }

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

            console.log(element);
            setActivePiece(element);
            // activePiece = element; // only set if we clicked onto it
            console.log(pieces);
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

    let floor = [];

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

    for (let j = verticalAxis.length - 1; j>=0;j--) {
        for(let i = 0; i < horizontalAxis.length; i++) {
            const number = j + i + 2;
            let image = undefined;

            pieces.forEach(p => {
                if (p.x == i && p.y == j) {
                    image = p.image;
                }
            })  
            
            floor.push(<Tile key = {`${j},${i}`} image = {image} number = {number} j = {j} i={i} />);
        }
    }

    // logic for item rotation:
    // for the chairs
    // if chair is next to table:
    // if table is right of chair, chair faces right
    // if table is bottom of chair, chair faces bottom
    // if table is top of chair, chair faces top...

    return (
    <div>
        <div style={{textAlign:'center', fontSize: 50, color: "rgb(10, 45, 110)"}}>Inventory Bar</div>
        <ul className = "inventoryBar" onMouseDown={e => spawnItem(e)}>{things}</ul>

        <div 
            onMouseMove = {(e) => movePiece(e)} 
            onMouseDown={e => grabItem(e)} 
            onMouseUp = {(e) => dropPiece(e)}
            className = "emptyroom"
            ref = {roomRef}
        >
            
            {floor}
        </div>

        <button className = "rotateButton" onClick = {(e) => rotateItem(e)}>Rotate</button>
    </div>
    );
}

export default Room;