import { View, Text, TextInput, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import r from 'react'
import { ButtonWithAPI } from '../../../component'
import * as api from '../../../api'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../redux/user'

const Login = ({navigation}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [input, setInput] = r.useState({
    email: '',
    password: ''
  })
  const handleResponse = async res => {
    await AsyncStorage.setItem('token', res.data.token)
    api.getProfile().then(res => {
      console.log('data', res.data.data)
      dispatch(setUser(res.data.data[0]))
    })
  }
  r.useEffect(() => {
    if (user) navigation.navigate('Trang chủ')
  }, [user])
  return (
    <SafeAreaView style={style.container}>
      <Text>Đăng nhập</Text>
      <TextInput placeholder='Email' style={style.input} value={input.email} onChangeText={value => setInput(prev => ({ ...prev, email: value }))} />
      <TextInput secureTextEntry placeholder='Password' style={style.input} value={input.password} onChangeText={value => setInput(prev => ({ ...prev, password: value }))} />
      <ButtonWithAPI api={() => api.login(input)} response={handleResponse} fullWidth label='Đăng nhập' style={{ marginTop: 10 }} />
    </SafeAreaView>
  )
}
export default Login

const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  input: {
    height: 'auto', width: 300,
    borderWidth: 1,
    paddingLeft: 10, paddingRight: 10,
    marginTop: 10,
    borderRadius: 3,
  }
})