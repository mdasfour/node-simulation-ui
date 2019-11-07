# Node Simulation UI
## The Frontend of the [Node Simulation Web Application](https://github.com/mdasfour/node-simulation)

### Tech Stack:

- [Vue.js (2.6.10)](https://vuejs.org) - Progressive JavaScript Framework
- [Vuetify (2.0.0)](https://vuetifyjs.com/en/) - Material Design Component Framework
- [Axios (0.19.0)](https://github.com/axios/axios) - Promised based HTTP client for the browser
- [Moment.js (2.24)](https://www.momentjs.com) - Parse, validate, manipulate, and display dates and times in JavaScript.

**NOTE: You must run the frontend of the project in Chrome.  This is due to [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), which interferes with the proper operation of the app.  The developer of this app has tried to tweak and even completely disable it, but to no avail.  This is an issue that other developers have struggled with.  You will need to install the `Allow CORS: Access-Control-Allow-Origin` extension from the [Chrome Store](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en-US).  This issue occurs when running on a local development enviroment due to the backend and frontend running on different ports.  Once deployed to a server, this will not be an issue.**

**Please make sure that you have cloned and ran the backend of the Node Simulation Web Application before running the frontend.**

1. Clone the git repository by typing in at the command prompt `git clone https://github.com/mdasfour/node-simulation-ui`.

2. From the command line, change into the `node-simulation-ui` directory.

3.  Open `apiConfig.js` located in the `src` directory.  Configure your hostname and port and save the file.

4. At the prompt type `npm install`.  This will install the necessary dependencies in order to run the application.

5. Once Step 4 has been successfully completed, run `npm run serve` at the command prompt.



![alt text](https://github.com/mdasfour/node-simulation-ui/blob/master/images/NodeSimulationUI.png "Node Simulation UI")
