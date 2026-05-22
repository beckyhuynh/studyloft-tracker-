import "./Tile.css"

interface Props{
    image?: string;
    number: number;
}

export default function Tile({number, image}:Props){
    if (number % 2 == 0 && number != 2) {
        return (
        <div className = "tile dark-tile" >
           {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }

    else if(number == 2){
        return(
        <div className = "tile special" >
           {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }

    else{
        return (
        <div className = "tile light-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }
}