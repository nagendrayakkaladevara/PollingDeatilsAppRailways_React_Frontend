import TooltipWithTrigger from "@/components/customReuseableComponents/TooltipWithTrigger";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from '../assets/indian-railways-logo.png';
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card } from "@/components/ui/card";

interface Person {
    Name: string;
    Designation: string;
    IdentityCard: number;
    PFNo: number;
    HRMSID: string;
    WorkingUnder: string;
    Station: string;
    POLLINGBOOTHNO: string;
    LOCATIONOFPOLLINGBOOTH: string;
    DEPARTMENT: string;
}


const LandingPage = () => {

    const [input, setInput] = useState('');
    const [data, setData] = useState<Person[]>([]);
    const [result, setResult] = useState<Person | null>(null);
    const [error, setError] = useState('');
    // const [loader, setLoader] = useState<boolean>(false);

    // Fetch data from data.json
    const fetchData = async () => {
        try {
            // setLoader(true);
            const response = await fetch('/data.json');
            if (!response.ok) throw new Error('Failed to load data');
            const jsonData = await response.json();
            setData(jsonData.data);
        } catch (err) {
            setError('Failed to load data. Please try again later.');
        } finally {
            setTimeout(() => {
                // setLoader(false);
            }, 1000);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleSearch = () => {
        setError('');
        setResult(null);

        // Validation: Check if input is provided
        if (!input.trim()) {
            setError('Please enter Identity Card or HRMSID.');
            return;
        }

        // Validate input format
        const isIdentityCard = /^\d+$/.test(input);
        const isHRMSID = /^[A-Z0-9]+$/.test(input);

        if (!isIdentityCard && !isHRMSID) {
            setError('Input must be a valid Identity Card (numbers only) or HRMSID (alphanumeric).');
            return;
        }

        // Search for the person
        const person = data.find(
            (p) =>
                (isIdentityCard && p.IdentityCard.toString() === input) ||
                (isHRMSID && p.HRMSID === input)
        );

        if (person) {
            setResult(person);
        } else {
            setError('No matching record found.');
        }
    };

    return (
        <>
            <AuroraBackground>
                <img src={Logo} className='h-16 w-16 ' />
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: "easeInOut",
                    }}
                    className="relative flex flex-col gap-4 items-center justify-center px-4"
                >
                    <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
                        EAST COAST RAILWAY Secret Ballot Elections - 2024
                    </div>
                    <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-4">
                        Enter IPAS-ID or HRMS-ID
                    </div>
                    <div className='flex gap-2'>
                        <TooltipWithTrigger content='Enter IPAS-ID or HRMS-ID' trigger={<Input type="Text" placeholder="Enter here" value={input}
                            onChange={(e) => setInput(e.target.value)} />} />
                        <TooltipWithTrigger content='Search' trigger={<Button variant="outline" onClick={handleSearch}>Search</Button>} />
                    </div>
                    {/* {loader && <>
                        <div className="flex flex-row gap-2">
                            <div className="flex flex-col gap-2">
                                <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-lg"></div>
                                <div className="flex gap-2">
                                    <div className="animate-pulse bg-gray-300 w-10 h-4 rounded-lg"></div>
                                    <div className="animate-pulse bg-gray-300 w-24 h-4 rounded-lg"></div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="animate-pulse bg-gray-300 w-10 h-4 rounded-lg"></div>
                                    <div className="animate-pulse bg-gray-300 w-24 h-4 rounded-lg"></div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="animate-pulse bg-gray-300 w-10 h-4 rounded-lg"></div>
                                    <div className="animate-pulse bg-gray-300 w-24 h-4 rounded-lg"></div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="animate-pulse bg-gray-300 w-10 h-4 rounded-lg"></div>
                                    <div className="animate-pulse bg-gray-300 w-24 h-4 rounded-lg"></div>
                                </div>
                                <div className="flex gap-2">
                                    <div className="animate-pulse bg-gray-300 w-10 h-4 rounded-lg"></div>
                                    <div className="animate-pulse bg-gray-300 w-24 h-4 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </>} */}
                    {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}

                    {/* {result && (
                        <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '10px' }}>
                            <h2>Employee Details</h2>
                            <p><strong>Name:</strong> {result.Name}</p>
                            <p><strong>Designation:</strong> {result.Designation}</p>
                            <p><strong>IdentityCard:</strong> {result.IdentityCard}</p>
                            <p><strong>HRMSID:</strong> {result.HRMSID}</p>
                            <p><strong>Station:</strong> {result.Station}</p>
                            <p><strong>Polling Booth No:</strong> {result.POLLINGBOOTHNO}</p>
                            <p><strong>Polling Booth Location:</strong> {result.LOCATIONOFPOLLINGBOOTH}</p>
                            <p><strong>Department:</strong> {result.DEPARTMENT}</p>
                        </div>
                    )} */}
                    {result && (
                        <Card className="">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-[200px]">Field</TableHead>
                                        <TableHead>Value</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>

                                    <>
                                        <TableRow>
                                            <TableCell className="font-medium">Name</TableCell>
                                            <TableCell>{result.Name}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Designation</TableCell>
                                            <TableCell>{result.Designation}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">IdentityCard</TableCell>
                                            <TableCell>{result.IdentityCard}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">HRMSID</TableCell>
                                            <TableCell>{result.HRMSID}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Station</TableCell>
                                            <TableCell>{result.Station}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Polling Booth No</TableCell>
                                            <TableCell>{result.POLLINGBOOTHNO}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Polling Booth Location</TableCell>
                                            <TableCell>{result.LOCATIONOFPOLLINGBOOTH}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className="font-medium">Department</TableCell>
                                            <TableCell>{result.DEPARTMENT}</TableCell>
                                        </TableRow>
                                    </>

                                </TableBody>
                            </Table>
                        </Card>
                    )}
                </motion.div>
            </AuroraBackground>
        </>
    )
}
export default LandingPage;