import React, { useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, actions } from '../state/reducer'
import { itemData, mobileWidth } from '../config';

interface singleCard {
    card: itemData
}

const Card = ({ card } : singleCard) => {

    const State = useSelector((state: RootState) => {
        return state
     })
    const dispatch = useDispatch()

    const [isOnHover, setHover] = useState(false)
    const isActive = State.selectedItem === card.address
    

    const ActivateElement = () => {
       dispatch(actions.SelectItem(card.address))
       setHover(true)
       
       // Scroll on mobile
       const scr = document.documentElement.clientWidth
       const mapCtnr = document.querySelector(".map--container")

       if (mapCtnr && scr < mobileWidth) {
          window.scrollTo(0, mapCtnr.getBoundingClientRect().y)
       }
    }

    const CardHover = () => {
        setHover(true)
    }

    const CardUnHover = () => {
        setHover(false)
    }

    return(
        <div className={`item--card${(isOnHover || isActive) ? " active" : ""}`} 
          onMouseOver={CardHover} 
          onMouseOut={CardUnHover}
          onClick={ActivateElement}>
            <div className="card--row address--row">
                {card.address}
            </div>
            <div className="card--row budgets--row">
                {card.budgets.map((budget, index) => {
                    return(
                        <div key={"single".concat(String(index*6))} className="budget--item">
                            {budget}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Card;