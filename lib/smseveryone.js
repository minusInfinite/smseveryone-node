import { Buffer } from "node:buffer"

/**
 * @typedef {import('./sharedTypes.js').SMSEveryoneAPI} SMSEveryoneAPI
 * @typedef {import('./sharedTypes.js').SMSCampaign} SMSCampaign
 * @typedef {import('./sharedTypes.js').ErrorResponse} ErrorResponse
 * @typedef {import('./sharedTypes.js').CampaignResponse} CampaignResponse
 */

/** @type {SMSEveryoneAPI} */
class SMSEveryone {
    #auth
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
     * @returns {CampaignResponse}
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

                let /** @type {CampaignResponse} response */ response, /** @type {ErrorResponse} response */ error;
                response = await campaignRequest.json()
                if (response && response?.Code !== 0) {
                    error = response
                    throw new Error(error?.Message, { cause: error })
                } else {
                    return (response)
                }
            } else if (campaignRequest.status !== 200) {
                throw new Error(campaignRequest.statusText, { cause: campaignRequest.status })
            }

        } catch (error) {
            throw new Error(this.#formatError(error))
        }

    }

    /**
     * 
     * @param {string} username 
     * @param {string} password 
     */
    constructor(username, password) {
        this.#auth = `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`
    }

    sms = this.#campaignApi

}

export { SMSEveryone }