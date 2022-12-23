require("dotenv").config();
const RomulusDelegateABI = require("../abis/RomulusDelegate.json");

const { newKit } = require("@celo/contractkit");

const delegateAddr = "0xa7581d8E26007f4D2374507736327f5b46Dd6bA8";

const kit = newKit("https://forno.celo.org");
const delegate = new kit.web3.eth.Contract(RomulusDelegateABI, delegateAddr);

const { EXPECTED_PROPOSALS } = process.env;

if (EXPECTED_PROPOSALS === undefined) {
  throw new Error("EXPECTED_PROPOSALS is not defined.");
}
const main = async () => {
  const proposalCount = parseInt(await delegate.methods.proposalCount().call());
  if (proposalCount !== parseInt(EXPECTED_PROPOSALS)) {
    throw new Error(
      `Expected ${EXPECTED_PROPOSALS} proposal(s), but got ${proposalCount} proposal(s).`
    );
  } else {
    console.log(
      `Expected ${EXPECTED_PROPOSALS} proposal(s), and got ${proposalCount} proposal(s).`
    );
  }
};

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
