import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import { StandardLiveConnect } from "live-connect-js";

const config = {
  appId: "a-0001",
  storageStrategy: "cookie",
  identifiersToResolve: ["liid", "uid"],
  connectionType: "standard",
  uspapiTimeout: 100,
  tcfApiTimeout: 100,
  ajaxTimeout: 5000,
  ajaxRetries: 3,
  wrapperName: "my-custom-wrapper",
  pubId: "my-pub-id",
  collectorUrl: "https://rp.liadm.com",
  gdprApplies: true,
  gdprConsent: "your-gdpr-consent-string",
  usPrivacyString: "1YNN",
  contextSelectors: 'meta[name="description"]',
  contextElementsLength: 1000,
};

// Initialize LiveConnect
const liveConnect = StandardLiveConnect(config as any, {}, {});

// // Wait for LiveConnect to be ready
// liveConnect.ready().then(() => {
//   console.log("LiveConnect is ready");

// Send a page view event
liveConnect?.push?.({
  eventName: "pageView",
  url: window.location.href,
});

// Resolve identity
liveConnect?.resolve?.((data, metadata) => {
  console.log("Resolved data:", data);
  console.log("Resolution metadata:", metadata);
});

// Get the people verified ID
const peopleVerifiedId = liveConnect.peopleVerifiedId;
console.log("People Verified ID:", peopleVerifiedId);

// Send a custom event
liveConnect?.push?.({
  eventName: "customEvent",
  customProperty: "someValue",
});
// });

// Error handling
liveConnect?.eventBus?.on("__li__evt_bus", (error) => {
  console.error("LiveConnect error:", error);
});

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);
