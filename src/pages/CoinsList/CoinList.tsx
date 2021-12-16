/* eslint-disable no-empty-pattern */
import React, { ReactElement, useEffect, useState } from 'react';
import { client } from '../../apiClient';
import { ColumnProps } from 'primereact/column';
import GDatatable from '../../componnets/GDataTable/GDatatable';

interface Props {
}

export interface ICoin {
  "id": string;
  "symbol": string;
  "name": string;
  "image": string;
  "current_price": number;
  "market_cap": number;
  "market_cap_rank": number;
  "fully_diluted_valuation": number;
  "total_volume": number;
  "high_24h": number;
  "low_24h": number;
  "price_change_24h": number,
  "price_change_percentage_24h": number,
  "market_cap_change_24h": number;
  "market_cap_change_percentage_24h": number;
  "total_supply": number;
  "max_supply": number;
  "ath": number;
  "ath_change_percentage": number;
}

function CoinList({}: Props): ReactElement {
  const [coins, setCoins] = useState<Array<ICoin>>([]);
  useEffect(() => {
    client.get('/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then((res:  any) => {
      setCoins(res.data);
    }).catch(err => { })
  }, [])

  const formatCurrency = (value: number) => {
    return value.toLocaleString('en-US', {style: 'currency', currency: 'USD'});
  }

  const priceBodyTemplate = (key: string) => (rowData: any) => {
      return formatCurrency(rowData[key]);
  }

  const rankTemplate = (rowData: any) => {
  return <div className="flex justify-center font-black"> #{rowData.market_cap_rank}</div>;
}

  const nameBodytemplate = (rowData: ICoin) => {
    console.log(rowData);
    return <div className="flex items-center">
      <img src={rowData.image} alt="coin_image" width="40"/> 
      <span className="pl-2">{rowData.name}</span>
    </div>;
  }

  const columns: ColumnProps[] = [
    {field: 'market_cap_rank', header: 'Rank', sortable: true, body: rankTemplate},
    {field: 'name', header: 'Name', sortable: true, filter: true, body:  nameBodytemplate},
    {field: 'symbol', header: 'Symbol', sortable: true, filter: true },
    {field: 'current_price', header: 'Current Price', sortable: false, body: priceBodyTemplate('current_price') },
    {field: 'market_cap', header: 'Market Cap', sortable: false, body: priceBodyTemplate('market_cap')},
  ];

  return (
    <div>
      <GDatatable list={coins} columns={columns}/>
    </div>
  )
}

export default CoinList
