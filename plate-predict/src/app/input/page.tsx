"use client";

import React from "react";
import BarcodeScanner from "@/components/BarcodeScanner";
import WasteScanner from "@/components/WasteScanner";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

export default function Page() {
  const [barcode, setBarcode] = React.useState("");
  const [photo, setPhoto] = React.useState("");
  const [foundStudentData, setFoundStudentData] = React.useState(false);
  const [studentData, setStudentData] = React.useState({}); 
  const [wasteGraph, setWasteGraph] = React.useState<{ x: number; y: number }[]>([]);
  const [rations, setRations] = React.useState<string>();
  const URL = "https://plateprotectbackend.varram.me/";

  /* {                        
    "studentID": "67890",
    "rations": 5,
    "wasteList": [
      3,
      2
    ]
  }
  */

  function determinePortion(rations: number) {
    if(rations < 3) return "For the next meal, the student requires substantially less food.";
    else if (rations > 3 && rations < 6) return "For the next meal, the student requires less food.";
    else if (rations >= 6 && rations < 10) return "For the next meal, the student requires a little less food.";
    else return "For the next meal, the student requires the same amount food.";
  }

  function showAnalytics(data: any) {
    const ohio = [];
    console.log(data['wasteList']);
    for (let i = 0; i < data['wasteList'].length; i++) {
      ohio.push({"x": i, "y": data['wasteList'][i]});
    }
    setWasteGraph(ohio);
    console.log(wasteGraph);
    setFoundStudentData(true);
  }
  
  function handleBarcode(barcode: string) {
    console.log(barcode);
    setBarcode(barcode);
    
    // Add error handling to the fetch request
    fetch(
      `${URL}get_entry?student_id=${barcode}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setStudentData(data);
        showAnalytics(data);
        setRations(determinePortion(data['rations']));
        console.log("Rations: ", data['rations']);
      })
      .catch((error) => {
        console.error("Fetch error:", error);
        // Handle the error appropriately
        // For example, show an error message to the user
        setFoundStudentData(false);
      });
  }
  
  function handlePhoto(photo: string) {
      console.log(photo);
      setPhoto(photo);
      console.log(barcode);
      if(barcode) {
        fetch(URL + "add_waste", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student_id: barcode,
            image: photo,
          }),
        }).then((response) => response.json()).then((data) => {
          console.log("Response: ", data)
          handleBarcode(barcode);
        }).catch((error) => console.log(error));
      }
      else {
        console.log("Barcode not found");
      }
  } 
  
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0 z-0 bg-black"/>
      <div className="flex flex-col items-center justify-center min-h-screen gap-8 bg-transparent relative z-10">
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 w-full max-w-4xl p-4">
          <div className="w-full md:w-1/2 flex justify-center">
            <BarcodeScanner onPhotoTaken={handleBarcode} />
          </div>
          <div className="w-full md:w-1/2 flex justify-center">
            <WasteScanner onPhotoTaken={handlePhoto} />
          </div>
        </div>
        
        {foundStudentData && (
          <div className="w-full flex flex-col items-center gap-4">
            <div className="w-9/10 h-64 p-4 bg-black/10 backdrop-blur-sm rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/20">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={wasteGraph} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis className="text-white" dataKey="x" label={{ value: "Number of Days Ago", position: "insideBottom", offset: -5 }} />
                  <YAxis className="text-white" label={{ value: "Waste Index", angle: -90, position: "insideLeft" }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="y" stroke="#ff0000" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-4 text-center p-4 bg-black/10 backdrop-blur-sm rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.3)] border border-white/20 text-white">
              {rations}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}