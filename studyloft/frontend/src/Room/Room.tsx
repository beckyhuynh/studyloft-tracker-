import './Room.css'
import Tile from '../Tile/Tile.js';
import React, { JSX } from 'react';
import {useRef, useState, useEffect} from "react";
import '../Bar.css'
import {Piece} from '../Piece.tsx'

interface inventoryRecord{
    ivt: Array<Type>;
}

interface Type{
    itemId : number;
    name: String;
    price: number;
    amount: number;
    link: string;
}

// interface editInventory{
//     inventoryUpdate: 
// }

function Room({ivt}:inventoryRecord){
    // let barList: JSX.Element[] = []; 
    // for 8 x 8 tile room
    const horizontalAxis = ["a","b","c","d","e","f","g","h"]
    const verticalAxis = ["1","2","3","4","5","6","7","8"]

    // console.log(inventory[0])
    // console.log(ivt[1])

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

    const [itemCount, setItemCount] = useState(countMap); // itemCount is a map of item in inventory and its amt(session persistent only)

    for (let i = 0; i < ivt.length; i++){
    

        if (ivt[i].name == "bed") {
            countMap.set("bedBottom", ivt[i].amount);
            barListInitial.push(
        <div className = "container">
            <img className = "picture" style = {{width:150, height:150}} src="./images/assets/bedBottom.png"/>
            <div className = "imageText">{itemCount.get("bedBottom")}</div>
        </div>
            );
            

            countMap.set("bedTop", ivt[i].amount);
            barListInitial.push(
                <div className = "container">
                    <img className = "picture" style = {{width:150, height:150}} src="./images/assets/bedTop.png"/>
                    <div className = "imageText">{itemCount.get("bedTop")}</div>
                </div>
                    );
            
        }

        else if (ivt[i].name == "bathtub") {
            countMap.set("bathTubLeft", ivt[i].amount);
            barListInitial.push(
            <div className = "container">
                <img className = "picture" style = {{width:150, height:150}} src="./images/assets/bathTubLeft.png"/>
                <div className = "imageText">{itemCount.get("bathTubLeft")}</div>
            </div>
                );
            

            countMap.set("bathTubRight", ivt[i].amount);
            barListInitial.push(
            <div className = "container">
                <img className = "picture" style = {{width:150, height:150}} src="./images/assets/bathTubRight.png"/>
                <div className = "imageText">{itemCount.get("bathTubRight")}</div>
            </div>
                );
            
        }

        else if (ivt[i].name == "fridge") {
            countMap.set("fridgeTop", ivt[i].amount);
             barListInitial.push(
            <div className = "container">
                <img className = "picture" style = {{width:150, height:150}} src="./images/assets/fridgeTop.png"/>
                <div className = "imageText">{itemCount.get("fridgeTop")}</div>
            </div>
                );
            

            countMap.set("fridgeBottom", ivt[i].amount);
            barListInitial.push(
            <div className = "container">
                <img className = "picture" style = {{width:150, height:150}} src="./images/assets/fridgeBottom.png"/>
                <div className = "imageText">{itemCount.get("fridgeBottom")}</div>
            </div>
                );
            

        }

        else if (ivt[i].name == "couch") {
            countMap.set("couchLeft", ivt[i].amount);
             barListInitial.push(
            <div className = "container">
                <img className = "picture" style = {{width:150, height:150}} src="./images/assets/couchLeft.png"/>
                <div className = "imageText">{itemCount.get("couchLeft")}</div>
            </div>
                );
            

            countMap.set("couchRight", ivt[i].amount);
            barListInitial.push(
            <div className = "container">
                <img className = "picture" style = {{width:150, height:150}} src="./images/assets/couchRight.png"/>
                <div className = "imageText">{itemCount.get("couchRight")}</div>
            </div>
                );
            

        }

        else{
            countMap.set(ivt[i].name, ivt[i].amount);
            barListInitial.push(
            <div className = "container">
                <img className = "picture" style = {{width:150, height:150}} src = {ivt[i].link}/>
                <div className = "imageText">{itemCount.get(ivt[i].name)}</div>
            </div>
            );
        }

    }

    // countMap.set("chair",2);
    // countMap.set("table",2);
    
    const [barList, setBarList] = useState<JSX.Element[]>(barListInitial);
    const things = barList.map(item => <li className = "thingBar" style ={{listStyleType:'none'}}>{item}</li>)


    

    // start out with two windows by default
    // for initial floor state, if there isnt anything in it already, thats a fresh room
    // if no item in position in database:

    // else if there is smth in database, for each item in database, add into initial floor state
    // otherwise, push stuff from position database into initial floor state and render that

    interface Piece{
        image: string | null
        x: number
        y: number
    }

    const [databaseRoom, setDatabaseRoom] = useState<Piece[] | undefined>(undefined);


    let temproom: Piece[] =[];
    temproom.push({image: "./images/assets/window.png", x:1, y:6})
    temproom.push({image: "./images/assets/window.png", x:6, y:6})

    // const [roomFurnish, setRoom] = useState<Piece[]>(temproom);


    const [activePiece, setActivePiece] = useState<HTMLElement | null>(null);
    const [gridX, setgridX] = useState(0);
    const [gridY, setgridY] = useState(0);
    // const [roomtest,setroomtest] = useState<Piece[]>(temproom);

    // display inventory items in a scrollable horizontal list at top
    // drag items to a tile in the room, update locations, store inside database
    // when the server reloads again, it should render the entire room with item in same spot
    // can move item to different location in the room
    const roomRef = useRef<HTMLDivElement>(null);

    // let activePiece: HTMLElement | null = null;

    useEffect(() => {
        if(!databaseRoom) return;

        let temp = [...databaseRoom];
        // temp.push({image:"./images/assets/window.png",x:1,y:6})
        // temp.push({image:"./images/assets/window.png",x:6,y:6})
        setPieces(temp);
        // console.log(pieces)
        console.log(databaseRoom)
        
    },[databaseRoom])


    // console.log(databaseRoom);

    const [initialFloorState, setFloor] = useState<Piece[]>([]);
    // console.log(initialFloorState);
    const [pieces, setPieces] = useState<Piece[]>(initialFloorState)



    useEffect(() => {
        
        fetchLayout();
        // console.log("rerendered")
        // console.log(databaseRoom);
    },[]);

    const fetchLayout = async () => {
        const response = await fetch("http://127.0.0.1:5000/getpositions")
        const dataCollected = await response.json() 
        setDatabaseRoom(dataCollected.locates);
        
        // console.log(dataCollected.locates)
        
    
        
        // setDatabaseRoom2(data.locates);
        // console.log(databaseRoom2)
        // setFloor(data.locates);
    }


    // add new entry to position database
    const addPos = async (pix:string | null, xloc:number, yloc:number) => {
        const image = pix;
        const x = xloc;
        const y = yloc;

        const data = {
            image,
            x,
            y
        }

        const url = "http://127.0.0.1:5000/create_location"
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        }

        const response = await fetch(url, options)
        if (response.status !== 201 && response.status !== 200) {
            const message = await response.json()
            alert(message);
        }
        fetchLayout();
    }


    const updateLocation = async(rowId:number, xcoor:number, ycoor:number) => {
        const x = xcoor;
        const y = ycoor;

        const data = {
          x,
          y
        }

        const url = "http://127.0.0.1:5000/update_location/"
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        }

        const response = await fetch(url + rowId, options)
        if (response.status !== 201 && response.status !== 200) {
            console.log("errorrrr")
            const message = await response.json()
            alert(message)
        } else {
            fetchLayout();
        }


    }

    // find out which items are currently on the board with pieces and save them all
    const saveLayout = (() => {
        // alert("button is working yippee")
        // console.log(pieces);

        fetchLayout();
        // console.log("hello")
        // console.log(databaseRoom)

        // for every entry on board, add it to database
        if (pieces != null){
            // console.log(pieces);
            
            let found = false;

            // fix up add to database logic

           // make two temp maps, one to hold count/id of items in database and 
           // one to hold for pieces for easier access

           let databaseMap = new Map();
           let piecesMap = new Map();

          

            const fetchLayout2 = async () => {
                    const response = await fetch("http://127.0.0.1:5000/getpositions")
                    const dataCollected = await response.json() 

                    // console.log(dataCollected);
                    // setDatabaseRoom(dataCollected.locates);
                    
                    if (dataCollected.locates != null) {
                        for (const d of dataCollected.locates){
                            if (databaseMap == null || databaseMap.size == 0 || !(databaseMap.has(d.image))){
                                // console.log("what???")
                                // console.log([d.x,d.y]);
                                databaseMap.set(d.image, [1,[[d.x,d.y]]]);
                            }
                            else if (databaseMap.has(d.image)) {
                                // in value add array of count and coords of each
                                let tempcount = databaseMap.get(d.image)[0] + 1;

                                let temparr = databaseMap.get(d.image)[1]
                                temparr.push([d.x,d.y]);

                                databaseMap.set(d.image,[tempcount, temparr])
                            }
                            
                        }
                    }
                    

                    if (pieces != null) {
                        for (const d of pieces){
                            if (piecesMap == null || piecesMap.size == 0 || !(piecesMap.has(d.image))){
                                // console.log("what???")
                                // console.log([d.x,d.y]);
                                piecesMap.set(d.image, [1,[[d.x,d.y]]]);
                            }
                            else if (piecesMap.has(d.image)) {
                                // in value add array of count and coords of each
                                let tempcount = piecesMap.get(d.image)[0] + 1;

                                let temparr = piecesMap.get(d.image)[1]
                                temparr.push([d.x,d.y]);

                                piecesMap.set(d.image,[tempcount, temparr])
                            }
                            
                        }
                    }

                    piecesMap.forEach(function(value,key) {
                        if (!databaseMap.has(key)) {
                            // console.log(value[1])

                            // console.log(value[1]);

                            for (const v of value[1]){
                                // console.log(v)
                                addPos(key, v[0], v[1]);
                            }
                            // console.log(value[1][0][0])
                            // console.log(value[1][0][1])

                            // addPos(key, value[1][0][0], value[1][0][1]); // this line
                            console.log("in here")
                        }

                        else{
                            console.log("here")
                            let piecesCount = value[0];
                            let dataCount = databaseMap.get(key)[0];


                            let surplus = piecesCount - dataCount;
                            // console.log(surplus)

                            // still check if items locations have been changed
                            // no matter if there is surplus or not
                            // added new item to the board

                            let piecesCoorArr = value[1]; // coordinates array of current item

                            // console.log(piecesCoorArr)
                            let tempPieceArr = piecesCoorArr.slice(0,piecesCoorArr.length-surplus)

                            type Coordinate = [number,number];
                            tempPieceArr.sort((a:Coordinate,b:Coordinate) => {
                                if (a[0] === b[0]) {
                                    return a[1] - b[1];
                                }

                                return a[0] - b[0];
                            });

                            // console.log(tempPieceArr);

                            // console.log(databaseMap.get(key)[1][1]);

                            

                            for (let j = 0; j < tempPieceArr.length; j++){
                                // let found = false;

                                let tempDataArr = databaseMap.get(key)[1];

                                tempDataArr.sort((a:Coordinate,b:Coordinate) => {
                                    if (a[0] === b[0]) {
                                        return a[1] - b[1];
                                    }

                                    return a[0] - b[0];
                                });

                                // console.log(tempDataArr)
                                // console.log(tempPieceArr)

                                if (!(tempDataArr[j][0] == tempPieceArr[j][0] && tempDataArr[j][1] == tempPieceArr[j][1])){
                                    console.log(tempDataArr[j])
                                    console.log(tempPieceArr[j])
                                    // figure the id to update

                                    if (databaseRoom != null) {
                                        console.log("are we in?")
                                        let id = 1;

                                        for (const it of dataCollected.locates) {
                                            console.log(it)
                                            console.log(tempDataArr[j])
                                            if (it.x == tempDataArr[j][0] && it.y == tempDataArr[j][1]){
                                                console.log("yes")
                                                updateLocation(id, tempPieceArr[j][0],tempPieceArr[j][1]);
                                                break;
                                            }
                                            else{
                                                id ++;
                                            }
                                        }
                                    }
                                    
                                }


                                // toBreak: for (const da of databaseMap){

                                //     // da[1][1] is the coor array of the item to be searched in database
                                //     for (const ins of da[1][1]){
                                //         // console.log(ins)
                                //         if ((ins[0] == piecesCoorArr[j][0] && ins[1] == piecesCoorArr[j][1])){
                                //             // console.log(dataCollected.locates)
                                //             // console.log(pieces)
                                //             // console.log(ins);
                                //             // console.log(piecesCoorArr[j])
                                //             found = true;
                                //             break toBreak;
                                            
                                //         }
                                        
                                //     }
                                // }
                                // if (!found) {
                                //     console.log("hello??")
                                //     console.log(key) // the item to update
                                //     console.log(piecesCoorArr[j]) // the coords to update to

                                //     // console.log(datacoor);
                                //     // console.log(piececoor)
                                // }

                            }


                            
                            fetchLayout();
                            if (surplus > 0) {

                                for (let i = 0; i < surplus; i++){
                                    addPos(key, piecesCoorArr[piecesCoorArr.length - 1 - i][0], piecesCoorArr[piecesCoorArr.length - 1 - i][1]);
                                }
                            }
                            }
                    
                    })

                    
            }

            
            fetchLayout2();

          
           
            

        //    if (databaseRoom != null) {
        //     for (const d of databaseRoom){
        //         if (databaseMap == null || databaseMap.size == 0 || !(databaseMap.has(d.image))){
        //             // console.log("what???")
        //             // console.log([d.x,d.y]);
        //             databaseMap.set(d.image, [1,[[d.x,d.y]]]);
        //         }
        //         else if (databaseMap.has(d.image)) {
        //             // in value add array of count and coords of each
        //             let tempcount = databaseMap.get(d.image)[0] + 1;

        //             let temparr = databaseMap.get(d.image)[1]
        //             temparr.push([d.x,d.y]);

        //             databaseMap.set(d.image,[tempcount, temparr])
        //         }
                
        //     }
        //    }
        

        //    if (pieces != null) {
        //     for (const d of pieces){
        //         if (piecesMap == null || piecesMap.size == 0 || !(piecesMap.has(d.image))){
        //             // console.log("what???")
        //             // console.log([d.x,d.y]);
        //             piecesMap.set(d.image, [1,[[d.x,d.y]]]);
        //         }
        //         else if (piecesMap.has(d.image)) {
        //             // in value add array of count and coords of each
        //             let tempcount = piecesMap.get(d.image)[0] + 1;

        //             let temparr = piecesMap.get(d.image)[1]
        //             temparr.push([d.x,d.y]);

        //             piecesMap.set(d.image,[tempcount, temparr])
        //         }
                
        //     }
        //    }

        //    piecesMap.forEach(function(value,key) {
        //     if (!databaseMap.has(key)) {
        //         // console.log(value[1])
        //         addPos(key, value[1][0][0], value[1][0][1]);
        //     }

        //     else{
        //         let piecesCount = value[0];
        //         let dataCount = databaseMap.get(key)[0];


        //         let surplus = piecesCount - dataCount;

        //         // still check if items locations have been changed
        //         // no matter if there is surplus or not
        //         // added new item to the board

        //         let piecesCoorArr = value[1]; // coordinates array of current item

                
        //         for (let j = 0; j< piecesCoorArr.length-surplus; j++){
        //             for (const da of databaseMap){
        //                 // console.log(da[1])
        //                 for (const ins of da[1][1]){
        //                     // console.log(ins)
        //                     if (ins[0] == piecesCoorArr[j][0] && ins[1] == piecesCoorArr[j][1]){
        //                         console.log(databaseRoom)
        //                         console.log(pieces)
        //                         console.log(ins);
        //                         console.log(piecesCoorArr[j])

                                 
        //                     }
        //                     // else{
        //                     //     console.log(ins[0]);

        //                     // }
        //                 }
        //             }
        //         }


        //         if (surplus > 0) {

        //             for (let i = 0; i < surplus; i++){
        //                 addPos(key, piecesCoorArr[piecesCoorArr.length - 1 - i][0], piecesCoorArr[piecesCoorArr.length - 1 - i][1]);
        //             }
        //         }
        //         }
           
        //    })

        }
       
        // fetchLayout();
        
        // also update inventory database here
        // if its one of the coupled items, do special logic
        
        
    })

  
    // initialFloorState.push({image: "./images/assets/chair.png", x:0, y:7})

// when press onto an item, it will push it onto the first upper left tile
// of the floor, only if there isnt an item there already, otherwise send an alert

    function spawnItem(e: React.MouseEvent){
        const elem = e.target as HTMLElement;
        const test = [...pieces];
        // console.log("here");
        // console.log(initialFloorState);

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
   
        // console.log("heres map" + mapped);

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

        if ((elem.getAttribute('src')) == "./images/assets/oven.png"){
            idx = mapped.indexOf("oven");
            curr = "oven";
            currStr = "./images/assets/oven.png";
        }

        if (elem.getAttribute('src') == "./images/assets/toiletSide.png") {
            idx = mapped.indexOf("toilet");
            curr = "toilet";
            currStr = "./images/assets/toiletSide.png";
        }

        if (elem.getAttribute('src') == "./images/assets/plant.png") {
            idx = mapped.indexOf("plant");
            curr = "plant";
            currStr = "./images/assets/plant.png";
        }

        if (elem.getAttribute('src') == "./images/assets/painting1.png") {
            idx = mapped.indexOf("painting1");
            curr = "painting1";
            currStr = "./images/assets/painting1.png";
        }

        if (elem.getAttribute('src') == "./images/assets/painting2.png") {
            idx = mapped.indexOf("painting2");
            curr = "painting2";
            currStr = "./images/assets/painting2.png";
        }

        if ((elem.getAttribute('src')) == "./images/assets/dog.gif"){
            idx = mapped.indexOf("dog");
            curr = "dog";
            currStr = "./images/assets/dog.gif";
        }

        if ((elem.getAttribute('src')) == "./images/assets/cat.gif"){
            idx = mapped.indexOf("cat");
            curr = "cat";
            currStr = "./images/assets/cat.gif";
        }

        if (elem.getAttribute('src') == "./images/assets/window.gif") {
            idx = mapped.indexOf("window");
            curr = "window";
            currStr = "./images/assets/window.gif";
        }

        if (elem.getAttribute('src') == "./images/assets/couchLeft.png") {
            idx = mapped.indexOf("couchLeft");
            curr = "couchLeft";
            currStr = "./images/assets/couchLeft.png";
        }

        if (elem.getAttribute('src') == "./images/assets/couchRight.png") {
            idx = mapped.indexOf("couchRight");
            curr = "couchRight";
            currStr = "./images/assets/couchRight.png";
        }

        if (elem.getAttribute('src') == "./images/assets/fridgeTop.png") {
            idx = mapped.indexOf("fridgeTop");
            curr = "fridgeTop";
            currStr = "./images/assets/fridgeTop.png";
        }

        if (elem.getAttribute('src') == "./images/assets/fridgeBottom.png") {
            idx = mapped.indexOf("fridgeBottom");
            curr = "fridgeBottom";
            currStr = "./images/assets/fridgeBottom.png";
        }

        if (elem.getAttribute('src') == "./images/assets/sink.png") {
            idx = mapped.indexOf("sink");
            curr = "sink";
            currStr = "./images/assets/sink.png";
        }

        if (elem.getAttribute('src') == "./images/assets/bathTubLeft.png") {
            idx = mapped.indexOf("bathTubLeft");
            curr = "bathTubLeft";
            currStr = "./images/assets/bathTubLeft.png";
        }

        if (elem.getAttribute('src') == "./images/assets/bathTubRight.png") {
            idx = mapped.indexOf("bathTubRight");
            curr = "bathTubRight";
            currStr = "./images/assets/bathTubRight.png";
        }

        if (elem.getAttribute('src') == "./images/assets/clock.png") {
            idx = mapped.indexOf("clock");
            curr = "clock";
            currStr = "./images/assets/clock.png";
        }

        if (elem.getAttribute('src') == "./images/assets/carpet.png") {
            idx = mapped.indexOf("carpet");
            curr = "carpet";
            currStr = "./images/assets/carpet.png";
        }

        if (elem.getAttribute('src') == "./images/assets/desk.png") {
            idx = mapped.indexOf("desk");
            curr = "desk";
            currStr = "./images/assets/desk.png";
        }

        if (elem.getAttribute('src') == "./images/assets/bedTop.png") {
            idx = mapped.indexOf("bedTop");
            curr = "bedTop";
            currStr = "./images/assets/bedTop.png";
        }

        if (elem.getAttribute('src') == "./images/assets/bedBottom.png") {
            idx = mapped.indexOf("bedBottom");
            curr = "bedBottom";
            currStr = "./images/assets/bedBottom.png";
        }

        if (elem.getAttribute('src') == "./images/assets/window.png") {
            idx = mapped.indexOf("window");
            curr = "window";
            currStr = "./images/assets/window.png";
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
                // console.log(i + currStr);
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
                                // console.log(index);
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

            // console.log(element);
            setActivePiece(element);
            // activePiece = element; // only set if we clicked onto it
            // console.log(pieces);
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

    // pushing the pieces to the floor
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
        
        {/* when click on button, save position of all items on the board into position database 
                - when reload the page, check above for deets
            update inventory database using itemCount values- if its a coupled item and only half of it is on the board, dont allow save, otherwise just use count of any 
            one of the coupled items
        */}

        <button className = "save" onClick={() => saveLayout()}>Save Layout!</button>
    </div>
    );
}

export default Room;