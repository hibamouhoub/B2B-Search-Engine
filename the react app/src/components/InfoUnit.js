import React from 'react'

function InfoUnit(props) {
    return (
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <h6><i class={props.fa}></i> {props.name}:<h6 className="text-muted">{props.value}</h6></h6>
    </li>
    )
}

export default InfoUnit