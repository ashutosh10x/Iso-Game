import React from 'react'
import { LogoutAuthRedirector } from '../../hoc/redirector'

class Dashboard extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <h1>Dashboard</h1>
        )
    }
}

export default LogoutAuthRedirector(Dashboard)