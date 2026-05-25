import "./Tile.css"

interface Props{
    image?: string;
    number: number;
    j : number;
    i : number;
}

export default function Tile({number, image, j, i}:Props){
    // edit tile
    if (j == 0 && i == 1){
        return (
        <div className = "tile edit-tile" >
           {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }

    // dark tile
    else if (number % 2 == 0 && number != 2 && j < 5) {
        if (image == "./images/assets/table.png" || image == "./images/assets/plant.png"){
            return (
            <div className = "tile dark-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece resized"></div>}
            </div>
            );
        }

        else if (image == "./images/assets/couchLeft.png" || image == "./images/assets/bathTubLeft.png"){
            return (
            <div className = "tile dark-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece couchLeft"></div>}
            </div>
            );
        }
        

        else if (image == "./images/assets/couchRight.png"){
            return (
            <div className = "tile dark-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece couchRight"></div>}
            </div>
            );
        }

        else if (image =="./images/assets/bathTubRight.png"){
            return (
                <div className = "tile dark-tile" >
                {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece bathTubRight"></div>}
                </div>
            );
        }

        else if (image == "./images/assets/fridgeTop.png" || image == "./images/assets/bedTop.png"){
            return (
            <div className = "tile dark-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece fridgeTop"></div>}
            </div>
            );
        }

        else if (image == "./images/assets/fridgeBottom.png"){
            return (
            <div className = "tile dark-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece fridgeBottom"></div>}
            </div>
            );
        }

        else if (image == "./images/assets/bedBottom.png"){
            return (
            <div className = "tile dark-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece bedBottom"></div>}
            </div>
            );
        }
        
        return (
        <div className = "tile dark-tile" >
           {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }

    // spawn tile
    else if(number == 2){
        if (image == "./images/assets/table.png" || image == "./images/assets/plant.png"){
            return (
            <div className = "tile special" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece resized"></div>}
            </div>
            );
        }

        return(
        <div className = "tile special" >
           {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }

    // backwall tiles
    if (j >= 5) {
        if (j == 5){
            if (image == "./images/assets/fridgeTop.png"){
                return (
                <div className = "tile wallWithBorder" >
                {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece fridgeTop"></div>}
                </div>
                );
            }

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

    // light tiles
    else{
        if (image == "./images/assets/table.png" || image == "./images/assets/plant.png"){
            return (
            <div className = "tile light-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece resized"></div>}
            </div>
            );
        }

        else if (image == "./images/assets/couchLeft.png" || image == "./images/assets/bathTubLeft.png"){
            return (
            <div className = "tile light-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece couchLeft"></div>}
            </div>
            );
        }

        else if (image == "./images/assets/couchRight.png"){
            return (
            <div className = "tile light-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece couchRight"></div>}
            </div>
            );
        }

        else if (image == "./images/assets/fridgeTop.png" || image == "./images/assets/bedTop.png"){
            return (
            <div className = "tile light-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece fridgeTop"></div>}
            </div>
            );
        }

        else if (image == "./images/assets/fridgeBottom.png"){
            return (
            <div className = "tile light-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece fridgeBottom"></div>}
            </div>
            );
        }

        else if (image == "./images/assets/bedBottom.png"){
            return (
            <div className = "tile light-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece bedBottom"></div>}
            </div>
            );
        }

        else if (image =="./images/assets/bathTubRight.png"){
            return (
                <div className = "tile light-tile" >
                {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece bathTubRight"></div>}
                </div>
            );
        }


        return (
        <div className = "tile light-tile" >
            {image && <div style = {{backgroundImage:`url(${image})`}} className = "itempiece"></div>}
        </div>
        );
    }
}