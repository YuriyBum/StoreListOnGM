import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "./scss/app.scss";
import CardList from './components/list'
import Map from './components/map';
import Preloader from './components/preloader'
import { RequestItems } from './state/hooks';
import { actions, RootState } from './state/reducer';
import { itemData, itemsList } from './config';

const App = () => {

  const [isDataLoaded, setDataLoaded] = useState(false) // Show map when data is loaded
  const dispatch = useDispatch()

  const State = useSelector((state: RootState) => {
     return state
  })
  
  // Preloader working while data not loaded
  useEffect(() => {
    if (!isDataLoaded) {

      RequestItems().then((res: itemsList) => {
        // Writing a data
        dispatch(actions.UpdateList(res))
        setDataLoaded(true)
      })
    }
  }, [])

  return (
    <div className="app">
      {!isDataLoaded ? 
      <Preloader /> : 
      <>
        <CardList cards={State.itemsList} />
        <Map />
      </>}
    </div>
  );
};

export default App