import rn from 'react-native'
import r, { useEffect, useLayoutEffect, useState } from 'react'
import * as api from '../../../api'
import { DataTable } from 'react-native-paper'
import moment from 'moment'
import GestureRecognizer from 'react-native-swipe-gestures'
import { usePagination } from '../../../hook'
import { useNavigation } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'

const TicketList = ({ navigation }) => {
  const [page, setPage, itemsPerPage, setItemPerPage] = usePagination(0, 5)
  const [data, setData] = r.useState()
  const getData = () => {
    setData()
    api.getExpTicket()
      .then(res => {
        setData(res.data.data)
      })
      .catch(err => {
        setData([])
        console.log(err)
      })
  }
  useEffect(() => {
    // getData()
  }, [])
  return (
    <rn.View style={{ flex: 1 }}>
      <DataTable.Header>
        <DataTable.Title>ID</DataTable.Title>
        <DataTable.Title style={{ width: 20 }}>Ngày</DataTable.Title>
        {/* <DataTable.Title>Số phiếu xuất</DataTable.Title> */}
        <DataTable.Title>Từ kho</DataTable.Title>
        <DataTable.Title>Đến kho</DataTable.Title>
      </DataTable.Header>
      <rn.ScrollView refreshControl={<rn.RefreshControl refreshing={data} onRefresh={getData} />}>
        {
          data?.map(item =>
            <DataTable.Row key={item.id}>
              <DataTable.Cell>{item.id}</DataTable.Cell>
              <DataTable.Cell>{moment(item.date).format('DD/MM')}</DataTable.Cell>
              {/* <DataTable.Cell>{item.code}</DataTable.Cell> */}
              <DataTable.Cell>{item.from_inventory}</DataTable.Cell>
              <DataTable.Cell ><rn.Text adjustsFontSizeToFit numberOfLines={1}>{item.to_inventory}</rn.Text></DataTable.Cell>
            </DataTable.Row>
          )
        }
      </rn.ScrollView>
      <DataTable.Pagination
        page={page}
        onPageChange={setPage}
        onItemsPerPageChange={setItemPerPage}
        numberOfItemsPerPage={itemsPerPage}
        showFastPaginationControls
        numberOfPages={Math.ceil(data?.length / itemsPerPage)}
        optionsPerPage={[5, 10, 20]}
        label={data ? `${1 + page * itemsPerPage} - ${data.length < (page + 1) * itemsPerPage ? data.length : (page + 1) * itemsPerPage} of ${data.length}` : ''}
      />

    </rn.View>
  )
}
export default TicketList
