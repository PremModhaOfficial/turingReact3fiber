import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
type UseStateType = [
    string,
    React.Dispatch<React.SetStateAction<string>>
];

interface SetOfVariablesProps {
    usestate: UseStateType;
}

const BlankSymbolPage: React.FC<SetOfVariablesProps> = ({ usestate }) => {

    // const BlankSymbolPage: React.FC = (setBlankSymbol: React.Dispatch<React.SetStateAction<string>>) => {
    const [blankSymbol, setBlankSymbol] = usestate
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (blankSymbol.length !== 1) {
            setError('The blank symbol must be a single character.');
            return;
        }
        // Here you would typically save the blank symbol to your global state or context
        // For this example, we'll just log it and navigate back
        console.log('Blank symbol set to:', blankSymbol);
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Set Blank Symbol</CardTitle>
                    <CardDescription>
                        Choose a single character to represent the blank symbol in your Turing machine.
                    </CardDescription>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent>
                        {error && (
                            <Alert variant="destructive" className="mb-4">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}
                        <div className="space-y-2">
                            <label htmlFor="blankSymbol" className="text-sm font-medium">
                                Blank Symbol
                            </label>
                            <Input
                                id="blankSymbol"
                                value={blankSymbol}
                                onChange={(e) => {
                                    setBlankSymbol(e.target.value);
                                    setError(null);
                                }}
                                placeholder="Enter a single character"
                                className="w-full"
                            />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button variant="outline" onClick={() => navigate(-1)}>
                            Cancel
                        </Button>
                        <Button type="submit">Save</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default BlankSymbolPage;
