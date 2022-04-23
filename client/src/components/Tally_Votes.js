import Button from 'react-bootstrap/Button';
import React from "react";
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function TallyVotes(props) {
    const workflowStatus = props.workflowStatus
    const WorkflowStatus = {
        4: 'VotingSessionEnded',
        5: 'VotesTallied'
    }
    const setWorkflowStatus = props.setWorkflowStatus
    const contract = props.instance
    const admin = props.admin

    const onSubmit = () => {
        contract.methods.tallyVotesDraw().send({from: admin})
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
                    message: `Your proposal has been registered with number #${event.returnValues.proposalId}`,
                    type: "success",
                    insert: "top",
                    container: "top-center",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 6000,
                      onScreen: true
                  } });
                 
                })
        )
        setWorkflowStatus(5)
    }
    return (
          <>
          { workflowStatus !== 4  ?
            <></> :
            <Button variant="success" onClick={onSubmit}>Tally Votes</Button> 
          }
         </>
    )
}

export default TallyVotes;