/**
 * @module SMSEveryoneAPI
 */

import { Buffer } from "node:buffer"

/**
 * @typedef {import('./sharedTypes.js').SMSCampaign} SMSCampaign
 * @typedef {import('./sharedTypes.js').ErrorResponse} ErrorResponse
 * @typedef {import('./sharedTypes.js').CampaignResponse} CampaignResponse
 * @typedef {import('./sharedTypes.js').DeliveryReceipts} DeliveryReceipts
 * @typedef {import('./sharedTypes.js').DeliveryResponse} DeliveryResponse
 * @typedef {import('./sharedTypes.js').RepliesRequest} RepliesRequest
 * @typedef {import('./sharedTypes.js').RepliesResponse} RepliesResponse
 * @typedef {import('./sharedTypes.js').UserSettingsResponse} UserSettingsResponse
 * @typedef {import('./sharedTypes.js').OptoutsRequest} OptoutsRequest
 * @typedef {import('./sharedTypes.js').OptoutsResponse} OptoutsResponse
 * @typedef {import('./sharedTypes.js').ListRequest} ListRequest
 * @typedef {import('./sharedTypes.js').ListResponse} ListResponse
 * @typedef {import('./sharedTypes.js').CreditsRequest} CreditsRequest
 * @typedef {import('./sharedTypes.js').CreditsReponse} CreditsResponse
 */

/**
 * An unofficial wrapper for the SMSEveryone REST API
 * 
 * https://www.smseveryone.com.au/restapi
*/
class SMSEveryone {

    /**@private */
    #auth

    /**@private */
    #apiBase = "https://smseveryone.com/api"
    /**
     * 
     * @param {ErrorResponse|Error} error 
     * @return {ErrorResponse}
     */
    #formatError(error) {
        console.dir(error, { depth: null })
        if (error instanceof Error) {
            return {
                Message: error.message,
                Code: error.cause
            }
        }
        return {
            Message: error.Message,
            Code: error.Code
        }
    }

    /**
     * Trigger a SMS Campaign 
     * @param {SMSCampaign} options 
     * @returns {Promise<CampaignResponse>}
     */
    async #campaignApi(options) {

        if (!(options.action && options.originator && options.message && (options.destinations || options.crmIds))) {
            throw new Error("Required options are not set", { cause: { ...options } })
        }

        const campaignUrl = `${this.#apiBase}/campaign`
        const campaignHeaders = new Headers()

        campaignHeaders.append("Content-Type", "application/json")
        campaignHeaders.append("Accept", "application/json")
        campaignHeaders.append("Authorization", this.#auth)

        try {


            const campaignRequest = await fetch(campaignUrl, {
                method: "POST",
                headers: campaignHeaders,
                body: JSON.stringify(options)
            })

            if (campaignRequest.status === 200) {

                /** @type {CampaignResponse} response */
                let response

                /** @type {ErrorResponse} error */
                let error

                response = await campaignRequest.json()
                if (response && response?.Code !== 0) {
                    error = response
                    throw this.#formatError({ Message: error.Message, Code: error?.Code })
                } else {
                    return response
                }
            } else if (campaignRequest.status !== 200) {
                throw new Error(campaignRequest.statusText, { cause: campaignRequest.status })
            }

        } catch (error) {
            throw error
        }

    }

    /**
     * Get Delivery Receipts
     * @param {DeliveryReceipts} options
     * @returns {Promise<DeliveryResponse>}
     */
    async #deliveryStatus(options) {
        if (!(options.campaignId)) {
            throw new Error("Campagin ID not provided", { cause: { ...options } })
        }

        const drStatusUrl = `${this.#apiBase}/DRStatus`
        const drHeaders = new Headers()

        drHeaders.append("Content-Type", "application/json")
        drHeaders.append("Accept", "application/json")
        drHeaders.append("Authorization", this.#auth)

        try {

            const drStatusRequest = await fetch(drStatusUrl, {
                method: 'POST',
                headers: drHeaders,
                body: JSON.stringify(options)
            })

            if (drStatusRequest.status === 200) {
                /** @type {DeliveryResponse} */
                const response = drStatusRequest.json()
                return response
            } else {
                throw new Error(drStatusRequest.statusText, { cause: drStatusRequest.status })
            }

        } catch (error) {
            throw error
        }

    }

    /**
     * Process or Test SMS Replies
     * @param {RepliesRequest} options 
     * @returns {Promise<RepliesResponse>}
     */
    async #checkReplies(options) {
        const repliesUrl = `${this.#apiBase}/replies`
        const repliesHeaders = new Headers()

        repliesHeaders.append("Content-Type", "application/json")
        repliesHeaders.append("Accept", "application/json")
        repliesHeaders.append("Authorization", this.#auth)

        try {

            const repliesRequest = await fetch(repliesUrl, {
                method: 'POST',
                headers: repliesHeaders,
                body: JSON.stringify(options)
            })

            if (repliesRequest.status === 200) {
                /** @type {RepliesResponse} */
                const response = repliesRequest.json()
                return response
            } else {
                throw new Error(repliesRequest.statusText, { cause: repliesRequest.status })
            }

        } catch (error) {
            throw error
        }
    }

    /**
     * Get User Settings and Credits
     * @return {Promise<UserSettingsResponse>}
     */
    async #userSettings() {
        const userSettingUrl = `${this.#apiBase}/RetrieveUserSettings`
        const userSettingsHeaders = new Headers()

        userSettingsHeaders.append("Content-Type", "application/json")
        userSettingsHeaders.append("Accept", "application/json")
        userSettingsHeaders.append("Authorization", this.#auth)

        try {

            const userSettingsRequest = await fetch(userSettingUrl, {
                method: 'POST',
                headers: userSettingsHeaders,
                body: JSON.stringify(options)
            })

            if (userSettingsRequest.status === 200) {
                /** @type {RepliesResponse} */
                const response = userSettingsRequest.json()
                return response
            } else {
                throw new Error(userSettingsRequest.statusText, { cause: userSettingsRequest.status })
            }

        } catch (error) {
            throw error
        }

    }

    /**
      * Manage Account Optouts
      * @param {OptoutsRequest} options
      * @returns {Promise<OptoutsResponse>}
      */
    async #manageOptouts(options) {
        if (!(options.action)) {
            throw new Error("Action not provided", { cause: { ...options } })
        }

        const optoutsUrl = `${this.#apiBase}/optouts`
        const optoutsHeaders = new Headers()

        optoutsHeaders.append("Content-Type", "application/json")
        optoutsHeaders.append("Accept", "application/json")
        optoutsHeaders.append("Authorization", this.#auth)

        try {

            const optoutsRequest = await fetch(optoutsUrl, {
                method: 'POST',
                headers: optoutsHeaders,
                body: JSON.stringify(options)
            })

            if (optoutsRequest.status === 200) {
                /** @type {DeliveryResponse} */
                const response = optoutsRequest.json()
                return response
            } else {
                throw new Error(optoutsRequest.statusText, { cause: optoutsRequest.status })
            }

        } catch (error) {
            throw error
        }

    }

    /**
      * Manage Account Optouts
      * @param {ListRequest} options
      * @returns {Promise<ListResponse>}
      */
    async #crmLists(options) {
        if (!(options.action)) {
            throw new Error("Action not provided", { cause: { ...options } })
        }

        const listUrl = `${this.#apiBase}/crm`
        const listHeaders = new Headers()

        listHeaders.append("Content-Type", "application/json")
        listHeaders.append("Accept", "application/json")
        listHeaders.append("Authorization", this.#auth)

        try {

            const listRequest = await fetch(listUrl, {
                method: 'POST',
                headers: listHeaders,
                body: JSON.stringify(options)
            })

            if (listRequest.status === 200) {
                /** @type {DeliveryResponse} */
                const response = listRequest.json()
                return response
            } else {
                throw new Error(listRequest.statusText, { cause: listRequest.status })
            }

        } catch (error) {
            throw error
        }

    }

    /**
      * Manage Account Optouts
      * @param {CreditsRequest} options
      * @returns {Promise<CreditsResponse>}
      */
    async #addCredits(options) {
        if (!(options.action && options.credits)) {
            throw new Error("Eequired options not provided", { cause: { ...options } })
        }

        const listUrl = `${this.#apiBase}/crm`
        const listHeaders = new Headers()

        listHeaders.append("Content-Type", "application/json")
        listHeaders.append("Accept", "application/json")
        listHeaders.append("Authorization", this.#auth)

        try {

            const listRequest = await fetch(listUrl, {
                method: 'POST',
                headers: listHeaders,
                body: JSON.stringify(options)
            })

            if (listRequest.status === 200) {
                /** @type {DeliveryResponse} */
                const response = listRequest.json()
                return response
            } else {
                throw new Error(listRequest.statusText, { cause: listRequest.status })
            }

        } catch (error) {
            throw error
        }

    }

    /**
     * 
     * @param {string} username user 
     * @param {string} password 
     */
    constructor(username, password) {
        this.#auth = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
    }

    sms = this.#campaignApi
    drStatus = this.#deliveryStatus
    replies = this.#checkReplies
    settings = this.#userSettings
    optouts = this.#manageOptouts
    list = this.#crmLists
    credits = this.#addCredits

}

export { SMSEveryone }