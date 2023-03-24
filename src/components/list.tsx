import React from 'react';
import Card from './card';
import { itemData } from '../config'

interface cardList {
    cards: itemData[]
}

const CardList = ({ cards } : cardList) => {

    return(
        <div className="item--list">
            {cards.map((card, index) => {
                return(
                   <Card key={"addressCard".concat(String(index * 3))} card={card} />
                )
            })}
        </div>
    )
}

export default CardList;