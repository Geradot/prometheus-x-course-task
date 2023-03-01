import React from "react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return {hasError: true};
    }

    componentDidCatch(error, errorInfo) {
        console.log(errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <div className="error d-flex justify-content-center align-items-center" style={{height: "100vh"}}>
                <p className="h3 alert alert-danger col-auto">Oops! Something went wrong.</p>
            </div>
        } else {
            return this.props.children;
        }
    }
}

export default ErrorBoundary;
