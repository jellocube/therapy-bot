const Discord = require('discord.js');
const worksheets = require('../../data/worksheets.json');
const makeEmbed = require("../functions/makeEmbed.js");

function runCollector(client, message, itemListing, folder) {
    // Retrieval collector system
    const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 30000 });
    console.log(collector)
    collector.on('collect', message => {
        let collectorArgs = message.content.slice(client.config.prefix.length).trim().split(/ +/g); // split arguments for the collector message

        if (isNaN(collectorArgs[1])) {      // if args aren't a number in range, reject the request
            return
        } else if (collectorArgs[1] > itemListing.length) {
            message.channel.send(`Number out of range! Pick from the list please.`);
            return
        };

        let fileIndex = 0;  // what file page from the item listing we are on
        let fileArray = itemListing[collectorArgs[1]];  // make an array for the file we're working with
        let currentFile = fileArray.filename[fileIndex];    // the current file is the filename corresponding to the active index
        console.log(fileArray.filename[0]);

        if (collectorArgs[0].substr(0, 9) == "worksheet" && collectorArgs[1] <= itemListing.length ) { // substring allows anything starting with "worksheet" to be counted, thus plurals... and typos too, I guess
        
        if (!fileArray.filename && fileArray.url) {     // send URL if no file
            message.channel.send(`__**${fileArray.title}**__\n\n${fileArray.url}`);
            return
        };

        message.channel.send(`Uploading: ./data/worksheets/${folder}/${currentFile}...`)    
        message.channel.send(new Discord.Attachment(`./data/worksheets/${folder}/${currentFile}`, currentFile) )
            .catch(console.error);
            
            if (fileIndex < fileArray.filename.length) {
                message.channel.send(`This is file ` + (fileIndex+1) + " of " + fileArray.filename.length + " files." );
                fileIndex++;
                currentFile = fileArray.filename[fileIndex]
            }
        //} else if (fileIndex > 0 && message.content == "!next") {
            //message.channel.send(new Discord.Attachment(`./data/worksheets/${folder}/${currentFile}`, currentFile))
        } else if (message.content == "anything_else") {
            message.channel.send("THIS IS JUST AN EXAMPLE!");
        }
    })
}

function isInList(array, elementValue) {    // check if element value is in a list of valued elements
    let isInList = false;
    array.forEach(e => {
        if (e == elementValue) { isInList = true }
        else { }
    });
    
    return isInList ? true:false
};

function listUniqueElementValues(array, element) {  // make a list of element values by array and element specified, only listing each occuring element value once without repeats.
    let elementList = [];
    array.forEach(w => {           
        if (isInList(elementList, w[element])) {}  // if the item element value is in the element list already, we're gonna skip it
        else {elementList.push(w[element])} // add it to the array if it's not in the list already, tho
    });

    return elementList
};

function listItemsWithElementValue(array, element, elementValue) {   // make a list of items with a specific value in a given element field
    let itemList = [];
    array.forEach(i => {
        if (i[element] == elementValue) { itemList.push(i) }    // if item has the right value in the right element, add it to this list we're gonna return
        else {} // ignore other values
    })

    return itemList;
};

function listAsStringIndexed(array) {      // takes an array and formats its entries as an enumerated multi-line string
    let stringList = "";
    let index = 0;
    array.forEach(i => {
        stringList = `${stringList}\n${index}: ${i}`;
        index++     // this doesn't do anything because the index resets before this nest on each loop.
    })

    return stringList;
};

function listAsString(array) {      // takes an array and formats its entries as an enumerated multi-line string
    let stringList = "";
    let index = 0;
    array.forEach(i => {
        stringList = `${stringList}\n${i}`;
        index++     // this doesn't do anything because the index resets before this nest on each loop.
    })

    return stringList;
};

module.exports = (client, message, args) => {
    let folderList = listUniqueElementValues(worksheets, "folder");
    let itemsInFolder = [];

    if (args == "") {
        let folderChoices = listAsString(folderList);
        message.channel.send("These are the available topic folders:\n ```" + folderChoices + "```\nPlease type ``!worksheet <folder-name>`` to retrieve the list of respective workshets.");
    } else if (isInList(folderList, args)) {
        itemsInFolder = listItemsWithElementValue(worksheets, "folder", args);
        let itemTitlesString = listAsStringIndexed(listUniqueElementValues(itemsInFolder, "title"));
        message.channel.send("Folder contents:\n ```" + itemTitlesString + "```\nPlease type ``!worksheet <number>`` to retrieve worksheet image files.");
        runCollector(client, message, itemsInFolder, args[0]);
    } else if (isNaN(args)) {       // if it's not a number we'll assume it's a topic we don't now about
        message.channel.send("I don't know about that. Type ``!worksheets`` for a list of topics.");
    }
}