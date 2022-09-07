//const hueLights = require("./hueLights.js");
document.body.onload = loadLightsListVisual;

function enableLight(btnId)
{
    const indexOfSpace = btnId.indexOf(' ');
    var lightId = btnId.substring(indexOfSpace + 1);
    //http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/${lightId}/state
    console.log(lightId);
    fetch('http://192.168.178.23/api/k9qykpdDaBYlv7Ohfxg-yLJnr6ljWjrqI2lQXzXo/lights/' + lightId + '/state', {
    method: "PUT",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(
        {"on":true}
    )
    })
    //.then((response) => response.json())
    //.then((data) => console.log(data));
}

function disableLight(btnId)
{
    const indexOfSpace = btnId.indexOf(' ');
    var lightId = btnId.substring(indexOfSpace + 1);
    fetch('http://192.168.178.23/api/k9qykpdDaBYlv7Ohfxg-yLJnr6ljWjrqI2lQXzXo/lights/' + lightId + '/state', {
    method: "PUT",
    headers: {
        'Content-type': 'application/json'
    },
    body: JSON.stringify(
        {"on":false}
    )
    });
}

function loadLights()
{
    return fetch('http://192.168.178.23/api/k9qykpdDaBYlv7Ohfxg-yLJnr6ljWjrqI2lQXzXo/lights', {
    method: "GET",
    headers: {
        'Content-type': 'application/json'
    },
    })
    .then((response) => response.json()) 
    .then((data) => 
    {
        //console.log(Object.keys(data).length);
        var numberOfLights = Object.keys(data).length;
        //console.log(data);
        return numberOfLights;    
    })
    //console.log(Object.keys(data).length))
    //var numberOfLights = Object.keys(data).length
    //return numberOfLights;
    //var count = Object.keys(data).length;
    //console.log(count); 
}

async function loadLightsListVisual()
{
    return fetch('http://192.168.178.23/api/k9qykpdDaBYlv7Ohfxg-yLJnr6ljWjrqI2lQXzXo/lights', {
    method: "GET",
    headers: {
        'Content-type': 'application/json'
    },
    })
    .then((response) => response.json()) 
    .then((data) => 
    {
        var numberOfLights = Object.keys(data).length;
        //var listOfLights = data;  
        //console.log(data);
        for (let i = 1; i < numberOfLights; i++)
        {
            //console.log("onBtn" + i)
            var newDiv = document.createElement("div");
            //console.log(data[i].name);
            var newContent = document.createTextNode(data[i].name);

            newDiv.appendChild(newContent);

            var newContent = document.createElement("input");
            newContent.type = "button";
            newContent.value = "On";
            newContent.id = "onBtn " + i;
            newContent.onclick = function() {
                enableLight(this.id);
            };
            newDiv.appendChild(newContent);

            var newContent = document.createElement("input");
            newContent.type = "button";
            newContent.value = "Off";
            newContent.id = "offBtn " + i;
            newContent.onclick = function() {
                disableLight(this.id);
            }
            newDiv.appendChild(newContent);


            var currentDiv = document.getElementById("btnOn");

            document.body.insertBefore(newDiv, currentDiv);
        }
    }); 
}