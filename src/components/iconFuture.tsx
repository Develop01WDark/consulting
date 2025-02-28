import { prospIconFuture } from "../global/interface"

export default function IconFuture(props : prospIconFuture){
    return (
        <div className="container-iconFuture">
            <div className="container-iconFuture__title">
                <h5>{props.title}</h5>
            </div>
            <div className="container-iconFuture__description">
                <h5>{props.description}</h5>
            </div>
        </div>
    )
}