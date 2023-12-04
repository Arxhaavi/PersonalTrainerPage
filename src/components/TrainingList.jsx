import { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import dayjs from 'dayjs';

function TrainingList() {

    const [trainings, setTrainings] = useState([]);

    useEffect(() => getTrainingsData(), []);

    const getTrainingsData = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => response.json())
            .then(responseData => {
                setTrainings(responseData);
            })
            .catch(error => console.error(error));
    }

    const columns = [
        { headerName: "Date", field: "date", valueFormatter: params => { return params.value ? dayjs(params.value).format("DD/MM/YYYY") : '' }, width: "140px", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Time", field: "date", valueFormatter: params => { return params.value ? dayjs(params.value).format("HH.mm") : '' }, width: "120px", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Duration (minutes)", field: "duration", sortable: true, filter: true, floatingFilter: true },
        { headerName: "Activity", field: "activity", sortable: true, filter: true, floatingFilter: true },
        {
            headerName: "Customer's name",
            valueGetter: function (params) {
                if (params.data.customer == null || params.data.customer == null) {
                    return 'Unknown';
                }
                else
                    return params.data.customer.firstname + ' ' + params.data.customer.lastname;
            },
            sortable: true,
            filter: true,
            floatingFilter: true,
        },
    ];

    const gridOptions = {
        animateRows: true
    };

    return (
        <>
            <div className="ag-theme-alpine"
                style={{ height: '600px', width: '68%', margin: 'auto' }} >
                <AgGridReact
                    pagination={true}
                    paginationAutoPageSize={true}
                    animateRows={true}
                    columnDefs={columns}
                    rowData={trainings}>
                </AgGridReact>
            </div>
        </>
    );

}

export default TrainingList;