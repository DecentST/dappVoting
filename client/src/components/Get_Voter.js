import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card'

function GetVoter(props) {
    const contract = props.instance;
    const voter = props.voter;
    const workflowStatus = props.workflowStatus;
    const [addrValue, setInputAddr] = useState('');
    const [voterText, setVoterText]= useState('')
    const onChangeAddr = (event) => {
        setInputAddr(event.target.value)
      };
    const getVoter = async () => {
        try{
            const _getVoter = await contract.methods.getVoter(addrValue).call({from: voter[0]}) 
            setVoterText(<ul> <li>Voter {addrValue}</li> <li>hasVoted: {_getVoter.hasVoted.toString()}</li> <li> isRegistered: {_getVoter.isRegistered.toString()} </li> <li>voterProposalId: {_getVoter.votedProposalId}</li> </ul>);
        } catch(_) {
            setVoterText('Not a voter');
        }    
        setInputAddr('')
    }
    return (
        <>
        <Card style={{ width: '24rem' }}>
            <Card.Body>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder='Enter Address' value={addrValue || ''}  onChange={onChangeAddr} 
                    />
                    <Button variant="outline-primary" id="button-addon2" onClick={getVoter}>
                    Get Voter
                    </Button>    
                </InputGroup>
                <Card.Text>
                    {voterText}
                </Card.Text>
            </Card.Body>   
        </Card>
        </>
    )
}
export default GetVoter;
