import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import Home from './pages/Home'
import Form from './components/Form/Form'

const RouteStack = createStackNavigator(
   {
       Home:Home,
       Form:Form
   }
);


export default createAppContainer(RouteStack)
