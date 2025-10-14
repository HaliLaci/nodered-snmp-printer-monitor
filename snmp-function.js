/**
 * Node-RED Function: SNMP Response Formatter
 * 
 * Leírás (HU):
 *   Ez a funkció egy SNMP lekérdezés válaszát dolgozza fel Node-RED-ben.
 *   Ellenőrzi, hogy érkezett-e adat, hozzáadja az aktuális időbélyeget,
 *   és a toner szintet a payload mezőbe helyezi a Gauge node számára.
 *
 * Description (EN):
 *   This Node-RED function processes an SNMP query response.
 *   It checks whether data was returned, adds a timestamp,
 *   and assigns the toner level to the payload for a Gauge node.
 */

let snmpResponse = msg.payload;

// Ellenőrzi, hogy az SNMP node adott-e választ
// Checks whether the SNMP node returned a response
if (!Array.isArray(snmpResponse) || snmpResponse.length === 0) {
    return null; // Nincs adat / No data, don’t send anything further
}

// Vegyük az első elemet (az SNMP válasz objektumot)
// Take the first element (the SNMP response object)
let result = snmpResponse[0];

// Hozzáadjuk az aktuális időt egy külön mezőbe
// Add the current time as a separate field
let now = new Date();
let formattedDate = now.toLocaleString('hu-HU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
});

// A toner szintet állítsuk a payloadba a Gauge node számára
// Set the toner level as the payload for the Gauge node
msg.payload = result.value;

// Az időbélyeget egy külön mezőbe tesszük
// Put the timestamp into a separate field
msg.timestamp = formattedDate;

return msg;