import React, {useState, useEffect, useRef} from 'react';
import {Tab, Tabs, TabList, TabPanel} from "react-tabs";
import "react-tabs/style/react-tabs.css"

function StopWatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null); 
    const startTimeRef = useRef(0); 
    const [periods, setPeriods] = useState([0])
    const[totalcoins,setTotalCoins] = useState([0]);

    useEffect(() => {
        fetchPeriods();
    },[]);


    const fetchPeriods = async () => {
        const response = await fetch("http://127.0.0.1:5000/periods")
        const data = await response.json() 
        setPeriods(data.periods)
        console.log(data.periods)
        setTotalCoins(data.periods[0].coins);
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
        const coins = Math.floor((elapsedTime/30000)*1);

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

    // function addToCart(item, price){
    //     //when click on button, add item into cart, and its price and quantity


    //     //each time press increase quantity of item
    //     //each time press message pops up saying added to cart at top of screen
    //     return;
    // }

    return(
        <div className="mainScreen">
            <div className="note">
                <h1>study and get coins to decor your cafe!! ^^</h1>  
            </div> 

            <div className="title">
                <h1>StudyCafe☕︎</h1>
                
            </div> 
            
            <div className = "tabs-container">
                <Tabs>
                    <TabList className="tabsBar">
                        <Tab>timer⏱︎</Tab>
                        <Tab>browse🔎︎</Tab>
                        <Tab>cart🛒</Tab>
                        <Tab>decor☆</Tab>
                        <Tab>enjoy</Tab>
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
                            <h1>session history◴- 5 coins/minute</h1>
                        }
                        </div>

                        <div className= "dashboard">{
                            dashboard()
                        }
                        </div>
                    </TabPanel>

                    <TabPanel>
                        <div className="browse"> 
                            <div className="message">your total study coins: {coinCalculate()}⍟ <br /> click on pic to add to cart!</div>

                                <button className="item" size="xs">
                                    <img src="./images/chair.jpg" style ={{width:'440px',height:'440px'}}/>
                                    <h1>wooden brown chair- 5 coins</h1>
                                </button>

                                <button className="item" size="xs">
                                    <img src="./images/table.jpg" style ={{width:'440px',height:'440px'}}/>
                                    <h1>wooden brown table- 5 coins</h1>
                                </button>

                                <button className="item" size="xs">
                                    <img src="./images/plant.jpg" style ={{width:'440px',height:'440px'}}/>
                                    <h1>house plant- 5 coins</h1>
                                </button>

                                <button className="item" size="xs">
                                    <img src="./images/flowerpot.jpg" style ={{width:'440px',height:'440px'}}/>
                                    <h1>flower pot- 5 coins</h1>
                                </button>

                                <button className="item" size="xs">
                                    <img src="./images/painting.jpg" style ={{width:'440px',height:'440px'}}/>
                                    <h1>wall painting- 5 coins</h1>
                                </button>

                                <button className="item" size="xs">
                                    <img src="./images/coffeemachine.jpg" style ={{width:'440px',height:'440px'}}/>
                                    <h1>coffee machine- 5 coins</h1>
                                </button>
                        </div>

                    </TabPanel>

                    <TabPanel className = "cart">
                        <p>items in cart do not last upon refresh, buy now!</p>
                    </TabPanel>

                    <TabPanel>
                        <p>cafe decorating here</p>
                    </TabPanel>

                    <TabPanel className="art">
                        <p>nothing here just wanted to give u space to enjoy clear view of background art^_^</p>
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
