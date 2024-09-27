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

interface TapeStringPageProps {
    usestate: UseStateType;
    alphabet: string[]; // Add this prop to validate the input against the alphabet
    blankSymbol: string; // Add this prop to use the blank symbol in validation
}

const TapeStringPage: React.FC<TapeStringPageProps> = ({ usestate, alphabet, blankSymbol }) => {
    const [tapeString, setTapeString] = usestate;
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (tapeString.length === 0) {
            setError('The tape string cannot be empty.');
            return;
        }

        const invalidCharacters = tapeString.split('').filter(char =>
            !alphabet.includes(char) && char !== blankSymbol
        );

        if (invalidCharacters.length > 0) {
            setError(`Invalid characters found: ${invalidCharacters.join(', ')}. Please use only characters from the alphabet or the blank symbol.`);
            return;
        }

        // Here you would typically save the tape string to your global state or context
        console.log('Tape string set to:', tapeString);
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="container mx-auto p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>Set Tape String</CardTitle>
                    <CardDescription>
                        Enter the initial string for your Turing machine's tape. Use characters from your alphabet or the blank symbol.
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
                            <label htmlFor="tapeString" className="text-sm font-medium">
                                Tape String
                            </label>
                            <Input
                                id="tapeString"
                                value={tapeString}
                                onChange={(e) => {
                                    setTapeString(e.target.value);
                                    setError(null);
                                }}
                                placeholder="Enter the tape string"
                                className="w-full"
                            />
                        </div>
                        <div className="mt-4 text-sm text-gray-500">
                            <p>Alphabet: {alphabet.join(', ')}</p>
                            <p>Blank Symbol: {blankSymbol}</p>
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

export default TapeStringPage;
