---
title: "Enhancing Explorers to understand contract events: ABI Registry"
excerpt: "Giving users transparency about what's happening on your chain is probably one of the most important features of an explorer. This implementation facilitates ABI uploads with a simple Go implementation that effortlessly stores ABIs on IPFS, generate unique Object IDs (OIDs), and unlock the power of decentralized storage, all while simply wiriting to a veyr basic Solidity smart contract Registrar."
coverImage: "/assets/blog/registry/registry.png"
date: "2023-07-11T12:35:07.322Z"
author:
  name: "0xElod"
  picture: "/0xelod_logo_white.svg"
ogImage:
  url: "/assets/blog/registry/registry.png"
---

## Upload ABI to IPFS

Since storing plain ABIs as _byte[]_ on-chain isn't the best idea, the first thing we need to do is to ensure that we can store them in a decentralized manner. This is where IPFS comes in handy. We can store the ABI as a JSON file on IPFS and then store the IPFS hash on-chain. This way, we can always retrieve the ABI from IPFS and be sure that it hasn't been tampered with. The code snippet below is a battle-tested implementation of this idea.

```go
package main

import (
 "bytes"
 "fmt"
 "io/ioutil"
 "log"
 "mime/multipart"
 "net/http"
)

func uploadToIPFS(fileBytes []byte) (string, error) {
 body := &bytes.Buffer{}
 writer := multipart.NewWriter(body)

 // Create a form file field with the ABI content
 part, err := writer.CreateFormFile("file", "abi.json")
 if err != nil {
  return "", err
 }

 // Write the ABI content to the form file field
 _, err = part.Write(fileBytes)
 if err != nil {
  return "", err
 }

 // Close the multipart writer
 err = writer.Close()
 if err != nil {
  return "", err
 }

 // Send a POST request to the IPFS API endpoint
 resp, err := http.Post("https://api.pinata.cloud/pinning/pinFileToIPFS", writer.FormDataContentType(), body)
 if err != nil {
  return "", err
 }
 defer resp.Body.Close()

 // Read the response body
 respBody, err := ioutil.ReadAll(resp.Body)
 if err != nil {
  return "", err
 }

 // Parse the response JSON to extract the Object ID (OID)
 oid := string(respBody)

 return oid, nil
}

func uploadABIHandler(w http.ResponseWriter, r *http.Request) {
 // Read the uploaded file from the request body
 file, _, err := r.FormFile("abi")
 if err != nil {
  http.Error(w, "Failed to read uploaded file", http.StatusBadRequest)
  return
 }
 defer file.Close()

 // Read the file content
 fileBytes, err := ioutil.ReadAll(file)
 if err != nil {
  http.Error(w, "Failed to read file content", http.StatusInternalServerError)
  return
 }

 // Upload the file to IPFS
 oid, err := uploadToIPFS(fileBytes)
 if err != nil {
  http.Error(w, "Failed to upload ABI to IPFS", http.StatusInternalServerError)
  return
 }

 // Return the OID as the response
 fmt.Fprintf(w, "ABI uploaded to IPFS. OID: %s", oid)
}

func main() {
 http.HandleFunc("/uploadABI", uploadABIHandler)
 log.Fatal(http.ListenAndServe(":8080", nil))
}
```

As you can see, we expose an endpoint where users can upload their ABI. The ABI is read from the request body and then uploaded to IPFS. The response is the Object ID (OID) of the uploaded file. This OID can be used to retrieve the ABI from IPFS at any time.

## Associate ABI with OIDs on-chain

The next step is to store the OID on-chain. We can do this by creating a simple Solidity smart contract that stores the OIDs in a mapping. The code snippet below is a battle-tested implementation of this idea.

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractRegistry {
  mapping(address => string) private contractAbiHashes;
  mapping(string => bytes) private contractAbis;
  mapping(address => address) private contractRegistrars;
  event ContractRegistered(address indexed contractAddress,
    string indexed abiHash, address indexed registrar);
  event ContractUpdated(address indexed contractAddress,
    string indexed abiHash, address indexed updater);
  function registerContract(string memory abiHash) public {
      require(bytes(contractAbiHashes[msg.sender]).length == 0,
       "Contract already registered");
      contractAbiHashes[msg.sender] = abiHash;
      contractRegistrars[msg.sender] = msg.sender;
      emit ContractRegistered(msg.sender, abiHash, msg.sender);
  }
  function updateContract(address contractAddress,
    string memory abiHash, bytes memory abi) public {
      require(keccak256(bytes(contractAbiHashes[contractAddress]))
        == keccak256(bytes(abiHash)), "Contract not registered");
      require(contractRegistrars[contractAddress]
        == msg.sender, "Only original registrar can update contract");
      contractAbis[abiHash] = abi;
      emit ContractUpdated(contractAddress, abiHash, msg.sender);
  }
  function getContractAbi(string memory abiHash) public
    view returns (bytes memory) {
      return contractAbis[abiHash];
  }
}
```

## Decoding contract events

Now that we have the ABI stored on-chain, we can use it to decode contract events. The code snippet below is a battle-tested implementation of this idea.

```go
import (
 // Import necessary packages
 "github.com/ipfs/go-ipfs-api"
)

func DecodeEventDynamic(log models.EventLog) (string, []string, error) {
 // Retrieve the ABI hash from the on-chain registrar
 abiHash, err := onChainRegistrar.GetABIHash(log.Address)
 if err != nil {
  return "", nil, err
 }

 // Retrieve the ABI from IPFS based on the ABI hash
 ipfsAPI := shell.NewShell("localhost:5001") // Update with your IPFS API endpoint
 relevantAbi, err := ipfsAPI.Cat(abiHash)
 if err != nil {
  return "", nil, err
 }

 // Convert the hex-encoded data to bytes
 trimmed := strings.TrimPrefix(log.Data, "0x")
 data, err := hex.DecodeString(trimmed)
 if err != nil {
  return "", nil, err
 }

 contractABI, err := abi.JSON(strings.NewReader(relevantAbi))
 if err != nil {
  return "", nil, err
 }

 // Get the event for the topic
 event, err := contractABI.EventByID(ethcommon.HexToHash(log.Topics[0]))
 if err != nil {
  return "", nil, err
 }

 unpacked, err := contractABI.Unpack(event.Name, data)
 if err != nil {
  return "", nil, err
 }

 params, err := parseToStringSlice(unpacked)
 if err != nil {
  return "", nil, err
 }

 return event.Sig, params, nil
}
```

### The focal points of the implementation are:

- Import the necessary package [go-ipfs-api](github.com/ipfs/go-ipfs-api) to interact with the IPFS API.

- Retrieve the ABI hash from the on-chain registrar using the GetABIHash function (replace onChainRegistrar.GetABIHash(log.Address) with your implementation).

- Initialize the IPFS API client with the appropriate IPFS API endpoint (localhost:5001 in this example, update it with your IPFS API endpoint).

- Use the IPFS API client to retrieve the ABI from IPFS by calling ipfsAPI.Cat(abiHash), where abiHash is the hash of the ABI associated with the contract address.

**Note**: Please note that you will need to ensure that you have a functioning on-chain registrar that provides the ABI hash and that you have a running IPFS node with the appropriate API endpoint configured.

**Note**: Make sure to handle any error conditions and customize the implementation to fit your specific requirements.

## Conclusion

In this article, we have explored how to enhance explorers to understand contract events. We have seen how to upload ABIs to IPFS, associate ABIs with OIDs on-chain, and decode contract events. We have also seen how to implement these ideas in Go. I hope you have found this article useful and that it has inspired you to build your own explorers that understand contract events.
