"use client"

import { CChart } from '@coreui/react-chartjs'
// import { getStyle } from '@coreui/utils';

import React from 'react'

const Charts = () => {
    // console.log(priceHistory)
    return (
        <div className="mt-4 lg:row-span-3 lg:mt-0">
            <CChart
                type="line" 
                data={{
                           labels: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ],
                 datasets: [
                            {
                                label: "Price",
                                backgroundColor: "rgba(220, 220, 220, 0.2)",
                                borderColor: "rgba(220, 220, 220, 1)",
                                pointBackgroundColor: "rgba(220, 220, 220, 1)",
                                pointBorderColor: "#fff",
                         data: [78990, 77990,78990, 77990,78990, 69990,78990, 77990,63990, 77990, 47990]
                            },
                            ],
                    }}
                options={{
                    plugins: {
                    legend: {
                        labels: {
                        color: "#2441ff",
                        }
                    }
                    },
                    scales: {
                    x: {
                        grid: {
                            color: "#6270f0",
                        },
                        ticks: {
                            color: "#83f062",
                        },
                    },
                    y: {
                        grid: {
                            color: "#6270f0",
                        },
                        ticks: {
                        color: "#83f062",
                        },
                    },
                    },
                }}/>
        </div>
    )
}

export default Charts