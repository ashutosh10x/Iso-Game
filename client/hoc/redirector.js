/* eslint-disable no-console */
import React, { useEffect } from "react";
import { connect } from "react-redux";
import history from '../router/history'


const LoginAuthRedirector = ChildComponent => {
    const Auth = props => {
        useEffect(() => {
            if (props.user) {
                history.push("/dashboard");
            }
        }, [props.user]);

        return <ChildComponent {...props} />;
    };

    return connect(mapStateToProps)(Auth);
};

const LogoutAuthRedirector = ChildComponent => {
    const Auth = props => {
        useEffect(() => {
            if (!props.user) {
                history.push("/login");
            }
        }, [props.user]);

        return <ChildComponent {...props} />;
    };

    return connect(mapStateToProps)(Auth);
};

function mapStateToProps({ user }) {
    return { user };
}

export {
    LoginAuthRedirector,
    LogoutAuthRedirector
};
