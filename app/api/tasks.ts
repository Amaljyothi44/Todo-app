import type { NextApiRequest, NextApiResponse } from "next";

let tasks : {id: string; text:string}[]=[];

const  SaveTask = async (req: NextApiRequest, res:NextApiResponse) => {
    if (req.method === 'GET') {
        return res.status(200).json(tasks);
    } else if (req.method === 'POST') {
        const newTasks = req.body;
        tasks = newTasks;
        return res.status(200).json({message : "Task Saved"});

    } else {
        return res.status(405).json({message : "Method not Allowed"})
    }
}