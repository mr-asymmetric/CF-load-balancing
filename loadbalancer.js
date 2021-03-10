var hostnames = [
  "0.example.com",
  "1.example.com",
  "2.example.com"
];

addEventListener('fetch', event => {
  var url = new URL(event.request.url);

  // Randomly pick the next host 
  url.hostname = hostnames[getRandomInt(hostnames.length)];
  
  event.respondWith(fetch(url));
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
/*
When you have a list of origin servers, pick a random host to route to.

This is a very basic load balancing technique to evenly distribute the traffic across all origin servers.
*/
