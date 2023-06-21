---
title: "Setting Up Custom Voting Spaces for Decentralized Projects: A Tale of Taraxa's Governance Space"
excerpt: "Many of us run into the problem of setting up custom voting spaces for our decentralized projects. In this article I'll tell you the tale of how I set up Taraxa's governance space, our necessities, the platforms evaluated and decisions made... And most importantly, how you can do it too."
coverImage: "/assets/blog/governance/cover1.jpg"
date: "2023-06-21T14:35:07.322Z"
author:
  name: "0xElod"
  picture: "/0xelod_logo_white.svg"
ogImage:
  url: "/assets/blog/governance/cover1.jpg"
---

Many decentralized projects encounter the challenge of establishing custom voting spaces for effective decision-making and community governance. Of course, all of us strive to have a place that looks and feels like it is part of the protocol, so this was an important factor in our decision making too. In this article, we will delve into the journey of how Taraxa set up its governance space, including the requirements we sought, the platforms we evaluated, the decisions made, and, most importantly, how you can do it too. Whether you're a Web3 developer or a DevRel advocate, join us in exploring the world of decentralized governance and the tools that can help you achieve your project's goals.

## Identifying Essential Features

When embarking on the search for the ideal governance space, Taraxa identified several key features that were necessary for our decentralized project. These features included:

1. List of Proposals: A comprehensive overview of all proposed actions and decisions.
2. Proposal Page: Detailed information about each proposal, including its description, voting status, and relevant details.
3. Proposal Creation with GUI: An intuitive and user-friendly interface for creating proposals, ensuring accessibility for all participants.
4. Voting: A dedicated page for conducting voting, enabling community members to express their opinions.
5. Integration with an External Smart Contract: Seamless integration with our existing staking smart contract to enable transparent and auditable governance processes as well as define clear voting power and flexibility.

## Step 1: Evaluating the Options

To evaluate potential solutions, I conducted an analysis of open-source tools, considering their pros, cons, and suitability for Taraxa's governance space. Here is a summary of our findings:

### [Aragon](https://github.com/aragon)

- **Pros**: Robust and Established, Modular Architecture, EVM Compatibility, Developer-Friendly, React.js based.
- **Cons**: Complexity, Specific to Aragon Network.
- **Notes**: Well-established project with a strong community, actively developed for several years, offers easy customization and extension of components.

### [Snapshot](https://github.com/snapshot-labs/snapshot)

- **Pros**: Decentralized Governance, Community-Driven, Easy Integration, Gas Efficiency, Vue.js-based.
- **Cons**: Limited to Governance Voting, Customization Complexity.
- **Notes**: Designed for decentralized governance, focuses primarily on voting and decision-making, gained significant adoption and support from blockchain communities.

### [Tally](https://www.tally.xyz/)

- **Pros**: Is the biggest platform used currently, has a really nice GraphQL API that we can use.
- **Cons**: Doesn't support TARA, need to implement our own frontend.

### [Moloch-frontend](https://github.com/MolochVentures/moloch-frontend)

- **Pros**: Decentralized Governance, Small codebase.
- **Cons**: Limited to Governance Voting, Unmaintained and requires python2.

### [DAOstack](https://github.com/daostack)

- **Pros**: DAO tools, Smaller codebase than Aragon.
- **Cons**: Has all sorts of DAO tooling, not really what we need, Unmaintained since May 2022, and I believe canceled.

### [Colony](https://github.com/JoinColony)

- **Pros**: DAO ecosystem, Smaller codebase.
- **Cons**: Has all sorts of DAO tooling, not really what we need, has a lot of different things that we don't need like actions and treasuries of multiple tokens, Is React.js, and we can reuse quite a lot.

## Step 2: Making a Decision

After careful consideration, Taraxa decided to integrate with Snapshot.org and create a dedicated space tailored to our needs. Here's an overview of the steps we followed to create our space:

### 1. Adding TARA as an accepted chain

We added TARA as an accepted chain to enable voting with native TARA tokens. PR can be found [here](https://github.com/snapshot-labs/snapshot.js/pull/847).

#### Snapshot requirements:

- The RPC node you define needs to be an archive node, supporting HTTPS.
- The multicall contract needs to be verified and published.
- The logo stored on IPFS.

### 2. Creating a Voting Strategy

We created a custom voting strategy based on our DPOS (Delegated Proof of Stake) contract.
The strategy used view method calls using the multicall contract deployed in the previous step.
It considered balances at the creation of the proposal, rather than at the time of voting. PR can be found [here](https://github.com/snapshot-labs/snapshot-strategies/pull/1190)

### 3. Setting Up a Custom Domain

We set up a custom domain for our space to provide a unique and branded experience.PR can be found [here](https://github.com/snapshot-labs/snapshot-spaces/pull/2481).

### 4. Adding a Skin

To align our space with the Taraxa brand, we added a skin to the custom domain. PR can be found [here](https://github.com/snapshot-labs/snapshot-spaces/pull/2481).
Note that skins only apply when viewing the space from the custom domain and not from snapshot.org.

### 5. Verifying the Space

We went through the process of verifying our space to establish trust and authenticity.
Assigning Adequate Roles:

Lastly, to ensure efficient management of the space, we assigned specific team members to appropriate roles.

## Conclusion

Setting up a custom voting space for decentralized projects requires careful evaluation and consideration of available tools. Through Taraxa's journey, we explored various options and ultimately integrated with Snapshot.org, leveraging its decentralized governance features. By following the steps outlined in this article, you too can establish your own governance space, tailored to your project's needs. Embrace the power of decentralized decision-making and empower your community to shape the future of your project.

Remember, the path to effective governance starts with a space that fosters collaboration and inclusion. Start building your voting space today and witness the collective wisdom of your community drive your project forward.
