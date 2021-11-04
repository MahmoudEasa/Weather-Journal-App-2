/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/forecast?zip=";
const apiKey = "&appid=21d44e5ccb081708196324f2b062ea34&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;

// Event listener to add function to existing HTML DOM element
document.querySelector("#generate").addEventListener("click", performAction);

/* Function called by event listener */
function performAction(e){
    let newZip = document.querySelector("#zip").value;
    let newFeelings = document.querySelector("#feelings").value;
// Create an if condition to check if user enters a value or not
    if (!newZip){
        alert("Pleas, Enter A Zip Code");
    }else if (!newFeelings){
        alert("Pleas, Enter Your Feeling");
    }else{
    // First Get Data
    getData(baseURL, newZip, apiKey)
    // Then Add Data To Post Request
    .then(res =>{
        console.log(res);
        postData("/addData", {date:newDate, temperature:res.list[0].main.temp, feelings:newFeelings});
    })
    // Then Update UI
    .then(res =>{
        updateUI()
    });
};
};

// Function to GET Data
const getData = async (url, zip, key)=>{
    const res = await fetch(url+zip+key)
    try{
        // Convert the data stored in request constant from json format to javascript
        const data = await res.json();
        return data;
    }catch(error){
        // Handle the error
        console.log("error", error);
    }
};

// Function to POST data
const postData = async (url= "", data= {})=>{
    console.log(data);
    const req = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    try{
        const newData = await req.json();
            return newData;
    }catch(error){
        // Handle the error
        console.log("error", error);
    };
};

// function to UpdateUI
const updateUI = async ()=>{
    const request = await fetch("/all");
    try{
        const allData = await request.json();
        document.querySelector("#date").innerHTML = `Date Is: ${allData.date}`;
        document.querySelector("#temp").innerHTML = `Temperature Is: ${allData.temperature}`;
        document.querySelector("#content").innerHTML = `I feel: ${allData.feelings}`;
    }catch(error){
        console.log("error", error);
    };
};
