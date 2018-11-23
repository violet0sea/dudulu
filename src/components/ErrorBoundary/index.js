import React from 'react';
import './index.scss';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            error: null,
            errorInfo: null
        };
    }

    componentDidCatch(error, errorInfo) {
        this.setState({
            error,
            errorInfo
        });

        //TODO maybe you can send error to database
    }

    render() {
        const { error, errorInfo } = this.state;
        if(error) {
            return (
                <div className="errorBoubdary">
                    <h2>Something went wrong</h2>
                    <details>
                        <summary>Error stack</summary>
                        {error.stack}
                        <br />
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </div>
            );    
        }

        return this.props.children;
    }
}

export default ErrorBoundary;