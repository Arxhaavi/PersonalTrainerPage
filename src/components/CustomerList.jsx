import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Button from '@mui/material/Button';
import AddCustomer from './AddCustomer';
// import EditCustomer from './EditCustomer';

function CustomerList() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => getCustomersData(), []);

    const getCustomersData = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
            .then(response => response.json())
            .then(responseData => {
                setCustomers(responseData.content);
            })
            .catch(error => console.error(error));
    }

    const DeleteButton = (props) => {
        const handleDeleteClick = () => {
            const { data } = props.node;
            if (window.confirm(`Are you sure you want to delete ${data.firstname} ${data.lastname} from Customers?`)) {
                fetch(data.links[0].href, { method: 'DELETE' })
                    .then(res => getCustomersData())
                    .catch(error => console.error(error))
            }
        };

        return (
            <Button color="error" size="small" onClick={handleDeleteClick}>Delete</Button>
        );
    };


    const saveCustomer = (customer) => {
        fetch('https://traineeapp.azurewebsites.net/api/customers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(customer)
        })
            .then(res => getCustomersData())
            .catch(error => console.error(error))
    }

    const columns = [
        { headerName: "First name", field: "firstname", sortable: true, filter: true, floatingFilter: true, width: 130 },
        { headerName: "Last name", field: "lastname", sortable: true, filter: true, floatingFilter: true, width: 130 },
        { headerName: "Street address", field: "streetaddress", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Post code", field: "postcode", sortable: true, filter: true, floatingFilter: true, width: '120px' },
        { headerName: "City", field: "city", sortable: true, filter: true, floatingFilter: true, width: '135px' },
        { headerName: "Email", field: "email", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Phone", field: "phone", sortable: true, filter: true, floatingFilter: true, width: '140px' },
        { headerName: "", cellRenderer: DeleteButton, width: '100px' },
    ];

    const gridOptions = {
        animateRows: true
    };

    return (
        <>
            <AddCustomer saveCustomer={saveCustomer} />
            <div className="ag-theme-alpine"
                style={{ height: '600px', width: '90%', margin: 'auto' }} >
                <AgGridReact
                    pagination={true}
                    paginationAutoPageSize={true}
                    animateRows={true}
                    columnDefs={columns}
                    rowData={customers}>
                </AgGridReact>
            </div>
        </>
    );
}
export default CustomerList;