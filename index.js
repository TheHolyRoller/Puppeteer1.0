const puppeteer = require('puppeteer'); 
const fs = require('fs');
const cssselect = require('css-select');


const url = 'https://facebook-daniel-wakeley-s-projects.vercel.app/'; 

// Get the filepath here 
// const filePath = 'data.json'; 
const filePath = './data.json';
const urlPath = './urls.json'; 


// Add in the function here for reading urls 
async function readURLS(visited_url){

 // Check if the file exists
 if (fs.existsSync (urlPath)) {
    // Read the file content as a string
    const fileContent = await fs.promises.readFile (urlPath, 'utf8');
    // Parse the string as a JSON object
    const data = JSON.parse (fileContent);
    // Return the urls array
    return data.urls;
  } else {
    // If the file does not exist, return an empty array
    return [];
  }
};


// Add in the Add urls function here 
async function addURL(current_url){

    // Get the current urls array from the file
  const visitedURLS = await readURLS();
  
  console.log('this is the visited urls'); 
  
  console.log(visitedURLS); 
  console.log('it its only facebook'); 
  
  // Add the new url to the array

  visitedURLS.push(current_url);
  // Create a JSON object with the urls array
  const data = { urls: visitedURLS };
  // Stringify the JSON object
  const fileContent = JSON.stringify (data);
  // Write the file content to the file
  await fs.promises.writeFile (urlPath, fileContent, 'utf8');
  // Return the updated urls array
  
  console.log('the program is working up until now '); 
  
  
  return visitedURLS;
  
  
  

};

// Define a function to search the json file for a url
async function searchUrl(current_url) {
    // Read the file content as a string
    const fileContent = await fs.promises.readFile(urlPath, 'utf8');
    // Parse the string as a JSON object
    const data = JSON.parse(fileContent);
    // Get the urls array from the data object

    const urls = data.urls;
    
    console.log('this is the urls array'); 
    console.log(urls); 

    
    if(urls !== null){
        
        console.log('this is the length of the urls array');
        console.log(urls.length); 
        
    }
    
    const found = urls.includes(current_url);
    
    console.log('this is the found variable '); 
    console.log(found); 
    
    
    
    // Return a boolean value indicating whether the url was found or not
    return found;
    
  };

  
async function readCounter(){

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    // Read the file content as a string
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    // Parse the string as a JSON object
    const data = JSON.parse(fileContent);
    // Return the counter value
    return data.counter;
    
  } else {
    // If the file does not exist, return 0 as the default value
    return 0;
  }
};



async function updateCounter() {
    // Get the current counter value
    const counter = await readCounter();
    
    
    console.log('updating COUNTER*****')
    // Increment the counter by 1
    let newCounter; 
    
    
    // Adjust this later 
    if(counter >= 3){
     newCounter = 0;
     console.log("this is the updated counter"); 
    console.log(newCounter); 

        
    }
    else{
    
         newCounter = counter + 1;
        console.log("this is the updated counter"); 
        console.log(newCounter); 
    }
    
   
    
    // Create a JSON object with the new counter value
    const data = { counter: newCounter };
    // Stringify the JSON object
    const fileContent = JSON.stringify(data);
    // Write the file content to the file
    await fs.promises.writeFile(filePath, fileContent, 'utf8');
    // Return the new counter value
    return newCounter;
  };
  
  
  
  async function sendMessage(page, messageURL){
    
    const profile_Link = 'https://discord.com/channels/@me/644645709781663744';

    // Navigate here 
    await Promise.all([page.goto(profile_Link), page.waitForNavigation()]);
    
    // Add in an await for select here 
    await page.waitForSelector('[role="textbox"]'); 
    
    const textBox = await page.$('[role="textbox"]');
    
    await textBox.click(); 
    
    await textBox.type(messageURL);
    
    // Press Enter here 
    await page.keyboard.press('Enter'); 
    
    // Call the goBack function here 
    // goBack(page); 

}
  
  
  
  
  
  
  
async function login(page, messageURL){
        
    await page.waitForSelector('[name="email"]'); 
    await page.waitForSelector('[name="password"]');
    
    // Wait for the element to be available 
    const emailInput = await page.$('[name="email"]'); 
    const passwordInput = await page.$('[name="password"]');
    
    // Access the element 
    console.log("this is the email input "); 
    console.log(emailInput);
    
    console.log("this is the password input"); 
    console.log(passwordInput); 
    
    
    await emailInput.click(); 
    await emailInput.type("danielwakeley7@gmail.com");
    
    
    await passwordInput.click(); 
    await passwordInput.type("Beholdhowgood!133");
    
    await page.keyboard.press('Enter'); 

    setTimeout(() => {
        sendMessage(page,messageURL);
      }, 5000);
      

    //   await sendMessage(page, messageURL); 
}
  
  
  
  
  
  
  async function messageBoss(page, messageURL){

    console.log('teleporting there *****');
    await Promise.all([page.goto('https://discord.com/channels/@me/644645709781663744'), page.waitForNavigation()]);
    login(page, messageURL); 
}


  
  
//   Add in the evaluate data function here 
async function evaluateData(page, priceNum){

    console.log('this is the page of the evaluate function '); 
    console.log(page); 

    
    if(priceNum > 500 && priceNum < 90000 ){
        
        console.log("we have a high price!!!");
        console.log('this is the price');
        console.log(priceNum);
        const messageURL = await page.url();
        console.log('this is the message url'); 
        console.log(messageURL); 
        messageBoss(page,messageURL); 
    }

    else{

        console.log("low price"); 
    }
    console.log("this is the evaluate function ")
}

  
  
  
  
  async function scrapeData(page){
    
    console.log("this is the scrape data function ");
    
    
    const xpath = "//div [starts-with (text (), '\u0024')]";
    
    const elements = await page.$x(xpath);
    
    const priceElement = elements[0]; 
    
    const priceText = await page.evaluate(el => el.textContent, priceElement); 
    const formattedText = priceText.replace(/[, $]/g, ''); 

    const priceNum = Number(formattedText); 
    console.log("this is the price number"); 
    console.log(priceNum); 
    console.log("just about to run"); 
    evaluateData(page, priceNum); 

}
  
  
  
  
  
  
  


// Create the Read counter variable function here 
async function currentURL(page){
    
    // Get the current url here 
    let current_url = await page.evaluate(() => document.location.href);

    // const current_url = await page.url();
    // Call the Find url function here 
    
    console.log('this is the current url'); 
    console.log(current_url); 
    
    
    
    const visited_url = await searchUrl(current_url); 
    
    console.log('this is the visited url'); 
    console.log(visited_url); 
    
    
    
    // Check to see if visited url return anything back 
    if(visited_url !== false){
        
        console.log("you have visited this link before ")
        console.log('this is the visited url')
        console.log(visited_url); 
        
        
    }
    if(visited_url === false){
        
        console.log("you have NOT visited this link before ")
        console.log('this is the visited url')
        console.log(visited_url); 
        
        // Call the scrape Data function here 
        scrapeData(page); 
        
        
        
        console.log('this is the current url before its been added'); 
        console.log(current_url); 
        
        
        // Add in the code here to update the json file with the current url 
        await addURL(current_url); 
        console.log('adding the current url');
        
    }
    
    
    if(visited_url === null){
        
        console.log("you have not visited this link before");
        console.log('this is the visited url'); 
        
        console.log(visited_url)

    }

    console.log("is this functioning");
    console.log("this is the current url"); 
   await console.log(current_url); 
    console.log("this is the page object"); 
    console.log(page); 
    
    
    // Call the update counter function here 
    await updateCounter(); 
    
    console.log('calling scrape data function'); 

}





// Add in the get product function here 
async function getProduct(page){

    console.log("will this WORKKKK");
    let index = 3;
    
    // Call the read Counter variable function here 
    const counter = await readCounter(); 
    
    console.log("this is the counter from data.json"); 
    console.log(counter); 
    
    
    
    await page.screenshot({path: 'facebook.png'});
    
    console.log("this is where the program got too **********")
        
    let xpath = "//div [starts-with (text (), '\u0024')]";
    const elements = await page.$x(xpath);
    
    console.log("trying to trace the error down"); 

    // Make sure that you are 
    if(elements.length >= 1){
        let element = elements[counter]; 
        await element.click(); 

    }
    
    else{
        console.log("nothing has been assigned")
    }

   await currentURL(page); 
}


// Create the driver function here 

async function startProgram(){
    
    // Add in the code here to configure the browser 
    const browser = await puppeteer.launch({headless: false});  // Create a new page
    const page = await browser.newPage(); 
    await page.goto(url);
    // Call the secondary driver function here 
    await getProduct(page); 
    
    // await currentURL(page); 
    
    
    // Call the close browser function here 
    // await page.close(); 
    // await page.close(); 
    
    
    
    
}

startProgram(); 

