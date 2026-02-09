/**
 * Summarized data interface with energy flows.
 */
export interface SolaxSummary {
    /** Total PV DC power from all MPPT inputs (W) */
    pvPower: number;
    /** Inverter AC power output (W) */
    acPower: number;
    toHouse: number;
    /** Power exported to grid (W), or 0 if importing. */
    toGrid: number;
    /** Battery charging power (W) from inverter, or 0 if not charging */
    toBattery: number;
    /** Battery discharging power (W) to house, or 0 if not discharging */
    fromBattery: number;
    /** Battery state of charge (%) or 0 when missing */
    batterySoC: number;
    /** Power imported from grid (W), or 0 if exporting */
    fromGrid: number;
    /** Human-readable inverter status */
    inverterStatus: string;
}
/**
 * SolaxCloudAPIResult interface for Solax Cloud API Result.
 * */
export interface SolaxCloudAPIResult {
    /** Unique identifier of inverter (Serial No) */
    inverterSN: string;
    /** Unique identifier of communication module (Registration No) */
    sn: string;
    /** Inverter AC power total (W) */
    acpower: number;
    /** Inverter AC energy out daily (KWh) */
    yieldtoday: number;
    /** Inverter AC energy out total (KWh) */
    yieldtotal: number;
    /** GCP power total (W) */
    feedinpower: number;
    /** GCP energy to grid total (KWh) */
    feedinenergy: number;
    /** GCP energy from grid total (KWh) */
    consumeenergy: number;
    /** Address 2 meter AC power total (W) */
    feedinpowerM2: number;
    /** Inverter DC battery energy SOC (%) */
    soc: number | null;
    /** Inverter AC EPS power R (W) */
    peps1: number | null;
    /** Inverter AC EPS power S (W) */
    peps2: number | null;
    /** Inverter AC EPS power T (W) */
    peps3: number | null;
    /** Inverter type code */
    inverterType: string;
    /** Inverter status code */
    inverterStatus: string;
    /** Update time */
    uploadTime: string;
    /** Inverter DC Battery power total (W) */
    batPower: number;
    /** Inverter DC PV power MPPT1 (W) */
    powerdc1: number | null;
    /** Inverter DC PV power MPPT2 (W) */
    powerdc2: number | null;
    /** Inverter DC PV power MPPT3 (W) */
    powerdc3: number | null;
    /** Inverter DC PV power MPPT4 (W) */
    powerdc4: number | null;
}
/**
 * SolaxCloudAPIResponse interface for responses from Solax Cloud API.
 */
export interface SolaxCloudAPIResponse {
    /** Response from server */
    exception: string;
    /** Data returned */
    result: SolaxCloudAPIResult;
    /** Whether the data request was successful */
    success: boolean;
}
/**
 * Brand for cloud data fetching.
 */
export declare const INVERTER_BRAND: {
    SOLAX: number;
    QCELLS: number;
};
/**
 * Main class to retrieve data from Solax API.
 */
export declare class SolaxCloudAPI {
    readonly brand: number;
    readonly tokenId: string;
    readonly sn: string;
    /**
       * Class constructor.
       * @param {number} brand Inverter brand type.
       * @param {string} tokenId Token ID to gather data from Solax Cloud API.
       * @param {string} sn Unique identifier of inverter (Serial No).
       */
    constructor(brand: number, tokenId: string, sn: string);
    /**
     * Gets the cloud API URL depending on the inverter brand.
     * @returns Cloud API URL.
     */
    private getCloudURL;
    /**
       * Gets the inverter type description from the corresponding type code.
       * @param {string} typeCode The Solax inverter type code.
       * @returns Corresponding inverter type description.
       */
    static getInverterType(typeCode: string): string;
    /**
       * Gets the inverter status description from the corresponding status code.
       * @param {string} statusCode The inverter status code.
       * @returns Corresponding inverter status description.
       */
    static getInverterStatus(statusCode: string): string;
    /**
     * Gets the inverter fed photovoltaic DC power (in W) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The measured inverter photovoltaic input DC power (in W).
     */
    static getPVPower(data: SolaxCloudAPIResult): number;
    /**
     * Gets the inverter output AC power (in W) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The measured inverter output AC power (in W).
     */
    static getInverterACPower(data: SolaxCloudAPIResult): number;
    /**
     * Gets the inverter power charging battery (in W) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The measured inverter DC power to battery (in W).
     */
    static getInverterPowerToBattery(data: SolaxCloudAPIResult): number;
    /**
     * Gets the inverter power drawn from battery (in W) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The measured inverter DC power from battery (in W).
     */
    static getInverterPowerFromBattery(data: SolaxCloudAPIResult): number;
    /**
     * Gets the Inverter AC energy out for today (KWh) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The AC energy output by the inverter today (in KWh).
     */
    static getYieldToday(data: SolaxCloudAPIResult): number;
    /**
     * Gets the Inverter AC energy out total (KWh) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The total AC energy output by the inverter (in KWh).
     */
    static getYieldTotal(data: SolaxCloudAPIResult): number;
    /**
     * Gets the battery State of Charge - Soc (%) from the retrieved API results.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {number} The battery State of Charge for this inverter (%).
     */
    static getBatterySoC(data: SolaxCloudAPIResult): number;
    /**
     * Gets the power currently being fed to the grid by the inverter (in W).
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns The power currently being sent to the grid (in W).
     */
    static getInverterPowerToGrid(data: SolaxCloudAPIResult): number;
    /**
     * Gets the power currently being drawn from the grid to the house (in W).
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns The power currently being drawn from the grid to the house (in W).
     */
    static getGridPowerToHouse(data: SolaxCloudAPIResult): number;
    /**
     * Gets the power currently being generated by the inverter to the house (in W).
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns The power currently being generated by the inverter to the house (in W).
     */
    static getInverterPowerToHouse(data: SolaxCloudAPIResult): number;
    /**
     * Builds a summarized energy flow view from the raw API data.
     * @param {SolaxCloudAPIResult} data The result data retrieved from the Solax Cloud API.
     * @returns {SolaxSummary} The summarized energy flow data.
     */
    static toSummary(data: SolaxCloudAPIResult): SolaxSummary;
    /**
     * Retrieves inverter data using Solax Cloud "real-time" API.
     * @returns {SolaxCloudAPIResponse} The response by Solax Cloud API.
     */
    getAPIData(): SolaxCloudAPIResponse;
}
