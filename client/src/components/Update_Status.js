import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import Button from 'react-bootstrap/esm/Button';
import { Store } from 'react-notifications-component';

function UpdateStatus(props) {
      const WorkflowStatus = {
        0: 'RegisteringVoters',
        1: 'ProposalsRegistrationStarted',
        2: 'ProposalsRegistrationEnded',
        3: 'VotingSessionStarted',
        4: 'VotingSessionEnded',
        5: 'VotesTallied'
    }
    const updateStatus = (statusNumber) => {
        const contract = props.instance;
        const admin = props.admin;
        const setWorkflowStatus = props.setWorkflowStatus
        switch (statusNumber) {
          case 1: 
            contract.methods.startProposalsRegistering().send({from: admin})
            .on('error', function(){ 
              Store.addNotification({
                title: "Error :",
                message: `Wrong status`,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
              } }); 
            })
            .then(contract.events.WorkflowStatusChange()
            .once('data', function(event) {
              Store.addNotification({
                title: "Event data: ",
                message: `${event.event} from ${WorkflowStatus[event.returnValues.previousStatus]} to ${WorkflowStatus[event.returnValues.newStatus]}`,
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
              } });
            setWorkflowStatus(Number(event.returnValues.newStatus))
            })
            )
            break;
          case 2: 
            contract.methods.endProposalsRegistering().send({from: admin})
            .on('error', function(){ 
              Store.addNotification({
                title: "Error :",
                message: `Wrong status`,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
              } });
             })
            .then(contract.events.WorkflowStatusChange()
            .once('data', function(event) {
              Store.addNotification({
                title: "Event data: ",
                message: `${event.event} from ${WorkflowStatus[event.returnValues.previousStatus]} to ${WorkflowStatus[event.returnValues.newStatus]}`,
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
              } });
              setWorkflowStatus(Number(event.returnValues.newStatus))
            })
            )
            break;
          case 3: 
            contract.methods.startVotingSession().send({from: admin})
            .on('error', function(){ 
              Store.addNotification({
                title: "Error :",
                message: `Wrong status`,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
              } });
             })
            .then(contract.events.WorkflowStatusChange()
            .once('data', function(event) {
              Store.addNotification({
                title: "Event data: ",
                message: `${event.event} from ${WorkflowStatus[event.returnValues.previousStatus]} to ${WorkflowStatus[event.returnValues.newStatus]}`,
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
              } });
              setWorkflowStatus(Number(event.returnValues.newStatus))
            })
            )
            break;
          case 4:
            contract.methods.endVotingSession().send({from: admin})
            .on('error', function(){ 
              Store.addNotification({
                title: "Error :",
                message: `Wrong status`,
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
              } });
             })
            .then(contract.events.WorkflowStatusChange()
            .once('data', function(event) {
              Store.addNotification({
                title: "Event data: ",
                message: `${event.event} from ${WorkflowStatus[event.returnValues.previousStatus]} to ${WorkflowStatus[event.returnValues.newStatus]}`,
                type: "success",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 6000,
                  onScreen: true
              } });
              setWorkflowStatus(Number(event.returnValues.newStatus))
             
            })
            )
            break;
          default:
            Store.addNotification({
              title: "Error :",
              message: `Wrong status`,
              type: "danger",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 6000,
                onScreen: true
            } });
        }
      }
      return (
          <>
         
            { props.workflowStatus !== 0 ?
                 <></>:
                <Button  onClick={() => updateStatus(1)} >Start Proposals Registering</Button>
            }
            { props.workflowStatus !== 1 ?
                 <></>:
                <Button  onClick={() => updateStatus(2)}>End Proposals Registering</Button>
            }
            { props.workflowStatus !== 2 ?
             <></>:
            <Button  onClick={() => updateStatus(3)}>Start Voting Session</Button>
            }
           { props.workflowStatus !== 3 ?
             <></>:
            <Button  onClick={() => updateStatus(4)}>End Voting Session</Button>
           }
          </>
      )
}

export default UpdateStatus;