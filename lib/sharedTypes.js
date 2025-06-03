
/** 
 *  @typedef {object} SMSCampaign - Campaign Object Body https://www.smseveryone.com.au/restapi#comp-kd6my2uy
 *  @property {string} originator
 *  @property {string[]} [destinations] - this or crmIds are required
 *  @property {string} message
 *  @property {string} [timeScheduled]
 *  @property {string} [reference]
 *  @property {"Create"|"Modify"|"Delete"|"Status"|"Pause"|"Unpause"} action
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
 * @typedef {object} UserSettingsResponse
 * @property {number|string} UserId
 * @property {boolean} AllowUnicode
 * @property {boolean} AllowInternational
 * @property {number} Credits
 * @property {number} Code
 */

/**
 * @typedef {object} Optouts
 * @property {'Add'|'Delete'|'List'} action
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
 * @typedef {object} List
 * @property {'List' | 'Details' | 'Create' | 'Append' | 'Remove' | 'Delete'} action
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
 * @typedef {object} SMSEveryoneAPI
 * @param {string} username
 * @param {string} password
 * @property {(options:SMSCampaign) => CampaignResponse} sms
 */

export { }