import Form from 'react-bootstrap/Form';

function FormGroupExample() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="searchBar">
        <Form.Label>Search Listings</Form.Label>
        <Form.Control type="search" placeholder="Enter query" />
      </Form.Group>
    </Form>
  );
}

export default FormGroupExample;