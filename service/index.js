import React from 'react';

import GlobalContext from '../components/context';


const GlobalProvider = () => {

    return(
            <GlobalContext.Provider value={
                {
                authData: {},
                storageData: {}
                }
            }
            >

            </GlobalContext.Provider>
    )
}