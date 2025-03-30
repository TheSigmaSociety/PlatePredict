"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function SchoolAnalytics() {
    const [schoolAnalytics, setschoolAnalytics] = React.useState<{ x: number; y: number }[]>([]);
    const [show, setShow] = React.useState(false);
    const [rationTot, setRationTot] = React.useState<string>("");
    const URL = "https://plateprotectbackend.varram.me/";

    function determinePortion(rations: number) {
        if(rations < 3) return "For the next lunch, the school requires substantially less food produced.";
        else if (rations > 3 && rations < 6) return "For the next lunch, the school requires less food produced.";
        else if (rations >= 6 && rations < 10) return "For the next lunch, the school requires a little less food produced.";
        else return "For the next meal, the school requires the same amount food produced.";
      }

    function handleRationTot(data: any) {
        let rationTot = 0;
        for (let i = 0; i < data.length; i++) {
            console.log(data[i]);
            rationTot += data[i]['rations'];
        }
        setRationTot(determinePortion(rationTot/data.length));
        console.log(rationTot);
    }

    function handleWasteGraph(data: any) {
        const dat: { x: number; y: number }[] = [];
        const totalWasteList = [];
        for (let i = 0; i < data[0]['wasteList'].length; i++) {
            totalWasteList.push(0);
        }
        for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < data[i]['wasteList'].length; j++) {
                totalWasteList[j] += data[i]['wasteList'][j];
            }
        }
        for (let i = 0; i < totalWasteList.length; i++) {
            dat.push({ x: i, y: totalWasteList[i] });
        }
        setschoolAnalytics(dat);
        console.log(dat);
        console.log(totalWasteList);
    }

    function handleSchoolAnalytics() {
        console.log("School Analytics");
        setShow(!show);

        fetch(`${URL}get_all_entries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((responce) => {
            if (!responce.ok) {
                console.log("Error fetching data");
                return;
            }
            return responce.json();
        }).then((data) => {
            handleWasteGraph(data);
            handleRationTot(data);
        }).catch((error) => {
            console.log("Error fetching data");
            console.log(error);
        });
    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            <div className="absolute inset-0 z-0 bg-black" />
            <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-transparent relative z-10">
                <div className="flex flex-col items-center justify-center gap-6 mb-8">
                    <button
                        onClick={handleSchoolAnalytics}
                        className="px-12 py-6 border border-white/20 rounded-lg 
                     hover:bg-gray-800 focus:outline-none transition text-white
                     bg-black/10 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                    >
                        <span className="text-xl">
                            {show ? "Hide School Analytics" : "Get School Analytics"}
                        </span>
                    </button>
                </div>

                {show && (
                    <div className="w-full max-w-4xl flex flex-col items-center gap-4">
                        <div className="mt-4 text-center p-4 bg-black/10 backdrop-blur-sm rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/20 text-white">
                            {rationTot}
                        </div>

                        <div className="w-full h-84 p-4 bg-black/10 backdrop-blur-sm rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/20">
                            <ResponsiveContainer width="100%" height="100%" minWidth={500} minHeight={300}>
                                <LineChart data={schoolAnalytics} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis className="text-white" dataKey="x" label={{ value: "Number Of Days", position: "insideBottom", offset: -5 }} />
                                    <YAxis className="text-white" label={{ value: "Waste Index", angle: -90, position: "insideLeft" }} />
                                    <Tooltip />
                                    <Line type="monotone" dataKey="y" stroke="#ff0000" strokeWidth={3} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}