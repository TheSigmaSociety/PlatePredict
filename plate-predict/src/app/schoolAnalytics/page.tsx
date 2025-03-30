"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
export default function SchoolAnalytics() {
    const [schoolAnalytics, setschoolAnalytics] = React.useState<{ x: number; y: number }[]>([]);
    const [show, setShow] = React.useState(false);
    const [rationTot, setRationTot] = React.useState<string>("");
    const URL = "https://plateprotectbackend.varram.me/";
    function handleRationTot(data: any) {
        let rationTot = 0;
        for(let i = 0; i < data.length; i++) {
            console.log(data[i]);
            rationTot += data[i]['rations'];
        }
        setRationTot(rationTot.toString());
        console.log(rationTot);
    }
    function handleWasteGraph(data: any) {
        const dat: { x: number; y: number }[] = [];
        const totalWasteList = [];
        for(let i = 0; i < data[0]['wasteList'].length; i++) {
            totalWasteList.push(0);
        }
        for(let i = 0; i < data.length; i++) {
            for(let j = 0; j < data[i]['wasteList'].length; j++) {
                totalWasteList[j] += data[i]['wasteList'][j];
            }
        }
        for(let i = 0; i < totalWasteList.length; i++) {
            dat.push({ x: i, y: totalWasteList[i] });
        }
        setschoolAnalytics(dat);
        console.log(dat);
        console.log(totalWasteList);
    }

    function handleSchoolAnalytics() {
        console.log("School Analytics");
        setShow(!show);

        //TODO: add fetch to get school analytics data
        fetch(`${URL}get_all_entries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((responce) => {
            if(!responce.ok) {
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
        }
        );

    }
    return (
        <div>
            <title>School Analytics</title>
            <button onClick={handleSchoolAnalytics}>Get School Analytics</button>
            <p>School Analytics</p>
            <div className="w-full h-64 flex justify-center items-center">
            {show && (
                <div>
                    <div>{rationTot}</div>
                <ResponsiveContainer width="100%" height="100%" minWidth={500} minHeight={300}>
                <LineChart data={schoolAnalytics} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="x" label={{ value: "x days ago", position: "insideBottom", offset: -5 }} />
                  <YAxis label={{ value: "Total Waste Index", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="y" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
                </div>
                
            )}
            
          </div>
        </div>
    )
}