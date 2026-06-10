import React, {useState, useEffect, useRef} from 'react';
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css"
import Room from './Room/Room.js';

function StopWatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null); 
    const startTimeRef = useRef(0); 
    const [periods, setPeriods] = useState([0])
    const[totalcoins,setTotalCoins] = useState([0]);

    const [cartData,setCartData] = useState(new Map());
    const [cartTotal,setCartTotal] = useState(0);

    const [inventory, setInventory] = useState([0])

    useEffect(() => {
        fetchPeriods();
    },[]);


    useEffect(() => {
        fetchItems();
    },[]);

    const fetchPeriods = async () => {
        const response = await fetch("http://127.0.0.1:5000/periods")
        const data = await response.json() 
        setPeriods(data.periods)
        console.log(data.periods)
        setTotalCoins(data.periods[0].coins);
    }

    const fetchItems = async () => {
        const response = await fetch("http://127.0.0.1:5000/items")
        const data = await response.json() 
        setInventory(data.items)
        console.log(data.items)
    }

    // adds new entry to dashboard and resets the clock when end session is pressed
    const addSession = async (e) => {
        e.preventDefault()

        // create wallet as first row if database first created
        if (periods.length == 0){
            const hours = 0;
            const minutes = 0;
            const seconds = 0;
            const milliSeconds = 0;
            const coins = 0;
            const dateTime = 0;

            const data = {
                hours,
                minutes,
                seconds,
                milliSeconds,
                coins,
                dateTime
            }

            const url = "http://127.0.0.1:5000/create_period"
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
                alert(data.message)

            } else {
                fetchPeriods();
                setElapsedTime(0);
                setIsRunning(false);
            } 
        }

        const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        const minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        const seconds = Math.floor(elapsedTime / (1000) % 60);
        const milliSeconds = Math.floor(elapsedTime % 1000 / 10);

        // every 30 seconds studied u get 1 coins
        // const coins = Math.floor((elapsedTime/30000)*1);
        const coins = Math.floor((elapsedTime/1000)*10000);

        const now = Date();
        const dateTime = now.toLocaleString().split("GMT")[0];

        const data = {
            hours,
            minutes,
            seconds,
            milliSeconds,
            coins,
            dateTime
        }

        const url = "http://127.0.0.1:5000/create_period"
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
            alert(data.message)

        } else {
            fetchPeriods();
            updateWallet(1,coins);
            setElapsedTime(0);
            setIsRunning(false);
        }  
    }



    // add new entry to inventory
     const addItem = async (n, p, a, l) => {
        let addnew = true;
        // if item alr exist, just update the amount to increase that specific entry
        for (let i = 0; i < inventory.length; i++) {
            if (inventory[i].name == n) {
                // find the index of where that entry is stored, and id is that + 1
                let ind = i + 1;
                //update
                let amt = inventory[i].amount + a;
                updateItem(ind,amt);
                addnew = false;
                break;
            }
        }

        
        // else if item doesnt alr exist, then add it normally
        if(addnew){
            const name = n;
            const price = p;
            const amount = a;
            const link = l;

            const data = {
                name,
                price,
                amount,
                link
            }

            const url = "http://127.0.0.1:5000/create_items"
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
                alert(data.message)

            } else {
                fetchItems();
            }  
        }   
    }


    const updateWallet = async(rowId, money) => {
        const hours = 0;
        const minutes = 0;
        const seconds = 0;
        const milliSeconds = 0;

        let temp = 10;
        if (periods.length == 0) {
            temp = money;
        }

        else {temp = periods[0].coins + money;}

        const coins = temp;

        const dateTime = "0";

        const data = {
            hours,
            minutes,
            seconds,
            milliSeconds,
            coins,
            dateTime
        }

        const url = "http://127.0.0.1:5000/update_coins/"
        const options = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)

        }

        const response = await fetch(url + rowId, options)
        if (response.status !== 201 && response.status !== 200) {
            console.log("errorrrr")
            const message = await response.json()

        } else {
            fetchPeriods();
            console.log("wallet updated");
        }


    }

     const updateItem = async(rowId, number) => {
        const amount = number;

        const data = {
          amount
        }

        const url = "http://127.0.0.1:5000/update_items/"
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

        } else {
            fetchItems();
            console.log("items updated");
        }


    }

    const deleteSession = async (periodId) => {
        const url = "http://127.0.0.1:5000/delete_period/"
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: periodId})

        }

        const response = await fetch(url + periodId, options)
        if (response.status !== 201 && response.status !== 200) {
            console.log("errorrrr")
            const message = await response.json()

        } else {
            fetchPeriods();
            console.log("entry deleted")
        }
    }
   

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);

            }, 10);
        }
        //clean up to prevent memory leaks
        return () => {
            clearInterval(intervalIdRef.current);
        }
    }, [isRunning]);


    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }

    function stop() {
        setIsRunning(false);
    }

    function formatTime() {
        let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
        let minutes = Math.floor(elapsedTime / (1000 * 60) % 60);
        let seconds = Math.floor(elapsedTime / (1000) % 60);
        let milliseconds = Math.floor(elapsedTime % 1000 / 10);

        hours = String(hours).padStart(2, "0");
        minutes = String(minutes).padStart(2, "0");
        seconds = String(seconds).padStart(2, "0");
        milliseconds = String(milliseconds).padStart(2, "0");

        return `${hours}:${minutes}:${seconds}:${milliseconds}`;
    }


    // figure out how to make new added session get updated to the dashboard right away instead of refresh
    function dashboard(){
        //fetches the data from dashboard and displays it in a scrollable screen
        const perDashboard = periods.map(per => <li key={per.id}>{per.hours}:
        {per.minutes}:{per.seconds}:{per.milliSeconds} ___ {per.dateTime}___ +{per.coins}coins</li>);

        //dont include first entry in display(wallet)
        if (perDashboard.length >= 2){
            return(<ul style={{lineHeight:3.5}}>{perDashboard.slice(1)}</ul>);
        }

        //if theres only wallet in database, no period entries yet, dont display anything
        else return
        //return(<ul style={{lineHeight:3.5}}>{perDashboard}</ul>);
    }

    // calculate total coins in user's wallet
    function coinCalculate(){
        return totalcoins;
    }

    const addToCart = (item, price, pict) =>{
        const newMap = new Map(cartData);

        //when click on button, add item into cart, and its price and quantity
        //each time press increase quantity of item
        //each time press message pops up saying added to cart at top of screen

        // name of item, price, quantity
       

        // find if that item already exists
        if (cartData.has(item)) {
            let amount = cartData.get(item)[1];
            newMap.set(item,[price,amount + 1,pict]);
            setCartData(newMap);

            //setCartData(cartData.set(item,[price,amount + 1]));
        }

        // otherwise if item doesnt exist create a row for it
        else{
            newMap.set(item,[price,1,pict]);
            setCartData(newMap);
            // setCartData(cartData.set(item,[price,1]));
        }
        console.log(cartData);
    }

    function displayCart(){
        const cartArray = [...cartData]; // converts to array
        
        // console.log("after")
        // console.log(cartArray);
        // // console.log(cartData);
        //const cartTable = cartArray.map(entry => <li key={entry[0]}>{entry[0]}___{entry[1][0]}___{entry[1][1]}</li>);

        const cartCol1 =  cartArray.map(entry => <li key = {entry[0]} style ={{listStyleType:'none'}}>{entry[0]}</li>);
        const cartCol2 =  cartArray.map(entry => <li key = {entry[0]} style ={{listStyleType:'none'}}>{entry[1][0]}</li>);
        const cartCol3 =  cartArray.map(entry => <li key = {entry[0]} style ={{listStyleType:'none'}}>{entry[1][1]}</li>);

        // return cartTable;
        return(<table>
            <tbody>
                <tr>
                    <th style = {{textAlign:'left', fontSize:45}}>Item</th>
                    <th style = {{fontSize:45}}>Unit Price</th>
                    <th style = {{textAlign:'right', fontSize:45}}>Quantity</th>
                </tr>
                    <td style = {{textAlign:'left', lineHeight:3, width:500}}>
                        {cartCol1}
                    </td>

                    <td style = {{lineHeight:3, width:500}}>
                        {cartCol2}
                    </td>

                    <td style = {{textAlign:'right', lineHeight:3, width:500}}>
                        {cartCol3}
                    </td>
            </tbody>
        </table>)
    }

    function totalInCart(){
        let count = 0;
        console.log(cartData)

        // iterate through each item, multiply unit price by quantity, and add it up
        cartData.forEach(function(value){
            count += value[0]*value[1];
        })
        // setCartTotal(count);
        // console.log(count)
        // console.log("out")
        // return cartTotal;
        
        // console.log(cartTotal + "vs" + count)
        return count;
    }

    useEffect(() => {
        setCartTotal(totalInCart());
    },[cartData])

    const checkOutCart = (() => {
        // if theres nothing in the cart
        if (cartData.size == 0) alert("THERE'S NOTHING IN THE CART!😲 ADD SOMETHING!");

        // check if has enough balance
        // if not return error message to screen
        else if(totalcoins < cartTotal) alert("NOT ENOUGH BALANCE!!!")

        // if have enough, print checked out!
        // and clear the map, and also save all items to inventory in database
        else if(totalcoins >= cartTotal) {
            alert("CHECKED OUT! ITEMS ARE NOW IN YOUR INVENTORY!!");

            cartData.forEach(function(value,key){
                // loop through entire map and add item to database inventory
                addItem(key,value[0],value[1], value[2]);
            })

            const newCart = new Map();
            setCartData(newCart);
            console.log("YOOO")
            console.log(cartData);
        }
       
    })
    
    let temproom = [];

    const [databaseRoom, setDatabaseRoom] = useState([0]);
    const [roomtest,setroomtest] = useState(temproom);


    useEffect(() => {
        fetchLayout();
    },[]);


   
    const fetchLayout = async () => {
        const response = await fetch("http://127.0.0.1:5000/getpositions")
        const data = await response.json() 

        // console.log(data);
        setDatabaseRoom(data.locates); 
        // setFloor(data.locates);


    }

    useEffect(() =>{
        if (databaseRoom != null){
            databaseRoom.forEach(p =>{
                // roomFurnish.push({image: p.picture, x: p.xpos, y:p.ypos});
                temproom.push({image: p.picture, x: p.xpos, y:p.ypos});
            })
            // console.log(roomtest)
            
            // setFloor(roomtest);
            // console.log(initialFloorState);
        }
        console.log(temproom);
        setroomtest([...temproom])
    
    },[databaseRoom]);


    // add new entry to position database
    const addPos = async (pix, xloc, yloc) => {
        const picture = pix;
        const xpos = xloc;
        const ypos = yloc;

        const data = {
            picture,
            xpos,
            ypos
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


    // find out which items are currently on the board with pieces and save them all
    const saveLayout = (() => {
        // alert("button is working yippee")
        // console.log(pieces);

        fetchLayout();

        // for every entry on board, add it to database
        if (pieces != null){
            // console.log(pieces);
            
            let found = false;

            pieces.forEach(p => {
                if(databaseRoom != null && databaseRoom.length != 0){
                    console.log("we in")
                    // console.log(databaseRoom)
                    for (const d of databaseRoom) {
                        console.log("bruh")
                        if (d.picture == p.image) {
                            // console.log("found")
                            // console.log(d.picture)
                            // console.log(p.image)
                            found = true;
                           
                            break;
                        }
                    }


                    //if went through whole database and couldnt find item then add
                    if (!found){
                        addPos(p.image, p.x, p.y);
                    }
                    found = false;
                }

                else if (databaseRoom != null && databaseRoom.length == 0){
                    addPos(p.image, p.x, p.y);
                }

            })

        }
       
        // fetchLayout();
        
        // also update inventory database here
        // if its one of the coupled items, do special logic
        
    })


    return(
        <div className="mainScreen">
            <div className="note">
                <h1>study and get coins to furnish your home!! ^^</h1>  
            </div> 

            <div className="title">
                <h1>☆StudyLoft☆</h1>
                
            </div> 
            
            <div className = "tabs-container">
                <Tabs>
                    <TabList className="tabsBar">
                        <Tab>timer⏱︎</Tab>
                        <Tab>browse🔎︎</Tab>
                        <Tab>cart🛒</Tab>
                        <Tab>decor☆</Tab>
                        <Tab>credits</Tab>
                    </TabList>

                    <TabPanel className="panel">
                        <div className="stopwatch">

                            <div className="display">{
                                formatTime()
                            }
                            </div> 

                            <div className="controls">
                                <button onClick={start} className="start-button">Start</button>
                                <button onClick={stop} className="stop-button">Pause</button>
                                <button onClick={addSession} className="reset-button">End</button>
                                <button onClick={(e) => deleteSession(154)} className="delete-button">Delete</button>
                                
                            </div>

                        </div>
                    

                        <div className= "title2">{
                            <h1>session history◴ ▶ 1 coin/30 secs</h1>
                        }
                        </div>

                        <div className= "dashboard">{
                            dashboard()
                        }
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="browse"> 
                            <div className="message"> 
                                <div style = {{display:'inline'}}>your total study coins:</div>
                                <div className="messageCoins" style = {{display:'inline'}} >{coinCalculate()}⍟ </div>
                                <br /> click on pic to add to cart!
                            </div>



                            <button onClick={() => addToCart("chair",5, "./images/assets/chairFront.png")} className="item" size="xs">
                                <img src="./images/assets/chairFront.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>wood chair- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("table",5, "./images/assets/table.png")} className="item" size="xs">
                                <img src="./images/assets/table.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>wood table- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("oven",10, "./images/assets/oven.png")} className="item" size="xs">
                                <img src="./images/assets/oven.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>oven- 10 coins</h1>
                            </button>

                            <button onClick={() => addToCart("toilet",10, "./images/assets/toiletSide.png")} className="item" size="xs">
                                <img src="./images/assets/toiletSide.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>toilet- 10 coins</h1>
                            </button>

                            <button onClick={() => addToCart("plant",5, "./images/assets/plant.png")} className="item" size="xs">
                                <img src="./images/assets/plant.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>plant- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("painting1",5, "./images/assets/painting1.png")} className="item" size="xs">
                                <img src="./images/assets/painting1.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>painting1- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("painting2",5, "./images/assets/painting2.png")} className="item" size="xs">
                                <img src="./images/assets/painting2.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>painting2- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("dog",5, "./images/assets/dog.gif")} className="item" size="xs">
                                <img src="./images/assets/dog.gif" style ={{width:'460px',height:'460px'}}/>
                                <h1>doggie :3- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("cat",5, "./images/assets/cat.gif")} className="item" size="xs">
                                <img src="./images/assets/cat.gif" style ={{width:'460px',height:'460px'}}/>
                                <h1>cat :3- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("window",5, "./images/assets/window.png")} className="item" size="xs">
                                <img src="./images/assets/window.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>window- 5 coins</h1>
                            </button>

                            
                            <button onClick={() => addToCart("couch",5, "./images/assets/couch.png")} className="item" size="xs">
                                <img src="./images/assets/couch.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>couch- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("fridge",10, "./images/assets/fridge.png")} className="item" size="xs">
                                <img src="./images/assets/fridge.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>fridge- 10 coins</h1>
                            </button>

                            <button onClick={() => addToCart("sink",5, "./images/assets/sink.png" )} className="item" size="xs">
                                <img src="./images/assets/sink.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>sink- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("bathtub",5, "./images/assets/bathtub.png")} className="item" size="xs">
                                <img src="./images/assets/bathtub.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>bathtub- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("clock",5, "./images/assets/clock.png")} className="item" size="xs">
                                <img src="./images/assets/clock.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>clock- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("carpet",5, "./images/assets/carpet.png")} className="item" size="xs">
                                <img src="./images/assets/carpet.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>carpet- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("desk",5, "./images/assets/desk.png")} className="item" size="xs">
                                <img src="./images/assets/desk.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>desk- 5 coins</h1>
                            </button>

                            <button onClick={() => addToCart("bed",5, "./images/assets/bed.png")} className="item" size="xs">
                                <img src="./images/assets/bed.png" style ={{width:'460px',height:'460px'}}/>
                                <h1>bed- 5 coins</h1>
                            </button>

                        </div>

                    </TabPanel>

                    <TabPanel className = "cart">
                        <p>items in cart do not last upon refresh, buy now!</p>

                        <div className="cartdisplay">
                            {displayCart()}
                        </div> 

                        <h1 style = {{textAlign:'center'}}>_______________________</h1>
                        <p style = {{textAlign:'right',fontSize:45}}>total cost:{totalInCart()}⍟</p>
                        <button className = "checkoutButton" onClick={() => checkOutCart()}>checkout!</button>
                    </TabPanel>

                    <TabPanel>
                        <div className = "mainCafe">
                        <p className = "message2" style ={{lineHeight:2}}>
                            1. Click on item to spawn it on bottom left corner (GREEN)
                            <br></br>
                            2. Drag furniture to (BLUE) left corner to rotate
                            <br></br>
                            3. Drag furniture to a tile on the floor to furnish
                            <br></br>
                            4. Click save to log changes to layout :D
                            <br></br>
                            _______________________
                        </p>
                            <div className = "tiles">
                                <Room 
                                    ivt = {inventory}

                                    // dbInventoryUpdate = {updateItem}
                                    // inventoryUpdate = {setInventory}
                                />
                                
                            </div>

                        </div>
                    </TabPanel>
                    

                    <TabPanel className="art">
                        <p>Credits for arts:</p>
                    </TabPanel>
                </Tabs>
            </div>
            <div className="bg"></div>

            <div className="credits">
                <h1>☆background credits: It's 23:12 by Baikakn on Dribbble☆</h1>
            </div> 


        </div>
    );
}

export default StopWatch;
