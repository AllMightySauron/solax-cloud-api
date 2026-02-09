"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolaxCloudAPI = exports.INVERTER_BRAND = void 0;
const sync_fetch_1 = __importDefault(require("sync-fetch"));
/**
 * Brand for cloud data fetching.
 */
exports.INVERTER_BRAND = {
    SOLAX: 0,
    QCELLS: 1,
};
/**
 * Cloud API URL for data fetching.
 */
const CLOUD_URL = {
    SOLAX: 'https://www.solaxcloud.com/proxyApp/proxy/api/getRealtimeInfo.do',
    QCELLS: 'https://www.portal-q-cells.us/proxyApp/proxy/api/getRealtimeInfo.do',
};
/**
 * Main class to retrieve data from Solax API.
 */
class SolaxCloudAPI {
    /**
       * Class constructor.
       * @param {number} brand Inverter brand type.
       * @param {string} tokenId Token ID to gather data from Solax Cloud API.
       * @param {string} sn Unique identifier of inverter (Serial No).
       */
    constructor(brand, tokenId, sn) {
        this.brand = brand;
        this.tokenId = tokenId;
        this.sn = sn;
        this.brand = brand;
        this.tokenId = tokenId;
        this.sn = sn;
    }
    /**
     * Gets the cloud API URL depending on the inverter brand.
     * @returns Cloud API URL.
     */
    getCloudURL() {
        if (this.brand === exports.INVERTER_BRAND.QCELLS) {
            return CLOUD_URL.QCELLS;
        }
        else {
            return CLOUD_URL.SOLAX;
        }
    }
    /**
       * Gets the inverter type description from the corresponding type code.
       * @param {string} typeCode The Solax inverter type code.
       * @returns Corresponding inverter type description.
       */
    static getInverterType(typeCode) {
        switch (typeCode) {
            case '1':
                return 'X1-LX';
            case '2':
                return 'X-Hybrid';
            case '3':
                return 'X1-Hybiyd/Fit';
            case '4':
                return 'X1-Boost/Air/Mini';
            case '5':
                return 'X3-Hybiyd/Fit';
            case '6':
                return 'X3-20K/30K';
            case '7':
                return 'X3-MIC/PRO';
            case '8':
                return 'X1-Smart';
            case '9':
                return 'X1-AC';
            case '10':
                return 'A1-Hybrid';
            case '11':
                return 'A1-Fit';
            case '12':
                return 'A1-Grid';
            case '13':
                return 'J1-ESS';
            default:
                return 'Unknown';
        }
    }
    /**
       * Gets the inverter status description from the corresponding status code.
       * @param {string} statusCode The inverter status code.
       * @returns Corresponding inverter status description.
       */
    static getInverterStatus(statusCode) {
        switch (statusCode) {
            case '100':
                return 'Wait Mode';
            case '101':
                return 'Check Mode';
            case '102':
                return 'Normal Mode';
            case '103':
                return 'Fault Mode';
            case '104':
                return 'Permanent Fault Mode';
            case '105':
                return 'Update Mode';
            case '106':
                return 'EPS Check Mode';
            case '107':
                return 'EPS Mode';
            case '108':
                return 'Self-Test Mode';
            case '109':
                return 'Idle Mode';
            case '110':
                return 'Standby Mode';
            case '111':
                return 'Pv Wake Up Bat Mode';
            case '112':
                return 'Gen Check Mode';
            case '113':
                return 'Gen Run Mode';
            default:
                return 'Unknown';
        }
    }
    /**
     * Gets the inverter fed photovoltaic DC power (in W) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The measured inverter photovoltaic input DC power (in W).
     */
    static getPVPower(data) {
        return (data.powerdc1 || 0) + (data.powerdc2 || 0) + (data.powerdc3 || 0) + (data.powerdc4 || 0);
    }
    /**
     * Gets the inverter output AC power (in W) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The measured inverter output AC power (in W).
     */
    static getInverterACPower(data) {
        return data.acpower;
    }
    /**
     * Gets the inverter power charging battery (in W) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The measured inverter DC power to battery (in W).
     */
    static getInverterPowerToBattery(data) {
        return data.batPower > 0 ? data.batPower : 0;
    }
    /**
     * Gets the inverter power drawn from battery (in W) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The measured inverter DC power from battery (in W).
     */
    static getInverterPowerFromBattery(data) {
        return data.batPower < 0 ? -data.batPower : 0;
    }
    /**
     * Gets the Inverter AC energy out for today (KWh) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The AC energy output by the inverter today (in KWh).
     */
    static getYieldToday(data) {
        return data.yieldtoday;
    }
    /**
     * Gets the Inverter AC energy out total (KWh) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The total AC energy output by the inverter (in KWh).
     */
    static getYieldTotal(data) {
        return data.yieldtotal;
    }
    /**
     * Gets the battery State of Charge - Soc (%) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The battery State of Charge for this inverter (%).
     */
    static getBatterySoC(data) {
        return data.soc === null ? 0 : data.soc;
    }
    /**
     * Gets the power currently being fed to the grid by the inverter (in W).
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns The power currently being sent to the grid (in W).
     */
    static getInverterPowerToGrid(data) {
        return data.feedinpower > 0 ? data.feedinpower : 0;
    }
    /**
     * Gets the power currently being drawn from the grid to the house (in W).
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns The power currently being drawn from the grid to the house (in W).
     */
    static getGridPowerToHouse(data) {
        return data.feedinpower < 0 ? -data.feedinpower : 0;
    }
    /**
     * Gets the power currently being generated by the inverter to the house (in W).
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns The power currently being generated by the inverter to the house (in W).
     */
    static getInverterPowerToHouse(data) {
        return this.getInverterACPower(data) - this.getInverterPowerToGrid(data);
    }
    /**
     * Builds a summarized energy flow view from the raw API data.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {SolaxSummary} The summarized energy flow data.
     */
    static toSummary(data) {
        return {
            pvPower: this.getPVPower(data),
            acPower: this.getInverterACPower(data),
            toHouse: this.getInverterPowerToHouse(data),
            toGrid: this.getInverterPowerToGrid(data),
            toBattery: this.getInverterPowerToBattery(data),
            fromBattery: this.getInverterPowerFromBattery(data),
            batterySoC: this.getBatterySoC(data),
            fromGrid: this.getGridPowerToHouse(data),
            inverterStatus: this.getInverterStatus(data.inverterStatus),
        };
    }
    /**
     * Retrieves inverter data using Solax Cloud "real-time" API.
     * @returns {SolaxCloudAPIResponse} The response by Solax Cloud API.
     */
    getAPIData() {
        try {
            const response = (0, sync_fetch_1.default)(this.getCloudURL() + '?tokenId=' + this.tokenId + '&sn=' + this.sn);
            if (!response.ok) {
                throw new Error(`unexpected response ${response.statusText}`);
            }
            return response.json();
        }
        catch (error) {
            return { exception: error, result: {}, success: false };
        }
    }
}
exports.SolaxCloudAPI = SolaxCloudAPI;
