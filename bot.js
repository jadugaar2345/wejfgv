const mineflayer = require('mineflayer');
const readline = require('readline');

const bot = mineflayer.createBot({
  host: 'play.pika.host', // Your server IP
  username: 'farmer32204', // Your bot's username
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to send chat messages
function sendChatMessage(message) {
    bot.chat(message);
  }

bot.on('spawn', () => {
  console.log('Bot has spawned in the game!');
});

bot.on('chat', (username, message) => {
    if (username !== bot.username) {
      console.log(`${username}: ${message}`);
    }
  });
  

// Listen for console input
rl.on('line', (input) => {
    console.log(`Received input: ${input}`); // Debugging line
    if (input.startsWith('/chat ')) {
      const message = input.substring(6);
      sendChatMessage(message);
    } else if (input.startsWith('/hotbar ')) {
      const slot = parseInt(input.substring(8)); // Get the slot number
      if (!isNaN(slot) && slot >= 0 && slot <= 8) { // Validate the slot number
        bot.setQuickBarSlot(slot);
        console.log(`Hotbar slot changed to: ${slot}`);
      } else {
        console.log('Invalid slot number. Please enter a number between 0 and 8.');
      }
    } else if (input === '/use') {
      // Activate the item in hand
      const heldItem = bot.heldItem;
      if (heldItem && heldItem.type !== -1) {
        bot.activateItem(); // Activate the item
        console.log('Item activated.');
      } else {
        console.log('No item in hand to use.');
      }
    } else if (input.startsWith('/left ')) {
        const slot = parseInt(input.substring(6)); // Get the slot number
        if (!isNaN(slot)) {
          bot.clickWindow(slot, 0, 0); // Left-click on the specified slot
          console.log(`Left-clicked on slot ${slot}.`);
        } else {
          console.log('Invalid slot number for left click.');
        }
      } else if (input.startsWith('/right ')) {
        const slot = parseInt(input.substring(7)); // Get the slot number
        if (!isNaN(slot)) {
          bot.clickWindow(slot, 1, 0); // Right-click on the specified slot
          console.log(`Right-clicked on slot ${slot}.`);
        } else {
          console.log('Invalid slot number for right click.');
        }
      } else if (input === '/close') {
        // Simulate Escape key press
        bot.emit('keypress', 27); // 27 is the key code for Escape
        console.log('Simulated Escape key press.');
      }
  });


// Show items in the window when it opens
bot.on('windowOpen', (window) => {
    console.log('Window opened:');
    window.slots.forEach((item, index) => {
      if (item) {
        const itemName = bot.registry.items[item.type].name; // Get the item name
        console.log(`Slot ${index}: ${itemName}`);
      } else {
        console.log(`Slot ${index}: Empty`);
      }
    });
  });

bot.on('kicked', (reason) => {
  console.log('Kicked:', reason);
});
bot.on('error', (err) => {
  console.log('Error:', err);
});
