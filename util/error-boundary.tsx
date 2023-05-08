import React from "react";

interface Props {
    fallback: React.ReactNode;
    children: React.ReactElement;
}

interface State {
    hasError: boolean | string;
}

class ErrorBoundary extends React.Component<Props, State> {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: error }
    }

    render(): React.ReactNode {
        if(this.state.hasError) {
            return this.props.fallback
        }

        return this.props.children
    }
}

export default ErrorBoundary