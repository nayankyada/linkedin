function extractJobId(text) {
  return text.split("~")[1].split("/")[0];
}

const startAddLink = () => {
  const links = document.getElementsByTagName("a");
  const jobLinks = [];
  for (let i = 0; i < links.length; i++) {
    const link = links[i].href.replace("https://www.upwork.com", "");
    if (link.split("/")[1] === "jobs") {
      jobLinks.push(links[i]);
    }
  }
  for (let i = 0; i < jobLinks.length; i++) {
    const link = jobLinks[i];
    const href = link.href;
    if (link.getAttribute("data-button") === "true") {
      continue;
    }
    if (href) {
      const jobId = "~" + extractJobId(href);
      link.setAttribute("data-button", true);
      fetch(
        "https://www.upwork.com/ab/proposals/api/v4/check/" +
          jobId +
          "?payload=1",
        {
          headers: {
            accept: "application/json, text/plain, */*",
            "accept-language":
              "en-US,en;q=0.9,hi;q=0.8,fr;q=0.7,gu;q=0.6,de;q=0.5",
            authorization: "bearer oauth2v2_539795d08d2c75776e7ad5e21ecde29c",
            "cache-control": "no-cache",
            pragma: "no-cache",
            priority: "u=1, i",
            "sec-ch-ua":
              '"Google Chrome";v="131", "Chromium";v="131", "Not_A Brand";v="24"',
            "sec-ch-ua-full-version-list":
              '"Google Chrome";v="131.0.6778.109", "Chromium";v="131.0.6778.109", "Not_A Brand";v="24.0.0.0"',
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": '"macOS"',
            "sec-ch-viewport-width": "1016",
            "sec-fetch-dest": "empty",
            "sec-fetch-mode": "cors",
            "sec-fetch-site": "same-origin",
            "vnd-eo-parent-span-id": "9ef9a681-709b-4cd0-bd18-26dbc04a6ca2",
            "vnd-eo-span-id": "d03a43b9-e634-485c-b1b2-c196ebdca0ca",
            "vnd-eo-trace-id": "8f037abf2f17f419-BOM",
            "x-odesk-user-agent": "oDesk LM",
            "x-requested-with": "XMLHttpRequest",
            "x-upwork-accept-language": "en-US",
          },
          referrer:
            "https://www.upwork.com/nx/proposals/job/" + jobId + "/apply/",
          referrerPolicy: "origin-when-cross-origin",
          body: null,
          method: "GET",
          mode: "cors",
          credentials: "include",
        }
      )
        .then((d) => d.json())
        .then((res) => {
          const div = document.createElement("div");
          div.style.display = "flex";
          div.style.flexDirection = "row";
          div.style.gap = "10px";
          div.style.alignItems = "center";
          if (res.payload.jobDetails.jobDetails.buyer.info.company.url) {
            const url = document.createElement("a");
            url.href = res.payload.jobDetails.jobDetails.buyer.info.company.url;
            url.textContent =
              res.payload.jobDetails.jobDetails.buyer.info.company.name;
            div.appendChild(url);
          } else {
            const text = document.createElement("span");
            text.style.color = "var(--badge-feature-bg)";
            text.textContent =
              res.payload.jobDetails.jobDetails.buyer.info.company.name;
            div.appendChild(text);
          }
          const location = document.createElement("span");
          location.textContent =
            res.payload.jobDetails.jobDetails.buyer.info.location.country +
            " - " +
            res.payload.jobDetails.jobDetails.buyer.info.location.city;
          div.appendChild(location);
          
          link.parentElement.parentElement.appendChild(div);
        });
    }
  }
};

const fetchButton = document.createElement("button");
fetchButton.textContent = "Magic";
fetchButton.style.position = "fixed";
fetchButton.style.bottom = "10px";
fetchButton.style.left = "10px";
fetchButton.style.zIndex = "1000000000";
fetchButton.className = "air3-btn air3-btn-block air3-btn-primary";
fetchButton.style.width = "fit-content";
fetchButton.addEventListener("click", () => {
  startAddLink();
});
document.body.appendChild(fetchButton);
