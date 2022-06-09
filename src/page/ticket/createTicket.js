import rn from 'react-native'
import r from 'react'
import * as api from '../../../api'
import moment from 'moment'
import { DatePicker, Select } from '../../../component'
import { useSelector } from 'react-redux'
import { DataTable, TextInput } from 'react-native-paper'

const initialProduct = {
  temp: '',
  density: '',
  quantity: '',
  unit: null,
  l15: '',
  d15: '',
  vcf: '',
  wcf: '',
  kg: '',
  gallon: '',
  tank: null,
  dtype: 1,
}
const initialInput = {
  startdate: new Date,
  enddate: new Date,
  invoiceForm: null,
  inventory_cert: '',
  driver: null,
  from_inventory: null,
  to_inventory: null,
  vehicle: null,
  orderno: '',
  receiptproducts: [{ ...initialProduct }],
  contract_date: '',
  contract_no: '',
  saletype: null,
  loadingtype: null,
  ext_vh_tanks: undefined,
  billdate: '',
  ext_inv_serial: '',
  product: null,
  ltp: null,
}

const CreateTicket = () => {
  const user = useSelector(state => state.user)
  const [input, setInput] = r.useState({ ...initialInput })
  const [showDateTimePicker, setShowDateTimePicker] = r.useState(false)
  return (
    <rn.ScrollView>
      <Select
        label='Mẫu phiếu vận chuyển nội bộ'
        getDataFunc={() => api.getLTP({ status: 1 })}
        getOptionLabel={option => option?.code}
        value={input.ltp}
        onChange={value => setInput(prev => ({ ...prev, ltp: value }))}

      />
      <Select
        label='Kho xuất'
        getDataFunc={() => api.getInventory({ status: 1 })}
        setDefaultFunc={() => { setInput(prev => ({ ...prev, from_inventory: null })); api.getInventory().then(res => setInput(prev => ({ ...prev, from_inventory: res.data.data.find(item => item.id == prev.ltp.from_inventory_id) }))) }}
        setDefaultWhen={Boolean(input.ltp)}
        setDefaultDependencies={[input.ltp]}
        getOptionLabel={option => option?.name}
        value={input.from_inventory}
        onChange={value => setInput(prev => ({ ...prev, from_inventory: value }))}
        disabled={Boolean(input.ltp)}
      />
      <Select
        label='Kho nhập'
        getDataFunc={() => api.getInventory({ status: 1 })}
        setDefaultFunc={() => { setInput(prev => ({ ...prev, to_inventory: null })); api.getInventory().then(res => setInput(prev => ({ ...prev, to_inventory: res.data.data.find(item => item.id == prev.ltp.to_inventory_id) }))) }}
        setDefaultWhen={Boolean(input.ltp)}
        setDefaultDependencies={[input.ltp]}
        getOptionLabel={option => option?.name}
        value={input.to_inventory}
        onChange={value => setInput(prev => ({ ...prev, to_inventory: value }))}
        disabled={Boolean(input.ltp)}
      />
      <Select
        label='Hàng hóa'
        getDataFunc={() => api.getProduct({ status: 1 })}
        setDefaultFunc={() => { setInput(prev => ({ ...prev, product: null })); api.getProduct().then(res => setInput(prev => ({ ...prev, product: res.data.data.find(item => item.id == prev.ltp.product_id) }))) }}
        setDefaultWhen={Boolean(input.ltp)}
        setDefaultDependencies={[input.ltp]}
        disabled={Boolean(input.ltp)}
        getOptionLabel={option => option?.name}
        value={input.product}
        onChange={value => setInput(prev => ({ ...prev, product: value }))}
      />
      <Select
        label='Phương tiện'
        getDataFunc={() => api.getVehicle({ status: 1, end_date: moment(Date.now()).format('YYYY-MM-DD'), groupvehicle_id: 455911, organization_id: user.organization_id })}
        getDataWhen={Boolean(user)}
        getOptionLabel={option => option?.code}
        value={input.vehicle}
        onChange={value => setInput(prev => ({ ...prev, vehicle: value }))}
        filter={option => option.provider_id && JSON.parse(option.tanks)?.length}
      />
      <Select
        label='Người điều khiển'
        getDataFunc={() => api.getDriver({ provider_id: input.vehicle.provider_id, status: 1 })}
        filter={option => option.provider_id === input.vehicle.provider_id}
        disabled={!input.vehicle}
        getOptionLabel={option => option?.name}
        value={input.driver}
        onChange={value => setInput(prev => ({ ...prev, driver: value }))}
      />
      <DatePicker value={input.startdate} format='DD/MM/YYYY HH:mm' mode='datetime' label='Thời gian bắt đầu' onChange={date => setInput(prev => ({ ...prev, startdate: date }))} />
      <DatePicker value={input.enddate} format='DD/MM/YYYY HH:mm' mode='datetime' label='Thời gian kết thúc' onChange={date => setInput(prev => ({ ...prev, enddate: date }))} />
      <Select
        label='Loại hình bán'
        getDataFunc={() => api.getSaleType({ status: 1 })}
        setDefaultFunc={() => { setInput(prev => ({ ...prev, saletype: null })); api.getSaleType().then(res => setInput(prev => ({ ...prev, saletype: res.data.data.find(item => item.id == 3) }))) }}
        getOptionLabel={option => option?.name}
        value={input.saletype}
        onChange={value => setInput(prev => ({ ...prev, saletype: value }))}
      />
      <Select
        label='Phương thức bán'
        getDataFunc={() => api.getLoadingType({ status: 1 })}
        setDefaultFunc={() => { setInput(prev => ({ ...prev, loadingtype: null })); api.getLoadingType().then(res => setInput(prev => ({ ...prev, loadingtype: res.data.data.find(item => item.id == prev.ltp.loadingtype_id) }))) }}
        setDefaultWhen={Boolean(input.ltp)}
        setDefaultDependencies={[input.ltp]}
        disabled={Boolean(input.ltp)}
        getOptionLabel={option => option?.name}
        value={input.loadingtype}
        onChange={value => setInput(prev => ({ ...prev, loadingtype: value }))}
      />
      <TextInput
        label='Chứng chỉ xuất kho số/ngày'
        value={input.inventory_cert}
        onChange={e => setInput(prev => ({ ...prev, inventory_cert: e.nativeEvent.text }))}
      />
      <TextInput
        label='Lệnh điều động số'
        value={input.orderno}
        onChange={e => setInput(prev => ({ ...prev, orderno: e.nativeEvent.text }))}
      />
      <TextInput
        label='Phiếu nhập/Ký hiệu'
        value={input.ext_inv_serial}
        onChange={e => setInput(prev => ({ ...prev, ext_inv_serial: e.nativeEvent.text }))}
      />
      <DatePicker value={input.billdate} mode='date' label='Ngày xuất hóa đơn' onChange={date => setInput(prev => ({ ...prev, billdate: date }))} />
      <TextInput
        label='Số hợp đồng'
        value={input.contract_no}
        onChange={e => setInput(prev => ({ ...prev, contract_no: e.nativeEvent.text }))}
      />
      <DatePicker value={input.contract_date} mode='date' label='Ngày hợp đồng' onChange={date => setInput(prev => ({ ...prev, contract_date: date }))} />
      <rn.Text style={{ backgroundColor: '#b3b3b3', paddingVertical: 15, textAlign: 'center', textTransform: 'uppercase' }}>Thông tin hàng hóa</rn.Text>
      <rn.ScrollView horizontal>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ width: 150 }}>Tên hàng hóa</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>Số lượng</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>Nhiệt độ (℃)</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>D15 (Kg/cm3)	</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>VCF</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>WCF</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>Lít 15℃</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>KG	</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}>Bồn xuất</DataTable.Title>
            <DataTable.Title style={{ width: 150 }}></DataTable.Title>
          </DataTable.Header>
          {
            input.receiptproducts.map((item, index) =>
              <DataTable.Row key={index}>
                <DataTable.Cell style={{ width: 150 }}>Tên hàng hóaên hàng hóa</DataTable.Cell>
                <rn.View style={{ width: 150, borderWidth: 1, flexDirection: 'row' }}><TextInput style={{ flex: 1, backgroundColor: 'white' }} /><Select right={null} style={{ flex: 1 }} /></rn.View>
                <DataTable.Cell style={{ width: 150 }}>Nhiệt độ (℃)</DataTable.Cell>
                <DataTable.Cell style={{ width: 150 }}>D15 (Kg/cm3)	</DataTable.Cell>
                <DataTable.Cell style={{ width: 150 }}>VCF</DataTable.Cell>
                <DataTable.Cell style={{ width: 150 }}>WCF</DataTable.Cell>
                <DataTable.Cell style={{ width: 150 }}>Lít 15℃</DataTable.Cell>
                <DataTable.Cell style={{ width: 150 }}>KG	</DataTable.Cell>
                <DataTable.Cell style={{ width: 150 }}>Bồn xuất</DataTable.Cell>
                <DataTable.Cell style={{ width: 150 }}></DataTable.Cell>
              </DataTable.Row>
            )
          }
        </DataTable>
      </rn.ScrollView>
      <rn.Text>{JSON.stringify(input, null, 2)}</rn.Text>
    </rn.ScrollView>
  )
}
export default CreateTicket

