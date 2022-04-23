import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function VoteProposal(props) {
    const voter = props.voter
    const contract = props.instance
    const workflowStatus = props.workflowStatus
    const [inputValue, setInputValue] = useState('');
    const onChangeInput = (event) => {
        setInputValue(event.target.value);
      }
    const onSubmit = () => {
        contract.methods.setVote(inputValue).send({from: voter[0]})
            .on('error', function(){ 
                Store.addNotification({
                    title: "Error",
                    message: `Already voted or you are not a voter`,
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
            .then(contract.events.Voted() 
            .once('data', function(event) {
                Store.addNotification({
                    title: "Event data:",
                    message: `${event.event} with voter: ${event.returnValues.voter} for proposal #${event.returnValues.proposalId}`,
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
        setInputValue('')
    }
    return (
          <>
          { workflowStatus !== 3 ?
            <></> :
            <>
            <input placeholder='Enter Proposal ID' value={inputValue || ''} onChange={onChangeInput} />
            <Button variant="success" onClick={onSubmit}>Vote For Proposal</Button>
            </>
          }
         </>
    )
}

export default VoteProposal;