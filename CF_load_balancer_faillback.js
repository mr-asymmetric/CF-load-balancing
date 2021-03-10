addEventListener('fetch', event => {

  // Randomly pick the primary host
  var primary = getRandomInt(hostnames.length);

  var primaryUrl = new URL(event.request.url);
  primaryUrl.hostname = hostnames[primary];

  var timeoutId = setTimeout(function() {
    var backup;
    do {
        // Naive solution to pick a backup host
        backup = getRandomInt(hostnames.length);
    } while(backup === primary);

    var backupUrl = new URL(event.request.url);
    backupUrl.hostname = hostnames[backup];

    event.respondWith(fetch(backupUrl));
  }, 2000 /* 2 seconds */);

  fetch(primaryUrl)
    .then(function(response) {
        clearTimeout(timeoutId);
        event.respondWith(response);
    });
});


/*
Load Balancer with Fallback
What about when a host is down? A simple fallback strategy is to route the request to a different host. Use this only if you know the requests are idempotent. 
In general, this means GET requests are okay, but you might wish to handle POST requests another way.
*/
