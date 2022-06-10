import {HashRouter,BrowserRouter,Routes,Route } from 'react-router-dom'
import Home from './components/core/home'
import Signin from './components/core/signin'
import MoreOrder from './components/core/moreOrder'
import MoreSample from './components/core/moreSample'
import MoreReport from './components/core/moreReport'
import MoreProject from './components/core/moreProject'
import MoreResources from './components/core/moreResources'
import Data from './components/views/data'
import Sample from './components/views/sample'
import Project from './components/views/data'
import Experiment from './components/views/experiment'
import MyLayout from './components/core/layout'
import {WrapComps} from './components/helper/wrap'

const PathRoute=()=>{
    return (
        <BrowserRouter>
            {/* 拥有路由需要包裹在BrowserRouter里 */}
            <MyLayout>
            <Routes>
                {/* 将navigate传递，得到路由跳转 */}
                <Route path="/" element={<WrapComps el={Home} />} exact></Route>
                <Route path="/signin" element={<Signin/>}></Route>
                <Route path="/more/order" element={<WrapComps el={MoreOrder}/>}></Route>
                <Route path="/more/sample" element={<MoreSample/>}></Route>
                <Route path="/more/report" element={<MoreReport/>}></Route>
                <Route path="/more/project" element={<MoreProject/>}></Route>
                <Route path="/more/resources" element={<MoreResources/>}></Route>
                <Route path="/data-table" element={<Data/>}></Route>
                <Route path="/data-site" element={<Sample/>}></Route>
                <Route path="/equip" element={<Project/>}></Route>
                <Route path="/material" element={<Experiment/>}></Route>
            </Routes>
            </MyLayout>
        </BrowserRouter>
    )

}

export default PathRoute