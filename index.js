import React, { useEffect } from 'react'
import rn from 'react-native'
import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import store from './src/redux/index'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { screenConfigs, SideMenuList } from './config';
import { Provider as PaperProvider } from 'react-native-paper';
import { BleManager } from 'react-native-ble-plx'


const Drawer = createDrawerNavigator()
const Stack = createNativeStackNavigator()
export default function App() {
  return (
    <Provider store={store}>
      {/* <PaperProvider>
        <NavigationContainer>
          <Drawer.Navigator screenOptions={{ headerStyle: { backgroundColor: '#01579b' }, headerTintColor: 'white' }} useLegacyImplementation initialRouteName="Đăng nhập" drawerContent={(props) => <SideMenuList {...props} />}>
            {
              screenConfigs.map(item =>
                <Drawer.Screen key={item.name} {...item} />
              )
            }
          </Drawer.Navigator>
        </NavigationContainer>
      </PaperProvider> */}
      <Test />
    </Provider>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
    // overflow: 'visible'
  },
});









const Test = () => {
  const click = () => {
    const ble = new BleManager()
  }
  return (
    <rn.View style={{ flex: 1, alignContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
      <rn.Text>a</rn.Text>
      <rn.Button title='asd' onPress={click} />
      <rn.StatusBar />
    </rn.View>
  )
}