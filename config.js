import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import r, { useLayoutEffect } from 'react'
import rn from 'react-native'
import { IconButton, Menu } from "react-native-paper"
import Svg, { Path } from 'react-native-svg'
import Dashboard from "./src/page/dashboard"
import Login from "./src/page/login/login"
import CreateTicket from "./src/page/ticket/createTicket"
import TicketList from "./src/page/ticket/ticketList"

export const navBar = [
    {
        code: 'Bán hàng', link: null, icon: null, submenu: [
            { code: 'Phiếu giao nhận', link: '/fuelticket' },
            { code: 'Hóa đơn GTGT', link: '/invoices' },
            { code: 'Hóa đơn thương mại', link: '/commercialinvoice' },
        ]
    },
    {
        code: 'Mua hàng', link: null, icon: null, submenu: [
            { code: 'Hóa đơn chờ kiểm tra', link: '/pi' },
            { code: 'Hóa đơn đã kiểm tra', link: '/pi1' },
            { code: 'Hóa đơn đã duyệt', link: '/pi2' },
        ]
    },
    {
        code: 'Quản lý công nợ', link: null, icon: null, submenu: [
            { code: 'Thông tin thanh toán từ ERP', link: '/erppt', },
            { code: 'Thông tin khách hàng thanh toán', link: '/debt', }
        ]
    },
    {
        code: 'Vận chuyển nội bộ', link: null, icon: null, submenu: [
            { code: 'Xuất kho', link: 'Phiếu xuất kho' },
            { code: 'Bảng kê xuất nhập di chuyển', link: '/rptticket' }
        ]
    },
    {
        code: 'QT. Kỹ thuật', icon: null, link: null, submenu: [
            { code: 'Sổ theo dõi tra nạp', link: '/fuellogbox' },
            { code: 'Báo cáo KT.04.01', link: '/kt0401' }
        ]
    },
    {
        code: 'Thông tin dữ liệu', icon: null, link: null, submenu: [
            { code: 'Thông tin khách hàng', link: '/customers' },
            { code: 'Thông tin ngân hàng', link: '/banks' },
            { code: 'Mẫu hóa đơn', link: '/invoice-form' },
            { code: 'Đơn hàng', link: '/sale-order' },
            { code: 'Giá bán', link: '/price' },
            { code: 'Tiền tệ', link: '/currency' },
            { code: 'Nhiên liệu', link: '/product' },
            { code: 'Đơn vị nhiên liệu', link: '/product-unit' },
            { code: 'Chuyến bay', link: '/flight' },
            { code: 'Danh mục máy bay', link: '/aircraft' },
            { code: 'Nhóm phương tiện', link: '/vehiclegroup' },
            { code: 'Phương tiện', link: '/vehicle' },
            { code: 'Khu vực bán', link: '/salearea' },
            { code: 'Loại hình bán', link: '/saletype' },
            { code: 'Phương thức bán', link: '/loadingtype' },
            { code: 'Đơn vị vận chuyển', link: '/provider' },
            { code: 'Thông tin kho hàng', link: '/inventory' },
            { code: 'Thông tin lái xe bồn', link: '/driver' },
            { code: 'Mẫu phiếu vận chuyển nội bộ', link: '/ltp' },
            { code: 'Thông tin bể', link: '/tank' },
            { code: 'Thông tin sân bay', link: '/airport' },
        ]
    },
    {
        code: 'Quản lý người dùng', link: null, icon: null, submenu: [
            { code: 'Công ty/Chi nhánh', link: '/organization' },
            { code: 'Phòng/Ban', link: '/department' },

            { code: 'Nhóm người dùng', link: '/usergroup' },
            { code: 'Người dùng', link: '/user' },
        ]
    },
]
export const SideMenuList = (props) => {
    const [selectedItem, setSelectedItem] = r.useState(null)
    r.useEffect(() => {
        setSelectedItem(null)
    }, [props])
    return (
        <DrawerContentScrollView {...props}>
            {
                !selectedItem?.toString() ?
                    <>
                        <rn.View style={{ height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: '#01579b' }}>

                        </rn.View>
                        {
                            navBar.map((menu, index) =>
                                <r.Fragment key={index}>
                                    <DrawerItem label={menu.code} onPress={() => setSelectedItem(index)} focused={selectedItem === index} />
                                </r.Fragment>
                            )
                        }
                    </>
                    :
                    <>
                        <rn.View style={{ height: 52, alignItems: 'center', justifyContent: 'center', backgroundColor: '#01579b' }}>
                            <rn.TouchableHighlight style={{ height: 40, position: 'absolute', left: 10, top: 12 }}>
                                <Svg onPress={() => setSelectedItem(null)} width={30} height={30} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><Path fill='white' d="m10.978 14.999v3.251c0 .412-.335.75-.752.75-.188 0-.375-.071-.518-.206-1.775-1.685-4.945-4.692-6.396-6.069-.2-.189-.312-.452-.312-.725 0-.274.112-.536.312-.725 1.451-1.377 4.621-4.385 6.396-6.068.143-.136.33-.207.518-.207.417 0 .752.337.752.75v3.251h9.02c.531 0 1.002.47 1.002 1v3.998c0 .53-.471 1-1.002 1z" fillRule="nonzero" /></Svg>
                            </rn.TouchableHighlight>
                            <rn.Text style={{ color: 'white' }}>{navBar[selectedItem].code}</rn.Text>
                        </rn.View>
                        {
                            selectedItem?.toString() && navBar[selectedItem].submenu.map(item =>
                                <DrawerItem label={item.code} key={item.code} onPress={() => props.navigation.navigate(item.link)} />
                            )
                        }
                    </>
            }
        </DrawerContentScrollView>
    )
}
export const screenConfigs = [
    {
        name: 'Phiếu xuất kho',
        component: TicketList,
        options: ({ navigation }) => ({
            headerRight: () => <HeaderRightIcon navigation={navigation} />
        })
    },
    {
        name: 'Tạo phiếu xuất kho',
        component: CreateTicket
    },
    {
        name: 'Trang chủ',
        component: Dashboard
    },
    {
        name: 'Đăng nhập',
        component: Login,
        options: {
            // headerShown: false
        }
    }
]
const HeaderRightIcon = ({ navigation }) => {
    const [open, setOpen] = r.useState(false)

    return (
        <>

            <Menu visible={open} onDismiss={() => setOpen(false)} anchor={<IconButton icon='dots-vertical' color='white' onPress={() => setOpen(true)} />}>
                <Menu.Item title='Tạo phiếu xuất kho' onPress={() => { setOpen(false); navigation.navigate('Tạo phiếu xuất kho') }} />
            </Menu>
        </>
    )
}