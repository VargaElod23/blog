import { ethers } from "hardhat";
import { expect } from "chai";
import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import { Castor } from "../typechain-types";

describe("Castor", function () {
  let castor: Castor;
  let owner: HardhatEthersSigner;
  let address1: HardhatEthersSigner;
  let address2: HardhatEthersSigner;

  beforeEach(async function () {
    [owner, address1, address2] = await ethers.getSigners();

    const castorP = await ethers.deployContract("Castor", owner);

    castor = await castorP.waitForDeployment();

    console.log(`Soulbound deployed to ${castor.target}`);
  });

  it("should support the ERC721 interface", async function () {
    const supportsInterface = await castor.supportsInterface("0x80ac58cd");
    expect(supportsInterface).to.equal(true);
  });

  it("should support the ERC721Metadata interface", async function () {
    const supportsInterface = await castor.supportsInterface("0x5b5e139f");
    expect(supportsInterface).to.equal(true);
  });

  it("should not support the ERC721Enumerable interface", async function () {
    const supportsInterface = await castor.supportsInterface("0x780e9d63");
    expect(supportsInterface).to.equal(false);
  });

  it("should not support an unknown interface", async function () {
    const supportsInterface = await castor.supportsInterface("0xabcdef12");
    expect(supportsInterface).to.equal(false);
  });

  it("should allow an address to mint", async function () {
    await castor.connect(owner).safeMint(address1.address, "URI");
    const tokenOwner = await castor.ownerOf(0);
    expect(tokenOwner).to.equal(address1.address);
  });

  it("Should retrieve the proper tokenURI", async function () {
    await castor.connect(owner).safeMint(address1.address, "URI");
    const tokenURI = await castor.tokenURI(0);
    expect(tokenURI).to.equal("URI");
  });

  it("should allow an address to mint only one", async function () {
    await castor.connect(owner).safeMint(address1.address, "URI");

    let revertError;
    try {
      await castor.connect(owner).safeMint(address1.address, "URI");
    } catch (error) {
      revertError = error;
    }

    expect(revertError).to.exist;
    expect((revertError as any).message).to.contain("revert");
  });

  it("should make tokens untradeable", async function () {
    await castor.connect(owner).safeMint(address1.address, "URI");

    let revertError;
    try {
      await castor
        .connect(address1)
        .transferFrom(address1.address, address2.address, 0);
    } catch (error) {
      revertError = error;
    }

    expect(revertError).to.exist;
    expect((revertError as any).message).to.contain(
      "This a Soulbound token. It cannot be transferred."
    );
  });

  it("should allow token owners to burn their tokens", async function () {
    await castor.connect(owner).safeMint(address1.address, "URI");
    await castor.connect(address1).burn(0);

    let revertError;
    try {
      await castor.ownerOf(0);
    } catch (error) {
      revertError = error;
    }

    expect(revertError).to.exist;
    expect((revertError as any).message).to.contain("ERC721: invalid token ID");
  });
});
