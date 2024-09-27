import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { div } from "three/webgpu";

type UseStateType = [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>
];

interface TapeAlphabetPageProps {
    usestate: UseStateType;
    blankSymbol: string;
    header: string;
}

const TapeAlphabetPage: React.FC<TapeAlphabetPageProps> = ({ usestate, blankSymbol, header }) => {
    const [alphabet, setAlphabet] = usestate;
    const [inputSymbol, setInputSymbol] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleAddSymbol = () => {
        const trimmedSymbol = inputSymbol.trim();
        if (trimmedSymbol.length === 1) {
            if (trimmedSymbol === blankSymbol) {
                setError(`The blank symbol cannot be part of the ${header}.`);
                return;
            }
            setAlphabet((prevAlphabet) => [...new Set([...prevAlphabet, trimmedSymbol])]);
            setInputSymbol("");
            setError(null);
        } else {
            setError("Please enter a single character.");
        }
    };

    const handleRemoveSymbol = (symbolToRemove: string) => {
        setAlphabet((prevAlphabet) => prevAlphabet.filter((s) => s !== symbolToRemove));
    };

    const progress = (alphabet.length / 26) * 100; // Assuming max 26 symbols (A-Z)

    return (
        <Card
            id={`#${header}`}
            className="w-full max-w-lg mx-auto my-10" >
            <CardHeader>
                <CardTitle>Set Tape {header}</CardTitle>
                <CardDescription>
                    Define the alphabet for your Turing machine's tape. Each symbol should be a single character.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {error && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <div className="flex flex-wrap gap-2">
                        {alphabet.map((symbol, i) => (
                            <Badge key={i} variant="secondary" className="text-sm">
                                {symbol}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 h-4 w-4 p-0"
                                    onClick={() => handleRemoveSymbol(symbol)}
                                >
                                    <Trash2 size={12} />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                        <Input
                            type="text"
                            value={inputSymbol}
                            onChange={(e) => setInputSymbol(e.target.value)}
                            className="flex-grow"
                            placeholder="Enter a symbol"
                            maxLength={1}
                        />
                        <Button onClick={handleAddSymbol}>Add</Button>
                    </div>
                    <Progress value={progress} className="w-full" />
                    <p className="text-sm text-gray-500">
                        Blank Symbol: {blankSymbol} (not part of the alphabet)
                    </p>
                </div>
            </CardContent>
        </Card >
    );
};

export default TapeAlphabetPage;
