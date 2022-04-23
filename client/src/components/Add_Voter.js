import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import { Store } from 'react-notifications-component';
import Card from 'react-bootstrap/Card'

function AddVoter(props) {
    const [inputValue, setInputValue] = useState('');
    const onChangeInput = (event) => {
        setInputValue(event.target.value);
      } 
    const onSubmit = () => {
    const contract = props.instance;     
      try {
        contract.methods.addVoter(inputValue).send({from: props.admin})
          .on('error', function(){
            Store.addNotification({
              title: "Error :",
              message: `Voter already added`,
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
          .then(contract.events.VoterRegistered()
          .once('data', function(event) {
            Store.addNotification({
              title: "Event data :",
              message: `${event.event} with adress : ${event.returnValues.voterAddress}`,
              type: "success",
              insert: "top",
              container: "top-center",
              animationIn: ["animate__animated", "animate__fadeIn"],
              animationOut: ["animate__animated", "animate__fadeOut"],
              dismiss: {
                duration: 6000,
                onScreen: true
              }
            });
          })
          )
          setInputValue('')     
        } catch (error) {
          Store.addNotification({
            title: "Error :",
            message: `Wrong address format`,
            type: "danger",
            insert: "top",
            container: "top-center",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 6000,
              onScreen: true
          } });
          setInputValue('')
        }     
    }
    return (
          <div>
          { props.workflowStatus > 0 ?
            <></> :
            <>
            <Card style={{ width: '24rem' }}>
              <Card.Body>
                <input placeholder='Enter Address' value={inputValue || ''} onChange={onChangeInput} />
                <Button variant="success" onClick={onSubmit}>Add Voter</Button>
              </Card.Body>   
            </Card>      
            </>
          }
         </div>
    )
}

export default AddVoter;