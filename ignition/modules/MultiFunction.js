import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("MultiFunctionModule", (m) => {
    const multiFunction = m.contract("MultiFunction", []);
    return { multiFunction };
});
