import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card'

function GetProposal(props) {
    const contract = props.instance;
    const [proposalText, setProposalText]= useState('')
    const [propIdValue, setInputPropId] = useState('');
    const onChangePropId = (event) => {
        setInputPropId(event.target.value)
    };
    const getOneProposal = async () => {
        try {
            const _getOneProposal = await contract.methods.getOneProposal(propIdValue).call()
            setProposalText(`Proposal description : ${_getOneProposal.description}`)
        
        } catch(_) {
            setProposalText('This proposal does NOT exist')
        }
        setInputPropId('')
    }
      return (
        <>
        { props.workflowStatus < 1 ?
          <></> :
        <>
         <Card style={{ width: '24rem' }}>
            <Card.Body>
                <InputGroup className="mb-3">
                    <FormControl
                    placeholder="Enter Proposal Id" value={propIdValue || ''}  onChange={onChangePropId} 
                    />
                    <Button variant="outline-primary" id="button-addon2" onClick={getOneProposal}>
                    Get proposal
                    </Button>
                </InputGroup>
                <Card.Text>
                    {proposalText}
                </Card.Text>
            </Card.Body>   
        </Card>
        
       
        </>
        }</>
    )
}

export default GetProposal;
