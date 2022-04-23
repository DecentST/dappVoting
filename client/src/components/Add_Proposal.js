import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { ReactNotifications, Store } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

function AddProposal(props) {
    const voter = props.voter
    const [inputValue, setInputValue] = useState('');
    const onChangeInput = (event) => {
        setInputValue(event.target.value);
      }
    const onSubmit = () => {
        const contract = props.instance;
        contract.methods.addProposal(inputValue).send({from: voter[0]})
            .on('error', function(){
                Store.addNotification({
                    title: "Error",
                    message: `Can NOT add proposal`,
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
            .then(contract.events.ProposalRegistered()
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
        setInputValue('')
    }
    return (
          <>
          { props.workflowStatus !== 1 ?
            <></> :
            <>
            <input placeholder='Enter proposal' value={inputValue || ''} onChange={onChangeInput} />
            <Button variant="success" onClick={onSubmit}>Register Proposal</Button>
            </>
          }
         </>
    )
}

export default AddProposal;