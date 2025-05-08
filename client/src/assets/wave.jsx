import React, { useRef, useEffect } from 'react';

export default function WaveCanvas(){
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const pixelSize = 8;
        let frame = 0;

        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const waveHeight = canvas.height * 0.4;
            const waveAmplitude = 60;
            const waveSpeed = 0.02;

            for (let x = 0; x < canvas.width; x += pixelSize) {
                const yOffset = Math.sin((x + frame) * waveSpeed) * waveAmplitude;

                const waveY = canvas.height - waveHeight + yOffset;

                for (let y = 0; y < canvas.height; y += pixelSize) {
                    ctx.fillStyle = 'black';
                    ctx.fillRect(x, y, pixelSize, pixelSize);
                }

                for (let y = waveY; y < canvas.height; y += pixelSize) {
                    ctx.fillStyle = 'red';
                    ctx.fillRect(x, y, pixelSize, pixelSize);
                }

            }
                frame += 2;
                requestAnimationFrame(draw);

        }
        draw();
    },[]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top:0,
                left:0,
                zIndex:-1,
                width:'100%',
                height:'100%'
            }}
            />
    )
}
