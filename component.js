import rn from 'react-native'
import r from 'react'
import { TextInput } from 'react-native-paper'
import moment from 'moment'
import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker'

export const ButtonWithAPI = ({ children, fullWidth, response, style, label, api, ...rest }) => {
  const [loading, setLoading] = r.useState(false)

  const handleCall = e => {
    setLoading(true)
    api?.()
      .then(res => {
        response?.(res)
      })
      .catch(err => {
        setLoading(false)
      })
      .finally(() => {
        setLoading(false)
      })
  }
  return (
    <rn.TouchableOpacity
      style={{ width: fullWidth ? 300 : 'auto', height: 30, opacity: loading ? 0.7 : 1, backgroundColor: '#4287f5', alignItems: 'center', padding: 5, ...style }}
      onPress={handleCall}
      {...rest}
    >
      {
        !loading ? <rn.Text style={{ color: 'white' }}>{label}</rn.Text> : <rn.ActivityIndicator />
      }
    </rn.TouchableOpacity>
  )
}

export const Select = ({ disabled, getDataWhen = true, filter = () => true, value, onChange, getDataFunc, getOptionLabel, label, setDefaultWhen = true, setDefaultDependencies = [], setDefaultFunc, ...props }) => {
  const [loading, setLoading] = r.useState(false)
  const [data, setData] = r.useState(null)
  const [open, setOpen] = r.useState(false)
  const [filterText, setFilterText] = r.useState('')
  r.useLayoutEffect(() => {
    setFilterText('')
    setData(null)
    if (open && getDataWhen) getDataFunc?.().then?.(res => {
      setData(res.data.data)
    })
  }, [open, getDataWhen])
  r.useLayoutEffect(() => {
    if (setDefaultWhen) setDefaultFunc?.()
  }, setDefaultDependencies)
  return (
    <>
      <TextInput
        editable={!disabled}
        showSoftInputOnFocus={false}
        onFocus={() => { setOpen(true); rn.Keyboard.dismiss() }}
        value={getOptionLabel?.(value) || ''}
        label={label}
        right={<TextInput.Icon icon={disabled ? 'lock' : value ? 'close' : ''} disabled={disabled} style={{ opacity: 0.6 }} onPress={() => onChange(null)} forceTextInputFocus={false} />}
        {...props}
      />
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <TextInput left={<TextInput.Icon icon='magnify' style={{ opacity: 0.3 }} />} placeholder='Tìm kiếm' value={filterText} onChange={e => setFilterText(e.nativeEvent.text)} onSubmitEditing={() => { onChange(data?.filter(item => getOptionLabel?.(item).includes(filterText))[0]); setOpen(false) }} />
        <rn.ScrollView>
          {
            data?.filter(filter).filter(item => getOptionLabel?.(item)?.includes(filterText)).map(item =>
              <rn.TouchableOpacity key={item.id} style={{ padding: 15 }} onPress={() => { onChange?.(item); setData(null); setOpen(false) }}>
                <rn.Text style={{ color: value && item.id === value.id ? '#01579b' : 'black' }}>{getOptionLabel?.(item)}</rn.Text>
              </rn.TouchableOpacity>
            )
          }
        </rn.ScrollView>
      </Dialog>
    </>
  )
}
export const DatePicker = ({ mode, ...props }) => {
  const showMode = (currentMode, currentDate) => {
    DateTimePickerAndroid.open({
      value: new Date(currentDate || Date.now()),
      onChange: (e, selectedDate) => { props.onChange(selectedDate); mode.includes('time') && currentMode === 'date' && showTimepicker(selectedDate) },
      mode: currentMode,
      is24Hour: true
    })
  };

  const showDatepicker = (currentDate) => {
    showMode('date', currentDate);
  };

  const showTimepicker = (currentDate) => {
    showMode('time', currentDate);
  };
  return (
    <TextInput
      {...props}
      showSoftInputOnFocus={false}
      onFocus={() => { showDatepicker(props.value); rn.Keyboard.dismiss() }}
      value={props.value ? moment(props.value).format(props.format || 'DD/MM/YYYY') : ''}
      style={{ flex: 1 }}
    />
  )
}
export const Dialog = ({ open, onClose, children }) => {
  return (
    <rn.Modal visible={open} onRequestClose={onClose} animationType='fade' transparent>
      <rn.TouchableWithoutFeedback onPress={onClose}>
        <rn.View style={{ padding: 30, paddingTop: 50, justifyContent: 'center', paddingBottom: 50, flex: 1, backgroundColor: 'rgba(0,0,0, 0.5)' }}>
          <rn.TouchableHighlight>
            <rn.View style={{ backgroundColor: 'white', height: '100%' }}>
              {children}
            </rn.View>
          </rn.TouchableHighlight>
        </rn.View>
      </rn.TouchableWithoutFeedback>
    </rn.Modal>
  )
}