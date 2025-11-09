
/** 
 * Campaign Request Body - Send or Schedule a SMS message
 * 
 * https://www.smseveryone.com.au/restapi#comp-kd6my2uy
 *  @typedef {object} SMSCampaign
 *  @property {string} originator
 *  @property {string[]} [destinations] - this or crmIds are required
 *  @property {string} message
 *  @property {string} [timeScheduled]
 *  @property {string} [reference]
 *  @property {"create"|"modify"|"delete"|"status"|"pause"|"unpause"} action
 *  @property {number} campaignID
 *  @property {number[]} [crmIds]
 */

/**
 * @typedef {object} ErrorResponse
 * @property {string} Message,
 * @property {number|string} [Code]
 */

/**
 * @typedef {object} CampaignResponse
 * @property {number} Code,
 * @property {number} [CampaignId]
 * @property {number} [Messages]
 * @property {string} [Message]
 * @property {number} [Segments]
 * @property {number} [Credits]
 */

/**
 * Delivery Receipts Request Body - Get the status of message delivery:
 * 
 * https://www.smseveryone.com.au/restapi#comp-kd85w97c
 * @typedef {object} DeliveryReceipts 
 * @property {string|number} campaignId
 * @property {string|number} [destination]
 */

/**
 * @typedef {object} DeliveryResponse
 * @property {number} Code
 * @property {number} CampaignId
 * @property {object[]} Destinations
 * @property {object} [Destinations.Destination]
 * @property {string} [Destinations.TimeStamp]
 * @property {object} [Destinations.Status]
 * @property {number} [Destinations.Status.DeliveryStatusId]
 * @property {number} [Destinations.Status.Code]
 */

/**
 * Replies Request Body
 * 
 * Recommened to only use this at most every 5 minutes
 * 
 * https://www.smseveryone.com.au/restapi#comp-kd6tcvxv
 * @typedef {object} RepliesRequest
 * @property {boolean} [test=true]
 * @property {number} [days]
 * @property {string} [dateStart]
 * @property {string} [dateEnd]
 * @property {string} [originator]
 */

/**
 * @typedef {object} RepliesResponse
 * @property {number} Count
 * @property {object[]} Messages
 * @property {string} Received
 * @property {string} Originator
 * @property {string} Recipient
 * @property {string} MessageText
 * @property {string} Recipient
 */

/**
 * @typedef {object} UserSettingsResponse
 * @property {number|string} UserId
 * @property {boolean} AllowUnicode
 * @property {boolean} AllowInternational
 * @property {number} Credits
 * @property {number} Code
 */

/**
 * Optouts Request Body - Manual manage your optout list
 * 
 * https://www.smseveryone.com.au/restapi#comp-kd8342y8
 * 
 * @typedef {object} OptoutsRequest
 * @property {'add'|'delete'|'list'} action
 * @property {string[]} [originator]
 */

/**
 * @typedef {object} OptoutsResponse
 * @property {string} [Message]
 * @property {string|number} [Code]
 * @property {string|number} [Count]
 * @property {object[]} [OptOut]
 * @property {string} OptOut.Added
 * @property {string} OptOut.Originator
 * @property {string} OptOut.MessageText
 * @property {string} OptOut.Client
 */

/**
 * List Request Body - Manage a list of mobile number
 * 
 * https://www.smseveryone.com.au/restapi#comp-kdgug91j
 * 
 * @typedef {object} ListRequest
 * @property {'list' | 'details' | 'create' | 'append' | 'remove' | 'delete'} action
 * @property {boolean} [showDeleted]
 * @property {number} [crmId]
 * @property {string} [description]
 * @property {object[]} [records]
 * @property {string} records.number
 */

/**
 * @typedef {object} ListResponse
 * @property {number} Count
 * @property {object[]} [Groups]
 * @property {number} Groups.CrmId
 * @property {string} Groups.Description
 * @property {number} Groups.Count
 * @property {number} Groups.ParentGroup
 * @property {number} Groups.ActiveCampaign
 * @property {number} Groups.Deleted
 * @property {number} [CrmId]
 * @property {string} [Description]
 * @property {object} [Records]
 * @property {string} [Records.Number]
 * @property {string} [Message]
 * @property {number} [Code]
 */

/**
 * Add Credit Rejest Body - will give an error unless your account has permission
 * 
 * https://www.smseveryone.com.au/restapi#comp-kz4t16xe
 * 
 * @typedef {object} CreditsRequest
 * @property {'add'} action
 * @property {number} credits
 */

/**
 * @typedef {object} CreditsReponse
 * @property {number} Code
 * @property {string} [Message]
 * @property {number} [Credits]
 */


export { }