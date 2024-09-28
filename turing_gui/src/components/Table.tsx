import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription } from "@/components/ui/alert";
import TuringMoveInput from "./TuringMoveInput";
import api from "../api";

type TableProps = {
    vars: string[] | undefined;
    states: string[] | undefined;
};

type TuringMove = {
    m: string;
    r: string;
    d: string;
};

type TableData = {
    [key: string]: {
        [key: string]: TuringMove;
    };
};

const TuringMachineConfigTable: React.FC<TableProps> = ({ vars, states }) => {
    const navigate = useNavigate();

    const initialData: TableData = useMemo(() => {
        const data: TableData = {};
        if (vars && states) {
            for (const v of vars) {
                data[v] = {};
                for (const s of states) {
                    data[v][s] = { m: "", r: "", d: "" };
                }
            }
        }
        return data;
    }, [vars, states]);

    const [dynData, setDynData] = useState<TableData>(initialData);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (dynData) {

                const res = await api.post('/config/', { name: 'test', table: dynData });
                if (res.status === 200) {
                    navigate('/animate');
                }
            }
        } catch (error) {
            console.error("Error saving configuration:", error);
            // You might want to show an error message to the user here
        }
    };

    if (!vars || !states) {
        return (
            <Alert>
                <AlertDescription>
                    No variables or states defined. Please define them before configuring the Turing machine.
                </AlertDescription>
            </Alert>
        );
    }

    return (
        <Card className="w-full max-w-4xl mx-auto my-8">
            <CardHeader>
                <CardTitle>Turing Machine Configuration</CardTitle>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[600px] w-full">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">M</TableHead>
                                {vars.map((v, i) => (
                                    <TableHead key={i}>{v}</TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {states.map((s, i) => (
                                <TableRow key={i}>
                                    <TableCell className="font-medium">{s}</TableCell>
                                    {vars.map((v, j) => (
                                        <TableCell key={j}>
                                            <TuringMoveInput
                                                row={s}
                                                col={v}
                                                cols={vars}
                                                rows={states}
                                                data={dynData}
                                                setData={setDynData}
                                            />
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
            <CardFooter className="flex justify-end">
                <Button onClick={handleSubmit}>
                    Save Configuration
                </Button>
            </CardFooter>
        </Card>
    );
};

export default TuringMachineConfigTable;
