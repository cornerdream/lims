import React,{useEffect} from 'react'
import { Chart } from '@antv/g2';



const OrderChart=(props)=> {
    // const data = props.data
    const {data} = props
    const initial=()=>{
        const chart = new Chart({
            container: 'container',
            autoFit: true,
            height: 500,
          });
          chart.data(data);
          chart.axis('value', false);
          chart.legend({
            position: 'right',
          });
          chart.tooltip({
            shared: true,
            showMarkers: false,
          });
          chart.interaction('active-region');
          chart
            .interval()
            .adjust('stack')
            .position('time*value')
            .color('type', ['#40a9ff', '#1890ff', '#096dd9', '#0050b3'])
            .label('value', (val) => {
              if (val < 10) {
                return null;
              }
              return {
                position: 'middle',
                offset: 0,
                content: (originData) => {
                  return originData.value + '%';
                },
                style: {
                  fill: '#fff'
                }
              };
            });
          chart.render();
    }
    useEffect(()=>{
        if(data.length>0){
            initial()
        }
        // initial()
    },[data])
    return <div id='container'></div>
    
    
}

export default OrderChart