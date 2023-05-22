var script = document.createElement("script")
script.id = "growthbookScript"
script.src = "https://cdn.jsdelivr.net/npm/@growthbook/growthbook/dist/bundles/index.js"
document.head.appendChild(script)

var script = document.querySelector("#growthbookScript");
script.addEventListener("load", function () {
  // Uncomment for testing
  // var earthlyID = uuidv4();
  var earthlyID = getAnalyticCookie();

  // Create a GrowthBook instance
  const gb = new growthbook.GrowthBook({
    apiHost: "https://cdn.growthbook.io",
    clientKey: "sdk-7wtJG1WYaaYBiQ",
    enableDevMode: true,
    attributes: {
      id: earthlyID
    },
    trackingCallback: (experiment, result) => {
      analytics.track("Experiment Viewed", {
        experimentId: experiment.key,
        variationId: result.key,
      });
    }
  });

  //Page loaded
  document.addEventListener("DOMContentLoaded", function () {
    // Wait for features to be available
    gb.loadFeatures({ autoRefresh: true, timeout: 2000 }).then(() => {
      // console.log("Features loaded");
      /*if(document.getElementById("homepage-hero-repeatable-vs-consistent-control")){
        //console.log("control element rendered");
        
        const repVsConsOpt = gb.isOn("homepage-hero-repeatable-vs-consistent")
        if(repVsConsOpt) {
          document.getElementById("homepage-hero-repeatable-vs-consistent-control").style.display = "none";
          document.getElementById("homepage-hero-repeatable-vs-consistent-test").style.display = "block";
          document.getElementById("homepage-cta-repeatable-vs-consistent-control").style.display = "none";
          document.getElementById("homepage-cta-repeatable-vs-consistent-test").style.display = "block";
        } else {
          document.getElementById("homepage-hero-repeatable-vs-consistent-control").style.display = "block";
          document.getElementById("homepage-hero-repeatable-vs-consistent-test").style.display = "none";
          document.getElementById("homepage-cta-repeatable-vs-consistent-control").style.display = "block";
          document.getElementById("homepage-cta-repeatable-vs-consistent-test").style.display = "none";
        }
      }*/
    });
  });
});
