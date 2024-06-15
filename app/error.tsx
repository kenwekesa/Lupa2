// Use 'client' mode for Next.js API routes
'use client';

// Import the useEffect hook from React
import { useEffect } from "react";

// Import the EmptyState component
import EmptyState from "./components/container/EmptyState";

// Define the props interface for the ErrorState component
interface ErrorStateProps {
    error: Error; // Error object to be displayed
}

// ErrorState functional component definition
const ErrorState: React.FC<ErrorStateProps> = ({
    error
}) => {
    // Use useEffect to log the error to the console when the component mounts or when the 'error' prop changes
    useEffect(() => {
        console.error(error);
    }, [error]);

    // Return the EmptyState component with a specific title and subtitle for error scenarios
    return (
        <EmptyState
            title="Uh Oh"
            subtitle="Something went wrong!"
        />
    );
}

// Export the ErrorState component as the default export of this module
export default ErrorState;
