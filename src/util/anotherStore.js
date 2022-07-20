import React,{useState} from 'react';

export const TotalContext = React.createContext([0,()=>null]);

const AnotherStore=({children})=>{
    const [count,setCount] = useState(1)
    return (
        <TotalContext.Provider value={[count,setCount]}>
            {children}
        </TotalContext.Provider>
    )
}

export default AnotherStore