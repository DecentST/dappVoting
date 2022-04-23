import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card'

function Results(props) {
    const contract = props.instance;
    const workflowStatus = props.workflowStatus;
    const [resultText, setResultText]= React.useState('')

    const getResults = async () => {
        const winners = await contract.methods.getWinner().call();
        let text = 'Winning propositions are :';     
        
        if (winners.length > 1) {
            winners.forEach(element => {
                text = <> {text} <br></br> {element.description}</>          
            });
            setResultText(text);    
        } else {
            setResultText(winners[0][0]);
        }
    }
    return (
        <>
        { workflowStatus !== 5  ?
          <></> :
          <Card style={{ width: '24rem' }}>
            <Card.Body>
                <Button variant="outline-primary" id="button-addon2" onClick={getResults} >Election Result</Button> 
                <Card.Text>
                    {resultText}
                </Card.Text>
            </Card.Body>   
          </Card>
        }
       </>
    )
}
export default Results;
