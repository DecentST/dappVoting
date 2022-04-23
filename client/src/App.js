import React, { useCallback, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import VotingContract from "./contracts/Voting.json";
import getWeb3 from "./getWeb3";

import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import AddVoter from './components/Add_Voter';
import UpdateStatus from './components/Update_Status'
import AddProposal from './components/Add_Proposal'
import VoteProposal from './components/Vote_Proposal'
import TallyVotes from './components/Tally_Votes'
import Results from "./components/Results";
import GetVoter from "./components/Get_Voter";
import GetProposal from "./components/Get_Proposal";


function App() {
  const [myWeb3Api, setMyWeb3Api] = useState({
    provider: null,
    isProviderLoaded: false,
    web3: null,
    contract: null
  })
  const [state, setState] = useState({ web3: null, accounts: null, contract: null, owned: null });

  const [account, setAccount] = useState(null)
  const [contract, setContract] = useState(null)
  const [workflowStatus, setWorkflowStatus] = useState(null)
  const [admin, setAdmin] = useState(null)
  const currentStatus = {
    0 : "RegisteringVoters",
    1 : "ProposalsRegistrationStarted",
    2 : "ProposalsRegistrationEnded",
    3 : "VotingSessionStarted",
    4 : "VotingSessionEnded",
    5 : "VotesTallied"
    }

  const canConnectToContract = account && myWeb3Api.contract

  window.ethereum.on('accountsChanged', function (accounts) {
    window.location.reload()
  });

  useEffect(() => {
    (async function () {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts)
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = VotingContract.networks[networkId];
        const instance = new web3.eth.Contract(
          VotingContract.abi,
          deployedNetwork && deployedNetwork.address,
        );
        setContract(instance);
        const owner = await instance.methods.owner().call();
        let owned = accounts[0]==owner;

        setState({ web3: web3, accounts: accounts, contract: instance, owned });

      } catch (error) {
        alert('init failed')
        console.error(error);
      }
    })();
  }, [state, account])

  useEffect(() => {
    const loadWorkflowStatus = async () => {
    const _contract  = state.contract
    const status = await _contract.methods.workflowStatus().call()
    setWorkflowStatus(Number(status))
    const admin = await _contract.methods.owner().call();
    setAdmin(admin)
    }
    state.contract && loadWorkflowStatus()
  },[state])

  if (state.owned) {
    return (
    
      <div style={{background: 'content-box radial-gradient(crimson, skyblue)', display: 'flex',  justifyContent:'center', alignItems:'center',
        height: '60rem'}}>
          <ReactNotifications />   
        <div >
          <div>  
            <h2>You are owner : yes ({account})</h2> 
          </div>
          <div >
            <h4>Workflow status: {currentStatus[workflowStatus]}</h4>
          </div>
          <UpdateStatus  instance={contract} admin={admin} setWorkflowStatus={(ws) => setWorkflowStatus(ws)} workflowStatus={workflowStatus}/>          
          <div class="row">
          <AddVoter instance={contract} admin={admin} workflowStatus={workflowStatus}/>
          <AddProposal instance={contract} voter={account} workflowStatus={workflowStatus}/>
          <VoteProposal instance={contract} voter={account} workflowStatus={workflowStatus}/>
          <TallyVotes instance={contract} admin={admin} setWorkflowStatus={(ws) => setWorkflowStatus(ws)} workflowStatus={workflowStatus}/>
          </div>
          <br></br>
          <div class="row">
            <Results instance={contract} workflowStatus={workflowStatus}/>
            <GetProposal instance={contract} voter={account} workflowStatus={workflowStatus}/>
            <GetVoter instance={contract} voter={account} workflowStatus={workflowStatus}/>
          </div>

        </div>
      </div>   
  );
  } else {
    return (  
      <div style={{display: 'flex',  justifyContent:'center', alignItems:'center',
        height: '60rem'}}>
       <ReactNotifications /> 
        <div >
          <div>
            You are owner : no ({account})
          </div>
          <div >
            Workflow status: {currentStatus[workflowStatus]}
          </div>
          <br></br>
          <div class="row">
          <AddProposal instance={contract} voter={account} workflowStatus={workflowStatus}/>
          <VoteProposal instance={contract} voter={account} workflowStatus={workflowStatus}/>
          </div>
          <br></br>
          <div class="row">        
          <Results instance={contract} workflowStatus={workflowStatus}/>
          <GetProposal instance={contract} voter={account} workflowStatus={workflowStatus}/>
          <GetVoter instance={contract} voter={account} workflowStatus={workflowStatus}/>
          </div>
        </div>
      </div>   
  );
  } 
}
export default App;
