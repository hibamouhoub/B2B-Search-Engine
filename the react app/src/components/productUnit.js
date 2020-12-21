import React from 'react'

function ProductUnit(props) {
    return (
        <div>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <h6><i class="fas fa-receipt"></i> {props.value} </h6>
            </li>
            <div class="progress">
                <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{ width: "100%", backgroundColor: '#AC3B61' }}></div>
            </div>
        </div>
    )
}

export default ProductUnit