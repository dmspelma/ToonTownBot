# ToonTownBot
A simple discord bot designed to enhance gameplay by providing information at your fingertips.

Ver 1.0.0 (March 2018):
  - Initial version of bot
  
Ver 1.0.1 (July 29th, 2019):
  - Changed how case 'help' was implemented
  - Imported files to a Raspberry Pi 3
  - Updated bot description
  
Ver 1.0.2 (February 4th, 2020):
  - Fixed issues with some Cog's names being seperated by a character
  - Updated 'About Me' section
  - Edited starting character for commands
  - Edited Help file
  - Set up PM2 so the bot can run 24/7
  
 Ver 1.0.3 (September 7th, 2020):
  - Added colors to help/invasions commands
  - Progress for upcoming News command
  - Identified bug regarding news/patchnotes commands
  
----------------------------------------------------------------------------------------------

This program uses few different packages/api's as needed in order to run the bot:
- Discord.io - Discord
- Winston - Login abilities
- ToonTown Api
- Node.js - To run application
- Cli-table2 - Assist with text-table creation

----------------------------------------------------------------------------------------------
#Installation Instructions

1. Clone git repo
2. Open folder containing the bot files
3. Edit authTTR.json file and add your Discord Bot Auth Key
4. Run command: npm install
5. Run command: npm install package-lock.json
6. Run command: npm i winston@2
7. Run command: npm install request --save
8. Run command: node TTRBot.js
