import { useEffect, useRef, useState } from "react"
import { redirectAfterToast } from "../../utils/utilityFunctions";

export interface TooltipTypes {
    category:string;
    price:number;
    count:number;
    x:number;
    y:number;
}
export interface DataTypes {
    date:string;
    category:string;
    price:number;
}

const formatDateHelper = (dateString:string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {day:"numeric", month:"short"}); 
};
const aggregateData = (data:{category:string; date:string; price:number;}[]) => {
    const aggregated:Record<string, Record<string, {count:number; totalPrice:number;}>> = {};

    data.forEach((item) => {        
        const {category, date, price} = item;

        if (!aggregated[date]) {
            aggregated[date] = {};
        }
        if (!aggregated[date][category]) {
            aggregated[date][category] = {count:0, totalPrice:0};
        }
        aggregated[date][category].count += 1;
        aggregated[date][category].totalPrice += price;
    })
    return aggregated;
};

export const StackedBarChart = ({data, categoryColors,}:{data:DataTypes[]; categoryColors:Record<string, string>;}) => {
    const canvasRef = useRef<HTMLCanvasElement|null>(null);
    const [tooltip, setTooltip] = useState<TooltipTypes|null>(null);
    const [hoveredRideStatus, setHoveredRideStatus] = useState<string>("");
    const [hoveredRideDate, setHoveredRideDate] = useState<string>("");

    
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            redirectAfterToast({res:{success:false, message:"Canvas not found",  jsonData:{}}});
            return;
        }
        const ctx = canvas?.getContext("2d");
        if (!ctx) {
            redirectAfterToast({res:{success:false, message:"Ctx not found",  jsonData:{}}});
            return;
        }

        // Aggregate data by createdAt and rideStatus
        const aggregatedData = aggregateData(data);

        // Extract unique createdAt and rideStatus
        const dates = Object.keys(aggregatedData);
        const rideStatus = [...new Set(data.map(item => item.category))];
        
        //Canvas setup
        const canvasHeight = 300;
        const canvasWidth = 500;
        const chartHeight = 200;
        const chartWidth = 400;
        const paddingLeft = 60; 
        //const paddingBottom = 40;

        canvas.width = canvasWidth;
        canvas.height = canvasHeight;

        // Calculate max total price per date for y-axis scaling
        const maxTotalPrice = Math.max(...dates.map(date => {
            return Object.values(aggregatedData[date]).reduce((a, b) => a + b.totalPrice, 0);
        }));

        //Clear the canvas
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw axes
        ctx.strokeStyle = "#000";
        ctx.beginPath();
        ctx.moveTo(paddingLeft, 20);
        ctx.lineTo(paddingLeft, chartHeight+20);
        ctx.lineTo(chartWidth+paddingLeft, chartHeight+20);
        ctx.stroke();

        // Draw y-axis labels and grid lines (Total price)
        const ySteps = 5;

        for (let i = 0; i <= ySteps; i++) {
            const price = (maxTotalPrice/ySteps)*i;
            const y = chartHeight+20 - (price/maxTotalPrice) * chartHeight;
            ctx.fillStyle = "#000";
            ctx.fillText(`₹${price.toFixed(2)}`, 10, y);
            ctx.strokeStyle = "#e0e0e0";
            ctx.beginPath();
            ctx.moveTo(paddingLeft, y);
            ctx.lineTo(chartWidth+paddingLeft, y);
            ctx.stroke();
        };

        // Draw x-axis labels (Dates)
        dates.forEach((date, index) => {
            const x = paddingLeft + (index*(chartWidth/dates.length));
            const y = chartHeight + 40;
            ctx.fillStyle = "#000";
            ctx.fillText(formatDateHelper(date), x-20, y); // Date labels
        });

        // Draw stacked bars and track their positions
        const barPositions:(Pick<TooltipTypes, "x"|"y"|"price"|"count"|"category">&{width:number; height:number; date:string;})[] = [];
        dates.forEach((date, index) => {
            let barStartY = chartHeight+20; // Start from bottom of the chart
            const x = paddingLeft + (index*(chartWidth/dates.length)) + 10;
            const barWidth = 30;
            
            rideStatus.forEach((category) => {
                const count = aggregatedData[date][category]?.count || 0;
                const price = aggregatedData[date][category]?.totalPrice || 0;
                const barHeight = (price/maxTotalPrice)*chartHeight;
                if (hoveredRideDate === date && hoveredRideStatus === category) {
                    ctx.fillStyle = "rgba(0,0,0,0.1)";
                    ctx.strokeStyle = "black";
                    ctx.lineWidth = 1;
                    ctx.strokeRect(x, barStartY-barHeight, barWidth, barHeight);
                }
                else{
                    ctx.fillStyle = categoryColors[category];
                }
                //ctx.fillStyle = categoryColors[category];
                ctx.fillRect(x, barStartY-barHeight, barWidth, barHeight);
                barPositions.push({x, y:barStartY-barHeight, width:barWidth, height:barHeight, category, price, count, date});
                barStartY -= barHeight; // Stack next bar on top
            });
        });

        // Mouse hover event to show tooltip
        const mouseMoveHandler = (event:globalThis.MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            // Check if mouse is over any bar
            const hoveredBar = barPositions.find(bar => {
                return mouseX >= bar.x && mouseX <= bar.x+bar.width &&
                mouseY >= bar.y && mouseY <= bar.y+bar.height;
            });            

            if (hoveredBar) {
                setTooltip({x:mouseX, y:mouseY, count:hoveredBar.count, category:hoveredBar.category, price:hoveredBar.price});
                setHoveredRideStatus(hoveredBar.category);
                setHoveredRideDate(hoveredBar.date);
            }
            else{
                setTooltip(null);
            }
        };

        canvas.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            canvas.removeEventListener("mousemove", mouseMoveHandler);
        }

    }, [data, hoveredRideStatus, hoveredRideDate]);

    return(
        <>
            {/*<pre>{JSON.stringify(tooltip, null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(data.map((r) => r.category), null, `\t`)}</pre>*/}
            {/*<pre>{JSON.stringify(hoveredRideStatus, null, `\t`)}</pre>*/}
            <canvas ref={canvasRef}></canvas>
            {
                tooltip && (
                    <div style={{
                        position: 'absolute',
                        left: tooltip.x + 10,
                        top: tooltip.y - 30,
                        background: '#fff',
                        border: '1px solid #ccc',
                        padding: '5px',
                        borderRadius: '3px',
                        pointerEvents: 'none',
                        display:"flex",
                        flexDirection:"column"
                    }}>

                        <span><strong>{tooltip.category}</strong> : {tooltip.count}</span>
                        <span><strong>Total Price</strong> : ₹{tooltip.price}</span>
                    </div>
                )
            }
        </>
    )
}

export const PieChart = ({data, colorScheme}:{data:Record<string, number>; colorScheme:string[];}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    //const [hoveredCategory, setHoveredCategory] = useState<string>("");
    //const [hoveredRideDate, setHoveredRideDate] = useState<string>("");


    useEffect(() => {
        if (!canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const total = Object.values(data).reduce((acc, val) => acc + val, 0);
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(centerX, centerY) - 10;

        let startAngle = 0;        

        // Draw each slice of the pie
        //const barPositions:{centerX:number; centerY:number; radius:number; startAngle:number; endAngle:number;}[] = [];
        Object.entries(data).forEach(([rating, count], index) => {
            if (count !== 0) {
                const sliceAngle = (count / total) * 2 * Math.PI;
                const endAngle = startAngle + sliceAngle;
                
                // Draw slice
                ctx.beginPath();
                ctx.moveTo(centerX, centerY);
                ctx.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx.closePath();
                ctx.fillStyle = colorScheme[index];
                ctx.fill();
        
                // Add label
                const labelX = centerX + (radius / 1.6) * Math.cos(startAngle + sliceAngle / 2);
                const labelY = centerY + (radius / 1.6) * Math.sin(startAngle + sliceAngle / 2);
                ctx.fillStyle = "#000";
                ctx.font = "12px Arial";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(`(${rating})`, labelX, labelY);
                ctx.fillText(`${count}`, labelX, labelY+17);
                ctx.fillText((`${(count/total)*100}%`), labelX, labelY+34);
        
                startAngle = endAngle;
            }        
        });


        //// Mouse hover event to show tooltip
        //const mouseMoveHandler = (event:globalThis.MouseEvent) => {
        //    const rect = canvas.getBoundingClientRect();
        //    const mouseX = event.clientX - rect.left;
        //    const mouseY = event.clientY - rect.top;

        //    // Check if mouse is over any bar
        //    const hoveredBar = barPositions.find(bar => {
        //        return mouseX >= bar.x && mouseX <= bar.x+bar.width &&
        //        mouseY >= bar.y && mouseY <= bar.y+bar.height;
        //    });            

        //    if (hoveredBar) {
        //        setTooltip({x:mouseX, y:mouseY, count:hoveredBar.count, category:hoveredBar.category, price:hoveredBar.price});
        //        setHoveredRideStatus(hoveredBar.category);
        //        setHoveredRideDate(hoveredBar.date);
        //    }
        //    else{
        //        setTooltip(null);
        //    }
        //};

        //canvas.addEventListener("mousemove", mouseMoveHandler);

        //return() => {
        //    canvas.removeEventListener("mousemove", mouseMoveHandler);
        //}
    }, [data]);

    return (
        <div>
        <canvas ref={canvasRef} width={300} height={300} />
        </div>
    );
};