/*
--------------------------------------------------------
Please note that this grouping is just for example...
You can rearrange POPs, remove or add dacaneters according to your needs.
--------------------------------------------------------
First, we have to get all Cloudflare POP codes (three letter airport codes) from https://www.cloudflarestatus.com/
North America is routed to Chigaco datacenter;
Europe, Africa and Middle East is routed to Amsterdam datacenter;
Asia and Oceania is routed to Singapore datacenter;
Latin America & the Caribbean is routed to Sao Paulo datacenter;
*/
const DC_MAP = {
  CHICAGO: {
    HOST: 'chicago.example.com',
    POPS: ['IAD', 'ATL', 'BOS', 'YYC', 'ORD', 'DFW', 'DEN', 'DTW', 'IAH', 'IND', 'JAX', 'MCI', 'LAS', 'LAX', 'MFE', 'MEM', 'MIA', 'MSP', 'MGM', 'YUL', 'BNA', 'EWR', 'ORF', 'OMA', 'PHX', 'PIT', 'PDX', 'RIC', 'SMF', 'SLC', 'SAN', 'SJC', 'YXE', 'SEA', 'STL', 'TPA', 'YYZ', 'YVR', 'TLH', 'YWG']
  },
  AMSTERDAM: {
    HOST: 'amsterdam.example.com',
    POPS: ['AMS', 'ATH', 'BCN', 'BEG', 'TXL', 'BRU', 'OTP', 'BUD', 'KIV', 'CPH', 'DUB', 'DUS', 'EDI', 'FRA', 'HAM', 'HEL', 'IST', 'KBP', 'LIS', 'LHR', 'LUX', 'MAD', 'MAN', 'MRS', 'MXP', 'DME', 'MUC', 'OSL', 'CDG', 'PRG', 'KEF', 'RIX', 'FCO', 'SOF', 'ARN', 'TLL', 'VIE', 'VNO', 'WAW', 'ZAG', 'ZRH', 'CAI', 'CPT', 'JIB', 'DUR', 'JNB', 'LAD', 'MBA', 'MRU', 'BGW', 'BEY', 'DOH', 'DXB', 'KWI', 'MCT', 'RUH', 'TLV']
  },
  SINGAPORE: {
    HOST: 'singapore.example.com',
    POPS: ['BKK', 'CEB', 'CTU', 'MAA', 'CMB', 'SZX', 'FUO', 'FOC', 'CAN', 'HGH', 'HNY', 'HKG', 'TNA', 'KUL', 'KTM', 'NAY', 'LYA', 'MFM', 'MNL', 'BOM', 'NNG', 'DEL', 'KIX', 'PNH', 'TAO', 'ICN', 'SHA', 'SHE', 'SJW', 'SIN', 'SZV', 'TPE', 'TSN', 'NRT', 'ULN', 'WUH', 'WUX', 'XIY', 'EVN', 'CGO', 'CSX', 'AKL', 'BNE', 'MEL', 'PER', 'SYD']
  },
  SAOPAULO: {
    HOST: 'saopaulo.example.com',
    POPS: ['BOG', 'EZE', 'LIM', 'MDE', 'MEX', 'PTY', 'UIO', 'GIG', 'GRU', 'SCL', 'CUR']
  },
};

addEventListener('fetch', event => {
  // get POP code this script is currently running on
  const pop = event.request.cf.colo;

  // set default host in case there is new POP and it's not added to DC_MAP yet
  let hostname = DC_MAP.CHICAGO.HOST;

  // check and choose nearest hostname for this POP
  if (DC_MAP.CHICAGO.POPS.indexOf(pop) > -1) {
    hostname = DC_MAP.CHICAGO.HOST;
  } else if (DC_MAP.AMSTERDAM.POPS.indexOf(pop) > -1) {
    hostname = DC_MAP.AMSTERDAM.HOST;
  } else if (DC_MAP.SINGAPORE.POPS.indexOf(pop) > -1) {
    hostname = DC_MAP.SINGAPORE.HOST;
  } else if (DC_MAP.SAOPAULO.POPS.indexOf(pop) > -1) {
    hostname = DC_MAP.SAOPAULO.HOST;
  }

  // replace requested hostname with nearest one
  const primaryUrl = new URL(event.request.url);
  primaryUrl.hostname = hostname;

  // fetch and response
  fetch(primaryUrl).then(function (response) {
    event.respondWith(response);
  });
});

/*
For more examples with fallbacks, random and country based routing, please visit blog post below:
https://blog.cloudflare.com/update-response-headers-on-cloudflare-workers/
*/
