import type { NextApiRequest, NextApiResponse } from "next";

let tasks : {id: string; text:string}[]=[];

const  SaveTask = async (req: NextApiRequest, res:NextApiResponse) => {
    if (req.method === 'GET') {
        return res.status(200).json(tasks);
    }
}