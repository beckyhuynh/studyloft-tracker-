import "./Tile.css"

interface Props{
    image?: string;
    number: number;
    j : number;
    i : number;
}

export default function Tile({number, image, j, i}:Props){

    if (j == 0 && i == 1){
        return (
        <div className = "tile edit-tile" >
           {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }

    else if (number % 2 == 0 && number != 2 && j < 5) {
        return (
        <div className = "tile dark-tile" >
           {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }

    // spawn tile
    else if(number == 2){
        return(
        <div className = "tile special" >
           {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }

    // backwall tiles
    if (j >= 5) {
        if (j == 5){
            return(
            <div className = "tile wallWithBorder" >
                {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
                </div>
            );
        }

        else if (j != 5){
            return(
                <div className = "tile wall" >
                {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece wallpiece"></div>}
                </div>
            );
        }
    }

    else{
        return (
        <div className = "tile light-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }
}