"use client"

import React, {useMemo} from 'react';
import {TotalOrders} from "@/lib/infer-types";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {useRouter, useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";
import {weeklyChart} from "@/app/dashboard/analytics/weekly-chat";
import {ResponsiveContainer, BarChart, Bar, Tooltip} from "recharts";
import {monthlyChart} from "@/app/dashboard/analytics/monthly-chart";



function Earnings({totalOrders}:{totalOrders:TotalOrders[]}) {

    const router= useRouter()
    const searchParams = useSearchParams()

    const filter = searchParams.get("filter") || 'week'

    const chartItems = totalOrders.map((order) => ({

        date:order.order.created!,
        revenue:order.order.total
    }))

    const activeChart = useMemo(() => {
        const weekly = weeklyChart(chartItems)
        const  monthly = monthlyChart(chartItems)

        if(filter === "week")
            return weekly

        if(filter === "month")
            return monthly
    }, [filter])


    const activeTotal = useMemo(() => {
        if(filter ==="month"){
            return monthlyChart(chartItems).reduce((acc, item) =>acc + item.revenue, 0 )
        }

        return weeklyChart(chartItems).reduce((acc, item) =>acc + item.revenue, 0 )
    }, [filter])
    return (
       <Card className="flex-1 shrink-0 h-full">
           <CardHeader>
               <CardTitle>
                   Your revenue :${activeTotal}
               </CardTitle>

               <CardTitle>
                   Here are your recent earnings
               </CardTitle>

               <div className="flex items-center gap-3">
                   <Badge
                       className={cn("cursor-pointer",filter === "week" ? "bg-primary":"bg-primary/25")}
                       onClick={() => router.push("/dashboard/analytics/?filter=week", {
                       scroll:false
                   })}>
                       This Week
                   </Badge>


                   <Badge
                       className={cn("cursor-pointer",filter === "week" ? "bg-primary":"bg-primary/25")}
                       onClick={() => router.push("/dashboard/analytics/?filter=month", {
                           scroll:false
                       })}>
                       This Month
                   </Badge>
               </div>
<CardContent className="h-96">
    <ResponsiveContainer width={"100%"} height={"100%"}>

        <BarChart data={activeChart}>
            <Tooltip

            content={(props) => (<div>
                {props.payload?.map((item) => {
                    return (
                        <div  className="bg-primary py-2 px-4 rounded-md shadow-lg" key={item.payload.date}>
                            <p>Revenue: ${item.value}</p>
                             <p>Date: {item.payload.date}</p>
                        </div>
                    )
                })}
            </div>)}
            />
            <Bar dataKey="revenue" className="fill-primary"/>
        </BarChart>
    </ResponsiveContainer>
</CardContent>
           </CardHeader>
       </Card>
    );
}

export default Earnings;