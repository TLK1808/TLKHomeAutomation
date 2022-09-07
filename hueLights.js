require("dotenv").config();
const axios = require(`axios`);
//lightstrip ecke tisch id 5
//"dev": "nodemon src/index.js" in package.json ändern
controlLight = async(lightId, on, hue, sat, bri) => {
    try {
        return await axios.put
        (
            `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/${lightId}/state`,
            {
                on,
                ...(bri && { bri }),
                ...(hue && { hue }),
                ...(sat && { sat }),
            }
        );
        }
        catch(err)
        {
            console.error(error)
        }
};

getLights = async() =>
{
    try 
    {
        return await axios.get
        (
            `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights`,
        )
    }
    catch(err)
    {
        console.log(error)
    }
};
module.exports.getLights = getLights;
module.exports.controlLight = controlLight;
/*module.exports = {
    controlLight: async function(lightId, on, hue, sat, bri) 
    {
        try {
            console.log(hue);
            console.log(sat);
            console.log(bri);
            return await axios.put
            (
                `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/${lightId}/state`,
                {
                    on,
                    ...(sat && { sat }),
                    ...(bri && { bri }),
                    ...(hue && { hue }),
                }
            );
            }
            catch(err)
            {
                console.error(error)
            }
    }
}*/
controlLight(5, false, 9000, 254, 254);
/*
module.exports = {
    controlLight: async function(lightId, on) {
        try {
            return await axios.put(
                `http://${process.env.HUE_BRIDGE_IP}/api/${process.env.HUE_USERNAME}/lights/${lightId}/state`,
                {on});
            }catch(err){
                console.error(error)
            }
    }
}*/