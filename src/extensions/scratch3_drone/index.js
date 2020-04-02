const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const formatMessage = require('format-message');
const mWebSocket = 'ws://127.0.0.1:5001';
/**
 * Icon svg to be displayed at the left edge of each extension block, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const blockIconURI = 'data:image/png;base64,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';

/**
 * Icon svg to be displayed in the category menu, encoded as a data URI.
 * @type {string}
 */
// eslint-disable-next-line max-len
const menuIconURI = blockIconURI;
const LabeledCommandType = {
    FORWARD: 'forward',
    BACK: 'back',
    UP: 'up',
    DOWN: 'down',
    LEFT: 'left',
    RIGHT: 'right',
    CW: 'cw',
    CCW: 'ccw'
};
/**
 * Class for the new blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3DroneBlocks {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.isRunning = false;
        this.socketData = "";
        this.runtime = runtime;

        //this._onTargetCreated = this._onTargetCreated.bind(this);
        //this.runtime.on('targetWasCreated', this._onTargetCreated);
    }

    static get STATE_KEY () {
        return 'Scratch.websockets';
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'drone',
            name: 'Drone Blocks',
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'openDrone',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'websockets.openDrone',
                        default: 'open drone',
                        description: 'Start a websocket session.'
                    }),
                },
                {
                	opcode: 'closeDrone',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'websockets.closeDrone',
                        default: 'close drone',
                        description: 'End the websocket session.'
                    }),
                },
                {
                	opcode: 'getDroneState',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'websockets.getDroneState',
                        default: 'active',
                        description: 'Return whether websocket session is running.'
                    }),
                },
                {
                	opcode: 'sendDroneCommand',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'websockets.sendDroneCommand',
                        default: 'send Drone Command [DATA]',
                        description: 'Send command through the socket.'
                    }),
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'websockets.defaultDroneCommand',
                                default: 'command',
                                description: 'Default command to send.'
                            })
                        }
                    }
                },
                {
                	opcode: 'sendDroneLabeledCommand',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'websockets.sendDroneLabeledCommand',
                        default: 'Command [COMMAND_ID] Distance/Angle [DISTANCE] cm/deg',
                        description: 'Send labeled command through the socket.'
                    }),
                    arguments: {
                        COMMAND_ID: {
                            type: ArgumentType.STRING,
                            menu: 'COMMAND_ID',
                            defaultValue: LabeledCommandType.FORWARD
                        },
                        DISTANCE: {
                            type:  ArgumentType.NUMBER,
                            defaultValue: 50
                        }
                    }
                },
                {
                	opcode: 'getDroneData',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'websockets.getDroneData',
                        default: 'Drone data',
                        description: 'return stored Drone data.'
                    }),
                },
            ],
            menus: {
                COMMAND_ID: {
                    acceptReporters: true,
                    items: [
                        {
                            text: 'forward',
                            value: LabeledCommandType.FORWARD
                        },
                        {
                            text: 'back',
                            value: LabeledCommandType.BACK
                        },
                        {
                            text: 'up',
                            value: LabeledCommandType.UP
                        },
                        {
                            text: 'down',
                            value: LabeledCommandType.DOWN
                        },
                        {
                            text: 'left',
                            value: LabeledCommandType.LEFT
                        },
                        {
                            text: 'right',
                            value: LabeledCommandType.RIGHT
                        },
                        {
                            text: 'cw',
                            value: LabeledCommandType.CW
                        },
                        {
                            text: 'ccw',
                            value: LabeledCommandType.CCW
                        }
                    ]
                }
            }
        };
    }

    /**
     * Write log.
     * @param {object} args - the block arguments.
     * @property {number} TEXT - the text.
     */

    openDrone () {
     	if (this.isRunning == false) {
     		console.log("Starting drone.");
     		this.mWS = new WebSocket(mWebSocket);

     		const self = this; // the functions below are out of the scope
     		//check if connnecting to the server fails
     		this.mWS.onerror = function(){
     			self.isRunning = false;
     			console.log("failed to connect to the server.");
     		};
     		this.mWS.onopen = function(){
     			self.isRunning = true;
     			console.log("successfully connected to the server.");
     		}
     	}
     	else{
     		console.log("Drone is already open.");
     	}
    }

    closeDrone () {
        if (this.isRunning == true) {
     		console.log("Closing drone.");
     		this.mWS.close(1000,'script closure');
     		this.isRunning = false;
     	}
     	else{
     		console.log("Drone is not open.");
     	}
    }

    getDroneState () {
    	//Check is the server is still running
    	if (this.isRunning){
    		var response = this.mWS.readyState;
    		if (response == 2 || response == 3) {
    			this.isRunning = false;
    			console.log("Server has disconnected.")
    		}
    	}
    	return this.isRunning;
    }

    sendDroneCommand (args) {
    	if (this.isRunning == true) {
    		this.mWS.send(args.DATA);
    		console.log("SENT:", args.DATA);
            if (args.DATA == 'command') {
                const self = this;
                var message = this.mWS.onmessage = function(event){
                    self.socketData = String(event.data);
                    console.log("RECEIVED:", self.socketData);
                };
            }
    	}
    }

    sendDroneLabeledCommand (args) {
    	if (this.isRunning == true) {
            var command = args.COMMAND_ID + ' ' + String(Math.round(Math.abs(args.DISTANCE)));
    		this.mWS.send(command);
    		console.log("SENT:", args.COMMAND_ID, args.DISTANCE);
    	}
    }

    getDroneData () {
    	//Check is the server is still running
//        var message = this.mWS.onmessage = function(event){
//            self.socketData = String(event.data);
//            console.log("RECEIVED:", self.socketData);
//        }
    	return this.socketData;
    }
}

module.exports = Scratch3DroneBlocks;
