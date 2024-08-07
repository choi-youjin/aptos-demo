require("dotenv").config();
const cli = require("@aptos-labs/ts-sdk/dist/common/cli/index.js");

async function publish() {
  if (!process.env.VITE_FA_CREATOR_ADDRESS) {
    throw new Error("VITE_FA_CREATOR_ADDRESS variable is not set, make sure you set it on the .env file");
  }

  if (!process.env.VITE_MODULE_ADDRESS) {
    throw new Error(
      "VITE_MODULE_ADDRESS variable is not set, make sure you have published the module before upgrading it",
    );
  }

  const move = new cli.Move();

  move.upgradeObjectPackage({
    packageDirectoryPath: "move",
    objectAddress: process.env.VITE_MODULE_ADDRESS,
    namedAddresses: {
      // Upgrade module from an object
      launchpad_addr: process.env.VITE_MODULE_ADDRESS,
      // This is the address you want to use to create fungible asset with, e.g. an address in Petra so you can create fungible asset in UI using Petra
      initial_creator_addr: process.env.VITE_FA_CREATOR_ADDRESS,
      // Our contract depends on the token-minter contract to provide some common functionalities like managing refs and mint stages
      // You can read the source code of it here: https://github.com/aptos-labs/token-minter/
      // Please find it on the network you are using, This is devnet deployment
      minter: "0x4d368f998507a2908e5b712f0bb1597fa6867b3167430d60b27b7382c32cc59b",
    },
      profile: `${process.env.PROJECT_NAME}-${process.env.VITE_APP_NETWORK}`,
  });
}
publish();
