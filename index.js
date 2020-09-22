const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const burgersOnClick = () =>{

}

const tacosOnClick = () =>{

}

const saladsOnClick = () =>{

}

const dessertsOnClick = () =>{

}

const drinksOnClick = () => {

}

const addToCart = () =>{

}

fetch(url).then((response)=> response.json())
    .then(response =>{
        console.log(response)
    })