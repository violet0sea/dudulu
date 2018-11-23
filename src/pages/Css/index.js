import React, {useState, useEffect} from 'react';

import './index.scss';
    
function Index() {
    return(
        <React.Fragment>
            <div className="wrapper">
                <div className="flex-box">
                    <div className="item">1 汉字布局</div>
                    <div className="item">2 Contemplative ReptileContemplative Reptile</div>
                    <div className="item">3 Contemplative ReptileContemplative ReptileContemplative Reptile</div>
                    <div className="item">4 Contemplative ReptileContemplative Reptile</div>
                    <div className="item">5 Contemplative ReptileContemplative Reptile</div>
                    <div className="item">6 Contemplative ReptileContemplative Reptile</div>
                    <div className="item">7 Contemplative ReptileContemplative Reptile</div>
                </div>
            </div>
            <div className="style">text</div>
            <div className="gradient"></div>
        </React.Fragment>
    )
}


export default Index;
