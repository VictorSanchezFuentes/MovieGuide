import React from "react";


class ErrorBoundary extends React.Component<errorBoundaryProps, errorBoundaryState>
/*<{errorUI: React.ReactNode},
 {hasError: boolean, message:string}>*/ 



{
    constructor(props: errorBoundaryProps){
        super(props);
        this.state = {hasError: false, message: ""}
    }

    static getDerivedStateFromError(error: any){
        return {hasError: true, message: error}
    }

    componentDidCatch(error: any, errorInfo: any){
        console.log(error);
    }

    render() {
        if(this.state.hasError){
            if (this.props.errorUI){
                return this.props.errorUI;
            } else {
                return <h3>{this.state.message}</h3>
            }
        } else {
            const newObj: any=this;
            return (newObj).props.children;
        }
    }
 }

 interface errorBoundaryProps{
    errorUI?: React.ReactNode;
 }//?is a nullable key 

 interface errorBoundaryState{
    hasError: boolean;
    message: string;
 }

 export default ErrorBoundary;