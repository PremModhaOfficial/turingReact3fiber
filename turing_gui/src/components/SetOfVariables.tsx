import React, { useState } from "react";
import { Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type UseStateType = [
    string[],
    React.Dispatch<React.SetStateAction<string[]>>
];

interface SetOfVariablesProps {
    usestate: UseStateType;
    header: string;
}

const SetOfVariables: React.FC<SetOfVariablesProps> = ({ usestate, header }) => {
    const [vars, setVars] = usestate;
    const [inputVar, setInputVar] = useState("");

    const handleAddVariable = () => {
        if (inputVar.trim().length === 1) {
            setVars((prevVars) => [...new Set([...prevVars, inputVar.trim()])]);
            setInputVar("");
        }
    };

    const handleRemoveVariable = (variableToRemove: string) => {
        setVars((prevVars) => prevVars.filter((v) => v !== variableToRemove));
    };

    const progress = (vars.length / 26) * 100; // Assuming max 26 variables (A-Z)

    return (
        <Card className="w-full max-w-lg mx-auto my-10">
            <CardHeader>
                <CardTitle>{header}</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        {vars.map((v, i) => (
                            <Badge key={i} variant="secondary" className="text-sm">
                                {v}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="ml-2 h-4 w-4 p-0"
                                    onClick={() => handleRemoveVariable(v)}
                                >
                                    <Trash2 size={12} />
                                </Button>
                            </Badge>
                        ))}
                    </div>
                    <div className="flex space-x-2">
                        <Input
                            type="text"
                            value={inputVar}
                            onChange={(e) => setInputVar(e.target.value)}
                            className="flex-grow"
                            placeholder="Enter a variable"
                            maxLength={1}
                        />
                        <Button onClick={handleAddVariable}>Add</Button>
                    </div>
                    <Progress value={progress} className="w-full" />
                </div>
            </CardContent>
        </Card>
    );
};

export default SetOfVariables;
