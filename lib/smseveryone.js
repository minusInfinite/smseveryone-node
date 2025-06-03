import { Buffer } from "node:buffer"
import process from "node:process"

/**
 * @typedef {import('./sharedTypes.js').SMSEveryoneAPI} SMSEveryoneAPI
 * @typedef {import('./sharedTypes.js').SMSCampaign} SMSCampaign
 * @typedef {import('./sharedTypes.js').ErrorResponse} ErrorResponse
 * @typedef {import('./sharedTypes.js').CampaignResponse} CampaignResponse
 */

/**
 * SMS Everyone API Wrapper
 * @returns {SMSEveryoneAPI}
 */
export const smseveryone = function () {
    const apiBase = "https://smseveryone.com/api"
    if (!(process.env.SEUSER && process.env.SEPASS)) {
        return {
            message: "No Username or password set as SEUSER or SEPASS"
        }
    }
    const auth = `Basic ${Buffer.from(`${process.env.SEUSER}:${process.env.SEPASS}`).toString("base64")}`

    /**
     * 
     * @param {ErrorResponse|Error} error 
     * @return {ErrorResponse}
     */
    function formatError(error) {
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
    const campaignApi = async function (options) {

        if (!(options.action && options.originator && options.message && (options.destinations || options.crmIds))) {
            formatError({ message: "Required options are not set" })
        }

        const campaignUrl = `${apiBase}/campaign`
        const campaignHeaders = new Headers()

        campaignHeaders.append("Content-Type", "application/json")
        campaignHeaders.append("Accept", "application/json")
        campaignHeaders.append("Authorization", auth)

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
            throw new Error(formatError(error))
        }

    }

    return {
        sms: campaignApi
    }
}