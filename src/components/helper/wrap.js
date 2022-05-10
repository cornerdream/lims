import { useNavigate, useParams,useLocation} from "react-router-dom";

const WrapComps = (props)=> {
  let navigate = useNavigate();
  let params = useParams();
  let Element = props.el
  return <Element href={useLocation()} params={params} navigate={navigate} {...props} />
}

const withNavigation = (Component) => {

    return (props) => <Component {...props} navigate={useNavigate()} params={useParams()} href={useLocation()}/>;
};

export {
    WrapComps,
    withNavigation
}