import { NextResponse } from "next/server";

export async function POST(request: Request){
    const { command }  = await request.json()

    const response =  await fetch('http://localhost:8000/api/process_command/',
                                    {method: 'POST',
                                        headers: {'Content-Type': 'application/json'},
                                        body: JSON.stringify({command})}
    )

    const output = await response.json()

    return NextResponse.json(output);

}