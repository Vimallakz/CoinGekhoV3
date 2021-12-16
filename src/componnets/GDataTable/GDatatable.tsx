import { DataTable } from 'primereact/datatable'
import React, { useState } from 'react'
import { ICoin } from '../../pages/CoinsList/CoinList';
import ExpansionTemplate from '../../pages/CoinsList/components/ExpansionTemplate';
import { Column, ColumnProps } from 'primereact/column';

interface IGDatatableProps {
  list: Array<ICoin>,
  columns: Array<ColumnProps>
}

function GDatatable({list, columns}: IGDatatableProps) {
  const [expandedRows, setExpandedRows] = useState<Array<ICoin>>([]);

  const expandTemplate = (data: ICoin) => <ExpansionTemplate rowData={data}/>

  return (
    <div>
      <DataTable value={list} size="small" showGridlines stripedRows removableSort filterDisplay="row"
        expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data )}
        rowExpansionTemplate={expandTemplate}
        paginator rows={10} rowsPerPageOptions={[10,20,50]}
        paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}">
        <Column expander style={{ width: '3em' }} />
        {columns.map((column: ColumnProps, index: number) => (
          <Column key={index} {...column} />
        ))}
      </DataTable>
    </div>
  )
}

export default GDatatable
