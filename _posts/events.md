---
title: "Decoding Ethereum Events in Go"
excerpt: "Events are important to the chain, but even more important to external systems. If you ever need to monitor the lifecycle of a smart contract, knowing how to decode them is essential. This article will explain, with an official example from Taraxa's DPOS contract how to do that in Golang."
coverImage: "/assets/blog/events/eth.png"
date: "2023-07-05T13:35:07.322Z"
author:
  name: "0xElod"
  picture: "/0xelod_logo_white.svg"
ogImage:
  url: "/assets/blog/events/eth.png"
---


# Decoding Ethereum Events in Go

Ethereum smart contracts generate events to notify external applications about specific occurrences within the contract. These events contain valuable information that developers may need to process and interpret. In Go, you can use libraries like `github.com/ethereum/go-ethereum` and `github.com/ethereum/go-ethereum/accounts/abi` to decode these events and extract the relevant data. In this article, we will explore how to decode Ethereum events in Go using a practical example.

## Understanding Ethereum Events

Before diving into the decoding process, let's briefly discuss Ethereum events. In Ethereum, events are defined within smart contracts using the Solidity programming language. Events act as triggers, emitting information when certain conditions are met. Events can have parameters, which store data relevant to the event.

In Go, to decode Ethereum events, you need the following components:

1. The event's ABI (Application Binary Interface): The ABI describes the structure of the event, including its name, parameters, and types.
2. The event's log data: When an event is emitted, Ethereum generates a log entry containing the event's data.

With these components, you can decode the log data and map it to the appropriate event structure in Go.

## Setting Up the Dependencies

To decode Ethereum events in Go, you'll need to import the necessary libraries. In our example, we'll be using the `github.com/ethereum/go-ethereum` and `github.com/ethereum/go-ethereum/accounts/abi` packages. Additionally, we'll import other required dependencies like `math/big`, `strings`, and `encoding/hex`.

## Decoding Ethereum Events in Go

Let's explore the provided Go code snippet, which demonstrates how to decode Ethereum events. We'll break it down step by step:

### Import the necessary packages

```go
import (
	"encoding/hex"
	"math/big"
	"strings"

	"github.com/Taraxa-project/taraxa-go-client/taraxa_client/dpos_contract_client/dpos_interface"
	"github.com/Taraxa-project/taraxa-indexer/models"
	"github.com/ethereum/go-ethereum/accounts/abi"
	"github.com/ethereum/go-ethereum/common"
	"github.com/ethereum/go-ethereum/crypto"
)
```

This example has the interface exported from the [Taraxa](www.taraxa.io) Delegated Proof of Stake contract.

### Define the necessary event structures

```go
type LogReward struct {
	Account   string
	Validator string
	Value     *big.Int
	EventName string
}

type RewardsClaimedEvent struct {
	Account   string
	Validator string
	Amount    *big.Int
}

type CommissionRewardsClaimedEvent struct {
	Account   string
	Validator string
	Amount    *big.Int
}
```

The most important part is to properly mask your returned event structs.

### The main implementation

```go
func DecodeEvent(log models.EventLog) (interface{}, error) {
	trimmed := strings.TrimPrefix(log.Data, "0x")
	data, err := hex.DecodeString(trimmed)

	if err != nil {
		return nil, err
	}

	contractABI, error := abi.JSON(strings.NewReader(dpos_interface.DposInterfaceABI))
	if error != nil {
		return nil, error
	}

	rewardsClaimedTopic := crypto.Keccak256Hash([]byte("RewardsClaimed(address,address,uint256)"))
	commissionRewardsClaimedTopic := crypto.Keccak256Hash([]byte("CommissionRewardsClaimed(address,address,uint256)"))

	switch log.Topics[0] {
	case rewardsClaimedTopic.Hex():
		var event RewardsClaimedEvent
		err := contractABI.UnpackIntoInterface(&event, "RewardsClaimed", data)

		if err != nil {
			return nil, err
		}
		account := common.HexToAddress(log.Topics[1])
		validator := common.HexToAddress(log.Topics[2])

		event.Account = account.Hex()
		event.Validator = validator.Hex()
		return &event, nil

	case commissionRewardsClaimedTopic.Hex():
		var event CommissionRewardsClaimedEvent
		err := contractABI.UnpackIntoInterface(&event, "CommissionRewardsClaimed", data)
		if err != nil {
			return nil, err
		}
		account := common.HexToAddress(log.Topics[1])
		validator := common.HexToAddress(log.Topics[2])

		event.Account = account.Hex()
		event.Validator = validator.Hex()
		return &event, nil
	}
	return nil, nil
}
```

In this example we specifically target two events, the RewardsClaimed and the CommissionRewardsClaimed ones, but based on your use-case you can iterate on all the events of the ABI and decode the ones you require.

**Note**: This is decoding a single event, to decode all the events of a transaction we need a wrapper:

```go
func DecodeRewardsTopics(logs []models.EventLog) (decodedEvents []LogReward, err error) {
	for _, log := range logs {
		if !strings.EqualFold(log.Address, DposContractAddress) {
			continue
		}
		decoded, err := DecodeEvent(log)
		if err != nil {
			return nil, err
		}

		switch event := decoded.(type) {
		case *RewardsClaimedEvent:
			decodedEvents = append(decodedEvents, LogReward{
				EventName: "RewardsClaimed",
				Account:   event.Account,
				Validator: event.Validator,
				Value:     event.Amount,
			})

		case *CommissionRewardsClaimedEvent:
			decodedEvents = append(decodedEvents, LogReward{
				EventName: "CommissionRewardsClaimed",
				Account:   event.Account,
				Validator: event.Validator,
				Value:     event.Amount,
			})
		}
	}

	return decodedEvents, err
}
```

After this, all we need to do is to invoke the DecodeRewardsTopics function with a collection of event logs to decode the events and retrieve the relevant information.

## Conclusion

Decoding Ethereum events in Go allows developers to extract valuable information from smart contracts and perform necessary actions based on event occurrences. By leveraging libraries like `github.com/ethereum/go-ethereum` and `github.com/ethereum/go-ethereum/accounts/abi`, developers can efficiently decode event data and map it to appropriate Go structures for further processing. This article provided a practical example of how to decode Ethereum events in Go using a sample code snippet. Armed with this knowledge, you can now dive deeper into Ethereum event handling and build powerful applications that interact with the Ethereum blockchain.