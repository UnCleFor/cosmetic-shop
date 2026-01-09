import React from 'react'
import './SpinnerComponent.styles.css'

const SpinnerComponent = ({ children, isLoading = false }) => {
    if (isLoading) {
        return (
            <div className="spinner-wrapper">
                <div className="spinner" />
            </div>
        )
    }

    return children || null
}

export default SpinnerComponent