# solax-cloud-api
Solax/Qcells Cloud API handler

## API

### Interfaces

```ts
export interface SolaxCloudAPIResult {
  inverterSN: string;      // inverter serial number
  sn: string;              // communication module registration number
  acpower: number;         // inverter AC power total (W)
  yieldtoday: number;      // inverter AC energy out today (kWh)
  yieldtotal: number;      // inverter AC energy out total (kWh)
  feedinpower: number;     // grid connection point power total (W)
  feedinenergy: number;    // energy exported to grid total (kWh)
  consumeenergy: number;   // energy imported from grid total (kWh)
  feedinpowerM2: number;   // meter 2 AC power total (W)
  soc: number | null;      // battery state of charge (%)
  peps1: number | null;    // EPS power phase R (W)
  peps2: number | null;    // EPS power phase S (W)
  peps3: number | null;    // EPS power phase T (W)
  inverterType: string;    // inverter type code
  inverterStatus: string;  // inverter status code
  uploadTime: string;      // last update time
  batPower: number;        // battery power (W), positive=charging, negative=discharging
  powerdc1: number | null; // PV input MPPT1 (W)
  powerdc2: number | null; // PV input MPPT2 (W)
  powerdc3: number | null; // PV input MPPT3 (W)
  powerdc4: number | null; // PV input MPPT4 (W)
}

export interface SolaxCloudAPIResponse {
  exception: string;            // server response message
  result: SolaxCloudAPIResult;  // data payload
  success: boolean;             // success flag
}

export interface SolaxSummary {
  pvPower: number;       // total PV DC power from all MPPT inputs (W)
  acPower: number;       // inverter AC power output (W)
  toHouse: number;       // inverter power consumed by the house (W)
  toGrid: number;        // power exported to grid (W)
  toBattery: number;     // battery charging power (W)
  fromBattery: number;   // battery discharging power (W)
  batterySoC: number;    // battery state of charge (%)
  fromGrid: number;      // power imported from grid (W)
  inverterStatus: string;// human-readable inverter status
}
```

### Constants

```ts
export const INVERTER_BRAND = {
  SOLAX: 0,
  QCELLS: 1,
};
```

### Class: `SolaxCloudAPI`

```ts
new SolaxCloudAPI(brand: number, tokenId: string, sn: string)
```

Parameters:
- `brand`: inverter brand identifier. Use `INVERTER_BRAND.SOLAX` or `INVERTER_BRAND.QCELLS`.
- `tokenId`: cloud API token.
- `sn`: inverter serial number.

Methods:

```ts
getAPIData(): SolaxCloudAPIResponse
```
Parameters:
- None.
Returns:
- `SolaxCloudAPIResponse`: real-time data response.

```ts
static getPVPower(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Total PV DC power from all MPPT inputs (W).

```ts
static getInverterACPower(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Inverter AC power output (W).

```ts
static getInverterPowerToBattery(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Battery charging power (W), or `0` if not charging.

```ts
static getInverterPowerFromBattery(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Battery discharging power (W), or `0` if not discharging.

```ts
static getYieldToday(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Energy produced today (kWh).

```ts
static getYieldTotal(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Lifetime energy produced (kWh).

```ts
static getBatterySoC(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Battery state of charge (%) or `0` when missing.

```ts
static getInverterPowerToGrid(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Power exported to grid (W), or `0` if importing.

```ts
static getGridPowerToHouse(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Power imported from grid (W), or `0` if exporting.

```ts
static getInverterPowerToHouse(data: SolaxCloudAPIResult): number
```
Parameters:
- `data`: real-time data payload.
Returns:
- Inverter power consumed by the house (W).

```ts
static toSummary(data: SolaxCloudAPIResult): SolaxSummary
```
Parameters:
- `data`: real-time data payload.
Returns:
- Summarized energy flow data.

```ts
static getInverterType(typeCode: string): string
```
Parameters:
- `typeCode`: inverter type code.
Returns:
- Human-readable inverter type.

```ts
static getInverterStatus(statusCode: string): string
```
Parameters:
- `statusCode`: inverter status code.
Returns:
- Human-readable inverter status.
